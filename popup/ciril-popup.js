chrome.runtime.onMessage.addListener(function(msg) {
	console.log(msg); //msg will be a JSON array of Word objects
});