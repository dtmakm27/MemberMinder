$(document).ready(function() {
    // Mobile menu trigger script
    $(".menu-trigger").click(function() {
        $(this).toggleClass('active');
        $(".mobile-menu").toggleClass('visible');
    });
    // Smoothscroll script
    $('.nav-link').click(function() {
        var dis = $(this),
            disTarget = dis.data('target'),
            ScrollTo = $(disTarget).offset().top;
        dis.addClass('active').siblings('.nav-link').removeClass('active');
        $('html,body').animate({ scrollTop: ScrollTo });
    });
    // change banner script
    /*var images = ['banner.jpg', 'climbing-wall-wooden.jpg'],
        index = 0,
        maxImages = images.length - 1;
    var timer = setInterval(function() {
        var currentImage = images[index];
        index = (index == maxImages) ? 0 : ++index;
        $('#HeroBanner').css('background',
            'url(/images/' + images[index] + ')no-repeat 0 0 / cover').fade();
    }, 3000);
*/
    //smooth scroll
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault()
        $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top,
            },
            500,
            'linear'
        )
    });
    // request demo click script
    $('#request_demo_button').on('click', function(e) {
        $('#user-msg-field').val("\nHi\nI am interested and would like to request a demo!");
    });

    $('.signup').on('click', function(e) {
        $('#user-msg-field').val("\nHi\nI am interested and would like to request a demo!");
    });

    // contact form script
    $('.form-wrap input').blur(function() {
        tmpval = $(this).val();
        if (tmpval == '') {
            $(this).addClass('empty');
            $(this).removeClass('not-empty');
        } else {
            $(this).addClass('not-empty');
            $(this).removeClass('empty');
        }
    });
    // slidein control
    $(window).scroll(function() {
        $(".slideanim").each(function() {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });

    // testimonial slider
    $('.testimonial-slider').bxSlider({
        auto: true,
        mode: 'fade',
        infiniteLoop: true,
        controls: false
    });
    // Changing the defaults
    window.sr = ScrollReveal();
    // Customizing a reveal set
    sr.reveal('.each-service', { origin: 'bottom', distance: '100px', duration: 1000, delay: 0, easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)' });
    // sript for fixed header on scroll
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 60) {
            $("#Header").addClass("header-fixed");
        } else {
            $("#Header").removeClass("header-fixed");
        }
    });
    //email logic
    // #sendMailForm takes the data from the form with given ID
    $('#sendEmail').submit(function(e) {
        var data = {
            'name': $('#full-name-field').val(),
            'email': $('#mail-field').val(),
            'company': $('#company-field').val(),
            'message': $('#user-msg-field').val()
        };
        // POST data to the php file
        $.ajax({
            url: '/php/mail.php',
            data: data,
            type: 'POST',
            success: function(data) {
                // For Notification
                document.getElementById("sendEmail").reset();
                var $alertDiv = $(".mailResponse");
                $alertDiv.show();
                $alertDiv.find('.alert').removeClass('alert-danger alert-success');
                $alertDiv.find('.mailResponseText').text("");
                if (data.error) {
                    $alertDiv.find('.alert').addClass('alert-danger');
                    $alertDiv.find('.mailResponseText').text(data.message);
                } else {
                    $alertDiv.find('.alert').addClass('alert-success');
                    $alertDiv.find('.mailResponseText').text(data.message);
                }
            }
        });
        e.preventDefault();
    });
});