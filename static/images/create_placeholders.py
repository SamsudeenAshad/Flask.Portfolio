#!/usr/bin/env python3
"""
Script to create placeholder images for the portfolio
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(width, height, color, text, filename):
    """Create a placeholder image with specified dimensions and text"""
    image = Image.new('RGB', (width, height), color)
    draw = ImageDraw.Draw(image)
    
    # Try to use a font, fallback to default if not available
    try:
        font = ImageFont.truetype("arial.ttf", 24)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
        except:
            font = ImageFont.load_default()
    
    # Calculate text position to center it
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2
    
    # Draw text
    draw.text((text_x, text_y), text, fill='white', font=font)
    
    # Save image
    image.save(filename)
    print(f"Created {filename}")

def main():
    # Create images directory if it doesn't exist
    os.makedirs('images/projects', exist_ok=True)
    os.makedirs('images/profile', exist_ok=True)
    
    # Profile image
    create_placeholder_image(400, 400, '#4f46e5', 'Profile Photo', 'images/profile.jpg')
    
    # Project images
    projects = [
        ('recommendation-system.jpg', '#ef4444', 'AI Recommendation\nEngine'),
        ('analytics-dashboard.jpg', '#10b981', 'Business Analytics\nDashboard'),
        ('ecommerce-platform.jpg', '#f59e0b', 'E-commerce\nPlatform'),
        ('computer-vision.jpg', '#8b5cf6', 'Computer Vision\nQuality Control'),
        ('iot-platform.jpg', '#06b6d4', 'IoT Predictive\nMaintenance'),
        ('nlp-chatbot.jpg', '#ec4899', 'NLP Chatbot\nSystem')
    ]
    
    for filename, color, text in projects:
        create_placeholder_image(600, 400, color, text, f'images/projects/{filename}')
    
    print("All placeholder images created successfully!")

if __name__ == "__main__":
    main()
