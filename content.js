chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download_tab") {
    try {
      const urlParts = request.url.match(/wsa\/(.+?)-tab-s(\d+)$/);
      console.log(urlParts);
      if (urlParts && urlParts[1] && urlParts[2]) {
        const filename = urlParts[1];
        const songId = urlParts[2];
        const gpxUrl = `https://www.songsterr.com/api/meta/${songId}/revisions`;

        fetch(gpxUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0 && data[0].source) {
              const downloadUrl = data[0].source;
              chrome.runtime.sendMessage({
                action: "download_tab",
                url: downloadUrl,
                filename: filename,
              });
            } else {
              alert("Cannot download for some reason.");
            }
          })
          .catch(() => alert("Failed to fetch GP file."));
      } else {
        alert("Invalid Songsterr URL.");
      }
    } catch (error) {
      alert("An error occurred while processing the request.");
    }
  }
});
