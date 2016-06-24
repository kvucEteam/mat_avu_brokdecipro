// Start vars: 
var startX = 0;
var startY = 50;
var spacing = 9;
var margin = 20;
var startInt = 0;
var subtractor = 0;
var slutInt = 100;
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


  var canvas = $('canvas')[0];
  var ctx = canvas.getContext('2d');

  var w = canvas.width = 940;
  var h = canvas.height = 100;

  with(ctx) {
    fillStyle = '#FAFAFA';
    fillRect(0, 0, w, h);

    fill();

    beginPath();

    lineWidth = 1;

    strokeStyle = '#033d60';


    // //alert(score);
    moveTo(startX + margin, startY);
    lineTo((slutInt * spacing) + margin, startY);

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
        font = '15px Arial';
        textAlign = 'center';

        fillText(i + subtractor + "%", (i * spacing) + margin, startY + 50);


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

        moveTo(i * spacing + margin, startY);
        lineTo(i * spacing + margin + 20, startY);
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
    containment: "html",
    scroll: false,

    stop: function(event, ui) {
      var dimswidth = $(this).width();
      var offset = $(this).offset();
      var xPos = offset.left - (dimswidth / 2) + 33;
      var yPos = offset.top;

      var xPosRounded = Math.round(xPos / spacing) * spacing;

      $(ui.helper).animate({
        left: xPosRounded - 8,
        top: startY + 28
      }, 100, function() {
        var tal = xPosRounded / spacing + subtractor - 1;
        var rand = ui.helper.find(".nummerplade").html().replace(",", ".");
        rand = parseInt(Math.round(rand * 100));
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


      rand = Math.round(Math.random() * slutInt) + subtractor;


      while (tal.indexOf(rand) > -1 || tal.indexOf((rand - 1)) > -1 || tal.indexOf((rand + 1)) > -1) {

        rand = Math.round(Math.random() * slutInt) + subtractor;

      }
      var rand_dec = rand / 100;
      var rand_dec_string = rand_dec.toString();
      var rand_dec_string_comma = rand_dec_string.replace(".", ",");
      $(".nummerplade").eq(d).html(rand_dec_string_comma);
      tal.push(rand / 100);


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
});