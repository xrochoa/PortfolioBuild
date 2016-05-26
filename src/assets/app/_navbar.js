$(function() {
    var windowVar = $(window);
    var body = $('body');

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
            }, 100 * i);
        });

        $('.com').each(function(i) {
            var letter = $(this);

            setTimeout(function() {

                letter.addClass('transparent');
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

    $('[data-toggle="tooltip"]').tooltip();

    /*
    body.scrollspy({
        target: '#collapsible'
    });*/


    /*
      $('#contact-form input').on("input propertychange", function(e) {
          $(this).prev().toggleClass("redred", !!$(e.target).val());
      }).on("focus", "blueblue", function() {
          $(this).prev().addClass("blueblue");
      }).on("blur", "blueblue", function() {
          $(this).prev().removeClass("blueblue");
      });*/
    $('#contact-form input, #contact-form textarea').keypress(function() {
        $(this).attr("placeholder", "");
        $(this).prev().css('opacity', '1');
    });


    //ajax for contact form
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function generateCaptcha(x) {
        var captcha = [randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' ');
        $('#captcha-gen').html(captcha);
        if (x === 'x') {
            $('#form-captcha').attr("placeholder", captcha);
        }
    }

    generateCaptcha('x');

    $('#contact-form')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'The first name is required'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'The phone number is required'
                        },
                        regexp: {
                            message: 'The phone number can only contain the digits, spaces, -, (, ), + and .',
                            regexp: /^[0-9\s\-()+\.]+$/
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The email address is required'
                        },
                        emailAddress: {
                            message: 'The input is not a valid email address'
                        }
                    }
                },
                message: {
                    validators: {
                        notEmpty: {
                            message: 'The message is required'
                        },
                        stringLength: {
                            max: 700,
                            message: 'The message must be less than 700 characters long'
                        }
                    }
                },
                captcha: {
                    validators: {
                        callback: {
                            message: 'Wrong answer',
                            callback: function(value, validator, $field) {
                                var items = $('#captcha-gen').html().split(' '),
                                    sum = parseInt(items[0]) + parseInt(items[2]);
                                return value == sum;
                            }
                        }
                    }
                }
            }
        })
        .on('err.form.fv', function(e) {
            // Regenerate the captcha
            generateCaptcha();
        })
        .on('success.form.fv', function(e) {
            //e.isDefaultPrevented();
            e.preventDefault();

            var formData = $(e.target);

            $.ajax({
                url: "https://formspree.io/xareyesochoa@gmail.com",
                type: "POST",
                data: formData.serialize(),
                dataType: "json"
            }).done(function(response) {
                formData.formValidation('resetForm', true);
                generateCaptcha();


                $("#success").html('Message sent!');

            }).fail(function(jqXHR, textStatus, errorThrown) {
                $("#success").html('Sorry, there was a server error. Try again soon or use my email.');
            });

        });
});
