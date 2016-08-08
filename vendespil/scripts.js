var flippingTime = 1800;
var card1 = 0;
var card2 = 0;
var flipable = 1;


$(document).ready(function() {

    $(".card").click(function() {
        if (flipable == 1 && $(this).hasClass('clickable')) {
            if (card1 == 0) {
                card1 = $(this).attr('name');
                flip($(this));
                //						alert(card1 + " - " + card2);
            } else {
                if (card1 == $(this).attr('name')) {
                    return;
                } else {
                    card2 = $(this).attr('name');
                    flip($(this));
                    //						alert(card1 + " - " + card2);
                    if (card1 == card2 + "x" || card1 + "x" == card2) {
                        $("[name='" + card1 + "']").removeClass('clickable');
                        $("[name='" + card2 + "']").removeClass('clickable');
                    } else {

                        backflip($("[name='" + card1 + "']"));
                        backflip($("[name='" + card2 + "']"));
                        flipable = 0;
                        resetFlipable();
                    };
                    card1 = 0;
                    card2 = 0;
                }
            }
        }
    });

    $('.instruction').append(instruction("Vend brikkerne rundt, så de passer sammen. Nogle af brikkerne angiver procenter, mens andre angiver brøker. Det er din opgave at finde de rigtige makkerpar. Du kan vælge mellem tre forskellige niveauer."));
    one_line_footer();
});

function flip(card) {
    $("div.front", card)[0].style.width = "0%"; // Ny måde at kalde kortet der klikkes på på. (Den gamle måde [bedre, men virker ikke i IE], er kommenterert ud.)
    //				document.getElementsByName(card)[0].childNodes[1].childNodes[1].style.width = "0%"
    setTimeout(function() {
        $("div.back", card)[0].style.width = "100%";
        //				document.getElementsByName(card)[0].childNodes[1].childNodes[3].style.width = "100%"
    }, 100);
};

function backflip(card) {
    setTimeout(function() {
        $("div.front", card)[0].style.width = "100%";
        //				document.getElementsByName(card)[0].childNodes[1].childNodes[1].style.width = "100%"
    }, flippingTime + 100);
    setTimeout(function() {
        $("div.back", card)[0].style.width = "0%";
        //				document.getElementsByName(card)[0].childNodes[1].childNodes[3].style.width = "0%"
    }, flippingTime);
};

function resetFlipable() {
    setTimeout(function() {
        flipable = 1;
    }, flippingTime);
};
