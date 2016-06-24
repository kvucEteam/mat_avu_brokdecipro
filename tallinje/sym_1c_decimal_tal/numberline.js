   var startX = 0;
   var startY = 50;
   var spacing = 30;
   var margin = 60;
   var startInt = 0;
   var subtractor = 10;
   var slutInt = 10;
   var score = [];
   var tal = [];
   var overallscore = 0;
   // initialiser HTML:
   var dims_Array = [
    ["../img/tallinjen-pose1wait.png", "../img/tallinjen-pose1b_wait.png"],
    ["../img/tallinjen-pose3plads.png", "../img/tallinjen-pose3b_plads.png"],
    ["../img/tallinjen-pose2drag.png", "../img/tallinjen-pose2b_drag.png"]
   ];

   var html_String = "";


   $(document).ready(function() {
    // Start vars: 
    for (var d = 0; d < dims_Array[0].length; d++) {
      html_String = html_String + "<div class='draggable'><img class='kartoffel_img'><div class='nummerplade'></div></div>";
      score.push(false);
    }

    $("#container").html(html_String + "<canvas id='canvas'></canvas>");


    var canvas = $('canvas')[0];
    var ctx = canvas.getContext('2d');

    var w = canvas.width = 940;
    var h = canvas.height = 100;

    with(ctx) {
      fillStyle = '#e4e6e5';
      fillRect(0, 0, w, h);

      fill();

      beginPath();

      lineWidth = 2;

      strokeStyle = '#033d60';


      // //alert(score);
      moveTo(startX + margin, startY);
      lineTo((slutInt * spacing) + margin * 3, startY);

      stroke();

      for (var i = startInt; i <= slutInt; i++) {

        if (!i) {
          lineWidth = 5;
          strokeStyle = '#033d60';
        }
        beginPath();
        lineWidth = 2;


        if (i % 5 === 0) {
          moveTo((i * spacing) + margin, startY);
          lineTo((i * spacing) + margin, startY + 30);

          strokeStyle = '#033d60';

          fillStyle = '#033d60';
          font = '16px Arial';
          textAlign = 'center';

          var fyldTekst = i / subtractor;

          fyldTekst = fyldTekst.toString();

          fyldTekst = fyldTekst.replace(".", ",");

          fillText(fyldTekst, (i * spacing) + margin, startY + 50);

          stroke();

          beginPath();

          var x_arc = i * spacing + margin;
          arc(x_arc, 80, 3, 0, Math.PI * 2, true);
          closePath();
          fillStyle = '#FFF';
          fill();


        } else {
          moveTo((i * spacing) + margin, startY);
          lineTo((i * spacing) + margin, startY + 20);

          strokeStyle = '#033d60';

          fillStyle = '#033d60';

        }

        fill();
        stroke();

        if (i == slutInt) {

          moveTo(i * spacing + margin + 8, startY - 6);
          lineTo(i * spacing + margin + 20, startY);
          lineTo(i * spacing + margin + 8, startY + 6);
          strokeStyle = '#033d60';
          fillStyle = '#033d60';
          //fill();
          stroke();
        }
      }
    }

    $('#canvas').click(function(e) {
      var offset = $(this).offset();

    });

    $(".draggable").draggable({
      containment: "#container",
      scroll: false,

      drag: function(event, ui) {
        var indeks = ui.helper.index();
        ui.helper.find("img").attr("src", dims_Array[2][indeks]);
      },

      stop: function(event, ui) {
        var dimswidth = $(this).width();
        var offset = $(this).offset();
        var xPos = offset.left - (dimswidth / 2) + 20;
        var yPos = offset.top;
        console.log('x: ' + xPos + ', y: ' + yPos);
        var xPosRounded = Math.round(xPos / spacing) * spacing;

        //ui.helper.css("left", xPosRounded - 3).css("top", startY + 10);
        $(ui.helper).animate({
          left: xPosRounded + 4,
          top: startY + 58
        }, 100, function() {
          var tal = xPosRounded / spacing / subtractor;
          tal = tal.toString();
          tal = tal.replace(".", ",");
          var rand = ui.helper.find(".nummerplade").html().toString();
          //alert("tal: " + tal + ", rand: " + rand);
          var indeks = ui.helper.index();

          if (tal == rand) {
            score.splice(indeks, 1, true);
            ////alert("bingo");
            //ui.helper.find("img").attr("src", );
            ui.helper.find("img").attr("src", dims_Array[1][indeks]);
            ui.helper.draggable('disable');
            //alert("score" + score);
            //$(".dims").attr("src", "dims_glad.png");
          } else {
            ui.helper.find("img").attr("src", dims_Array[0][indeks]);
            score.splice(indeks, 1, false);
            $(".draggable").eq(indeks).animate({
              "top": 40
            });

            //alert("score" + score);
          }
          if (score.indexOf(false) < 0) {
            overallscore = overallscore + 10;
            $(".correct").fadeIn(100);
            //alert(overallscore);
            updatebar();
          }
        });
      }
    });

    init();


    function init() {

      $(".draggable").draggable('enable');
      $(".correct").fadeOut(1);

      tal = [];

      for (var d = 0; d < dims_Array[0].length; d++) {
        score.splice(d, 1, false);
        $(".draggable").eq(d).find("img").attr("src", dims_Array[0][d]);
        $(".draggable").eq(d).css("left", "-30px").css("top", "40px");
        rand = Math.round(Math.random() * slutInt) / subtractor;

        while (tal.indexOf(rand) > -1 || tal.indexOf((rand - 1)) > -1 || tal.indexOf((rand + 1)) > -1) {
          console.log("tal: " + tal + ", rand: " + rand);
          rand = Math.round(Math.random() * slutInt) / subtractor;
          console.log(rand + ": redoing it");
        }
        var dec_rand = rand.toString();
        dec_rand = dec_rand.replace(".", ",");
        $(".nummerplade").eq(d).html(dec_rand);
        tal.push(rand);
        console.log(tal);

        $(".draggable").eq(d).animate({
          left: 100 + (d * 150) + "px"
        }, 300, function() {
          ////alert("klar");
        });
        ////alert(rand);
      }
    }

    $(".btn_next").click(function() {
      var initscore = 0;
      if (score.indexOf(false) < 0) {

        $(".draggable").animate({
          top: -200
        }, 1000, "easeInBounce", function() {
        
          initscore++;
          if (initscore > dims_Array.length - 2) {
            //alert ("one time");
            if (overallscore < 100) {
              init();
            }
          }
        });
      } else {
        $('.draggable').each(function() {
          var indeks = $(this).index();
          alertBox("Info", "Placer figurerne til deres rigtige plads på tidslinjen før du trykker 'næste'.")

          if (score[indeks] == false) {}
        });
      }
    });
   });