(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("js/9ad04a9e.js")
    );
  })().catch(console.error);

})();
