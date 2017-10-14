document.addEventListener('mouseup',function(event)
{
	var sel = window.getSelection().toString().toLowerCase().split(/\s+/, 2)[0];
	
	if(sel.length) {
		chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
	}
})