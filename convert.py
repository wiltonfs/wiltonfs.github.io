import os
from PIL import Image

# Specify the folder containing the PNG files
folder_path = 'images/gamedev'

# Create a list of all PNG files in the folder
png_files = [file for file in os.listdir(folder_path) if file.lower().endswith('.png')]

# Iterate through each PNG file and create a JPG copy
for png_file in png_files:
    png_file_path = os.path.join(folder_path, png_file)
    
    # Load the PNG image using Pillow
    png_image = Image.open(png_file_path)
    
    # Convert the image to RGB mode if it's in RGBA mode
    if png_image.mode == 'RGBA':
        png_image = png_image.convert('RGB')
    
    # Construct the output JPG file path
    jpg_file_path = os.path.splitext(png_file_path)[0] + '.jpg'
    
    # Save the image as a JPG
    png_image.save(jpg_file_path, 'JPEG')

# Print a message to confirm the operation is complete
print(f'Converted {len(png_files)} PNG files to JPG format.')
