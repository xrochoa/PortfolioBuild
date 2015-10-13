$(function() {
    var windowVar = $(window);

    var collapsible = $("#collapsible");
    var scrollFade = $("#scrollFade");

    //name FX
    setTimeout(function() {

        $("#header-logo").css({
            'opacity': '1'
        });
        $(".lead").css({
            'opacity': '1'
        });


        $('.xaviro').each(function(i) {
            var letter = $(this);

            setTimeout(function() {

                letter.removeClass('transparent');
                console.log(i);
            }, 100 * i);
        });

        $('.com').each(function(i) {
            var letter = $(this);

            setTimeout(function() {

                letter.addClass('transparent');
                console.log(i);
            }, 100 * i);
        });


    }, 500);






    //navbar fixed   
    var nav = $('#navbar');
    var navParent = $('#navParent');
    var section = $('#portfolio');

    var navParentPosition, windowPosition,
        counter = "on";

    function changingValues() {
        navParentPosition = navParent.offset().top;
        windowPosition = windowVar.scrollTop();
        sectionPosition = section.offset().top;
    };


    windowVar.scroll(function() {


        collapsible.collapse('hide');

        changingValues();

        if (windowPosition >= navParentPosition && counter == "on") {

            nav.addClass('navbar-fixed-top');
            section.css("margin-top", sectionPosition - navParentPosition);
            scrollFade.fadeIn();

            counter = "off"

        } else if (windowPosition < navParentPosition && counter == "off") {

            nav.removeClass('navbar-fixed-top');
            section.css("margin-top", 0);
            scrollFade.fadeOut();

            counter = "on"

        }

    });
});