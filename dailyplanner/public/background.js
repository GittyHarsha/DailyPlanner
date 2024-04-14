chrome.action.onClicked.addListener((tab) => {
    // alert("got clickde ");
    chrome.tabs.create({
        url: "index.html"
      })
  });