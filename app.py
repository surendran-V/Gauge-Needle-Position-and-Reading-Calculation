from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os
import math
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from your React Native app

# Helper function to calculate the average of detected circles
def avg_circles(circles, b):
    avg_x = 0
    avg_y = 0
    avg_r = 0
    for i in range(b):
        avg_x = avg_x + circles[0][i][0]
        avg_y = avg_y + circles[0][i][1]
        avg_r = avg_r + circles[0][i][2]
    avg_x = int(avg_x / b)
    avg_y = int(avg_y / b)
    avg_r = int(avg_r / b)
    return avg_x, avg_y, avg_r

# Helper function to calculate the distance between two points
def dist_2_pts(x1, y1, x2, y2):
    return np.sqrt((x2 - x1)**2 + (y2 - y1)**2)

# Function to calculate the angle from detected lines
def calculate_angle_from_lines(x, y, contours):
    # Placeholder logic to calculate angle based on detected contours
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area < 15:  # Ignore small areas
            a = cnt.reshape(len(cnt), 2)
            a = pd.DataFrame(a)
            x1 = a.iloc[:, 0].mean()
            y1 = a.iloc[:, 1].mean()
            xlen = x1 - x
            ylen = y - y1
            res = np.arctan(np.divide(abs(ylen), abs(xlen)))
            res = np.rad2deg(res)

            # Handle angle calculation based on quadrant
            if xlen < 0 and ylen < 0:
                angle = 90 - res
            elif xlen > 0 and ylen < 0:
                angle = 270 + res
            else:
                angle = res
            return angle
    return 0  # If no valid angle found, return 0

# Endpoint to upload and process an image
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file:
        # Save the uploaded image
        filepath = os.path.join("uploads", file.filename)
        file.save(filepath)
        
        # Run your analog gauge processing function
        try:
            # Get min_value and max_value from request parameters
            min_value = request.form.get('min_value', type=float)
            max_value = request.form.get('max_value', type=float)
            result = process_gauge(filepath, min_value, max_value)
            return jsonify({"reading": result})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    return jsonify({"error": "Failed to process the image"}), 400

def process_gauge(filepath, min_value, max_value):
    # Load the image
    img = cv2.imread(filepath)
    output = img.copy()

    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect circles using HoughCircles
    circle_img = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, 1, 20, np.array([]), 100, 50, int(img.shape[0] * 0.35), int(img.shape[0] * 0.50))
    if circle_img is not None:
        a, b, c = circle_img.shape
        x, y, r = avg_circles(circle_img, b)

        # Calculate separation of circle segments
        separation = 10  # degrees
        interval = int(360 / separation)
        p1 = np.zeros((interval, 2))

        for i in range(0, interval):
            for j in range(0, 2):
                if j % 2 == 0:
                    p1[i][j] = x + 0.9 * r * np.cos(separation * i * np.pi / 180)
                else:
                    p1[i][j] = y + 0.9 * r * np.sin(separation * i * np.pi / 180)

        # Process contours in the image
        canny = cv2.Canny(gray, 200, 20)
        contours, _ = cv2.findContours(canny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # Angle calculation logic for gauge reading
        min_angle, max_angle = 90, 270  # Initialize for angle bounds
        for cnt in contours:
            area = cv2.contourArea(cnt)
            if area < 15:  # Ignore small contours
                a = cnt.reshape(len(cnt), 2)
                a = pd.DataFrame(a)
                x1 = a.iloc[:, 0].mean()
                y1 = a.iloc[:, 1].mean()
                xlen = x1 - x
                ylen = y - y1
                res = np.arctan(np.divide(abs(ylen), abs(xlen)))
                res = np.rad2deg(res)

                if xlen < 0 and ylen < 0:
                    final_start_angle = 90 - res
                    if final_start_angle > min_angle:
                        min_angle = final_start_angle
                elif xlen > 0 and ylen < 0:
                    final_end_angle = 270 + res
                    if final_end_angle < max_angle:
                        max_angle = final_end_angle

        # Compute the final angle and the corresponding reading
        final_angle = calculate_angle_from_lines(x, y, contours)  # You should implement `calculate_angle_from_lines` based on your logic

        # Convert the final angle to a reading
        old_min = float(min_angle)
        old_max = float(max_angle)
        new_min = float(min_value)
        new_max = float(max_value)
        old_range = old_max - old_min
        new_range = new_max - new_min
        new_value = (((final_angle - old_min) * new_range) / old_range) + min_value

        return new_value  # Gauge reading

    else:
        raise ValueError("No circles detected in the image.")

if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True, host="0.0.0.0", port=5000)
