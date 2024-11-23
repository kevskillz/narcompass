const express = require('express')
const serverless = require('serverless-http')
const ort = require('onnxruntime-node');

const app = express()
// const PORT = 3000;
app.use(express.json())


const InferenceSession = ort.InferenceSession;
const Tensor = ort.Tensor;

// Endpoint for ONNX model inference
app.get('/getHealthStatus', async (req, res) => {
    try {
        // Extract input data from the request body
        const inputData = req.query.inputData.split(',').map(Number);

        // Load the ONNX model
        const modelPath = 'pipeline_narc.onnx';
        const session = await InferenceSession.create(modelPath);

        // Prepare input tensor
        const inputTensor = new ort.Tensor('float32', new Float32Array(inputData), [1, inputData.length]);

        // Create unique input feed key
        const inputFeedKey = `float_input`;

        // Prepare feed
        const feeds = {
            [inputFeedKey]: inputTensor,
        };

        // Run inference
        const results = await session.run(feeds);

        // Log the result
        console.log(`Output Values:`, results.label.data.toString());

        // Send the result back in the response
        res.json({ result: results.label.data.toString() });
    } catch (e) {
        console.error(`Failed to inference ONNX model: ${e}.`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the Express server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
module.exports.handler = serverless(app)
