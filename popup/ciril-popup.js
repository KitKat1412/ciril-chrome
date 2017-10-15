chrome.runtime.onMessage.addListener(function(msg) {
	console.log(msg); //msg will be a JSON array of Word objects
});

var pt1 = {
	"word": "dis",
	"definition": "not, opposite of",
	"type": "PREFIX"
};

var pt2 = {
	"word": "en",
	"definition": "cause to",
	"type": "PREFIX"
};

var pt3 = {
	"word": "ed",
	"definition": "past-tense verbs",
	"type": "SUFFIX"
};

var pt4 = {
	"word": "gage",
	"definition": "n. 1 pledge; thing deposited as security. 2 symbol of a challenge to fight, esp. A glove thrown down. [germanic: related to *wed, *wage]",
	"type": "BASE"
};

var pt5 = {
	"word": "disengaged",
	"type": "ORG"
};

var breakdown = [pt1, pt2, pt3, pt4, pt5];

$(document).ready(function() {
	$(".banner").css("pointer-events", "none");
	var index = 0;
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

	// $('.drop').click(function() {
	// 	if(hidden){
	// 		$('.drop').animate({
	// 			bottom: '-=60'
	// 		  }, 500, function() {
	// 			// Animation complete.
	// 		  });
	// 		  hidden = false;
	// 	} else {
	// 		$('.drop').animate({
	// 			bottom: '+=60'
	// 		  }, 500, function() {
	// 			// Animation complete.
	// 		  });
	// 		  hidden = true;
	// 	}
	// 	console.log("clicked");
	// });


});