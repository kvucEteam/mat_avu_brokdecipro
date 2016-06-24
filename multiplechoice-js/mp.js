
	var runde = 0;
	var spm_taeller = 0;
	var xmlData;
	var popud_left;
	var score = 0;
	var data = 0;
	var akt_runde = 0;
	var korrekt_Array = new Array();
	var tekst_Array = new Array();
	var valgt_Array = new Array();
	var bol_Array = new Array();
		var datafile = "tab1.xml";

function getXML(xmlLink) {

	$.ajax({

		type : "GET",
		url : xmlLink,
		dataType : "xml",
		success : function(xml) {
			xmlData = xml;
			var tal = 1;
			data = $(xmlData);
			poseQuestion();
		},
		error : function() {
			alert("Problemer med at loade quiz");
		}
	});
}

// 4. The API will call this function when the video player is ready.

function poseQuestion() {
	runde = 0;
	spm_taeller = 0;
	score = 0;
	akt_runde = 0;
	korrekt_Array = new Array();
	tekst_Array = new Array();
	valgt_Array = new Array();
	vbol_Array = new Array();

	init(runde, spm_taeller);
}

function init(tal, taeller) {

	if(spm_taeller == 0) {
		$("#overlay").fadeToggle();
	}
	$('.popud').animate({
		left : -400,
		opacity : 0,
	}, 0, function() {
		$('.popud').animate({
			left : 0,
			opacity : 1,
		}, 550, function() {
			// Animation complete.
		});
	});


	var akt_runde = data.find('runde').eq(tal);

	var spm = akt_runde.find('spm').eq(taeller);

	var spm_length = akt_runde.find('spm').length;

	var tekst = spm.attr('tekst');

	tekst_Array.push(tekst);

	var bol = spm.eq(tal).attr('korrekt');

	bol_Array.push(bol);

	var svar_length = spm.find('svar').length;

	var svar = spm.find('svar');

	var options_text = "";


	for(var i = 0; i < svar_length; i++) {
		options_text = options_text + "<hr/><table><tr id ='" + i + "'><td><img src='../img/i_valgt.png' class='btn' ></td><td><span class='imgspan'>" + svar.eq(i).attr("value") + "</span></td></tr></table>";

	}
	
	var image = "";
	var forklaring = "";
	
	if (spm.attr('image') != null){
		image = "<img class='quizimg' src='" + spm.attr('image') + "' />";
	}

	if (spm.attr('forklaring') != null){
		forklaring = "<p>" + spm.attr('forklaring') + "</p>";
	}

	$(".popud").html("<h4>" + (spm_taeller + 1) + " / " + spm_length + "<br/>Score: " + score + "</h4>" + image + forklaring + "<h3>" + tekst + "?</h3><p>" + options_text + "</p>");

	$("table").hover(function() {
		$(this).find("img.btn").attr("src", "../img/valgt.png");
	}, function() {
		$(this).find("img.btn").attr("src", "../img/i_valgt.png");
	});

	$("tr").click(function() {
	
		$("tr").unbind('click');
		$(this).css("color", "#123892");
		$(this).css("font-weight", "bold");
		var valgt = $(this).attr("id");
		$("img.btn").eq(valgt).attr("src", "../img/valgt.png");
		valgt_Array.push(svar.eq(valgt).attr("value"));
		//alert (valgt_Array);
	
		$("tr").each(function() {
			if($(this).attr("id") == bol) {
				$(this).css("color", "#597A2E");
				$(this).append("<img class ='checkmark' src='../img/correct.png'>");				
			} else {
				$(this).css("color", "#BB414F");
				$(this).append("<img class ='cross' src='../img/wrong.png'>");
			}
		});
		
		if(valgt == bol) {
			score++;
			korrekt_Array.push("rigtigt");
		} else {
			korrekt_Array.push("forkert");
		}
		spm_taeller++;

		if(spm_taeller < spm_length) {
			setTimeout(function() {
				init(runde, spm_taeller);
			}, 3000);
	
		} else {
			
			var slutfeed = "";
			var sluttext = "";
			var pct = score / spm_length * 100;
			
//			if (pct  > 66){
//			sluttext = "Flot! Du kan gå videre.<br>";	
//			}else if (pct > 33){
//			sluttext = "Du lavde et par fejl. Prøv igen.<br>";	
//			}else {
//			sluttext = "Du lavde en del fejl. Prøv igen.<br>";
//			}
			
			var colorfeed = "";
			
			for(var i = 0; i < korrekt_Array.length; i++) {
				
				if(korrekt_Array[i] == "rigtigt") {
					colorfeed = "#597A2E";
				} else {
					colorfeed = "#ef5b5b";
				}

				slutfeed = slutfeed + "<h4 style='font-weight: normal;'>" + (i + 1) + ") &ensp; <span style ='color:"+ colorfeed+"'>" + tekst_Array[i] + " = " + valgt_Array[i] + "</span></h4>";
			}

			$(".popud").html("<h3>" + sluttext +"</h3><button type='button' class='btn_again'><span class='glyphicon glyphicon-refresh'></span></button>" + slutfeed + "<button type='button' class='btn_again'><span class='glyphicon glyphicon-refresh'></span></button>");
			//</h3> <br> <h4> Spørgsmål " + (spm_taeller + 1) + " af " + spm_length + "<br/>Score: " + score + "</h4>");

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			
			$(".btn_again").click(function() {
				poseQuestion();
			});
		}
	});
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


//var xmlStreng = $('#xmlStreng').text();