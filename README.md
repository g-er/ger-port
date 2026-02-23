# Portfolio Deployment Guide for PostVisible

Your static HTML portfolio is now configured for PostVisible hosting!

## Quick Start

### Option 1: Automated Setup (Recommended)

Run the deployment preparation script:

```bash
./prepare_deployment.sh
```

This will:
1. Ask for your username
2. Update the configuration automatically
3. Create a deployment-ready ZIP file
4. Show you next steps

### Option 2: Manual Setup

1. **Edit the configuration file**:
   - Open `js/config.js`
   - Change this line:
     ```javascript
     const BASE_PATH = '';
     ```
   - To:
     ```javascript
     const BASE_PATH = '/portfolios/your-username';
     ```
   - Replace `your-username` with your actual username

2. **Test locally**:
   ```bash
   python3 -m http.server 8000
   ```
   Visit: http://localhost:8000

3. **Create deployment package**:
   ```bash
   zip -r portfolio.zip . -x "*.git*" -x "*.md" -x "*.sh"
   ```

4. **Send to PostVisible**:
   - Email the ZIP file to the platform administrator
   - Include your username in the email

## What's Been Configured

✅ **Path Management**: JavaScript helper (`js/config.js`) handles base path routing
✅ **Asset Paths**: All CSS, images, and videos use relative paths  
✅ **Navigation**: All internal links will work with subdirectory hosting
✅ **Compatibility**: Works on PostVisible and can be tested locally

## File Structure

```
your-portfolio/
├── index.html                    # Home page
├── cycles.html                   # Cycles project
├── SLD.html                      # Social Listening Device project
├── 404.html                      # Error page
├── css/
│   ├── style.css                # Main styles
│   └── style_sld.css            # SLD page styles
├── js/
│   └── config.js                # PostVisible configuration
├── images/
│   ├── sld/                     # SLD images
│   └── ...                      # Other images
├── POSTVISIBLE_CONFIG.md        # Deployment documentation
├── README.md                    # This file
└── prepare_deployment.sh        # Deployment script
```

## Testing

### Local Testing (without base path)

Leave `BASE_PATH = ''` in `js/config.js`:

```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Production Testing (with base path)

Set `BASE_PATH = '/portfolios/your-username'` in `js/config.js`:

```bash
python3 -m http.server 8000
# Visit: http://localhost:8000/portfolios/your-username/
```

Note: For production testing to work perfectly locally, you'll need a more advanced server setup. The automated deployment script handles this for you.

## Deployment Checklist

- [ ] Choose a username (lowercase, numbers, hyphens, underscores only)
- [ ] Run `./prepare_deployment.sh` OR manually update `js/config.js`
- [ ] Test locally at http://localhost:8000
- [ ] Verify all pages load correctly
- [ ] Check that images and videos display
- [ ] Test navigation between pages
- [ ] Create deployment ZIP file
- [ ] Send ZIP to PostVisible administrator

## Username Guidelines

Your username should be:
- Lowercase only
- Use letters (a-z), numbers (0-9), hyphens (-), or underscores (_)
- Unique (check with administrator if unsure)
- Professional and memorable

Good examples: `john-doe`, `artist_2024`, `creative-studio`
Bad examples: `John.Doe`, `my portfolio`, `user@name`

## Your Portfolio Will Be Live At

```
https://postvisible.com/portfolios/your-username/
```

## Support

For help with:
- Deployment issues
- Configuration questions
- Technical problems

Contact the PostVisible platform administrator.

## Changes Made

The following files were modified to support PostVisible hosting:

1. **All HTML files** (`index.html`, `cycles.html`, `SLD.html`):
   - Added `<script src="js/config.js"></script>`
   - Fixed image paths (backslashes → forward slashes)

2. **Created new files**:
   - `js/config.js` - Base path configuration
   - `POSTVISIBLE_CONFIG.md` - Technical documentation
   - `README.md` - This guide
   - `prepare_deployment.sh` - Deployment automation

3. **No changes to**:
   - Your CSS files
   - Your images
   - Your content or design

## Need to Update Content?

After your initial deployment, if you need to update your portfolio:

1. Make your changes locally
2. Test with `python3 -m http.server 8000`
3. Run `./prepare_deployment.sh` again with the same username
4. Send the new ZIP file to the administrator

The administrator will replace your old portfolio with the updated version.

---

**Ready to deploy?** Run `./prepare_deployment.sh` to get started!
