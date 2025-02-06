// background.js
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "download_tab", url: tab.url });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download_tab") {
    chrome.downloads.download({
      url: request.url,
      filename: `${request.filename}.gp`,
      saveAs: true,
    });
    sendResponse({ success: true });
  }
});
