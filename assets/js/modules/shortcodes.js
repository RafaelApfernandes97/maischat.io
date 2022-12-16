(function ($) {
    'use strict';

    var shortcodes = {};

    qodef.modules.shortcodes = shortcodes;

    shortcodes.qodefInitCounter = qodefInitCounter;
    shortcodes.qodefInitProgressBars = qodefInitProgressBars;
    shortcodes.qodefInitCountdown = qodefInitCountdown;
    shortcodes.qodefInitMessages = qodefInitMessages;
    shortcodes.qodefInitMessageHeight = qodefInitMessageHeight;
    shortcodes.qodefInitTestimonials = qodefInitTestimonials;
    shortcodes.qodefInitCarousels = qodefInitCarousels;
    shortcodes.qodefInitPieChart = qodefInitPieChart;
    shortcodes.qodefInitPieChartDoughnut = qodefInitPieChartDoughnut;
    shortcodes.qodefInitTabs = qodefInitTabs;
    shortcodes.qodefInitTabIcons = qodefInitTabIcons;
    shortcodes.qodefInitBlogListMasonry = qodefInitBlogListMasonry;
    shortcodes.qodefInitBlogSlider = qodefInitBlogSlider;
    shortcodes.qodefCustomFontResize = qodefCustomFontResize;
    shortcodes.qodefInitImageGallery = qodefInitImageGallery;
    shortcodes.qodefInitAccordions = qodefInitAccordions;
    shortcodes.qodefShowGoogleMap = qodefShowGoogleMap;
    shortcodes.qodefInitPortfolioListMasonry = qodefInitPortfolioListMasonry;
    shortcodes.qodefInitPortfolioListPinterest = qodefInitPortfolioListPinterest;
    shortcodes.qodefInitPortfolio = qodefInitPortfolio;
    shortcodes.qodefInitPortfolioMasonryFilter = qodefInitPortfolioMasonryFilter;
    shortcodes.qodefInitPortfolioSlider = qodefInitPortfolioSlider;
    shortcodes.qodefInitPortfolioLoadMore = qodefInitPortfolioLoadMore;
    shortcodes.qodefCheckSliderForHeaderStyle = qodefCheckSliderForHeaderStyle;
    shortcodes.qodefItemShowcase = qodefItemShowcase;
    shortcodes.qodefOnDocumentReady = qodefOnDocumentReady;
    shortcodes.qodefOnWindowLoad = qodefOnWindowLoad;
    shortcodes.qodefOnWindowResize = qodefOnWindowResize;
    shortcodes.qodefOnWindowScroll = qodefOnWindowScroll;
    shortcodes.qodefInitElementsHolderResponsiveStyle = qodefInitElementsHolderResponsiveStyle;
    shortcodes.qodefServiceTable = qodefServiceTable;

    $(document).ready(qodefOnDocumentReady);
    $(window).on('load',qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);
    $(window).scroll(qodefOnWindowScroll);

    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefInitCounter();
        qodefInitProgressBars();
        qodefInitCountdown();
        qodefIcon().init();
        qodefInitMessages();
        qodefInitMessageHeight();
        qodefInitTestimonials();
        qodefInitCarousels();
        qodefInitPieChart();
        qodefInitPieChartDoughnut();
        qodefInitTabs();
        qodefInitTabIcons();
        qodefButton().init();
        qodefInitBlogListMasonry();
        qodefInitBlogSlider();
        qodefCustomFontResize();
        qodefInitImageGallery();
        qodefItemShowcase();
        qodefInitAccordions();
        qodefShowGoogleMap();
        qodefInitPortfolioListMasonry();
        qodefInitPortfolioListPinterest();
        qodefInitPortfolio();
        qodefInitPortfolioMasonryFilter();
        qodefInitPortfolioSlider();
        qodefInitPortfolioLoadMore();
        qodefInitElementsHolderResponsiveStyle();
        qodefServiceTable();
        qodefSlider().init();
        qodefSocialIconWidget().init();
        qodefInitIconList().init();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function qodefOnWindowLoad() {

    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function qodefOnWindowResize() {
        qodefInitBlogListMasonry();
        qodefCustomFontResize();
        qodefInitPortfolioListMasonry();
        qodefInitPortfolioListPinterest();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function qodefOnWindowScroll() {

    }


    /**
     * Check if slide effect on header style changing
     */
    function qodefItemShowcase() {
        var itemShowcase = $('.qodef-item-showcase');
        if (itemShowcase.length) {
            itemShowcase.each(function () {
                var thisItemShowcase = $(this),
                    leftItems = thisItemShowcase.find('.qodef-item-left'),
                    rightItems = thisItemShowcase.find('.qodef-item-right'),
                    itemImage = thisItemShowcase.find('.qodef-item-image');

                //logic
                leftItems.wrapAll("<div class='qodef-item-showcase-holder qodef-holder-left' />");
                rightItems.wrapAll("<div class='qodef-item-showcase-holder qodef-holder-right' />");
                thisItemShowcase.animate({opacity: 1}, 200);
                setTimeout(function () {
                    thisItemShowcase.appear(function () {
                        itemImage.addClass('qodef-appeared');
                        thisItemShowcase.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                            function (e) {
                                if (qodef.windowWidth > 1200) {
                                    itemAppear('.qodef-holder-left .qodef-item');
                                    itemAppear('.qodef-holder-right .qodef-item');
                                } else {
                                    itemAppear('.qodef-item');
                                }
                            });
                    }, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
                }, 100);

                //appear animation trigger
                function itemAppear(itemCSSClass) {
                    thisItemShowcase.find(itemCSSClass).each(function (i) {
                        var thisListItem = $(this);
                        setTimeout(function () {
                            thisListItem.addClass('qodef-appeared');
                        }, i * 150);
                    });
                }
            });

        }
    }


    /**
     * Counter Shortcode
     */
    function qodefInitCounter() {

        var counters = $('.qodef-counter');


        if (counters.length) {
            counters.each(function () {
                var counter = $(this);
                counter.appear(function () {
                    counter.parent().addClass('qodef-counter-holder-show');

                    //Counter zero type
                    if (counter.hasClass('zero')) {
                        var max = parseFloat(counter.text());
                        counter.countTo({
                            from: 0,
                            to: max,
                            speed: 1500,
                            refreshInterval: 100
                        });
                    } else {
                        counter.absoluteCounter({
                            speed: 2000,
                            fadeInDelay: 1000
                        });
                    }

                }, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
            });
        }

    }

    /*
     **	Custom Font resizing
     */
    function qodefCustomFontResize() {
        var customFont = $('.qodef-custom-font-holder');
        if (customFont.length) {
            customFont.each(function () {
                var thisCustomFont = $(this);
                var fontSize;
                var lineHeight;
                var coef1 = 1;
                var coef2 = 1;
                var coef3 = 1;

                if (qodef.windowWidth < 1500) {
                    coef3 = 0.7;
                }

                if (qodef.windowWidth < 1300) {
                    coef1 = 0.8;
                    coef3 = 0.7;
                    coef2 = 0.9;
                }

                if (qodef.windowWidth < 1024) {
                    coef1 = 0.7;
                    coef3 = 0.6;
                    coef2 = 0.8;
                }

                if (qodef.windowWidth < 768) {
                    coef1 = 0.6;
                    coef2 = 0.7;
                    coef3 = 0.5;
                }

                if (qodef.windowWidth < 600) {
                    coef1 = 0.5;
                    coef2 = 0.6;
                    coef3 = 0.4;
                }

                if (qodef.windowWidth < 480) {
                    coef1 = 0.4;
                    coef2 = 0.5;
                    coef3 = 0.3;
                }

                if (typeof thisCustomFont.data('font-size') !== 'undefined' && thisCustomFont.data('font-size') !== false) {
                    fontSize = parseInt(thisCustomFont.data('font-size'));

                    if (fontSize > 100) {
                        fontSize = Math.round(fontSize * coef3);
                    } else if (fontSize > 70) {
                        fontSize = Math.round(fontSize * coef1);
                    } else if (fontSize > 35) {
                        fontSize = Math.round(fontSize * coef2);

                    }

                    thisCustomFont.css('font-size', fontSize + 'px');
                }

                if (typeof thisCustomFont.data('line-height') !== 'undefined' && thisCustomFont.data('line-height') !== false) {
                    lineHeight = parseInt(thisCustomFont.data('line-height'));
                    //Check if font size is set
                    if (typeof thisCustomFont.data('font-size') !== 'undefined' && thisCustomFont.data('font-size') !== false) {
                        fontSize = parseInt(thisCustomFont.data('font-size'));
                    } else {
                        fontSize = 0;
                    }

                    if (fontSize !== 0 && fontSize === lineHeight) {
                        if (fontSize > 100) {
                            lineHeight = Math.round(fontSize * coef3) + 'px';
                        } else if (fontSize > 70) {
                            lineHeight = Math.round(fontSize * coef1) + 'px';
                        } else if (fontSize > 35) {
                            lineHeight = Math.round(fontSize * coef2) + 'px';

                        }
                    } else if (lineHeight > 70 && qodef.windowWidth < 1200) {
                        lineHeight = '1.2em';
                    } else if (lineHeight > 35 && qodef.windowWidth < 768) {
                        lineHeight = '1.2em';
                    } else {
                        lineHeight += 'px';
                    }
                    thisCustomFont.css('line-height', lineHeight);
                }
            });
        }
    }

    /*
    **	Horizontal progress bars shortcode
    */
    function qodefInitProgressBars() {

        var progressBar = $('.qodef-progress-bar');

        if (progressBar.length) {

            progressBar.each(function () {

                var thisBar = $(this);

                thisBar.appear(function () {
                    qodefInitToCounterProgressBar(thisBar);
                    var percentage = thisBar.find('.qodef-progress-content').data('percentage'),
                        progressContent = thisBar.find('.qodef-progress-content');

                    progressContent.css('width', '0%');
                    progressContent.animate({'width': percentage + '%'}, 1500);

                });
            });
        }
    }

    /*
    **	Counter for horizontal progress bars percent from zero to defined percent
    */
    function qodefInitToCounterProgressBar(progressBar) {
        var percentage = parseFloat(progressBar.find('.qodef-progress-content').data('percentage'));
        var percent = progressBar.find('.qodef-progress-number .qodef-percent');
        if (percent.length) {
            percent.each(function () {
                var thisPercent = $(this);
                thisPercent.parents('.qodef-progress-number-wrapper').css('opacity', '1');
                thisPercent.countTo({
                    from: 0,
                    to: percentage,
                    speed: 1500,
                    refreshInterval: 50
                });
            });
        }
    }

    /*
    **	Function to close message shortcode
    */
    function qodefInitMessages() {
        var message = $('.qodef-message');
        if (message.length) {
            message.each(function () {
                var thisMessage = $(this);
                thisMessage.find('.qodef-close').on('click', function (e) {
                    e.preventDefault();
                    $(this).parent().parent().fadeOut(500);
                });
            });
        }
    }

    /*
    **	Init message height
    */
    function qodefInitMessageHeight() {
        var message = $('.qodef-message.qodef-with-icon');
        if (message.length) {
            message.each(function () {
                var thisMessage = $(this);
                var textHolderHeight = thisMessage.find('.qodef-message-text-holder').height();
                var iconHolderHeight = thisMessage.find('.qodef-message-icon-holder').height();

                if (textHolderHeight > iconHolderHeight) {
                    thisMessage.find('.qodef-message-icon-holder').height(textHolderHeight);
                } else {
                    thisMessage.find('.qodef-message-text-holder').height(iconHolderHeight);
                }
            });
        }
    }

    /**
     * Countdown Shortcode
     */
    function qodefInitCountdown() {

        var countdowns = $('.qodef-countdown'),
            year,
            month,
            day,
            hour,
            minute,
            timezone,
            monthLabel,
            dayLabel,
            hourLabel,
            minuteLabel,
            secondLabel;

        if (countdowns.length) {

            countdowns.each(function () {

                //Find countdown elements by id-s
                var countdownId = $(this).attr('id'),
                    countdown = $('#' + countdownId),
                    digitFontSize,
                    labelFontSize;

                //Get data for countdown
                year = countdown.data('year');
                month = countdown.data('month');
                day = countdown.data('day');
                hour = countdown.data('hour');
                minute = countdown.data('minute');
                timezone = countdown.data('timezone');
                monthLabel = countdown.data('month-label');
                dayLabel = countdown.data('day-label');
                hourLabel = countdown.data('hour-label');
                minuteLabel = countdown.data('minute-label');
                secondLabel = countdown.data('second-label');
                digitFontSize = countdown.data('digit-size');
                labelFontSize = countdown.data('label-size');


                //Initialize countdown
                countdown.countdown({
                    until: new Date(year, month - 1, day, hour, minute, 44),
                    labels: ['Years', monthLabel, 'Weeks', dayLabel, hourLabel, minuteLabel, secondLabel],
                    format: 'ODHMS',
                    timezone: timezone,
                    padZeroes: true,
                    onTick: setCountdownStyle
                });

                function setCountdownStyle() {
                    countdown.find('.countdown-amount').css({
                        'font-size': digitFontSize + 'px',
                        'line-height': digitFontSize + 'px'
                    });
                    countdown.find('.countdown-period').css({
                        'font-size': labelFontSize + 'px'
                    });
                }

            });

        }

    }

    /**
     * Object that represents icon shortcode
     * @returns {{init: Function}} function that initializes icon's functionality
     */
    var qodefIcon = qodef.modules.shortcodes.qodefIcon = function () {
        //get all icons on page
        var icons = $('.qodef-icon-shortcode');

        /**
         * Function that triggers icon animation and icon animation delay
         */
        var iconAnimation = function (icon) {
            if (icon.hasClass('qodef-icon-animation')) {
                icon.appear(function () {
                    icon.parent('.qodef-icon-animation-holder').addClass('qodef-icon-animation-show');
                }, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
            }
        };

        /**
         * Function that triggers icon hover color functionality
         */
        var iconHoverColor = function (icon) {
            if (typeof icon.data('hover-color') !== 'undefined') {
                var changeIconColor = function (event) {
                    event.data.icon.css('color', event.data.color);
                };

                var iconElement = icon.find('.qodef-icon-element');
                var hoverColor = icon.data('hover-color');
                var originalColor = iconElement.css('color');

                if (icon.hasClass('qodef-flip')) {
                    icon.find('.icon-flip .qodef-icon-element').css('color', hoverColor);
                } else {
                    icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
                    icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
                }
            }
        };

        /**
         * Function that triggers icon holder background color hover functionality
         */
        var iconHolderBackgroundHover = function (icon) {
            if (typeof icon.data('hover-background-color') !== 'undefined') {
                var changeIconBgColor = function (event) {
                    event.data.icon.css('background-color', event.data.color);
                };

                var hoverBackgroundColor = icon.data('hover-background-color');
                var originalBackgroundColor = icon.css('background-color');

                if (hoverBackgroundColor !== '') {
                    icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
                    icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
                }
            }
        };

        /**
         * Function that initializes icon holder border hover functionality
         */
        var iconHolderBorderHover = function (icon) {
            if (typeof icon.data('hover-border-color') !== 'undefined') {
                var changeIconBorder = function (event) {
                    event.data.icon.css('border-color', event.data.color);
                };

                var hoverBorderColor = icon.data('hover-border-color');
                var originalBorderColor = icon.css('border-color');

                if (hoverBorderColor !== '') {
                    icon.on('mouseenter', {icon: icon, color: hoverBorderColor}, changeIconBorder);
                    icon.on('mouseleave', {icon: icon, color: originalBorderColor}, changeIconBorder);
                }
            }
        };

        return {
            init: function () {
                if (icons.length) {
                    icons.each(function () {
                        iconAnimation($(this));
                        iconHoverColor($(this));
                        iconHolderBackgroundHover($(this));
                        iconHolderBorderHover($(this));
                    });

                }
            }
        };
    };

    /**
     * Object that represents social icon widget
     * @returns {{init: Function}} function that initializes icon's functionality
     */
    var qodefSocialIconWidget = qodef.modules.shortcodes.qodefSocialIconWidget = function () {
        //get all social icons on page
        var icons = $('.qodef-social-icon-widget-holder');

        /**
         * Function that triggers icon hover color functionality
         */
        var socialIconHoverColor = function (icon) {
            if (typeof icon.data('hover-color') !== 'undefined') {
                var changeIconColor = function (event) {
                    event.data.icon.css('color', event.data.color);
                };

                var iconElement = icon;
                var hoverColor = icon.data('hover-color');
                var originalColor = iconElement.css('color');

                if (hoverColor !== '') {
                    icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
                    icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
                }
            }
        };

        return {
            init: function () {
                if (icons.length) {
                    icons.each(function () {
                        socialIconHoverColor($(this));
                    });

                }
            }
        };
    };

    /**
     * Init testimonials shortcode
     */
    function qodefInitTestimonials() {

        var testimonial = $('.qodef-testimonials');
        if (testimonial.length) {
            testimonial.each(function () {

                var thisTestimonial = $(this);

                thisTestimonial.appear(function () {
                    thisTestimonial.css('visibility', 'visible');
                }, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});

                var controlNav = true;
                var directionNav = false;
                var autoplay = true;
                var interval = 0;
                var type = '';
                if (typeof thisTestimonial.data('autoplay-timeout') !== 'undefined' && thisTestimonial.data('autoplay-timeout') !== false) {
                    interval = thisTestimonial.data('autoplay-timeout') * 1000;
                    if (interval === 0) {
                        autoplay = false;
                    }
                }
                if (typeof thisTestimonial.data('type') !== 'undefined' && thisTestimonial.data('type') !== '') {
                    type = thisTestimonial.data('type');
                }
                //var iconClasses = getIconClassesForNavigation(directionNavArrowsTestimonials); TODO

                if (type === 'standard') {
                    thisTestimonial.owlCarousel({
                        items: 1,
                        loop: true,
                        autoplay: autoplay,
                        autoplayTimeout: interval,
                        mouseDrag: false,
                        dots: controlNav,
                        nav: directionNav,
                        navText: [
                            '<span class="qodef-prev-icon"><i class="arrow_carrot-left"></i></span>',
                            '<span class="qodef-next-icon"><i class="arrow_carrot-right"></i></span>'
                        ]
                    });
                } else if (type === 'background-image') {

                    thisTestimonial.waitForImages(function () {
                        var fadeSlides = function () {
                            var slides = thisTestimonial.find('.owl-item');

                            slides.removeClass('qodef-slide-fade-in qodef-slide-fade-out');
                            slides.each(function () {
                                var currentSlide = $(this),
                                    sliderWindowOffsetLeft = thisTestimonial.find('.owl-stage-outer').offset().left,
                                    sliderWindowWidth = thisTestimonial.find('.owl-stage-outer').outerWidth(),
                                    currentSlideOffsetLeft = currentSlide.offset().left,
                                    currentSlideWidth = currentSlide.outerWidth();

                                if (currentSlideOffsetLeft >= sliderWindowOffsetLeft && currentSlideOffsetLeft + currentSlideWidth <= sliderWindowOffsetLeft + sliderWindowWidth) {
                                    currentSlide.removeClass('qodef-slide-fade-in').addClass('qodef-slide-fade-out'); //fade out currently active slide
                                    currentSlide.next().removeClass('qodef-slide-fade-out').addClass('qodef-slide-fade-in'); //fade in only first siblings - that might come into active state
                                    currentSlide.prev().removeClass('qodef-slide-fade-out').addClass('qodef-slide-fade-in'); //fade in only first siblings - that might come into active state
                                }
                            });
                        };

                        thisTestimonial.owlCarousel({
                            items: 1,
                            loop: true,
                            autoplay: false,
                            mouseDrag: false,
                            dots: false,
                            smartSpeed: 600,
                            nav: true,
                            onTranslate: function () {
                                setTimeout(function () {
                                    var backgroundElements = thisTestimonial.closest('.qodef-testimonials-holder').find('.qodef-tes-background-image > div'),
                                        currentSlideID = thisTestimonial.find('.active .qodef-testimonial-content').attr('id').replace('qodef-testimonials', '');

                                    backgroundElements.each(function () {
                                        var backgroundElement = $(this),
                                            backgroundElementID = backgroundElement.attr('id').replace('qodef-background-', '');

                                        if (backgroundElementID === currentSlideID) {
                                            backgroundElement.addClass('qodef-show-background');
                                        } else {
                                            backgroundElement.removeClass('qodef-show-background');
                                        }
                                    });
                                }, 30); //wait for transition to start
                            },
                            onInitialized: function () {
                                var backgroundImageURL,
                                    slideID,
                                    backgroundImageHolder = thisTestimonial.closest('.qodef-testimonials-holder').find('.qodef-tes-background-image'),
                                    slides = thisTestimonial.find('.qodef-testimonial-content');

                                if (slides.length) {
                                    slides.each(function () {
                                        var slide = $(this);

                                        backgroundImageURL = slide.data('image');
                                        slideID = slide.attr('id').replace('qodef-testimonials', '');

                                        if (backgroundImageURL !== '' && !backgroundImageHolder.find('#qodef-background-' + slideID + '').length) {
                                            backgroundImageHolder.append('<div id="qodef-background-' + slideID + '"></div>');
                                            $('#qodef-background-' + slideID + '').css('background-image', 'url("' + backgroundImageURL + '")');
                                        }
                                    });

                                    backgroundImageHolder.find('> div:last-child').addClass('qodef-show-background');
                                }

                            },
                            onChange: function () {
                                fadeSlides();
                            },
                            navText: [
                                '<span class="qodef-prev-icon"><i class="fa fa-angle-left"></i></span>',
                                '<span class="qodef-next-icon"><i class="fa fa-angle-right"></i></span>'
                            ]
                        });
                    });

                } else if (type === 'cards') {
                    thisTestimonial.owlCarousel({
                        items: 3,
                        responsive: {
                            // breakpoint from 0 up
                            0: {
                                items: 1
                            },
                            // breakpoint from 600 up
                            600: {
                                items: 2
                            },
                            // breakpoint from 1025 up
                            1025: {
                                items: 3
                            }
                        },
                        margin: 32,
                        loop: true,
                        autoplay: autoplay,
                        autoplayTimeout: interval,
                        mouseDrag: false,
                        dots: controlNav,
                        nav: directionNav,
                        navText: [
                            '<span class="qodef-prev-icon"><i class="arrow_carrot-left"></i></span>',
                            '<span class="qodef-next-icon"><i class="arrow_carrot-right"></i></span>'
                        ]
                    });
                }
            });

            qodef.modules.common.qodefInitParallax();
        }

    }

    /**
     * Init Carousel shortcode
     */
    function qodefInitCarousels() {

        var carouselHolders = $('.qodef-carousel-holder'),
            carousel,
            numberOfItems,
            navigation,
            autoplay = false,
            autoplayTimeout = 0;

        if (carouselHolders.length) {
            carouselHolders.each(function () {
                carousel = $(this).children('.qodef-carousel');
                numberOfItems = carousel.data('items');
                navigation = (carousel.data('navigation') === 'yes') ? true : false;
                var autoplayValue = carousel.data('autoplay');
                if (autoplayValue > 0) {
                    autoplay = true;
                    autoplayTimeout = autoplayValue * 1000;
                }

                //Responsive breakpoints

                carousel.owlCarousel({
                    items: numberOfItems,
                    responsive: {
                        // breakpoint from 0 up
                        0: {
                            items: 1
                        },
                        // breakpoint from 480 up
                        480: {
                            items: 2
                        },
                        // breakpoint from 768 up
                        768: {
                            items: 3
                        },
                        // breakpoint from 1024 up
                        1024: {
                            items: numberOfItems
                        }
                    },
                    loop: true,
                    autoplay: autoplay,
                    dots: false,
                    nav: navigation,
                    navText: [
                        '<span class="qodef-prev-icon"><i class="arrow_carrot-left"></i></span>',
                        '<span class="qodef-next-icon"><i class="arrow_carrot-right"></i></span>'
                    ]
                });

            });
        }

    }

    /**
     * Init Pie Chart and Pie Chart With Icon shortcode
     */
    function qodefInitPieChart() {

        var pieCharts = $('.qodef-pie-chart-holder, .qodef-pie-chart-with-icon-holder');

        if (pieCharts.length) {

            pieCharts.each(function () {

                var pieChart = $(this),
                    percentageHolder = pieChart.children('.qodef-percentage, .qodef-percentage-with-icon'),
                    barColor = '#0ac775',
                    trackColor = '#e6e9ee',
                    lineWidth = 8,
                    size = 200;

                if (typeof percentageHolder.data('bar-color') !== 'undefined' && percentageHolder.data('bar-color') !== '') {
                    barColor = percentageHolder.data('bar-color');
                }

                if (typeof percentageHolder.data('track-color') !== 'undefined' && percentageHolder.data('track-color') !== '') {
                    trackColor = percentageHolder.data('track-color');
                }

                if (typeof percentageHolder.data('size') !== 'undefined' && percentageHolder.data('size') !== '') {
                    size = percentageHolder.data('size');
                }

                percentageHolder.appear(function () {
                    initToCounterPieChart(pieChart);
                    percentageHolder.css('opacity', '1');

                    percentageHolder.easyPieChart({
                        barColor: barColor,
                        trackColor: trackColor,
                        scaleColor: false,
                        lineCap: 'butt',
                        lineWidth: lineWidth,
                        animate: 1500,
                        size: size
                    });
                }, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});

            });

        }

    }

    /*
     **	Counter for pie chart number from zero to defined number
     */
    function initToCounterPieChart(pieChart) {

        pieChart.css('opacity', '1');
        var counter = pieChart.find('.qodef-to-counter'),
            max = parseFloat(counter.text());
        counter.countTo({
            from: 0,
            to: max,
            speed: 1500,
            refreshInterval: 50
        });

    }

    /**
     * Init Pie Chart shortcode
     */
    function qodefInitPieChartDoughnut() {

        var pieCharts = $('.qodef-pie-chart-doughnut-holder, .qodef-pie-chart-pie-holder');

        pieCharts.each(function () {

            var pieChart = $(this),
                canvas = pieChart.find('canvas'),
                chartID = canvas.attr('id'),
                chart = document.getElementById(chartID).getContext('2d'),
                data = [],
                jqChart = $(chart.canvas); //Convert canvas to JQuery object and get data parameters

            for (var i = 1; i <= 10; i++) {

                var chartItem,
                    value = jqChart.data('value-' + i),
                    color = jqChart.data('color-' + i);

                if (typeof value !== 'undefined' && typeof color !== 'undefined') {
                    chartItem = {
                        value: value,
                        color: color
                    };
                    data.push(chartItem);
                }

            }

            if (canvas.hasClass('qodef-pie')) {
                new Chart(chart).Pie(data,
                    {segmentStrokeColor: 'transparent'}
                );
            } else {
                new Chart(chart).Doughnut(data,
                    {segmentStrokeColor: 'transparent'}
                );
            }

        });

    }

    /*
    **	Init tabs shortcode
    */
    function qodefInitTabs() {

        var tabs = $('.qodef-tabs');
        if (tabs.length) {
            tabs.each(function () {
                var thisTabs = $(this);

                thisTabs.children('.qodef-tab-container').each(function (index) {
                    index = index + 1;
                    var that = $(this),
                        link = that.attr('id'),
                        navItem = that.parent().find('.qodef-tabs-nav li:nth-child(' + index + ') a'),
                        navLink = navItem.attr('href');

                    link = '#' + link;

                    if (link.indexOf(navLink) > -1) {
                        navItem.attr('href', link);
                    }
                });

                if (thisTabs.hasClass('qodef-horizontal-tab')) {
                    thisTabs.tabs();
                } else if (thisTabs.hasClass('qodef-vertical-tab')) {
                    thisTabs.tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
                    thisTabs.find('.qodef-tabs-nav > ul >li').removeClass('ui-corner-top').addClass('ui-corner-left');
                }

                //animate tab content
                var tabContent = thisTabs.find('.qodef-tab-container');

                thisTabs.appear(function () {
                    showTabContent(tabContent);
                });

                thisTabs.find('li').each(function () {
                    var singleTab = $(this);
                    singleTab.on('click', function () {
                        setTimeout(function () {
                            showTabContent(tabContent);
                        }, 50);
                    });
                });

                function showTabContent(tabContent) {
                    tabContent.each(function () {
                        var thisTabContent = $(this);
                        if (thisTabContent.is(':visible')) {
                            thisTabContent.addClass('qodef-visible');
                        } else {
                            thisTabContent.removeClass('qodef-visible');
                        }
                    });
                }
            });
        }
    }

    /*
    **	Generate icons in tabs navigation
    */
    function qodefInitTabIcons() {

        var tabContent = $('.qodef-tab-container');
        if (tabContent.length) {

            tabContent.each(function () {
                var thisTabContent = $(this);

                var id = thisTabContent.attr('id');
                var icon = '';
                if (typeof thisTabContent.data('icon-html') !== 'undefined' || thisTabContent.data('icon-html') !== 'false') {
                    icon = thisTabContent.data('icon-html');
                }

                var tabNav = thisTabContent.parents('.qodef-tabs').find('.qodef-tabs-nav > li > a[href="#' + id + '"]');

                if (typeof (tabNav) !== 'undefined') {
                    tabNav.children('.qodef-icon-frame').append(icon);
                }
            });
        }
    }

    /**
     * Button object that initializes whole button functionality
     * @type {Function}
     */
    var qodefButton = qodef.modules.shortcodes.qodefButton = function () {
        //all buttons on the page
        var buttons = $('.qodef-btn');

        /**
         * Initializes button hover color
         * @param button current button
         */
        var buttonHoverColor = function (button) {
            if (typeof button.data('hover-color') !== 'undefined') {
                var changeButtonColor = function (event) {
                    event.data.button.css('color', event.data.color);
                };

                var originalColor = button.css('color');
                var hoverColor = button.data('hover-color');

                button.on('mouseenter', {button: button, color: hoverColor}, changeButtonColor);
                button.on('mouseleave', {button: button, color: originalColor}, changeButtonColor);
            }
        };


        /**
         * Initializes button hover background color
         * @param button current button
         */
        var buttonHoverBgColor = function (button) {
            if (typeof button.data('hover-bg-color') !== 'undefined') {
                var changeButtonBg = function (event) {
                    event.data.button.css('background-color', event.data.color);
                };

                var originalBgColor = button.css('background-color');
                var hoverBgColor = button.data('hover-bg-color');

                if (!button.is('.qodef-btn-sweep')) {
                    button.on('mouseenter', {button: button, color: hoverBgColor}, changeButtonBg);
                    button.on('mouseleave', {button: button, color: originalBgColor}, changeButtonBg);
                } else {
                    button.find('.qodef-hover-background').css('background-color', hoverBgColor);
                }
            }
        };

        /**
         * Initializes button border color
         * @param button
         */
        var buttonHoverBorderColor = function (button) {
            if (typeof button.data('hover-border-color') !== 'undefined') {
                var changeBorderColor = function (event) {
                    event.data.button.css('border-color', event.data.color);
                };

                var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
                var hoverBorderColor = button.data('hover-border-color');

                if (!button.is('.qodef-btn-sweep')) {
                    button.on('mouseenter', {button: button, color: hoverBorderColor}, changeBorderColor);
                    button.on('mouseleave', {button: button, color: originalBorderColor}, changeBorderColor);
                } else {
                    button.find('.qodef-hover-background').css('border-color', hoverBorderColor);
                }
            }
        };

        var buttonHoverAnimationParams = function (button) {
            if (button.find('.qodef-hover-background').length) {
                if ((button.css('borderTopRightRadius') !== '')) { //borderTopRightRadius due to Mozilla not getting it
                    var borderRadius = button.css('borderTopRightRadius');

                    if (button.hasClass('qodef-btn-sweep')) {
                        button.find('.qodef-hover-background-holder').css('border-radius', borderRadius);
                    }
                }

                if ((button.css('border-left-width') !== '')) {
                    var borderWidth = parseInt(button.css('border-left-width')); //moz
                    if (button.hasClass('qodef-btn-sweep')) {
                        button.find('.qodef-hover-background-holder').css('top', -borderWidth);
                        button.find('.qodef-hover-background-holder').css('left', -borderWidth);
                        button.find('.qodef-hover-background-holder').css('height', 'calc(100% + ' + 2 * borderWidth + 'px)');
                        button.find('.qodef-hover-background-holder').css('width', 'calc(100% + ' + 2 * borderWidth + 'px)');
                        button.find('.qodef-hover-background').css('border-width', borderWidth);
                        button.find('.qodef-hover-background').css('height', 'calc(100% - ' + 2 * borderWidth + 'px)');
                        button.find('.qodef-hover-background').css('width', 'calc(100% - ' + 2 * borderWidth + 'px)');
                    }
                }
            }


        };

        return {
            init: function () {
                if (buttons.length) {
                    buttons.each(function () {
                        buttonHoverColor($(this));
                        buttonHoverBgColor($(this));
                        buttonHoverBorderColor($(this));
                        buttonHoverAnimationParams($(this));
                    });
                }
            }
        };
    };

    /*
    **	Init blog list masonry type
    */
    function qodefInitBlogListMasonry() {
        var blogList = $('.qodef-blog-list-holder.qodef-masonry .qodef-blog-list');
        if (blogList.length) {
            blogList.each(function () {
                var thisBlogList = $(this);
                blogList.waitForImages(function () {
                    thisBlogList.isotope({
                        layoutMode: 'packery',
                        itemSelector: '.qodef-blog-list-masonry-item',
                        packery: {
                            columnWidth: '.qodef-blog-list-masonry-grid-sizer',
                            gutter: '.qodef-blog-list-masonry-grid-gutter'
                        }
                    });
                    thisBlogList.addClass('qodef-appeared');
                });
            });

        }
    }

    /*
     **	Init blog slider
     */
    function qodefInitBlogSlider() {

        var blogSlider = $('.qodef-blog-slider-holder .qodef-blog-slider');

        blogSlider.owlCarousel({
            responsive: {
                0: {
                    loop: true,
                    items: 1,
                    center: false,
                    margin: 0,
                    dots: true,
                    nav: false
                },
                1025: {
                    loop: true,
                    items: 2,
                    startPosition: 1,
                    center: true,
                    margin: 15,
                    dots: true,
                    nav: true,
                    navText: [
                        '<span class="qodef-prev-icon"><span class="arrow arrow_carrot-left"></span></span>',
                        '<span class="qodef-next-icon"><span class="arrow arrow_carrot-right"></span></span>'
                    ]
                }
            }
        });

    }


    /*
     **	Show Google Map
     */
    function qodefShowGoogleMap() {

        if ($('.qodef-google-map').length) {
            $('.qodef-google-map').each(function () {

                var element = $(this);

                var customMapStyle;
                if (typeof element.data('custom-map-style') !== 'undefined') {
                    customMapStyle = element.data('custom-map-style');
                }

                var colorOverlay;
                if (typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
                    colorOverlay = element.data('color-overlay');
                }

                var saturation;
                if (typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
                    saturation = element.data('saturation');
                }

                var lightness;
                if (typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
                    lightness = element.data('lightness');
                }

                var zoom;
                if (typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
                    zoom = element.data('zoom');
                }

                var pin;
                if (typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
                    pin = element.data('pin');
                }

                var mapHeight;
                if (typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
                    mapHeight = element.data('height');
                }

                var uniqueId;
                if (typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
                    uniqueId = element.data('unique-id');
                }

                var scrollWheel;
                if (typeof element.data('scroll-wheel') !== 'undefined') {
                    scrollWheel = element.data('scroll-wheel');
                }
                var addresses;
                if (typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
                    addresses = element.data('addresses');
                }

                var map = "map_" + uniqueId;
                var geocoder = "geocoder_" + uniqueId;
                var holderId = "qodef-map-" + uniqueId;

                qodefInitializeGoogleMap(customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin, map, geocoder, addresses);
            });
        }

    }

    /*
     **	Init Google Map
     */
    function qodefInitializeGoogleMap(customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin, map, geocoder, data) {

        if( typeof google !== 'object'){
            return;
        }

        var mapStyles = [
            {
                stylers: [
                    {hue: color},
                    {saturation: saturation},
                    {lightness: lightness},
                    {gamma: 1}
                ]
            }
        ];

        var googleMapStyleId;

        if (customMapStyle) {
            googleMapStyleId = 'qodef-style';
        } else {
            googleMapStyleId = google.maps.MapTypeId.ROADMAP;
        }

        var qoogleMapType = new google.maps.StyledMapType(mapStyles,
            {name: "Qode Google Map"});

        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);

        if (!isNaN(height)) {
            height = height + 'px';
        }

        var myOptions = {

            zoom: zoom,
            scrollwheel: wheel,
            center: latlng,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: false,
            scaleControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            panControl: false,
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControl: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'qodef-style'],
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeId: googleMapStyleId
        };

        map = new google.maps.Map(document.getElementById(holderId), myOptions);
        map.mapTypes.set('qodef-style', qoogleMapType);

        var index;

        for (index = 0; index < data.length; ++index) {
            qodefInitializeGoogleAddress(data[index], pin, map, geocoder);
        }

        var holderElement = document.getElementById(holderId);
        holderElement.style.height = height;
    }

    /*
     **	Init Google Map Addresses
     */
    function qodefInitializeGoogleAddress(data, pin, map, geocoder) {
        if (data === '')
            return;
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<div id="bodyContent">' +
            '<p>' + data + '</p>' +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        geocoder.geocode({'address': data}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: pin,
                    title: data['store_title']
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });

                google.maps.event.addDomListener(window, 'resize', function () {
                    map.setCenter(results[0].geometry.location);
                });

            }
        });
    }

    function qodefInitAccordions() {
        var accordion = $('.qodef-accordion-holder');
        if (accordion.length) {
            accordion.each(function () {

                var thisAccordion = $(this);

                if (thisAccordion.hasClass('qodef-accordion')) {

                    thisAccordion.accordion({
                        animate: {
                            duration: 200
                        },
                        collapsible: true,
                        active: 0,
                        icons: "",
                        heightStyle: "content"
                    });
                }

                if (thisAccordion.hasClass('qodef-toggle')) {

                    var toggleAccordion = $(this);
                    var toggleAccordionTitle = toggleAccordion.find('.qodef-title-holder');
                    var toggleAccordionContent = toggleAccordionTitle.next();

                    toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
                    toggleAccordionTitle.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom");
                    toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

                    toggleAccordionTitle.each(function () {
                        var thisTitle = $(this);
                        thisTitle.on('mouseenter mouseleave', function () {
                            thisTitle.toggleClass("ui-state-hover");
                        });

                        thisTitle.on('click', function () {
                            thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
                            thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
                        });
                    });
                }
            });
        }
    }

    function qodefInitImageGallery() {

        var galleries = $('.qodef-image-gallery');

        if (galleries.length) {
            galleries.each(function () {
                var gallery = $(this).children('.qodef-image-gallery-slider'),
                    autoplay = gallery.data('autoplay') !== 0,
                    autoplayTimeout = gallery.data('autoplay') * 1000,
                    navigation = (gallery.data('navigation') === 'yes'),
                    pagination = (gallery.data('pagination') === 'yes');

                gallery.owlCarousel({
                    items: 1,
                    loop: true,
                    autoplay: autoplay,
                    autoplayTimeout: autoplayTimeout,
                    dots: pagination,
                    nav: navigation,
                    navText: [
                        '<span class="qodef-prev-icon"><i class="arrow_carrot-left"></i></span>',
                        '<span class="qodef-next-icon"><i class="arrow_carrot-right"></i></span>'
                    ]
                });
            });
        }

        var carousels = $('.qodef-image-gallery-carousel-wrapper');

        if (carousels.length) {
            carousels.each(function () {
                var carousel = $(this).children('.qodef-image-gallery-carousel'),
                    autoplay = carousel.data('autoplay') !== 0,
                    autoplayTimeout = carousel.data('autoplay') * 1000,
                    navigation = (carousel.data('navigation') === 'yes'),
                    pagination = (carousel.data('pagination') === 'yes');

                carousel.owlCarousel({
                    center: true,
                    items: 3,
                    loop: true,
                    autoWidth: true,
                    margin: 45,
                    smartSpeed: 700,
                    autoplay: autoplay,
                    autoplayTimeout: autoplayTimeout,
                    dots: false,
                    nav: navigation,
                    navText: [
                        '<span class="qodef-prev-icon"><i class="arrow_carrot-left"></i></span>',
                        '<span class="qodef-next-icon"><i class="arrow_carrot-right"></i></span>'
                    ],
                    responsive: {
                        1681: {
                            margin: 57
                        },
                        1280: {
                            margin: 27
                        },
                        1025: {
                            margin: 17
                        },
                        601: {
                            margin: 0
                        },
                        0: {
                            items: 1,
                            margin: 0
                        }

                    }
                });
            });
        }

    }

    /**
     * Initializes portfolio list
     */
    function qodefInitPortfolio() {
        var portList = $('.qodef-portfolio-list-holder-outer.qodef-ptf-standard, .qodef-portfolio-list-holder-outer.qodef-ptf-gallery, .qodef-portfolio-list-holder-outer.qodef-ptf-gallery-space');
        if (portList.length) {
            portList.each(function () {
                var thisPortList = $(this);
                qodefInitPortMixItUp(thisPortList);
            });
        }
    }

    /**
     * Initializes mixItUp function for specific container
     */
    function qodefInitPortMixItUp(container) {
        var filterClass = '';
        if (container.hasClass('qodef-ptf-has-filter')) {
            filterClass = container.find('.qodef-portfolio-filter-holder-inner ul li').data('class');
            filterClass = '.' + filterClass;
        }

        var holderInner = container.find('.qodef-portfolio-list-holder');
        holderInner.mixItUp({
            callbacks: {
                onMixLoad: function () {
                    holderInner.find('article').css('visibility', 'visible');
                },
                onMixStart: function () {
                    holderInner.find('article').css('visibility', 'visible');
                },
                onMixBusy: function () {
                    holderInner.find('article').css('visibility', 'visible');
                }
            },
            selectors: {
                filter: filterClass
            },
            animation: {
                effects: 'fade',
                duration: 600
            }

        });

    }

    /*
   **	Init portfolio list masonry type
   */
    function qodefInitPortfolioListMasonry() {
        var portList = $('.qodef-portfolio-list-holder-outer.qodef-ptf-masonry');
        if (portList.length) {
            portList.each(function () {
                var thisPortList = $(this).children('.qodef-portfolio-list-holder');
                var size = thisPortList.find('.qodef-portfolio-list-masonry-grid-sizer').width();
                qodefResizeMasonry(size, thisPortList);

                qodefInitMasonry(thisPortList);
                $(window).resize(function () {
                    qodefResizeMasonry(size, thisPortList);
                    qodefInitMasonry(thisPortList);
                });
            });
        }
    }

    function qodefInitMasonry(container) {
        container.waitForImages(function () {
            container.isotope({
                layoutMode: 'packery',
                itemSelector: '.qodef-portfolio-item',
                packery: {
                    columnWidth: '.qodef-portfolio-list-masonry-grid-sizer'
                }
            });
            container.addClass('qodef-appeared');
        });
    }

    function qodefResizeMasonry(size, container) {

        var defaultMasonryItem = container.find('.qodef-default-masonry-item');
        var largeWidthMasonryItem = container.find('.qodef-large-width-masonry-item');
        var largeHeightMasonryItem = container.find('.qodef-large-height-masonry-item');
        var largeWidthHeightMasonryItem = container.find('.qodef-large-width-height-masonry-item');

        defaultMasonryItem.css('height', size);
        largeHeightMasonryItem.css('height', Math.round(2 * size));

        if (qodef.windowWidth > 600) {
            largeWidthHeightMasonryItem.css('height', Math.round(2 * size));
            largeWidthMasonryItem.css('height', size);
        } else {
            largeWidthHeightMasonryItem.css('height', size);
            largeWidthMasonryItem.css('height', Math.round(size / 2));

        }
    }

    /**
     * Initializes portfolio pinterest
     */
    function qodefInitPortfolioListPinterest() {

        var portList = $('.qodef-portfolio-list-holder-outer.qodef-ptf-pinterest');
        if (portList.length) {
            portList.each(function () {
                var thisPortList = $(this).children('.qodef-portfolio-list-holder');
                qodefInitPinterest(thisPortList);
                $(window).resize(function () {
                    qodefInitPinterest(thisPortList);
                });
            });

        }
    }

    function qodefInitPinterest(container) {
        container.waitForImages(function () {
            container.isotope({
                layoutMode: 'packery',
                itemSelector: '.qodef-portfolio-item',
                packery: {
                    columnWidth: '.qodef-portfolio-list-masonry-grid-sizer'
                }
            });
        });
        container.addClass('qodef-appeared');

    }

    /**
     * Initializes portfolio masonry filter
     */
    function qodefInitPortfolioMasonryFilter() {

        var filterHolder = $('.qodef-portfolio-filter-holder.qodef-masonry-filter');

        if (filterHolder.length) {
            filterHolder.each(function () {

                var thisFilterHolder = $(this);

                var portfolioIsotopeAnimation = null;

                var filter = thisFilterHolder.find('ul li').data('class');

                thisFilterHolder.find('.filter:first').addClass('current');

                thisFilterHolder.find('.filter').on('click', function () {

                    var currentFilter = $(this);
                    clearTimeout(portfolioIsotopeAnimation);

                    $('.isotope, .isotope .isotope-item').css('transition-duration', '0.8s');

                    portfolioIsotopeAnimation = setTimeout(function () {
                        $('.isotope, .isotope .isotope-item').css('transition-duration', '0s');
                    }, 700);

                    var selector = $(this).attr('data-filter');
                    thisFilterHolder.siblings('.qodef-portfolio-list-holder-outer').find('.qodef-portfolio-list-holder').isotope({filter: selector});

                    thisFilterHolder.find('.filter').removeClass('current');
                    currentFilter.addClass('current');

                    return false;

                });

            });
        }
    }

    /**
     * Initializes portfolio slider
     */

    function qodefInitPortfolioSlider() {
        var portSlider = $('.qodef-portfolio-list-holder-outer.qodef-portfolio-slider-holder');
        if (portSlider.length) {
            portSlider.each(function () {
                var thisPortSlider = $(this);
                var sliderWrapper = thisPortSlider.children('.qodef-portfolio-list-holder');
                var numberOfItems = thisPortSlider.data('items');
                var navigation = false;

                sliderWrapper.owlCarousel({
                    items: numberOfItems,
                    responsive: {
                        // breakpoint from 0 up
                        0: {
                            items: 1
                        },
                        // breakpoint from 480 up
                        480: {
                            items: 2
                        },
                        // breakpoint from 768 up
                        768: {
                            items: 3
                        },
                        // breakpoint from 1024 up
                        1024: {
                            items: numberOfItems
                        }
                    },
                    loop: true,
                    autoplay: false,
                    dots: false,
                    nav: navigation,
                    navText: [
                        '<span class="qodef-prev-icon"><i class="arrow_carrot-left"></i></span>',
                        '<span class="qodef-next-icon"><i class="arrow_carrot-right"></i></span>'
                    ]
                });
            });
            qodef.modules.common.qodefInitParallax();
        }
    }

    /**
     * Initializes portfolio load more function
     */
    function qodefInitPortfolioLoadMore() {
        var portList = $('.qodef-portfolio-list-holder-outer.qodef-ptf-load-more');
        if (portList.length) {
            portList.each(function () {

                var thisPortList = $(this);
                var thisPortListInner = thisPortList.find('.qodef-portfolio-list-holder');
                var nextPage;
                var maxNumPages;
                var loadMoreButton = thisPortList.find('.qodef-ptf-list-load-more a');

                if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
                    maxNumPages = thisPortList.data('max-num-pages');
                }

                loadMoreButton.on('click', function (e) {
                    var loadMoreDatta = qodefGetPortfolioAjaxData(thisPortList);
                    nextPage = loadMoreDatta.nextPage;
                    e.preventDefault();
                    e.stopPropagation();
                    if (nextPage <= maxNumPages) {
                        var ajaxData = qodefSetPortfolioAjaxData(loadMoreDatta);
                        $.ajax({
                            type: 'POST',
                            data: ajaxData,
                            url: qodeCoreAjaxUrl,
                            success: function (data) {
                                nextPage++;
                                thisPortList.data('next-page', nextPage);
                                var response = $.parseJSON(data);
                                var responseHtml = qodefConvertHTML(response.html); //convert response html into jQuery collection that Mixitup can work with 
                                thisPortList.waitForImages(function () {
                                    setTimeout(function () {
                                        if (thisPortList.hasClass('qodef-ptf-masonry') || thisPortList.hasClass('qodef-ptf-pinterest')) {
                                            thisPortListInner.isotope().append(responseHtml).isotope('appended', responseHtml).isotope('reloadItems');
                                        } else {
                                            thisPortListInner.mixItUp('append', responseHtml);
                                        }
                                    }, 400);
                                });
                            }
                        });
                    }
                    if (nextPage === maxNumPages) {
                        loadMoreButton.hide();
                    }
                });

            });
        }
    }

    function qodefConvertHTML(html) {
        var newHtml = $.trim(html),
            $html = $(newHtml),
            $empty = $();

        $html.each(function (index, value) {
            if (value.nodeType === 1) {
                $empty = $empty.add(this);
            }
        });

        return $empty;
    }

    /**
     * Initializes portfolio load more data params
     * @param portfolio list container with defined data params
     * return array
     */
    function qodefGetPortfolioAjaxData(container) {
        var returnValue = {};

        returnValue.type = '';
        returnValue.columns = '';
        returnValue.gridSize = '';
        returnValue.orderBy = '';
        returnValue.order = '';
        returnValue.number = '';
        returnValue.imageSize = '';
        returnValue.filter = '';
        returnValue.filterOrderBy = '';
        returnValue.category = '';
        returnValue.selectedProjectes = '';
        returnValue.showLoadMore = '';
        returnValue.titleTag = '';
        returnValue.nextPage = '';
        returnValue.maxNumPages = '';

        if (typeof container.data('type') !== 'undefined' && container.data('type') !== false) {
            returnValue.type = container.data('type');
        }
        if (typeof container.data('grid-size') !== 'undefined' && container.data('grid-size') !== false) {
            returnValue.gridSize = container.data('grid-size');
        }
        if (typeof container.data('columns') !== 'undefined' && container.data('columns') !== false) {
            returnValue.columns = container.data('columns');
        }
        if (typeof container.data('order-by') !== 'undefined' && container.data('order-by') !== false) {
            returnValue.orderBy = container.data('order-by');
        }
        if (typeof container.data('order') !== 'undefined' && container.data('order') !== false) {
            returnValue.order = container.data('order');
        }
        if (typeof container.data('number') !== 'undefined' && container.data('number') !== false) {
            returnValue.number = container.data('number');
        }
        if (typeof container.data('image-size') !== 'undefined' && container.data('image-size') !== false) {
            returnValue.imageSize = container.data('image-size');
        }
        if (typeof container.data('filter') !== 'undefined' && container.data('filter') !== false) {
            returnValue.filter = container.data('filter');
        }
        if (typeof container.data('filter-order-by') !== 'undefined' && container.data('filter-order-by') !== false) {
            returnValue.filterOrderBy = container.data('filter-order-by');
        }
        if (typeof container.data('category') !== 'undefined' && container.data('category') !== false) {
            returnValue.category = container.data('category');
        }
        if (typeof container.data('selected-projects') !== 'undefined' && container.data('selected-projects') !== false) {
            returnValue.selectedProjectes = container.data('selected-projects');
        }
        if (typeof container.data('show-load-more') !== 'undefined' && container.data('show-load-more') !== false) {
            returnValue.showLoadMore = container.data('show-load-more');
        }
        if (typeof container.data('title-tag') !== 'undefined' && container.data('title-tag') !== false) {
            returnValue.titleTag = container.data('title-tag');
        }
        if (typeof container.data('next-page') !== 'undefined' && container.data('next-page') !== false) {
            returnValue.nextPage = container.data('next-page');
        }
        if (typeof container.data('max-num-pages') !== 'undefined' && container.data('max-num-pages') !== false) {
            returnValue.maxNumPages = container.data('max-num-pages');
        }
        return returnValue;
    }

    /**
     * Sets portfolio load more data params for ajax function
     * @param portfolio list container with defined data params
     * return array
     */
    function qodefSetPortfolioAjaxData(container) {
        var returnValue = {
            action: 'qode_core_portfolio_ajax_load_more',
            type: container.type,
            columns: container.columns,
            gridSize: container.gridSize,
            orderBy: container.orderBy,
            order: container.order,
            number: container.number,
            imageSize: container.imageSize,
            filter: container.filter,
            filterOrderBy: container.filterOrderBy,
            category: container.category,
            selectedProjectes: container.selectedProjectes,
            showLoadMore: container.showLoadMore,
            titleTag: container.titleTag,
            nextPage: container.nextPage
        };
        return returnValue;
    }

    /**
     * Slider object that initializes whole slider functionality
     * @type {Function}
     */
    var qodefSlider = qodef.modules.shortcodes.qodefSlider = function () {

        //all sliders on the page
        var sliders = $('.qodef-slider .carousel');
        //image regex used to extract img source
        var imageRegex = /url\(["']?([^'")]+)['"]?\)/;

        /*** Functionality for translating image in slide - START ***/

        var matrixArray = {
            zoom_center: '1.2, 0, 0, 1.2, 0, 0',
            zoom_top_left: '1.2, 0, 0, 1.2, -150, -150',
            zoom_top_right: '1.2, 0, 0, 1.2, 150, -150',
            zoom_bottom_left: '1.2, 0, 0, 1.2, -150, 150',
            zoom_bottom_right: '1.2, 0, 0, 1.2, 150, 150'
        };

        // regular expression for parsing out the matrix components from the matrix string
        var matrixRE = /\([0-9epx\.\, \t\-]+/gi;

        // parses a matrix string of the form "matrix(n1,n2,n3,n4,n5,n6)" and
        // returns an array with the matrix components
        var parseMatrix = function (val) {
            return val.match(matrixRE)[0].substr(1).split(",").map(function (s) {
                return parseFloat(s);
            });
        };

        // transform css property names with vendor prefixes;
        // the plugin will check for values in the order the names are listed here and return as soon as there
        // is a value; so listing the W3 std name for the transform results in that being used if its available
        var transformPropNames = [
            "transform",
            "-webkit-transform"
        ];

        var getTransformMatrix = function (el) {
            // iterate through the css3 identifiers till we hit one that yields a value
            var matrix = null;
            transformPropNames.some(function (prop) {
                matrix = el.css(prop);
                return (matrix !== null && matrix !== "");
            });

            // if "none" then we supplant it with an identity matrix so that our parsing code below doesn't break
            matrix = (!matrix || matrix === "none") ?
                "matrix(1,0,0,1,0,0)" : matrix;
            return parseMatrix(matrix);
        };

        // set the given matrix transform on the element; note that we apply the css transforms in reverse order of how its given
        // in "transformPropName" to ensure that the std compliant prop name shows up last
        var setTransformMatrix = function (el, matrix) {
            var m = "matrix(" + matrix.join(",") + ")";
            for (var i = transformPropNames.length - 1; i >= 0; --i) {
                el.css(transformPropNames[i], m + ' rotate(0.01deg)');
            }
        };

        // interpolates a value between a range given a percent
        var interpolate = function (from, to, percent) {
            return from + ((to - from) * (percent / 100));
        };

        $.fn.transformAnimate = function (opt) {
            // extend the options passed in by caller
            var options = {
                transform: "matrix(1,0,0,1,0,0)"
            };
            $.extend(options, opt);

            // initialize our custom property on the element to track animation progress
            this.css("percentAnim", 0);

            // supplant "options.step" if it exists with our own routine
            var sourceTransform = getTransformMatrix(this);
            var targetTransform = parseMatrix(options.transform);
            options.step = function (percentAnim, fx) {
                // compute the interpolated transform matrix for the current animation progress
                var $this = $(this);
                var matrix = sourceTransform.map(function (c, i) {
                    return interpolate(c, targetTransform[i],
                        percentAnim);
                });

                // apply the new matrix
                setTransformMatrix($this, matrix);

                // invoke caller's version of "step" if one was supplied;
                if (opt.step) {
                    opt.step.apply(this, [matrix, fx]);
                }
            };

            // animate!
            return this.stop().animate({percentAnim: 100}, options);
        };

        /*** Functionality for translating image in slide - END ***/


        /**
         * Calculate heights for slider holder and slide item, depending on window width, but only if slider is set to be responsive
         * @param slider, current slider
         * @param defaultHeight, default height of slider, set in shortcode
         * @param responsive_breakpoint_set, breakpoints set for slider responsiveness
         * @param reset, boolean for reseting heights
         */
        var setSliderHeight = function (slider, defaultHeight, responsive_breakpoint_set, reset) {
            var sliderHeight = defaultHeight;
            if (!reset) {
                if (qodef.windowWidth > responsive_breakpoint_set[0]) {
                    sliderHeight = defaultHeight;
                } else if (qodef.windowWidth > responsive_breakpoint_set[1]) {
                    sliderHeight = defaultHeight * 0.75;
                } else if (qodef.windowWidth > responsive_breakpoint_set[2]) {
                    sliderHeight = defaultHeight * 0.6;
                } else if (qodef.windowWidth > responsive_breakpoint_set[3]) {
                    sliderHeight = defaultHeight * 0.55;
                } else if (qodef.windowWidth <= responsive_breakpoint_set[3]) {
                    sliderHeight = defaultHeight * 0.45;
                }
            }

            slider.css({'height': (sliderHeight) + 'px'});
            slider.find('.qodef-slider-preloader').css({'height': (sliderHeight) + 'px'});
            slider.find('.qodef-slider-preloader .qodef-ajax-loader').css({'display': 'block'});
            slider.find('.item').css({'height': (sliderHeight) + 'px'});
            if (qodefPerPageVars.vars.qodefStickyScrollAmount === 0) {
                qodef.modules.header.stickyAppearAmount = sliderHeight; //set sticky header appear amount if slider there is no amount entered on page itself
            }
        };

        /**
         * Calculate heights for slider holder and slide item, depending on window size, but only if slider is set to be full height
         * @param slider, current slider
         */
        var setSliderFullHeight = function (slider) {
            var mobileHeaderHeight = qodef.windowWidth < 1025 ? qodefGlobalVars.vars.qodefMobileHeaderHeight + $('.qodef-top-bar').height() : 0;
            slider.css({'height': (qodef.windowHeight - mobileHeaderHeight) + 'px'});
            slider.find('.qodef-slider-preloader').css({'height': (qodef.windowHeight - mobileHeaderHeight) + 'px'});
            slider.find('.qode-slider-preloader .qodef-ajax-loader').css({'display': 'block'});
            slider.find('.item').css({'height': (qodef.windowHeight - mobileHeaderHeight) + 'px'});
            if (qodefPerPageVars.vars.qodefStickyScrollAmount === 0) {
                qodef.modules.header.stickyAppearAmount = qodef.windowHeight; //set sticky header appear amount if slider there is no amount entered on page itself
            }
        };

        var setElementsResponsiveness = function (slider) {
            // Basic text styles responsiveness
            slider
                .find('.qodef-slide-element-text-small, .qodef-slide-element-text-normal, .qodef-slide-element-text-large, .qodef-slide-element-text-extra-large')
                .each(function () {
                    var element = $(this);
                    if (typeof element.data('default-font-size') === 'undefined') {
                        element.data('default-font-size', parseInt(element.css('font-size'), 10));
                    }
                    if (typeof element.data('default-line-height') === 'undefined') {
                        element.data('default-line-height', parseInt(element.css('line-height'), 10));
                    }
                    if (typeof element.data('default-letter-spacing') === 'undefined') {
                        element.data('default-letter-spacing', parseInt(element.css('letter-spacing'), 10));
                    }
                });
            // Advanced text styles responsiveness
            slider.find('.qodef-slide-element-responsive-text').each(function () {
                if (typeof $(this).data('default-font-size') === 'undefined') {
                    $(this).data('default-font-size', parseInt($(this).css('font-size'), 10));
                }
                if (typeof $(this).data('default-line-height') === 'undefined') {
                    $(this).data('default-line-height', parseInt($(this).css('line-height'), 10));
                }
                if (typeof $(this).data('default-letter-spacing') === 'undefined') {
                    $(this).data('default-letter-spacing', parseInt($(this).css('letter-spacing'), 10));
                }
            });
            // Button responsiveness
            slider.find('.qodef-slide-element-responsive-button').each(function () {
                if (typeof $(this).data('default-font-size') === 'undefined') {
                    $(this).data('default-font-size', parseInt($(this).find('a').css('font-size'), 10));
                }
                if (typeof $(this).data('default-line-height') === 'undefined') {
                    $(this).data('default-line-height', parseInt($(this).find('a').css('line-height'), 10));
                }
                if (typeof $(this).data('default-letter-spacing') === 'undefined') {
                    $(this).data('default-letter-spacing', parseInt($(this).find('a').css('letter-spacing'), 10));
                }
                if (typeof $(this).data('default-ver-padding') === 'undefined') {
                    $(this).data('default-ver-padding', parseInt($(this).find('a').css('padding-top'), 10));
                }
                if (typeof $(this).data('default-hor-padding') === 'undefined') {
                    $(this).data('default-hor-padding', parseInt($(this).find('a').css('padding-left'), 10));
                }
            });
            // Margins for non-custom layouts
            slider.find('.qodef-slide-element').each(function () {
                var element = $(this);
                if (typeof element.data('default-margin-top') === 'undefined') {
                    element.data('default-margin-top', parseInt(element.css('margin-top'), 10));
                }
                if (typeof element.data('default-margin-bottom') === 'undefined') {
                    element.data('default-margin-bottom', parseInt(element.css('margin-bottom'), 10));
                }
                if (typeof element.data('default-margin-left') === 'undefined') {
                    element.data('default-margin-left', parseInt(element.css('margin-left'), 10));
                }
                if (typeof element.data('default-margin-right') === 'undefined') {
                    element.data('default-margin-right', parseInt(element.css('margin-right'), 10));
                }
            });
            adjustElementsSizes(slider);
        };

        var adjustElementsSizes = function (slider) {
            var boundaries = {
                // These values must match those in map.php (for slider), slider.php and qode.layout.inc
                mobile: 600,
                tabletp: 800,
                tabletl: 1024,
                laptop: 1440
            };
            slider.find('.qodef-slider-elements-container').each(function () {
                var container = $(this);
                var target = container.filter('.qodef-custom-elements').add(container.not('.qodef-custom-elements').find('.qodef-slider-elements-holder-frame')).not('.qodef-grid');
                if (target.length) {
                    if (boundaries.mobile >= qodef.windowWidth && container.attr('data-width-mobile').length) {
                        target.css('width', container.data('width-mobile') + '%');
                    } else if (boundaries.tabletp >= qodef.windowWidth && container.attr('data-width-tablet-p').length) {
                        target.css('width', container.data('width-tablet-p') + '%');
                    } else if (boundaries.tabletl >= qodef.windowWidth && container.attr('data-width-tablet-l').length) {
                        target.css('width', container.data('width-tablet-l') + '%');
                    } else if (boundaries.laptop >= qodef.windowWidth && container.attr('data-width-laptop').length) {
                        target.css('width', container.data('width-laptop') + '%');
                    } else if (container.attr('data-width-desktop').length) {
                        target.css('width', container.data('width-desktop') + '%');
                    }
                }
            });
            slider.find('.item').each(function () {
                var slide = $(this);
                var def_w = slide.find('.qodef-slider-elements-holder-frame').data('default-width');
                var elements = slide.find('.qodef-slide-element');

                // Adjusting margins for all elements
                elements.each(function () {
                    var element = $(this);
                    var def_m_top = element.data('default-margin-top'),
                        def_m_bot = element.data('default-margin-bottom'),
                        def_m_l = element.data('default-margin-left'),
                        def_m_r = element.data('default-margin-right');
                    var scale_data = (typeof element.data('resp-scale') !== 'undefined') ? element.data('resp-scale') : undefined;
                    var factor;

                    if (boundaries.mobile >= qodef.windowWidth) {
                        factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.mobile);
                    } else if (boundaries.tabletp >= qodef.windowWidth) {
                        factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.tabletp);
                    } else if (boundaries.tabletl >= qodef.windowWidth) {
                        factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.tabletl);
                    } else if (boundaries.laptop >= qodef.windowWidth) {
                        factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.laptop);
                    } else {
                        factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.desktop);
                    }

                    element.css({
                        'margin-top': Math.round(factor * def_m_top) + 'px',
                        'margin-bottom': Math.round(factor * def_m_bot) + 'px',
                        'margin-left': Math.round(factor * def_m_l) + 'px',
                        'margin-right': Math.round(factor * def_m_r) + 'px'
                    });
                });

                // Adjusting responsiveness
                elements
                    .filter('.qodef-slide-element-responsive-text, .qodef-slide-element-responsive-button, .qodef-slide-element-responsive-image')
                    .add(elements.find('a.qodef-slide-element-responsive-text, span.qodef-slide-element-responsive-text'))
                    .each(function () {
                        var element = $(this);
                        var scale_data = (typeof element.data('resp-scale') !== 'undefined') ? element.data('resp-scale') : undefined,
                            left_data = (typeof element.data('resp-left') !== 'undefined') ? element.data('resp-left') : undefined,
                            top_data = (typeof element.data('resp-top') !== 'undefined') ? element.data('resp-top') : undefined;
                        var factor, new_left, new_top;

                        if (boundaries.mobile >= qodef.windowWidth) {
                            factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.mobile);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.mobile !== '' ? left_data.mobile + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.mobile !== '' ? top_data.mobile + '%' : element.data('top') + '%');
                        } else if (boundaries.tabletp >= qodef.windowWidth) {
                            factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.tabletp);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.tabletp !== '' ? left_data.tabletp + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.tabletp !== '' ? top_data.tabletp + '%' : element.data('top') + '%');
                        } else if (boundaries.tabletl >= qodef.windowWidth) {
                            factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.tabletl);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.tabletl !== '' ? left_data.tabletl + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.tabletl !== '' ? top_data.tabletl + '%' : element.data('top') + '%');
                        } else if (boundaries.laptop >= qodef.windowWidth) {
                            factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.laptop);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.laptop !== '' ? left_data.laptop + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.laptop !== '' ? top_data.laptop + '%' : element.data('top') + '%');
                        } else {
                            factor = (typeof scale_data === 'undefined') ? qodef.windowWidth / def_w : parseFloat(scale_data.desktop);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.desktop !== '' ? left_data.desktop + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.desktop !== '' ? top_data.desktop + '%' : element.data('top') + '%');
                        }

                        if (!factor) {
                            element.hide();
                        } else {
                            element.show();
                            var def_font_size,
                                def_line_h,
                                def_let_spac,
                                def_ver_pad,
                                def_hor_pad;

                            if (element.is('.qodef-slide-element-responsive-button')) {
                                def_font_size = element.data('default-font-size');
                                def_line_h = element.data('default-line-height');
                                def_let_spac = element.data('default-letter-spacing');
                                def_ver_pad = element.data('default-ver-padding');
                                def_hor_pad = element.data('default-hor-padding');

                                element.css({
                                    'left': new_left,
                                    'top': new_top
                                })
                                    .find('.qodef-btn').css({
                                    'font-size': Math.round(factor * def_font_size) + 'px',
                                    'line-height': Math.round(factor * def_line_h) + 'px',
                                    'letter-spacing': Math.round(factor * def_let_spac) + 'px',
                                    'padding-left': Math.round(factor * def_hor_pad) + 'px',
                                    'padding-right': Math.round(factor * def_hor_pad) + 'px',
                                    'padding-top': Math.round(factor * def_ver_pad) + 'px',
                                    'padding-bottom': Math.round(factor * def_ver_pad) + 'px'
                                });
                            } else if (element.is('.qodef-slide-element-responsive-image')) {
                                if (factor !== qodef.windowWidth / def_w) { // if custom factor has been set for this screen width
                                    var up_w = element.data('upload-width'),
                                        up_h = element.data('upload-height');

                                    element.filter('.custom-image').css({
                                        'left': new_left,
                                        'top': new_top
                                    })
                                        .add(element.not('.custom-image').find('img'))
                                        .css({
                                            'width': Math.round(factor * up_w) + 'px',
                                            'height': Math.round(factor * up_h) + 'px'
                                        });
                                } else {
                                    var w = element.data('width');

                                    element.filter('.custom-image').css({
                                        'left': new_left,
                                        'top': new_top
                                    })
                                        .add(element.not('.custom-image').find('img'))
                                        .css({
                                            'width': w + '%',
                                            'height': ''
                                        });
                                }
                            } else {
                                def_font_size = element.data('default-font-size');
                                def_line_h = element.data('default-line-height');
                                def_let_spac = element.data('default-letter-spacing');

                                element.css({
                                    'left': new_left,
                                    'top': new_top,
                                    'font-size': Math.round(factor * def_font_size) + 'px',
                                    'line-height': Math.round(factor * def_line_h) + 'px',
                                    'letter-spacing': Math.round(factor * def_let_spac) + 'px'
                                });
                            }
                        }
                    });
            });
            var nav = slider.find('.carousel-indicators');
            slider.find('.qodef-slide-element-section-link').css('bottom', nav.length ? parseInt(nav.css('bottom'), 10) + nav.outerHeight() + 10 + 'px' : '20px');
        };

        var checkButtonsAlignment = function (slider) {
            slider.find('.item').each(function () {
                var inline_buttons = $(this).find('.qodef-slide-element-button-inline');
                inline_buttons.css('display', 'inline-block').wrapAll('<div class="qodef-slide-elements-buttons-wrapper" style="text-align: ' + inline_buttons.eq(0).css('text-align') + ';"/>');
            });
        };

        /**
         * Set heights for slider and elemnts depending on slider settings (full height, responsive height od set height)
         * @param slider, current slider
         */
        var setHeights = function (slider) {

            var responsiveBreakpointSet = [1600, 1200, 900, 650, 500, 320];

            setElementsResponsiveness(slider);

            if (slider.hasClass('qodef-full-screen')) {

                setSliderFullHeight(slider);

                $(window).resize(function () {
                    setSliderFullHeight(slider);
                    adjustElementsSizes(slider);
                });

            } else if (slider.hasClass('qodef-responsive-height')) {

                var defaultHeight = slider.data('height');
                setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);

                $(window).resize(function () {
                    setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);
                    adjustElementsSizes(slider);
                });

            } else {
                var defaultHeight = slider.data('height');

                slider.find('.qodef-slider-preloader').css({'height': (slider.height()) + 'px'});
                slider.find('.qodef-slider-preloader .qodef-ajax-loader').css({'display': 'block'});

                qodef.windowWidth < 1025 ? setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false) : setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, true);

                $(window).resize(function () {
                    if (qodef.windowWidth < 1025) {
                        setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);
                    } else {
                        setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, true);
                    }
                    adjustElementsSizes(slider);
                });
            }
        };

        /**
         * Set prev/next numbers on navigation arrows
         * @param slider, current slider
         * @param currentItem, current slide item index
         * @param totalItemCount, total number of slide items
         */
        var setPrevNextNumbers = function (slider, currentItem, totalItemCount) {
            if (currentItem === 1) {
                slider.find('.left.carousel-control .prev').html(totalItemCount);
                slider.find('.right.carousel-control .next').html(currentItem + 1);
            } else if (currentItem === totalItemCount) {
                slider.find('.left.carousel-control .prev').html(currentItem - 1);
                slider.find('.right.carousel-control .next').html(1);
            } else {
                slider.find('.left.carousel-control .prev').html(currentItem - 1);
                slider.find('.right.carousel-control .next').html(currentItem + 1);
            }
        };

        /**
         * Set video background size
         * @param slider, current slider
         */
        var initVideoBackgroundSize = function (slider) {
            var min_w = 1500; // minimum video width allowed
            var video_width_original = 1920;  // original video dimensions
            var video_height_original = 1080;
            var vid_ratio = 1920 / 1080;

            slider.find('.item .qodef-video .qodef-video-wrap').each(function () {

                var slideWidth = qodef.windowWidth;
                var slideHeight = $(this).closest('.carousel').height();

                $(this).width(slideWidth);

                min_w = vid_ratio * (slideHeight + 20);
                $(this).height(slideHeight);

                var scale_h = slideWidth / video_width_original;
                var scale_v = (slideHeight - qodefGlobalVars.vars.qodefMenuAreaHeight) / video_height_original;
                var scale = scale_v;
                if (scale_h > scale_v)
                    scale = scale_h;
                if (scale * video_width_original < min_w) {
                    scale = min_w / video_width_original;
                }

                $(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * video_width_original + 2));
                $(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * video_height_original + 2));
                $(this).scrollLeft(($(this).find('video').width() - slideWidth) / 2);
                $(this).find('.mejs-overlay, .mejs-poster').scrollTop(($(this).find('video').height() - slideHeight) / 2);
                $(this).scrollTop(($(this).find('video').height() - slideHeight) / 2);
            });
        };

        /**
         * Init video background
         * @param slider, current slider
         */
        var initVideoBackground = function (slider) {
            $('.item .qodef-video-wrap .qodef-video-element').mediaelementplayer({
                enableKeyboard: false,
                iPadUseNativeControls: false,
                pauseOtherPlayers: false,
                // force iPhone's native controls
                iPhoneUseNativeControls: false,
                // force Android's native controls
                AndroidUseNativeControls: false
            });

            initVideoBackgroundSize(slider);
            $(window).resize(function () {
                initVideoBackgroundSize(slider);
            });

            //mobile check
            if (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
                $('.qodef-slider .qodef-mobile-video-image').show();
                $('.qodef-slider .qodef-video-wrap').remove();
            }
        };

        var initPeek = function (slider) {
            if (slider.hasClass('qodef-slide-peek')) {

                var navArrowHover = function (arrow, entered) {
                    var dir = arrow.is('.left') ? 'left' : 'right';
                    var targ_peeker = peekers.filter('.' + dir);
                    if (entered) {
                        arrow.addClass('hovered');
                        var targ_item = (items.index(items.filter('.active')) + (dir === 'left' ? -1 : 1) + items.length) % items.length;
                        targ_peeker.find('.qodef-slider-peeker-inner').css({
                            'background-image': items.eq(targ_item).find('.qodef-image, .qodef-mobile-video-image').css('background-image'),
                            'width': itemWidth + 'px'
                        });
                        targ_peeker.addClass('shown');
                    } else {
                        arrow.removeClass('hovered');
                        peekers.removeClass('shown');
                    }
                };

                var navBulletHover = function (bullet, entered) {
                    if (entered) {
                        bullet.addClass('hovered');

                        var targ_item = bullet.data('slide-to');
                        var cur_item = items.index(items.filter('.active'));
                        if (cur_item !== targ_item) {
                            var dir = (targ_item < cur_item) ? 'left' : 'right';
                            var targ_peeker = peekers.filter('.' + dir);
                            targ_peeker.find('.qodef-slider-peeker-inner').css({
                                'background-image': items.eq(targ_item).find('.qodef-image, .qodef-mobile-video-image').css('background-image'),
                                'width': itemWidth + 'px'
                            });
                            targ_peeker.addClass('shown');
                        }
                    } else {
                        bullet.removeClass('hovered');
                        peekers.removeClass('shown');
                    }
                };

                var handleResize = function () {
                    itemWidth = items.filter('.active').width();
                    itemWidth += (itemWidth % 2) ? 1 : 0; // To make it even
                    items.children('.qodef-image, .qodef-video').css({
                        'position': 'absolute',
                        'width': itemWidth + 'px',
                        'height': '110%',
                        'left': '50%',
                        'transform': 'translateX(-50%)'
                    });
                };

                var items = slider.find('.item');
                var itemWidth;
                handleResize();
                $(window).resize(handleResize);

                slider.find('.carousel-inner').append('<div class="qodef-slider-peeker left"><div class="qodef-slider-peeker-inner"></div></div><div class="qodef-slider-peeker right"><div class="qodef-slider-peeker-inner"></div></div>');
                var peekers = slider.find('.qodef-slider-peeker');
                var nav_arrows = slider.find('.carousel-control');
                var nav_bullets = slider.find('.carousel-indicators > li');

                nav_arrows.on('mouseenter', function () {
                        navArrowHover($(this), true);
                    });
                nav_arrows.on('mouseleave', function () {
                    navArrowHover($(this), false);
                });

                nav_bullets.on('mouseenter', function () {
                        navBulletHover($(this), true);
                    });
                nav_bullets.on('mouseleave', function () {
                    navBulletHover($(this), false);
                });

                slider.on('slide.bs.carousel', function () {
                    setTimeout(function () {
                        peekers.addClass('qodef-slide-peek-in-progress').removeClass('shown');
                    }, 500);
                });

                slider.on('slid.bs.carousel', function () {
                    nav_arrows.filter('.hovered').each(function () {
                        navArrowHover($(this), true);
                    });
                    setTimeout(function () {
                        nav_bullets.filter('.hovered').each(function () {
                            navBulletHover($(this), true);
                        });
                    }, 200);
                    peekers.removeClass('qodef-slide-peek-in-progress');
                });
            }
        };

        var updateNavigationThumbs = function (slider) {
            if (slider.hasClass('qodef-slider-thumbs')) {
                var src, prev_image, next_image;
                var all_items_count = slider.find('.item').length;
                var curr_item = slider.find('.item').index($('.item.active')[0]) + 1;
                setPrevNextNumbers(slider, curr_item, all_items_count);

                // prev thumb
                if (slider.find('.item.active').prev('.item').length) {
                    if (slider.find('.item.active').prev('div').find('.qodef-image').length) {
                        src = imageRegex.exec(slider.find('.active').prev('div').find('.qodef-image').attr('style'));
                        prev_image = new Image();
                        prev_image.src = src[1];
                        //prev_image = '<div class="thumb-image" style="background-image: url('+src[1]+')"></div>';
                    } else {
                        prev_image = slider.find('.active').prev('div').find('> .qodef-video').clone();
                        prev_image.find('.qodef-video-overlay, .mejs-offscreen').remove();
                        prev_image.find('.qodef-video-wrap').width(150).height(84);
                        prev_image.find('.mejs-container').width(150).height(84);
                        prev_image.find('video').width(150).height(84);
                    }
                    slider.find('.left.carousel-control .img .old').fadeOut(300, function () {
                        $(this).remove();
                    });
                    slider.find('.left.carousel-control .img').append(prev_image).find('div.thumb-image, > img, div.qodef-video').fadeIn(300).addClass('old');

                } else {
                    if (slider.find('.carousel-inner .item:last-child .qodef-image').length) {
                        src = imageRegex.exec(slider.find('.carousel-inner .item:last-child .qodef-image').attr('style'));
                        prev_image = new Image();
                        prev_image.src = src[1];
                        //prev_image = '<div class="thumb-image" style="background-image: url('+src[1]+')"></div>';
                    } else {
                        prev_image = slider.find('.carousel-inner .item:last-child > .qodef-video').clone();
                        prev_image.find('.qodef-video-overlay, .mejs-offscreen').remove();
                        prev_image.find('.qodef-video-wrap').width(150).height(84);
                        prev_image.find('.mejs-container').width(150).height(84);
                        prev_image.find('video').width(150).height(84);
                    }
                    slider.find('.left.carousel-control .img .old').fadeOut(300, function () {
                        $(this).remove();
                    });
                    slider.find('.left.carousel-control .img').append(prev_image).find('div.thumb-image, > img, div.qodef-video').fadeIn(300).addClass('old');
                }

                // next thumb
                if (slider.find('.active').next('div.item').length) {
                    if (slider.find('.active').next('div').find('.qodef-image').length) {
                        src = imageRegex.exec(slider.find('.active').next('div').find('.qodef-image').attr('style'));
                        next_image = new Image();
                        next_image.src = src[1];
                        //next_image = '<div class="thumb-image" style="background-image: url('+src[1]+')"></div>';
                    } else {
                        next_image = slider.find('.active').next('div').find('> .qodef-video').clone();
                        next_image.find('.qodef-video-overlay, .mejs-offscreen').remove();
                        next_image.find('.qodef-video-wrap').width(150).height(84);
                        next_image.find('.mejs-container').width(150).height(84);
                        next_image.find('video').width(150).height(84);
                    }

                    slider.find('.right.carousel-control .img .old').fadeOut(300, function () {
                        $(this).remove();
                    });
                    slider.find('.right.carousel-control .img').append(next_image).find('div.thumb-image, > img, div.qodef-video').fadeIn(300).addClass('old');

                } else {
                    if (slider.find('.carousel-inner .item:first-child .qodef-image').length) {
                        src = imageRegex.exec(slider.find('.carousel-inner .item:first-child .qodef-image').attr('style'));
                        next_image = new Image();
                        next_image.src = src[1];
                        //next_image = '<div class="thumb-image" style="background-image: url('+src[1]+')"></div>';
                    } else {
                        next_image = slider.find('.carousel-inner .item:first-child > .qodef-video').clone();
                        next_image.find('.qodef-video-overlay, .mejs-offscreen').remove();
                        next_image.find('.qodef-video-wrap').width(150).height(84);
                        next_image.find('.mejs-container').width(150).height(84);
                        next_image.find('video').width(150).height(84);
                    }
                    slider.find('.right.carousel-control .img .old').fadeOut(300, function () {
                        $(this).remove();
                    });
                    slider.find('.right.carousel-control .img').append(next_image).find('div.thumb-image, > img, div.qodef-video').fadeIn(300).addClass('old');
                }
            }
        };

        /**
         * initiate slider
         * @param slider, current slider
         * @param currentItem, current slide item index
         * @param totalItemCount, total number of slide items
         * @param slideAnimationTimeout, timeout for slide change
         */
        var initiateSlider = function (slider, totalItemCount, slideAnimationTimeout) {

            //set active class on first item
            slider.find('.carousel-inner .item:first-child').addClass('active');
            //check for header style
            qodefCheckSliderForHeaderStyle($('.carousel .active'), slider.hasClass('qodef-header-effect'));
            // setting numbers on carousel controls
            if (slider.hasClass('qodef-slider-numbers')) {
                setPrevNextNumbers(slider, 1, totalItemCount);
            }
            // set video background if there is video slide
            if (slider.find('.item video').length) {
                //initVideoBackgroundSize(slider);
                initVideoBackground(slider);
            }

            // update thumbs
            updateNavigationThumbs(slider);

            // initiate peek
            initPeek(slider);

            // enable link hover color for slide elements with links
            slider.find('.qodef-slide-element-wrapper-link')
                .mouseenter(function () {
                    $(this).removeClass('inheriting');
                })
                .mouseleave(function () {
                    $(this).addClass('inheriting');
                })
            ;

            //init slider
            if (slider.hasClass('qodef-auto-start')) {
                slider.carousel({
                    interval: slideAnimationTimeout,
                    pause: false
                });

                //pause slider when hover slider button
                slider.find('.slide_buttons_holder .qbutton')
                    .mouseenter(function () {
                        slider.carousel('pause');
                    })
                    .mouseleave(function () {
                        slider.carousel('cycle');
                    });
            } else {
                slider.carousel({
                    interval: 0,
                    pause: false
                });
            }

            $(window).scroll(function () {
                if (slider.hasClass('qodef-full-screen') && qodef.scroll > qodef.windowHeight && qodef.windowWidth > 1024) {
                    slider.carousel('pause');
                } else if (!slider.hasClass('qodef-full-screen') && qodef.scroll > slider.height() && qodef.windowWidth > 1024) {
                    slider.carousel('pause');
                } else {
                    slider.carousel('cycle');
                }
            });


            //initiate image animation
            if ($('.carousel-inner .item:first-child').hasClass('qodef-animate-image') && qodef.windowWidth > 1024) {
                slider.find('.carousel-inner .item.qodef-animate-image:first-child .qodef-image').transformAnimate({
                    transform: "matrix(" + matrixArray[$('.carousel-inner .item:first-child').data('qodef_animate_image')] + ")",
                    duration: 30000
                });
            }
        };

        return {
            init: function () {
                if (sliders.length) {
                    sliders.each(function () {
                        var $this = $(this);
                        var slideAnimationTimeout = $this.data('slide_animation_timeout');
                        var totalItemCount = $this.find('.item').length;

                        checkButtonsAlignment($this);

                        setHeights($this);

                        /*** wait until first video or image is loaded and than initiate slider - start ***/
                        if (qodef.htmlEl.hasClass('touch')) {
                            if ($this.find('.item:first-child .qodef-mobile-video-image').length > 0) {
                                var src = imageRegex.exec($this.find('.item:first-child .qodef-mobile-video-image').attr('style'));
                            } else {
                                var src = imageRegex.exec($this.find('.item:first-child .qodef-image').attr('style'));
                            }
                            if (src) {
                                var backImg = new Image();
                                backImg.src = src[1];
                                $(backImg).on('load',function () {
                                    $('.qodef-slider-preloader').fadeOut(500);
                                    initiateSlider($this, totalItemCount, slideAnimationTimeout);
                                });
                            }
                        } else {
                            if ($this.find('.item:first-child video').length > 0) {
                                $this.find('.item:first-child video').eq(0).one('loadeddata', function () {
                                    $('.qodef-slider-preloader').fadeOut(500);
                                    initiateSlider($this, totalItemCount, slideAnimationTimeout);
                                });
                            } else {
                                var src = imageRegex.exec($this.find('.item:first-child .qodef-image').attr('style'));
                                if (src) {
                                    var backImg = new Image();
                                    backImg.src = src[1];
                                    $(backImg).on('load',function () {
                                        $('.qodef-slider-preloader').fadeOut(500);
                                        initiateSlider($this, totalItemCount, slideAnimationTimeout);
                                    });
                                }
                            }
                        }
                        /*** wait until first video or image is loaded and than initiate slider - end ***/

                        /* before slide transition - start */
                        $this.on('slide.bs.carousel', function () {
                            $this.addClass('qodef-in-progress');
                            $this.find('.active .qodef-slider-elements-holder-frame, .active .qodef-slide-element-section-link').fadeTo(250, 0);
                        });
                        /* before slide transition - end */

                        /* after slide transition - start */
                        $this.on('slid.bs.carousel', function () {
                            $this.removeClass('qodef-in-progress');
                            $this.find('.active .qodef-slider-elements-holder-frame, .active .qodef-slide-element-section-link').fadeTo(0, 1);

                            // setting numbers on carousel controls
                            if ($this.hasClass('qodef-slider-numbers')) {
                                var currentItem = $('.item').index($('.item.active')[0]) + 1;
                                setPrevNextNumbers($this, currentItem, totalItemCount);
                            }

                            // initiate image animation on active slide and reset all others
                            $('.item.qodef-animate-image .qodef-image').stop().css({
                                'transform': '',
                                '-webkit-transform': ''
                            });
                            if ($('.item.active').hasClass('qodef-animate-image') && qodef.windowWidth > 1025) {
                                $('.item.qodef-animate-image.active .qodef-image').transformAnimate({
                                    transform: "matrix(" + matrixArray[$('.item.qodef-animate-image.active').data('qodef_animate_image')] + ")",
                                    duration: 30000
                                });
                            }

                            // setting thumbnails on navigation controls
                            if ($this.hasClass('qodef-slider-thumbs')) {
                                updateNavigationThumbs($this);
                            }
                        });
                        /* after slide transition - end */

                        /* swipe functionality - start */
                        $this.swipe({
                            swipeLeft: function () {
                                $this.carousel('next');
                            },
                            swipeRight: function () {
                                $this.carousel('prev');
                            },
                            threshold: 20
                        });
                        /* swipe functionality - end */

                    });

                    //adding parallax functionality on slider
                    if ($('.no-touch .carousel').length) {
                        var skrollr_slider = skrollr.init({
                            smoothScrolling: false,
                            forceHeight: false
                        });
                        skrollr_slider.refresh();
                    }

                    $(window).scroll(function () {
                        //set control class for slider in order to change header style
                        if ($('.qodef-slider .carousel').height() < qodef.scroll) {
                            $('.qodef-slider .carousel').addClass('qodef-disable-slider-header-style-changing');
                        } else {
                            $('.qodef-slider .carousel').removeClass('qodef-disable-slider-header-style-changing');
                            qodefCheckSliderForHeaderStyle($('.qodef-slider .carousel .active'), $('.qodef-slider .carousel').hasClass('qodef-header-effect'));
                        }

                        //hide slider when it is out of viewport
                        if ($('.qodef-slider .carousel').hasClass('qodef-full-screen') && qodef.scroll > qodef.windowHeight && qodef.windowWidth > 1025) {
                            $('.qodef-slider .carousel').find('.carousel-inner, .carousel-indicators').hide();
                        } else if (!$('.qodef-slider .carousel').hasClass('qodef-full-screen') && qodef.scroll > $('.qodef-slider .carousel').height() && qodef.windowWidth > 1025) {
                            $('.qodef-slider .carousel').find('.carousel-inner, .carousel-indicators').hide();
                        } else {
                            $('.qodef-slider .carousel').find('.carousel-inner, .carousel-indicators').show();
                        }
                    });
                }
            }
        };
    };

    /**
     * Check if slide effect on header style changing
     * @param slide, current slide
     * @param headerEffect, flag if slide
     */

    function qodefCheckSliderForHeaderStyle(slide, headerEffect) {

        if ($('.qodef-slider .carousel').not('.qodef-disable-slider-header-style-changing').length > 0) {

            var slideHeaderStyle = "";
            if (slide.hasClass('light')) {
                slideHeaderStyle = 'qodef-light-header';
            }
            if (slide.hasClass('dark')) {
                slideHeaderStyle = 'qodef-dark-header';
            }

            if (slideHeaderStyle !== "") {
                if (headerEffect) {
                    qodef.body.removeClass('qodef-dark-header qodef-light-header').addClass(slideHeaderStyle);
                }
            } else {
                if (headerEffect) {
                    qodef.body.removeClass('qodef-dark-header qodef-light-header').addClass(qodef.defaultHeaderStyle);
                }

            }
        }
    }

    /**
     * List object that initializes list with animation
     * @type {Function}
     */
    var qodefInitIconList = qodef.modules.shortcodes.qodefInitIconList = function () {
        var iconList = $('.qodef-animate-list');

        /**
         * Initializes icon list animation
         * @param list current list shortcode
         */
        var iconListInit = function (list) {
            setTimeout(function () {
                list.appear(function () {
                    list.addClass('qodef-appeared');
                }, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
            }, 30);
        };

        return {
            init: function () {
                if (iconList.length) {
                    iconList.each(function () {
                        iconListInit($(this));
                    });
                }
            }
        };
    };

    /*
     * Reset parallax positions
     */
    function resetParallaxPositions() {
        var st = $(window).scrollTop(),
            thisSection = $('.qodef-parallax-section-advanced'),
            elements = $('.qodef-parallax-hero-image-holder, .qodef-parallax-info-section');
        if (thisSection.length) {
            if (st === thisSection.offset().top) {
                elements.addClass('qodef-reset');
            } else {
                elements.removeClass('qodef-reset');
            }
        }
    }

    /*
     **	Elements Holder responsive style
     */
    function qodefInitElementsHolderResponsiveStyle() {

        var elementsHolder = $('.qodef-elements-holder');

        if (elementsHolder.length) {
            elementsHolder.each(function () {
                var thisElementsHolder = $(this),
                    elementsHolderItem = thisElementsHolder.children('.qodef-elements-holder-item'),
                    style = '',
                    responsiveStyle = '';

                elementsHolderItem.each(function () {
                    var thisItem = $(this),
                        itemClass = '',
                        largeLaptop = '',
                        smallLaptop = '',
                        ipadLandscape = '',
                        ipadPortrait = '',
                        mobileLandscape = '',
                        mobilePortrait = '';

                    if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
                        itemClass = thisItem.data('item-class');
                    }
                    if (typeof thisItem.data('1280-1600') !== 'undefined' && thisItem.data('1280-1600') !== false) {
                        largeLaptop = thisItem.data('1280-1600');
                    }
                    if (typeof thisItem.data('1024-1280') !== 'undefined' && thisItem.data('1024-1280') !== false) {
                        smallLaptop = thisItem.data('1024-1280');
                    }
                    if (typeof thisItem.data('768-1024') !== 'undefined' && thisItem.data('768-1024') !== false) {
                        ipadLandscape = thisItem.data('768-1024');
                    }
                    if (typeof thisItem.data('600-768') !== 'undefined' && thisItem.data('600-768') !== false) {
                        ipadPortrait = thisItem.data('600-768');
                    }
                    if (typeof thisItem.data('480-600') !== 'undefined' && thisItem.data('480-600') !== false) {
                        mobileLandscape = thisItem.data('480-600');
                    }
                    if (typeof thisItem.data('480') !== 'undefined' && thisItem.data('480') !== false) {
                        mobilePortrait = thisItem.data('480');
                    }

                    if (largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {


                        if (largeLaptop.length) {
                            responsiveStyle += "@media only screen and (min-width: 1280px) and (max-width: 1600px) {.qodef-elements-holder-item-content." + itemClass + " { padding: " + largeLaptop + " !important; } }";
                        }
                        if (smallLaptop.length) {
                            responsiveStyle += "@media only screen and (min-width: 1024px) and (max-width: 1280px) {.qodef-elements-holder-item-content." + itemClass + " { padding: " + smallLaptop + " !important; } }";
                        }
                        if (ipadLandscape.length) {
                            responsiveStyle += "@media only screen and (min-width: 768px) and (max-width: 1024px) {.qodef-elements-holder-item-content." + itemClass + " { padding: " + ipadLandscape + " !important; } }";
                        }
                        if (ipadPortrait.length) {
                            responsiveStyle += "@media only screen and (min-width: 600px) and (max-width: 768px) {.qodef-elements-holder-item-content." + itemClass + " { padding: " + ipadPortrait + " !important; } }";
                        }
                        if (mobileLandscape.length) {
                            responsiveStyle += "@media only screen and (min-width: 480px) and (max-width: 600px) {.qodef-elements-holder-item-content." + itemClass + " { padding: " + mobileLandscape + " !important; } }";
                        }
                        if (mobilePortrait.length) {
                            responsiveStyle += "@media only screen and (max-width: 480px) {.qodef-elements-holder-item-content." + itemClass + " { padding: " + mobilePortrait + " !important; } }";
                        }
                    }
                });

                if (responsiveStyle.length) {
                    style = '<style type="text/css" data-type="geko_qodef_shortcodes_custom_css">' + responsiveStyle + '</style>';
                }

                if (style.length) {
                    $('head').append(style);
                }
            });
        }
    }

    // Icon appearing
    function qodefServiceTable() {
        if ($(".qodef-service-table").length) {

            $(".qodef-service-table .qodef-mark").each(function () {

                var serviceTableIcon = $(this);

                serviceTableIcon.appear(function () {
                    setTimeout(function () {
                        serviceTableIcon.addClass("qodef-service-table-icon-appeared");
                    }, 200 * serviceTableIcon.closest("tr").index());
                }, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
            });
        }
    }


})(jQuery);