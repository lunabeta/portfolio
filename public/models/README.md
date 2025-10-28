# 3D Models for Hero Section

## Required Models

### 1. Laptop Model
- **File**: `laptop.glb`
- **Format**: GLB/GLTF
- **Recommended Sources**:
  - [Sketchfab - Free Laptop Models](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&type=models&q=laptop)
  - [Poly Pizza - Laptop Models](https://poly.pizza/search?q=laptop)
  - [Free3D - Laptop Models](https://free3d.com/3d-models/laptop)

### 2. Tech Icon Models (Optional)
- **File**: `tech-icons.glb`
- **Format**: GLB/GLTF
- **Recommended Sources**:
  - [Sketchfab - Tech Icons](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&type=models&q=technology%20icons)
  - [Poly Pizza - Tech Icons](https://poly.pizza/search?q=technology%20icons)

## Model Requirements

### Laptop Model
- **Polygons**: 5,000 - 15,000 (for web performance)
- **Textures**: Include base color, normal, and metallic/roughness maps
- **Animation**: Should have separate groups for base and screen for opening animation
- **Size**: Optimized for web (under 2MB)

### Tech Icons
- **Style**: Low-poly, modern, futuristic
- **Icons Needed**: React, Node.js, Docker, TypeScript, MongoDB, Python, Git
- **Size**: Small, simple geometry (under 500KB total)

## Fallback System

If models are not available, the system will automatically use:
- Procedural laptop geometry (box-based)
- Emoji-based tech icons
- All animations and lighting will still work

## Usage

1. Download the models from the recommended sources
2. Place them in this directory (`public/models/`)
3. Ensure they're named exactly as specified above
4. The Three.js components will automatically load and use them

## Performance Tips

- Use GLB format for better compression
- Optimize textures (512x512 or 1024x1024 max)
- Keep polygon count reasonable for web
- Test on mobile devices for performance
