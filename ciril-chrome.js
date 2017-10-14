document.addEventListener('mouseup',function(event)
{
	var sel = window.getSelection().toString();

	console.log(sel);
	
	if(sel.length) {
		chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
	}
})