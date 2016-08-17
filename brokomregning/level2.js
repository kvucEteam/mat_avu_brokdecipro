var tal_1;
var tal_2;
var tal_3;

var user_input;

var decimalresult;
var procent_result;
var brok_taeller_result;
var brok_naevner_result;

var overallscore = 0;

var dec_correct = false;
var pro_correct = false;
var brok_correct = false;
var snyd = false;

var tweening = false;

$(document).ready(function() {

	$(document).keypress(function(e) {
		if (e.which == 13) {
			if (tweening == false) {
				tjek_svar();
			}
		}
	});

	$("#tjek_svar").click(function() {
		if (tweening == false) {
			tjek_svar();
		}
	});


	$("#get_answer").click(function() {
		snyd = true;
		$(".dec_input").val(decimalresult);
		$(".pro_input").val(procent_result);
		$(".tae_input").val(brok_taeller_result);
		$(".nae_input").val(brok_naevner_result);
	});

	$(".container").toggle();
	init();

	function init() {
		snyd = false;
		dec_correct = false;
		pro_correct = false;
		brok_correct = false;

		$(".container").fadeToggle("slow");

		$(".correct").css("opacity", 0);
		$("input").val("");
		$("input").attr("readonly", false);
		$("input").css("border", "2px solid #649EBF");


		tal_1 = 1 + Math.round(Math.random() * 99);

		if (Math.random() * 1 > .3) {

			tal_1 = 5 * Math.round(tal_1 / 5);
		}

		bestem_opgave = Math.round(Math.random() * 2);
		brokopgave(bestem_opgave, tal_1);
	}


	function brokopgave(bestem_opgave, tal) {
		decimalresult = (tal / 100).toString();
		decimalresult = decimalresult.toString();
		decimalresult = decimalresult.replace(".", ",");
		procent_result = tal.toString();
		// brok_taeller_result = 100;
		// brok_naevner_result = tal;

		brok_taeller_result = 100;
		brok_naevner_result = procent_result;		

		// for (var i = 50; i > 1; i--) {
		// 	if ((brok_naevner_result % i) == 0 && (brok_taeller_result % i) == 0) {
		// 		brok_taeller_result = brok_taeller_result / i;
		// 		brok_naevner_result = brok_naevner_result / i;
		// 	}
		// }

		if (bestem_opgave == 0) {
			$(".dec_input").val(decimalresult);
			$(".tae_input").val(brok_taeller_result);
			$(".tae_input").css("border", "0px");
			$(".dec_input").css("border", "0px");
			$(".dec_input").attr("readonly", "readonly");
			$(".tae_input").attr("readonly", "readonly");
			$(".nae_input").focus();
			dec_correct = true;
			opgavetype = 0;

		} else if (bestem_opgave == 1) {
			$(".pro_input").val(procent_result);
			$(".tae_input").val(brok_taeller_result);
			$(".tae_input").css("border", "0px");
			$(".pro_input").css("border", "0px");
			$(".pro_input").attr("readonly", "readonly");
			$(".tae_input").attr("readonly", "readonly");
			$(".nae_input").focus();
			pro_correct = true;
			opgavetype = 1;

		} else {
			$(".tae_input").attr("readonly", "readonly");
			$(".nae_input").attr("readonly", "readonly");
			$(".tae_input").css("border", "0px");
			$(".nae_input").css("border", "0px");
			$(".tae_input").val(brok_taeller_result);
			$(".nae_input").val(brok_naevner_result);
			$(".dec_input").focus();
			brok_correct = true;
			opgavetype = 2;
		}
	}

	function tjek_svar() {
		if (opgavetype != 0) {
			if (decimalresult == $(".dec_input").val()) {
				dec_correct = true;
				correct($(".dec_input"));
			} else {
				wrong($(".dec_input"));
			}
		}

		if (opgavetype != 1) {
			if (procent_result == $(".pro_input").val()) {
				pro_correct = true;
				correct($(".pro_input"));
			} else {
				wrong($(".pro_input"));
			}
		}

		if (opgavetype != 2) {
			if (brok_taeller_result == $(".tae_input").val() && brok_naevner_result == $(".nae_input").val()) {
				brok_correct = true;
				correct($(".tae_input"));
				correct($(".nae_input"));
			} else {
				wrong($(".tae_input"));
				wrong($(".nae_input"));
			}
		}
	}

	function updatebar() {
		overallscore = Math.round(overallscore);
		$(".bar").css("width", overallscore * 2 + 10 + "px");
		$(".bar").html(overallscore + "%")
	

	if (overallscore > 99) {
		$("body").append("<div class ='overlay'><div class ='alertBox'></div><div>");
		$(".overlay").fadeIn(300);
		$(".alertBox").html("</div><div class='alert_bread'><img class='finish' src='correct.png'></div>");
	}
}


	function correct(inputfelt) {
		var correcto = inputfelt.parent().find("img");
		correcto.css("opacity", 1); //fadeIn();
		if (dec_correct == true && pro_correct == true && brok_correct == true) {
			dec_correct = false;
			pro_correct = false;
			brok_correct = false;

			if (snyd == false) {
				overallscore = overallscore + 10;
			}
			updatebar();

			setTimeout(function() {
				tweening = false;
				$(".container").fadeToggle("fast", function() {

					init();
				});
			}, 2000);
		}
	}

	function wrong(inputfelt) {
		inputfelt.val("");
		if ((inputfelt).attr("class") == "dec_input" || (inputfelt).attr("class") == "pro_input") {
			animfelt = inputfelt.parent();
		} else {
			animfelt = inputfelt.parent().parent();
		}
		if (inputfelt.attr("class") != "nae_input") {
			animfelt.effect("shake", {
				times: 2
			}, {
				distance: 25
			}, 300);
		}
	}
});