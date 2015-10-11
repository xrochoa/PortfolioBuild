$(function() {
    //$('.reveal').fadeIn(1000);
    var windowVar = $(window);

    var collapsible = $("#collapsible");

    setTimeout(function() {

        $('.xaviro').each(function(i) {
            var row = $(this);

            setTimeout(function() {

                row.removeClass('transparent');
                console.log(i);
            }, 100 * i);
        });
    }, 500);

    //});

    windowVar.scroll(function() {


        collapsible.collapse('hide');
    });
});