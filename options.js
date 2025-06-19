// Load saved settings when page opens
document.addEventListener('DOMContentLoaded', async () => {
  const result = await chrome.storage.sync.get(['barkKey']);
  if (result.barkKey) {
    document.getElementById('barkKey').value = result.barkKey;
  }
});

// Save settings
document.getElementById('saveBtn').addEventListener('click', async () => {
  const barkKey = document.getElementById('barkKey').value.trim();

  if (!barkKey) {
    showStatus('Please enter a Bark key', 'error');
    return;
  }

  // Basic validation - Bark keys are typically alphanumeric
  if (!/^[a-zA-Z0-9]+$/.test(barkKey)) {
    showStatus('Bark key should only contain letters and numbers', 'error');
    return;
  }

  try {
    await chrome.storage.sync.set({ barkKey: barkKey });
    showStatus('✅ Settings saved successfully!', 'success');

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      hideStatus();
    }, 3000);

  } catch (error) {
    showStatus('❌ Failed to save settings', 'error');
    console.error('Save error:', error);
  }
});

// Test connection
document.getElementById('testBtn').addEventListener('click', async () => {
  const barkKey = document.getElementById('barkKey').value.trim();

  if (!barkKey) {
    showStatus('Please enter a Bark key first', 'error');
    return;
  }

  // Show loading state
  const testBtn = document.getElementById('testBtn');
  const originalText = testBtn.textContent;
  testBtn.textContent = 'Testing...';
  testBtn.disabled = true;

  try {
    const testUrl = `https://api.day.app/${barkKey}/Test/Extension%20setup%20successful!`;
    const response = await fetch(testUrl, {
      method: 'GET'
    });

    if (response.ok) {
      showStatus('✅ Test successful! Check your iPhone for the notification.', 'success');
    } else {
      const errorText = await response.text();
      showStatus(`❌ Test failed: ${response.status} ${response.statusText}`, 'error');
      console.error('Test response:', errorText);
    }

  } catch (error) {
    showStatus('❌ Test failed: Network error', 'error');
    console.error('Test error:', error);
  } finally {
    // Restore button state
    testBtn.textContent = originalText;
    testBtn.disabled = false;
  }
});

// Handle Enter key in input field
document.getElementById('barkKey').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('saveBtn').click();
  }
});

// Helper functions
function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  statusDiv.style.display = 'block';
}

function hideStatus() {
  const statusDiv = document.getElementById('status');
  statusDiv.style.display = 'none';
}