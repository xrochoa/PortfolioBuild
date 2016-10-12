/*----------  INTRO ANIMATION  ----------*/

function animateLetters() {

    var $lead = $('.lead');
    var $video = $('#bg-video');

    TweenMax.to($lead, 1, { opacity: 1 });
    TweenMax.to($video, 3, { delay: 1, opacity: 0.2 });


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

}

function animateIntro() {

    //svg
    var $svgIntro = $('#svg-intro');

    //svg elements
    var $circle = $('#svg-intro-circle');
    var $computer = $('#svg-intro-computer');
    var $screen = $('#svg-intro-screen');
    var $code = $('#svg-intro-code');

    var tl = new TimelineMax({ delay: 0.5 });
    tl.fromTo($svgIntro, 1, { transformOrigin: '50% 50%', scale: 0.8 }, { opacity: 1, scale: 1, ease: Power4.easeOut, onComplete: animateIcons })
        .fromTo($circle, 1.2, { transformOrigin: '50% 50%', scale: 0.8 }, { opacity: 1, scale: 1, ease: Back.easeOut.config(4) }, '=-1')
        .fromTo($computer, 1, { y: '100%' }, { y: '0%', opacity: 1, ease: Power4.easeOut }, '=-0.5')
        .to($screen, 1, { opacity: 1, ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false }) }, '=-0.5')
        .to($code, 0.5, { opacity: 1, onComplete: loopUnderscore })


}

function loopUnderscore() {

    var $underscore = $('#svg-intro-underscore');
    TweenMax.fromTo($underscore, 0.5, { opacity: 1 }, { delay: 0.5, opacity: 0, repeatDelay: 0.5, repeat: -1, yoyo: true, ease: SteppedEase.config(1) })

}

function animateIcons() {

    //svg
    var $svgIntro = $('#svg-intro');

    //svg elements
    var $icons = $('.svg-intro-icon');
    var $icon1 = $('#svg-intro-icon1');
    var $icon2 = $('#svg-intro-icon2');
    var $icon3 = $('#svg-intro-icon3');
    var $icon4 = $('#svg-intro-icon4');
    var $icon5 = $('#svg-intro-icon5');
    var $icon6 = $('#svg-intro-icon6');
    var $shadow = $('#svg-intro-shadow');


    var tl = new TimelineMax();
    tl.fromTo($svgIntro, 2, { transformOrigin: '50% 50%', scale: 1 }, { scale: 1.1, ease: Sine.easeInOut })
        .to($svgIntro, 0.5, { scale: 1, ease: Bounce.easeOut, onComplete: animateLetters })
        .to($icon1, 2, { x: '200px', opacity: 0.5, ease: Power4.easeOut }, '=-0.3')
        .to($icon2, 1.5, { x: '100px', opacity: 0.7, ease: Power4.easeOut }, '=-2')
        .to($icon3, 1, { x: '50px', opacity: 0.9, ease: Power4.easeOut }, '=-2')
        .to($icon5, 2, { x: '-200px', opacity: 0.5, ease: Power4.easeOut }, '=-2')
        .to($icon6, 1.5, { x: '-100px', opacity: 0.7, ease: Power4.easeOut }, '=-2')
        .to($icon4, 1, { x: '-50px', opacity: 0.9, ease: Power4.easeOut }, '=-2')
        .to($shadow, 3, { opacity: 1 });

}

animateIntro();


/*----------  FIXED NAVBAR ON SCROLL  ----------*/

var windowVar = $(window);
var body = $('body');

var collapsible = $("#collapsible");
var scrollFade = $("#scrollFade");

//navbar fixed   
var nav = $('#navbar');
var navParent = $('#navParent');
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

/*----------  BOOTSTRAP TOOLTIP  ----------*/

$('[data-toggle="tooltip"]').tooltip();


/*----------  CONTACT FORM ERRORS AND SEND EMAIL  ----------*/


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
