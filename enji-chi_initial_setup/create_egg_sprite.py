#!/usr/bin/env python3
"""
Script to create an egg sprite image for the game
"""
from PIL import Image, ImageDraw
import os

def create_egg_sprite():
    """Create a cute egg sprite with spots"""
    # Create image with transparency
    width, height = 200, 260
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Center position
    cx, cy = width // 2, height // 2
    
    # Draw shadow (ellipse at bottom)
    shadow_color = (0, 0, 0, 40)
    draw.ellipse([cx - 80, cy + 80, cx + 80, cy + 100], fill=shadow_color)
    
    # Draw main egg body (light mint green)
    egg_color = (232, 245, 233, 255)
    # Draw egg shape using ellipse
    draw.ellipse([cx - 60, cy - 80, cx + 60, cy + 80], fill=egg_color)
    
    # Add decorative spots (darker green)
    spot_color = (76, 175, 80, 180)
    draw.ellipse([cx - 30, cy - 50, cx - 10, cy - 30], fill=spot_color)
    draw.ellipse([cx + 15, cy - 30, cx + 35, cy - 10], fill=spot_color)
    draw.ellipse([cx - 25, cy + 10, cx - 10, cy + 25], fill=spot_color)
    draw.ellipse([cx + 10, cy + 30, cx + 30, cy + 50], fill=spot_color)
    
    # Add smaller spots
    draw.ellipse([cx - 40, cy - 10, cx - 30, cy], fill=spot_color)
    draw.ellipse([cx + 30, cy + 5, cx + 40, cy + 15], fill=spot_color)
    
    # Add highlight for 3D effect (white, semi-transparent)
    highlight_color = (255, 255, 255, 120)
    draw.ellipse([cx - 35, cy - 65, cx - 10, cy - 30], fill=highlight_color)
    
    # Add subtle outline for better visibility
    outline_color = (200, 200, 200, 100)
    draw.ellipse([cx - 60, cy - 80, cx + 60, cy + 80], outline=outline_color, width=2)
    
    # Save the image
    output_path = 'enjchi-enhanced/public/assets/sprites/egg.png'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    print(f"✓ Created egg sprite: {output_path}")
    print(f"  Size: {width}x{height} pixels")
    print(f"  Format: PNG with transparency")

def create_background_image():
    """Create a simple background image (optional)"""
    width, height = 800, 600
    img = Image.new('RGB', (width, height), (0, 0, 0))
    
    output_path = 'enjchi-enhanced/public/assets/sprites/background.png'
    img.save(output_path, 'PNG')
    print(f"✓ Created background image: {output_path}")

if __name__ == "__main__":
    print("Creating game sprite assets...\n")
    create_egg_sprite()
    create_background_image()
    print("\n✅ Sprite assets created successfully!")
