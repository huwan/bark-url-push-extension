# Bark URL Push Chrome Extension

A simple Chrome extension that instantly pushes the current webpage URL to your iPhone using the [Bark app](https://github.com/Finb/Bark).

## ✨ Features

- 🚀 **One-click URL sharing** - Send any webpage to your iPhone instantly
- 📱 **Native iOS notifications** - Clickable notifications that open URLs directly
- 🔧 **Simple setup** - Just enter your Bark key and you're ready to go
- ✅ **Visual feedback** - Color-coded badges show success/error status
- 🎯 **Context menu** - Right-click options for easy configuration and testing

## 📋 Prerequisites

- Google Chrome browser
- iPhone with [Bark app](https://apps.apple.com/app/bark-customed-notifications/id1403753865) installed
- Bark key (obtained from the Bark iPhone app)

## 🚀 Installation

### From Source

1. **Download or clone this repository**
   ```bash
   git clone https://github.com/yourusername/bark-url-push-extension.git
   ```

2. **Install the extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the extension folder
   - The Bark URL Push icon will appear in your toolbar

3. **Configure your Bark key**:
   - Right-click the extension icon → "Set Bark Key"
   - Enter your Bark key from the iPhone app
   - Click "Test Connection" to verify it works
   - Save your settings

## 📱 Usage

1. **Navigate to any webpage** you want to share
2. **Click the Bark URL Push icon** in your Chrome toolbar
3. **Receive a notification on your iPhone** containing:
   - **Title**: The webpage's title
   - **Body**: The full URL
   - **Action**: Tap to open the URL on your iPhone

## 🎛️ Right-click Options

Right-click the extension icon to access:
- **Set Bark Key**: Open the settings page
- **Test Bark Key**: Send a test notification to verify your setup

## 📊 Visual Status Indicators

The extension provides instant feedback through colored badges:

| Badge | Color | Meaning |
|-------|-------|---------|
| **?** | Orange | No Bark key configured (opens settings) |
| **✓** | Green | URL successfully sent |
| **✗** | Red | Failed to send URL |
| **!** | Red | Error occurred during sending |

*All badges automatically disappear after 2-3 seconds*

## 🔧 Troubleshooting

- **Check your Bark key**: Open settings and test the connection
- **Verify internet connection**: The extension requires internet access
- **Test manually**: Visit `https://api.day.app/YOUR_KEY/test` in your browser
- **Check browser console**: Press F12 and look for error messages

## 🏗️ Development

### Project Structure

```
Bark URL Push/
├── manifest.json     # Extension configuration
├── background.js     # Main extension logic
├── options.html      # Settings page interface
├── options.js        # Settings page functionality
├── icon16.png        # 16x16 icon
├── icon48.png        # 48x48 icon
├── icon128.png       # 128x128 icon
└── README.md         # This file
```

### Local Development

1. Make your changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Bark](https://github.com/Finb/Bark) - The excellent iOS notification app that makes this extension possible