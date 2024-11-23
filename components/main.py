import joblib
import numpy as np
import torch
import pandas as pd
import vitaldb
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import OneClassSVM

# Load clinical information, track list, and laboratory results from VitalDB API
df_cases = pd.read_csv("https://api.vitaldb.net/cases")  # clinical information
df_trks = pd.read_csv("https://api.vitaldb.net/trks")  # track list
df_labs = pd.read_csv('https://api.vitaldb.net/labs')  # laboratory results

# Find cases based on selected vital signs
caseids = vitaldb.find_cases(['Solar8000/PLETH_SPO2', 'Solar8000/HR', 'Solar8000/RR'])

empty = []
all_tensor = torch.empty((0, 8), dtype=torch.float32)

cnt = 0
for case_id in caseids:
    cnt += 1

    # Load vital signs data for the selected case
    vals = vitaldb.load_case(case_id, ['Solar8000/PLETH_SPO2', 'Solar8000/HR', 'Solar8000/RR'], 1/100)

    # Remove NaN values and filter based on a threshold (e.g., remove values where HR < 85)
    vals_without_nan = [value for value in vals if not np.isnan(value).any()]
    vals_without_nan = [item for item in vals_without_nan if item[1] >= 85]

    # Extract second index values
    second_index_values = [item[1] for item in vals_without_nan]

    # Create a list to store concatenated data
    concatenated_data = []

    # Iterate through each index in vals_without_nan
    for index in vals_without_nan:
        # Retrieve additional information from df_cases
        additional_info = [
            df_cases.loc[case_id, 'age'],
            1 if df_cases.loc[case_id, 'sex'] == 'M' else -1,  # Convert 'M' to 1, 'F' to -1
            df_cases.loc[case_id, 'height'],
            df_cases.loc[case_id, 'weight'],
            df_cases.loc[case_id, 'bmi']
        ]

        # Concatenate additional_info to the original value
        concatenated_value = np.concatenate([index, additional_info])

        # Append the concatenated value to the list
        concatenated_data.append(concatenated_value)

    tensor_val = torch.tensor(concatenated_data)
    all_tensor = torch.cat((all_tensor, tensor_val), dim=0)
    print(cnt)

# Convert tensor to numpy array
ndarray = all_tensor.numpy()

# Train the One-Class SVM
scaler = StandardScaler()
normalized_data = scaler.fit_transform(all_tensor)

model = OneClassSVM(kernel='rbf', nu=0.001)  # Adjust nu based on the expected proportion of anomalies
model.fit(normalized_data)

# Save the model as ONNX format
model_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('svm', OneClassSVM(kernel='rbf', nu=0.001))
])

model_pipeline.fit(all_tensor)

initial_type = [('float_input', FloatTensorType([None, all_tensor.shape[1]]))]
onnx_model = convert_sklearn(model_pipeline, initial_types=initial_type)

with open('pipeline_narc.onnx', 'wb') as f:
    f.write(onnx_model.SerializeToString())

# Test the model on new instances
additional_tensor = torch.tensor([[98, 80, 15], [97, 89, 17], [99, 88, 17], [95, 80, 17], [93, 80, 14], [96, 92, 9]])

tensor_to_concatenate = torch.tensor([[66, 1, 161, 59.7, 20.4]])
result_tensor = torch.cat([additional_tensor, tensor_to_concatenate.repeat(additional_tensor.size(0), 1)], dim=1)

print(result_tensor)

normalized_test_data = scaler.transform(result_tensor.numpy())

predictions = model.predict(normalized_test_data)
print("Predictions:", predictions)
