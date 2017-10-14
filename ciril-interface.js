
var seltext = null;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
	switch(request.message)
	{
		case 'setText':
			window.seltext = request.data
		break;
		
		default:
			sendResponse({data: 'Invalid arguments'});
		break;
	}
});


function savetext(info,tab)
{
	chrome.runtime.sendNativeMessage('edu.truman.ciril', {'word': seltext}, function(msg) {
		console.log(msg);
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
			chrome.tabs.sendMessage(tab.id, msg);
		});
	})
}

var contexts = ['selection'];
for (var i = 0; i < contexts.length; i++)
{
	var context = contexts[i];
	chrome.contextMenus.create({'title': 'CIRILfy', 'contexts':[context], 'onclick': savetext});  
}