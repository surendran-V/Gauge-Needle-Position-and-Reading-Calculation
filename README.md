# Analog Gauge Reader with React Native and Python Flask Integration  

This project demonstrates an analog gauge reading system integrated with a React Native front end and a Python Flask back end. The system enables users to upload an image of an analog gauge or capture one using their mobile camera, input the minimum and maximum scale values, and obtain the gauge reading displayed in real-time on the mobile app.  

---

## Features 🚀  

- **Image Upload**: Users can upload images from their mobile device gallery.  
- **Photo Capture**: Users can take a photo of the gauge directly using their device's camera.  
- **Real-time Gauge Reading**: Processes the uploaded or captured image and calculates the analog gauge reading using image processing algorithms.  
- **Dynamic Inputs**: Accepts user-defined minimum and maximum gauge values.  
- **Cross-platform Support**: Works seamlessly on iOS and Android.  
- **Error Handling**: Displays descriptive error messages for invalid inputs or processing failures.  

---

## Technologies Used 🛠️  

The following technologies were selected to build a robust and efficient solution:  

### **Frontend**    
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> 

- React Native Paper for UI components  
- React Native Linear Gradient for enhanced visuals  
- React Native Image Picker for image upload and photo capture  
- React Native Safe Area Context for consistent UI layout across devices  


### **Backend**  
- Flask (Python)  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
- OpenCV for image processing  <img src="https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=OpenCV&logoColor=white"/>
- NumPy and Pandas for mathematical operations and data handling  <img src="https://img.shields.io/badge/Numpy-777BB4?style=for-the-badge&logo=numpy&logoColor=white"/>      
- Flask-CORS for cross-origin support  

---

## Setup and Installation  

### Prerequisites  
- Node.js and npm/yarn installed for the frontend  
- Python (>=3.7) installed for the backend  <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"/>
- A package manager like pip for Python dependencies  

---
### Project Structure

```bash
├── android
├── app.json
├── app.py
├── App.tsx
├── babel.config.js
├── Gemfile
├── index.js
├── ios
├── jest.config.js
├── metro.config.js
├── node_modules
├── package-lock.json
├── package.json
├── README.md
├── requirements.txt
├── tsconfig.json
├── uploads
├── utils
└── __tests__
```
- **android/:** Contains Android-specific build files and configurations for the app.
- **app.json:** Configuration file used to store app settings, such as build details and environment settings.
- **app.py:** Python script for handling backend logic, for any server-side operations.
- **App.tsx:** The main entry point of the React Native application, where the app's UI and logic are defined.
- **index.js:** The entry point for the React Native app, typically responsible for rendering the main component.
- **ios/:** Contains iOS-specific build files and configurations for the app.
- **metro.config.js:** Configuration for the Metro bundler, which is used to bundle JavaScript and assets in React Native projects.
- **node_modules/:** Contains all installed npm or yarn packages.
- **package-lock.json:** Ensures consistent versions of dependencies across different environments by locking the versions of installed packages.
- **package.json:** The metadata file for the project that defines dependencies, scripts, and other configurations.
- **README.md:** Project documentation providing instructions on setup, usage, and general information about the project.
- **requirements.txt:** Lists the Python dependencies required for the backend or server-side functionality.
- **tsconfig.json:** Configuration file that helps TypeScript understand the project setup and transpile code correctly.
- **uploads/:** Folder where uploaded files, such as images or documents, are stored.
- **utils/:** Contains utility functions and helper scripts that can be reused across the app.
- **__tests__/:** Directory containing unit tests, integration tests, and other test files used for the project.



### Frontend Setup  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/surendran-V/Gauge-Needle-Position-and-Reading-Calculation.git  
   cd analog-gauge-reader/frontend
2. Install Dependencies:  
   ```bash  
   npm install

3. Start the development server:  
   ```bash  
   npm start
4. Android Permissions:
   For Android devices, ensure camera permissions are granted. When the app is installed, it will prompt the user for permissions to access the camera.

### Backend Setup

1. Install Python dependencies:  
   ```bash  
   pip install -r requirements.txt  
2. Start the Flask server:  
   ```bash  
   python app.py
The Flask server will run on http://127.0.0.1:5000 by default.

## **Implementation Details**


### Frontend
1. Camera Support:
    Users can take photos of their gauges directly using the device camera via React Native Image Picker.
    Android users are prompted for camera permissions to enable this feature.

   
2. Image Selection:
    Users can pick images from their gallery as an alternative to taking a photo.
    
3. Dynamic Gauge Reading:
    Accepts user input for minimum and maximum scale values.
   
    Simulates a gauge reading for testing purposes if the backend is not available.
   
5. Error Handling:
    Displays errors for invalid inputs, missing values, or denied permissions.

### Backend
The backend Flask application processes the uploaded or captured images, calculates the gauge reading, and returns the result to the frontend.

---
## Working Screenshots
<img src="https://github.com/user-attachments/assets/70bed7cb-5454-466e-a7d0-6c0d51e20994" width="300" />	<img src="https://github.com/user-attachments/assets/07000945-5bc8-4207-9193-e4860f92f3e8" width="300" />


---
## Challenges and Solutions 🧩

1. Camera Permissions (Android)

	Challenge: Handling user permissions for camera access.
	Solution: Implemented PermissionsAndroid in React Native to dynamically request permissions.

2. User Experience with Photo Capture

	Challenge: Ensuring smooth transition between photo capture and result display.
	Solution: Updated state management to handle image upload and gauge reading seamlessly.


## Offline Implementation (Pending)

Offline Functionality:
The current version of the project does not support offline functionality. While the app works with real-time image processing via the Flask backend, offline support has not been implemented yet due to time constraints and the complexity of syncing image processing and gauge reading logic locally on the mobile device.

* Reason for Delay:
Implementing offline functionality is a complex problem, especially when dealing with resource-intensive operations like image processing and machine learning model inference. This would require optimizing image processing for mobile devices and storing models locally, which wasn't feasible within the time available for this project.

* Future Plans:
This feature will be revisited in the future to enable the app to function fully offline by processing images and calculating gauge readings locally, possibly through the use of TensorFlow Lite or similar solutions.

---

## Future Improvements 🚀 

- **Backend Integration**: Add real-time image processing using the Flask backend.
- **Advanced Error Handling**: Provide detailed error messages for specific issues like blurry images.
- **Cloud Integration**: Enable backend deployment on cloud services for scalability.
- **UI Enhancements**: Add animations and better visual feedback for photo capture and processing.
- **Offline Support**: Implement offline functionality for image processing and gauge reading directly on the mobile device.

---

## Checklist 

- [x]  Frontend supports both image upload and photo capture.
- [x] Backend is prepared to handle image processing requests.
- [x] Thoroughly tested with different devices and scenarios.
- [x] Added error handling for edge cases like permission denial and invalid inputs.
- [ ] Offline functionality remains a work in progress due to time constraints and the complexity of the task.

---

## Video Demonstration 📽️ 
Mobile App Demonstration: https://drive.google.com/file/d/1AvzqivT7aLUVMVwPQ9r2B7HHB0zxiXTm/view?usp=drive_link

Backend gauge reading in action: https://drive.google.com/file/d/15Wj-Ph_hM9jNiBYQsT5ZJxEtla0Zxgpu/view?usp=drive_link


