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
