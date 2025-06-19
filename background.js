// Default Bark configuration
const BARK_BASE_URL = 'https://api.day.app';

// Get Bark key from storage
async function getBarkKey() {
  const result = await chrome.storage.sync.get(['barkKey']);
  return result.barkKey || '';
}

// Handle extension icon click
chrome.action.onClicked.addListener(async (tab) => {
  const barkKey = await getBarkKey();
  
  if (!barkKey) {
    // Show error badge if no key is set
    chrome.action.setBadgeText({
      text: '?',
      tabId: tab.id
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#FF9800',
      tabId: tab.id
    });
    
    // Open options page
    chrome.runtime.openOptionsPage();
    
    // Clear badge after 3 seconds
    setTimeout(() => {
      chrome.action.setBadgeText({
        text: '',
        tabId: tab.id
      });
    }, 3000);
    
    return;
  }
  
  try {
    // Get current tab info
    const currentUrl = tab.url;
    const pageTitle = tab.title || 'Webpage';
    
    console.log('Bark Extension: Processing URL:', currentUrl);
    console.log('Bark Extension: Page title:', pageTitle);
    
    // Use original page title (limit length for URL safety)
    const title = pageTitle.substring(0, 100);
    const body = currentUrl;
    
    // Construct the Bark URL
    const barkUrl = `${BARK_BASE_URL}/${barkKey}/${encodeURIComponent(title)}/${encodeURIComponent(body)}`;
    
    // Add URL parameter so clicking the notification opens the link
    const finalUrl = `${barkUrl}?url=${encodeURIComponent(currentUrl)}`;
    
    console.log('Bark Extension: Sending to Bark:', finalUrl);
    
    // Send the request to Bark
    const response = await fetch(finalUrl, {
      method: 'GET'
    });
    
    if (response.ok) {
      console.log('✅ URL pushed to iPhone successfully!');
      
      // Show success badge
      chrome.action.setBadgeText({
        text: '✓',
        tabId: tab.id
      });
      chrome.action.setBadgeBackgroundColor({
        color: '#4CAF50',
        tabId: tab.id
      });
      
      // Clear badge after 2 seconds
      setTimeout(() => {
        chrome.action.setBadgeText({
          text: '',
          tabId: tab.id
        });
      }, 2000);
      
    } else {
      console.error('❌ Failed to push URL:', response.statusText);
      
      // Show error badge
      chrome.action.setBadgeText({
        text: '✗',
        tabId: tab.id
      });
      chrome.action.setBadgeBackgroundColor({
        color: '#f44336',
        tabId: tab.id
      });
      
      // Clear badge after 3 seconds
      setTimeout(() => {
        chrome.action.setBadgeText({
          text: '',
          tabId: tab.id
        });
      }, 3000);
    }
    
  } catch (error) {
    console.error('❌ Error pushing URL:', error);
    
    // Show error badge
    chrome.action.setBadgeText({
      text: '!',
      tabId: tab.id
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#f44336',
      tabId: tab.id
    });
    
    // Clear badge after 3 seconds
    setTimeout(() => {
      chrome.action.setBadgeText({
        text: '',
        tabId: tab.id
      });
    }, 3000);
  }
});

// Create context menu on extension install/startup
chrome.runtime.onInstalled.addListener(() => {
  console.log('🚀 Bark URL Push extension installed!');
  
  // Create context menu for extension icon
  chrome.contextMenus.create({
    id: 'setBarkKey',
    title: 'Set Bark Key',
    contexts: ['action']
  });
  
  chrome.contextMenus.create({
    id: 'testBarkKey', 
    title: 'Test Bark Key',
    contexts: ['action']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'setBarkKey') {
    // Open options page
    chrome.runtime.openOptionsPage();
  } else if (info.menuItemId === 'testBarkKey') {
    // Test the current Bark key
    const barkKey = await getBarkKey();
    
    if (!barkKey) {
      chrome.action.setBadgeText({
        text: '?',
        tabId: tab.id
      });
      chrome.action.setBadgeBackgroundColor({
        color: '#FF9800',
        tabId: tab.id
      });
      
      setTimeout(() => {
        chrome.action.setBadgeText({
          text: '',
          tabId: tab.id
        });
      }, 3000);
      
      return;
    }
    
    try {
      const testUrl = `${BARK_BASE_URL}/${barkKey}/Test/Extension%20is%20working!`;
      const response = await fetch(testUrl);
      
      if (response.ok) {
        chrome.action.setBadgeText({
          text: '✓',
          tabId: tab.id
        });
        chrome.action.setBadgeBackgroundColor({
          color: '#4CAF50',
          tabId: tab.id
        });
      } else {
        chrome.action.setBadgeText({
          text: '✗',
          tabId: tab.id
        });
        chrome.action.setBadgeBackgroundColor({
          color: '#f44336',
          tabId: tab.id
        });
      }
      
      setTimeout(() => {
        chrome.action.setBadgeText({
          text: '',
          tabId: tab.id
        });
      }, 3000);
      
    } catch (error) {
      chrome.action.setBadgeText({
        text: '!',
        tabId: tab.id
      });
      chrome.action.setBadgeBackgroundColor({
        color: '#f44336',
        tabId: tab.id
      });
      
      setTimeout(() => {
        chrome.action.setBadgeText({
          text: '',
          tabId: tab.id
        });
      }, 3000);
    }
  }
}); 