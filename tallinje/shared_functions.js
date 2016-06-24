$(document).ready(function() {
	$("body").append("<div class ='overlay'><div class ='alertBox'></div><div></div></div>");
	$(".overlay").fadeOut(0);
});

function updatebar(objectID) {
	//alert ("updatebar");
	if (overallscore > 99) {
		overallscore = 100;
		alertBox("", "<img class='finish' src='../img/correct.png'>");
	}
	//overallscore = Math.round(overallscore + 10);
	//alert ("OS:" + overallscore);
	//alert (overallscore);

	$(".barfill").animate({

		width: overallscore * (940 / 100) + "px"
	}, 500, function() {
		$(".barfill").effect("highlight");
		$(".barfill").html(overallscore + "%");
	});

}

function alertBox(header, p) {
	$(".overlay").fadeIn(300);
	$(".alertBox").html("</div><div class='alert_bread'>" + p + "</div>");


}