
var word;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
	switch(request.message)
	{
		case 'setText':
			window.seltext = request.data
		break;

		case 'getWord':
			sendResponse(word);
		
		default:
			sendResponse({data: 'Invalid arguments'});
		break;
	}
});


function savetext(info,tab)
{
	chrome.tabs.executeScript({
		code: 'window.getSelection().toString();'
	}, function(selection) {
		chrome.runtime.sendNativeMessage('edu.truman.ciril', {'word': selection[0].toLowerCase().trim()}, function(msg) {
			word = msg;
			chrome.tabs.create({
				url: chrome.extension.getURL('popup/popup.html'),
				active: false
			}, function(tab) {
				chrome.windows.create({
					tabId: tab.id,
					type: 'popup',
					focused: true,
					height: 400,
					width: 500,
					left: 500,
					top: 200
				})
			});
		});
	});
}

var contexts = ['selection'];
for (var i = 0; i < contexts.length; i++)
{
	var context = contexts[i];
	chrome.contextMenus.create({'title': 'Affixr word breakdown', 'contexts':[context], 'onclick': savetext});  
}