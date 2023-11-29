(function ($) {
    'use strict';
    $(window).on('load',function(){
        //==========preloder===========
        var preLoder = $(".preloader");
        preLoder.fadeOut(1000);
    });


    //==========fixed header & scroll to top button===========
    $(window).on('scroll', function(){
        if($(window).scrollTop() > 300) {
            $('.bottom-header').addClass('animated fadeInDown fixed-header');
            $('.scroll-to-top').fadeIn();
            $('.scroll-to-top button').addClass('active');
        } else {
            $('.bottom-header').removeClass('animated fadeInDown fixed-header');
            $('.scroll-to-top').fadeOut();
            $('.scroll-to-top button').removeClass('active');
        }
    });
    $(document).ready(function(){

        // ===========search option view on lg(large) monitor===========
        $(".nav-form").on('click', function(event) {
            $(".nav-form").addClass("active");
            event.stopPropagation();
        });
        $(document).on('click', function(event){
            if (!$(event.target).hasClass('active')) {
                $(".nav-form").removeClass("active");
            }
        });
        
        // ========== language selection menu for home page two ==========
        $('#demo').flagStrap({
            countries: {
                "SP": "Spanish",
                "BD": "Bengali",
                "US": "English"
            },
            buttonSize: "",
            buttonType: "",
            labelMargin: "10px",
            scrollable: false,
            scrollableHeight: "350px"
        });

        // ========== brand slider for home page one ===========
        $('.brand-slider').owlCarousel({
            loop: true,
            smartSpeed: 1000,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            dots: false,
            nav: true,
            navText: ['<i class="flaticon-left-arrow"></i>','<i class="flaticon-right-arrow"></i>'],
            responsive: {
                0: {
                    items: 3
                },
                480: {
                    items: 4
                },
                576: {
                    items: 4
                },
                768: {
                    items: 5
                },
                960: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        });

        // ========== odometer initialize==========
        $('.odometer').appear(function(e) {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });

        // ========== testimonial slider ===========
        $('.comment-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.client-slider',
        });
        $('.client-slider').slick({
            slidesToShow: 3,
            speed: 500,
            slidesToScroll: 1,
            asNavFor: '.comment-slider',
            centerMode: true,
            centerPadding : '20%',
            variableWidth: true,
            infinite: true,
            autoplay : true,
            arrows: false,
            cssEase: 'linear'
        });
        $('.carousel-prev').click(function(){ 
            $(this).parents('.testimonial').find('.client-slider.slick-slider').slick('slickPrev');
        } );
        $('.carousel-next').click(function(e){
            e.preventDefault(); 
            $(this).parents('.testimonial').find('.client-slider.slick-slider').slick('slickNext');
        });
        
        // ========== blog slider for home page one ===========
        $('.blog-slider').owlCarousel({
            loop: true,
            smartSpeed: 1000,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            dots: false,
            nav: true,
            navText: ['<i class="flaticon-left-arrow"></i>','<i class="flaticon-right-arrow"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                320: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 2
                }
            }
        });
        
        // ========== project slider for home page two ===========
        $('.project-slider').owlCarousel({
            loop: true,
            smartSpeed: 1000,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            dots: false,
            nav: true,
            navText: ['<i class="flaticon-left-arrow"></i>','<i class="flaticon-right-arrow"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                320: {
                    items: 1
                },
                480: {
                    items: 2
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 3.5
                },
                1200: {
                    items: 4
                }
            }
        });

        //========== video popup ===========
        $("#video, .video-btn").videoPopup();
        
        
        // ========== testimonial slider for testimonial page ===========
        $('.testimonial-slider').owlCarousel({
            loop: true,
            smartSpeed: 1000,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1
                },
                320: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 2
                }
            }
        });

        $('.testimonial-slider-2').owlCarousel({
            loop: true,
            smartSpeed: 1000,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1
                },
                320: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });




        // var testimonialSlider = $('.comment-slider-2');
        // testimonialSlider.owlCarousel({
        //     loop: true,
        //     margin: 30,
        //     nav: false,
        //     smartSpeed: 1000,
        //     autoplay: true,
        //     thumbs: true,
        //     thumbsPrerendered: true,
        //     dots: false,
        //     responsive: {
        //         0: {
        //             items: 1
        //         },
        //         320: {
        //             items: 1
        //         },
        //         576: {
        //             items: 1
        //         },
        //         768: {
        //             items: 1
        //         },
        //         992: {
        //             items: 1
        //         },
        //         1200: {
        //             items: 1
        //         },
        //         1920: {
        //             items: 1
        //         }
        //     }
        // });
        // $('.owl-next').on('click', function() {
        //     testimonialSlider.trigger('next.owl.carousel');
        // })
        // $('.owl-prev').on('click', function() {
        //     testimonialSlider.trigger('prev.owl.carousel', [300]);
        // })
        
        // ========== main image slider one project details page ===========
        // $('.project-details-slider').owlCarousel({
        //     items: 1,
        //     loop: true,
        //     smartSpeed: 1000,
        //     margin: 30,
        //     autoplay: true,
        //     autoplayTimeout: 5000,
        //     autoplayHoverPause: false,
        //     center: true,
        //     autoWidth:true,
        //     dots: false
        // });

        // ========== related project slider one project details page ===========
        // $('.rel-slider').owlCarousel({
        //     loop: true,
        //     smartSpeed: 1000,
        //     margin: 30,
        //     autoplay: true,
        //     autoplayTimeout: 5000,
        //     autoplayHoverPause: false,
        //     dots: false,
        //     nav: true,
        //     navText: ['<i class="icofont-double-left"></i>','<i class="icofont-double-right"></i>'],
        //     responsive: {
        //         0: {
        //             items: 1
        //         },
        //         480: {
        //             items: 1.5,
        //             center: true
        //         },
        //         576: {
        //             items: 2,
        //             center: true
        //         },
        //         768: {
        //             items: 3
        //         },
        //         960: {
        //             items: 3
        //         },
        //         1200: {
        //             items: 3
        //         }
        //     }
        // });
    });
}(jQuery));