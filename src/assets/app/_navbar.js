/*----------  FIXED NAVBAR ON SCROLL  ----------*/

var windowVar = $(window);
var body = $('body');

var collapsible = $("#collapsible");
var scrollFade = $("#scrollFade");

//navbar fixed   
var nav = $('#navbar');
var navParent = $('#nav-parent');
var section = $('#portfolio');

var navParentPosition, windowPosition, sectionPosition,
    counter = "on";

function changingValues() {
    navParentPosition = navParent.offset().top;
    windowPosition = windowVar.scrollTop();
    sectionPosition = section.offset().top;
}


windowVar.scroll(function() {


    collapsible.collapse('hide');

    changingValues();

    if (windowPosition >= navParentPosition && counter == "on") {

        nav.addClass('navbar-fixed-top');
        section.css("margin-top", sectionPosition - navParentPosition);
        scrollFade.fadeIn();

        counter = "off";

    } else if (windowPosition < navParentPosition && counter == "off") {

        nav.removeClass('navbar-fixed-top');
        section.css("margin-top", 0);
        scrollFade.fadeOut();

        counter = "on";

    }

});


/*----------  ANCHOR LINKS ANIMATION  ----------*/

var sections = ['portfolio', 'skillset', 'experience', 'contact'];

$.each(sections, function(i, val) {

    $('#btn-' + val).click(function(event) {
        event.preventDefault();
        TweenMax.to(window, 1, { scrollTo: { y: '#' + val, offsetY: 0 } });
    });

});

