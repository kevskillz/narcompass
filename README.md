# NarCompass: Life-Saving Connections

Check out my blog post for more info! https://www.kevinlobo.us/blog/posts/narcompass 

Connecting Narcan carriers with overdose victims instantly to save lives.

Try it out online with [this link](https://appetize.io/app/an43t7zeehs2cytt2jkrgftkxm?device=pixel7&osVersion=13.0).
More information on [How to Run](#how-to-run) is below.

## 🛠 Tech Stack

- **React Native**: For building the mobile application.
- **AWS Amplify**: For backend services and cloud integration.
- **GraphQL**: For API queries and mutations.
- **Expo**: For development and deployment.
- **Tensorflow**: Train ML custom ML model to determine overdose status based on smartwatch readings.
- **Express**: Creat a RESTful API to query ML model from our app.

## 🌟 Inspiration

Philadelphia's overdose crisis has overwhelmed emergency services. Narcan, now available over-the-counter, can save lives, but civilians often don't know where overdoses are happening. Our app provides this crucial information, enabling timely civilian intervention.

## 📱 What it does

NarCompass lets victims call for help with one button, alerting hospitals and nearby Narcan carriers. It maps the quickest route for carriers to reach victims, supporting driving, walking, and biking. Callers are updated on help's progress.

Carriers can set their response range, and callers control what information is shared, stored in a cloud database for optimal response.

## How to Run

### On Android Device

If you have an Android device, follow these steps:

1. Install our executable, `NarCompass.apk`, onto your device.

### Without Android Device

If you do not have an Android device, you have a few options:

1. **Online Emulator:**
   - An easier alternative is to use [this link](https://appetize.io/app/an43t7zeehs2cytt2jkrgftkxm?device=pixel7&osVersion=13.0) to run our app online in an emulator.
   - Note: It may time out, but you can run it multiple times on the provided link.

2. **Using Android Studio:**
   - Download Android Studio and set up an emulator through the virtual device manager (e.g., Pixel).
   - Build our React Native App and drag our `NarCompass.apk` onto the emulator to install it.

3. **Using Any Android Emulator:**
   - Download any Android emulator of your choice.
   - Set the emulator to be in portrait mode.
   - Build our React Native App and drag our `NarCompass.apk` on the emulator.

