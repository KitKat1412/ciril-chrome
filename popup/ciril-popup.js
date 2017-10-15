var breakdown;
$(function() {
	chrome.extension.sendRequest({'message': 'getWord'}, function(msg) {
		console.log(msg);
		breakdown = msg;
		index = breakdown.length - 2;
		if(breakdown[0].definition == null) {
			$("#affix").text("Sorry!");
			$("#adef").text("No definition found for " + breakdown[0].word);
			return;
		}
		setup();
	});
})
var index = 0;

function setup() {
	$('#ogword').contents().first()[0].textContent=breakdown[breakdown.length - 1].word;
	var hidden = true;
	$('.drop').click(function() {
		if(hidden){
			$('.drop').animate({
				bottom: '-=60'
			  }, 500, function() {
				// Animation complete.
			  });
			  hidden = false;
		} else {
			$('.drop').animate({
				bottom: '+=60'
			  }, 500, function() {
				// Animation complete.
			  });
			  hidden = true;
		}
		console.log("clicked");
	});

	if(breakdown[breakdown.length - 1].hasOwnProperty("definition")){
		$('#ogdef').contents().first()[0].textContent=breakdown[breakdown.length - 1].definition;
	} else {
		$('#ogdef').contents().first()[0].textContent="Definition not found. Google it";
	}
	
	$('#affix').contents().first()[0].textContent=breakdown[index].word;
	$('#adef').contents().first()[0].textContent=breakdown[index].definition;

	console.log($('.fa-angle-double-left'));
	console.log($('.fa-angle-double-right'));
	$('.fa-angle-double-left').click(moveLeft);

	$('.fa-angle-double-right').click(moveRight);
}


function moveLeft() {
	index--;
	if(index < 0) {
		index = breakdown.length - 1;
	}	
	$('#affix').contents().first()[0].textContent=breakdown[index].word;
	$('#adef').contents().first()[0].textContent=breakdown[index].definition;
}

function moveRight() {
	index++;
	if(index >= breakdown.length - 1) {
		index = 0;
	}	
	$('#affix').contents().first()[0].textContent=breakdown[index].word;
	$('#adef').contents().first()[0].textContent=breakdown[index].definition;
}
