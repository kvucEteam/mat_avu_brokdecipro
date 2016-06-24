// Start vars: 
var startX = 0;
var startY = 50;
var spacing = 9;
var margin = 20;
var startInt = 0;
var slutInt = 100;
var subtractor = 0;

var score = [];
var tal = [];
var overallscore = 0;
// initialiser HTML:
var dims_Array = [
  ["../img/tallinjen-pose1wait.png", "../img/tallinjen-pose1b_wait.png"],
  ["../img/tallinjen-pose3plads.png", "../img/tallinjen-pose3b_plads.png"]
];

var html_String = "";
$(document).ready(function() {

  for (var d = 0; d < dims_Array[0].length; d++) {
    html_String = html_String + "<div class='draggable'><img class='kartoffel_img'><div class='nummerplade'></div></div>";
    score.push(false);
  }

  $("#container").html(html_String + "<canvas id='canvas'></canvas>");


  function draw_canvas(taeller, naevner) {


    spacing = 9 * (100 / naevner);
    margin = 20;
    startInt = 0;
    slutInt = naevner;


    var canvas = $('canvas')[0];
    var ctx = canvas.getContext('2d');

    var w = canvas.width = 940;
    var h = canvas.height = 110;

    with(ctx) {
      fillStyle = '#FAFAFA';
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


        if (i % naevner === 0) {
          moveTo((i * spacing) + margin, startY);
          lineTo((i * spacing) + margin, startY + 30);

          strokeStyle = '#033d60';

          fillStyle = '#033d60';
          font = '16px Arial';
          textAlign = 'center';

          fillText(i / naevner + subtractor + ",0", (i * spacing) + margin, startY + 50);

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
  }

  $('#canvas').click(function(e) {
    var offset = $(this).offset();
  });

  $(".draggable").draggable({
    containment: "html",
    scroll: false,

    drag: function(event, ui) {
      var indeks = ui.helper.index();
      // ui.helper.find("img").attr("src", dims_Array[2][indeks]);
    },

    stop: function(event, ui) {
      var dimswidth = $(this).width();
      var offset = $(this).offset();
      var xPos = offset.left - (dimswidth / 2) + 27;
      var yPos = offset.top;
      var xPosRounded = Math.round(xPos / spacing) * spacing;

      //ui.helper.css("left", xPosRounded - 3).css("top", startY + 10);
      $(ui.helper).animate({
        left: xPosRounded,
        top: startY + 58
      }, 100, function() {
        var tal = xPosRounded / spacing + subtractor;
        var rand = ui.helper.find(".nummerplade").html();
        rand = parseInt(rand);
        var indeks = ui.helper.index();

        // alert(xPos + "tal: " + tal + "," + "rand" + rand);
        if (tal == rand) {
          score.splice(indeks, 1, true);
          ui.helper.draggable('disable');
          ////alert("bingo");
          //ui.helper.find("img").attr("src", );
          ui.helper.find("img").attr("src", dims_Array[1][indeks]);
          //alert("score" + score);
          //$(".dims").attr("src", "dims_glad.png");
        } else {
          ui.helper.find("img").attr("src", dims_Array[0][indeks]);
          score.splice(indeks, 1, false);
          //$(".draggable").eq(indeks).effect("shake");
          $(".draggable").eq(indeks).animate({
            "top": 60
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

    var naevner_array = [2, 3, 4, 5, 6, 8, 10, 12, 15];
    var n_rand = Math.round(Math.random() * naevner_array.length);
    var naevner = naevner_array[Math.abs(n_rand - 1)];


    $(".ulighed").toggle();

    tal = [];

    for (var d = 0; d < dims_Array[0].length; d++) {
      score.splice(d, 1, false);
      $(".draggable").eq(d).find("img").attr("src", dims_Array[0][d]);


      $(".draggable").eq(d).css("left", "-30px").css("top", "60px");


      rand = Math.round(Math.random() * (naevner - 1));


      while (tal.indexOf(rand) > -1) {
        rand = Math.round(Math.random() * naevner);
      }

      $(".nummerplade").eq(d).html(rand + "<br/><div class='naevner_br'>_</div><br/>" + naevner);
      tal.push(rand);



      $(".draggable").eq(d).animate({
        left: 100 + (d * 150) + "px"
      }, 300, function() {
        ////alert("klar");
      });
      ////alert(rand);
    }

    draw_canvas(2, naevner);

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

        $(this).not('.ui-draggable-disabled').animate({
          left: $(this).offset().left + 10
        }, 50, function() {

          $(this).animate({
            left: $(this).not('.ui-draggable-disabled').offset().left - 20
          }, 50, function() {

            $(this).not('.ui-draggable-disabled').animate({
              left: $(this).offset().left + 10
            }, 50, function() {});
          });
        });
        var indeks = $(this).index();
        // alertBox("Info", "Placer figurerne til deres rigtige plads på tidslinjen før du trykker 'næste'.")
        if (score[indeks] == false) {}
      });
    }
  });
});e