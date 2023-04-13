var cardss = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png",
    "ciri.png", "triss.png", "yen.png", "iorweth.png"];


var cards = new Array();

for(i=0;i<12;i++)
{
    var x = Math.floor((Math.random() * cardss.length));
    cards.unshift(cardss[x]);
    cardss.splice(x, 1);
}

console.log(cards);

const clist = new Array(12);

for(let i=0; i<clist.length; i++)
{
    clist[i] = document.querySelector("#c"+i).addEventListener("click", function () { revealCard(i);}) ;
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft=6;

function revealCard(nr)
{
    var opacityValue = $('#c'+nr).css('opacity');

    if (opacityValue != 0 && visible_nr!=nr && lock==false)
    {
        lock = true;
        //console.log(nr);
        var obraz = "url(img/" + cards[nr] + ")";

        $('#c'+nr).css("background-image", obraz);
        $('#c'+nr).addClass("cardA");
        $('#c'+nr).removeClass("card");

        if (oneVisible == false)
        {
            //first card
            visible_nr=nr;
            oneVisible=true;
            lock = false;
        }
        else
        {
            //second card
            if (cards[nr]==cards[visible_nr])
            {
                setTimeout(function (){ hide2cards(nr, visible_nr)}, 750);
            }
            else
            {
                setTimeout(function (){ restore2cards(nr, visible_nr)}, 1000);
            }


            turnCounter++;
            $('.score').html('Turn counter: '+turnCounter);
            oneVisible=false;

        }
    }

}

function hide2cards(nr1, nr2)
{
    $('#c'+nr1).css("opacity", '0');
    $('#c'+nr2).css("opacity", '0');
    pairsLeft--;

    if(pairsLeft==0)
    {
        $('.board').html('<h1>You win!<br/>Done in '+turnCounter+' turns</h1>');
    }
    lock=false;
}
function restore2cards(nr1, nr2)
{
    $('#c'+nr1).css("background-image", 'url(img/karta.png)');
    $('#c'+nr1).addClass("card");
    $('#c'+nr1).removeClass("cardA");

    $('#c'+nr2).css("background-image", 'url(img/karta.png)');
    $('#c'+nr2).addClass("card");
    $('#c'+nr2).removeClass("cardA");

    lock=false;
}

