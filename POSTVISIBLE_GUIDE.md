# User Portfolio Configuration Guide

## For Portfolio Creators

When building your portfolio to be hosted on the PostVisible platform, follow these steps:

### 1. Configure Your Build

Update your `vite.config.ts` file:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// IMPORTANT: Replace 'your-username' with your actual username
export default defineConfig({
  base: '/portfolios/your-username/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
```

### 2. Update Router Configuration

Update the `BASE_PATH` in `src/App.tsx`:

```tsx
const BASE_PATH = '/portfolios/your-username';
```

### 3. Build Your Portfolio

```bash
npm run build
```

### 4. Test Locally

Test your build with the correct base path:

```bash
npm run preview
```

Visit: `http://localhost:4173/portfolios/your-username/`

### 5. Submit Your Portfolio

Send the entire `dist` folder to the platform administrator.

## Important Notes

- **Username**: Use only lowercase letters, numbers, hyphens, and underscores
- **Assets**: Ensure all images are placed in the `public/images/` directory
- **File Size**: Keep your build under 100MB if possible
- **Testing**: Test thoroughly with the base path configured

## Common Issues

### Assets Not Loading
- Make sure all images are in `public/images/`
- Check that `base` in vite.config.ts matches your username
- Verify image paths start with `/` (e.g., `/images/photo.jpg`)

### Routing Not Working
- Ensure basename is set correctly in BrowserRouter (App.tsx)
- Use Link components from react-router-dom instead of <a> tags
- Test all routes with the base path

## Adding Your Images

Copy your images to the appropriate directories:

```bash
# For Cycles page images
cp your-images/* public/images/

# For SLD page images
cp your-sld-images/* public/images/sld/
```

## Package.json Scripts

Your project includes these helpful scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

## Support

Contact the platform administrator if you encounter any issues.
