(function ($) {
    "use strict";

    var common = {};
    qodef.modules.common = common;

    common.qodefIsTouchDevice = qodefIsTouchDevice;
    common.qodefDisableSmoothScrollForMac = qodefDisableSmoothScrollForMac;
    common.qodefFluidVideo = qodefFluidVideo;
    common.qodefPreloadBackgrounds = qodefPreloadBackgrounds;
    common.qodefPrettyPhoto = qodefPrettyPhoto;
    common.qodefCheckHeaderStyleOnScroll = qodefCheckHeaderStyleOnScroll;
    common.qodefInitParallax = qodefInitParallax;
    common.qodefInitFullScreenSection = qodefInitFullScreenSection;
    //common.qodefSmoothScroll = qodefSmoothScroll;
    common.qodefEnableScroll = qodefEnableScroll;
    common.qodefDisableScroll = qodefDisableScroll;
    common.qodefWheel = qodefWheel;
    common.qodefKeydown = qodefKeydown;
    common.qodefPreventDefaultValue = qodefPreventDefaultValue;
    common.qodefOwlSlider = qodefOwlSlider;
    common.qodefInitSelfHostedVideoPlayer = qodefInitSelfHostedVideoPlayer;
    common.qodefSelfHostedVideoSize = qodefSelfHostedVideoSize;
    common.qodefInitBackToTop = qodefInitBackToTop;
    common.qodefBackButtonShowHide = qodefBackButtonShowHide;
    common.qodefSmoothTransition = qodefSmoothTransition;
    common.qodefSetFooterColumnsHeight = qodefSetFooterColumnsHeight;

    common.qodefOnDocumentReady = qodefOnDocumentReady;
    common.qodefOnWindowLoad = qodefOnWindowLoad;
    common.qodefOnWindowResize = qodefOnWindowResize;
    common.qodefOnWindowScroll = qodefOnWindowScroll;

    $(document).ready(qodefOnDocumentReady);
    $(window).on('load',qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);
    $(window).scroll(qodefOnWindowScroll);

    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefIsTouchDevice();
        qodefDisableSmoothScrollForMac();
        qodefFluidVideo();
        qodefPreloadBackgrounds();
        qodefPrettyPhoto();
        qodefInitElementsAnimations();
        qodefInitAnchor().init();
        qodefInitVideoBackground();
        qodefSetContentBottomMargin();
        //qodefSmoothScroll();
        qodefOwlSlider();
        qodefInitSelfHostedVideoPlayer();
        qodefSelfHostedVideoSize();
        qodefInitBackToTop();
        qodefBackButtonShowHide();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function qodefOnWindowLoad() {
        qodefCheckHeaderStyleOnScroll(); //called on load since all content needs to be loaded in order to calculate row's position right
        qodefInitFullScreenSection();
        qodefInitVideoBackgroundSize();
        qodefInitParallax();
        qodefSmoothTransition();
        qodefSetFooterColumnsHeight();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function qodefOnWindowResize() {
        qodefInitVideoBackgroundSize();
        qodefSelfHostedVideoSize();
        qodefSetFooterColumnsHeight();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function qodefOnWindowScroll() {

    }

    /*
     ** Disable shortcodes animation on appear for touch devices
     */
    function qodefIsTouchDevice() {
        if (Modernizr.touch && !qodef.body.hasClass('qodef-no-animations-on-touch')) {
            qodef.body.addClass('qodef-no-animations-on-touch');
        }
    }

    /*
     ** Disable smooth scroll for mac if smooth scroll is enabled
     */
    function qodefDisableSmoothScrollForMac() {
        var os = navigator.appVersion.toLowerCase();

        if (os.indexOf('mac') > -1 && qodef.body.hasClass('qodef-smooth-scroll')) {
            qodef.body.removeClass('qodef-smooth-scroll');
        }
    }

    function qodefFluidVideo() {
        fluidvids.init({
            selector: ['iframe'],
            players: ['www.youtube.com', 'player.vimeo.com']
        });
    }

    /**
     * Init Owl Carousel
     */
    function qodefOwlSlider() {

        var sliders = $('.qodef-owl-slider');

        if (sliders.length) {
            sliders.each(function () {

                var slider = $(this);
                slider.owlCarousel({
                    items: 1,
                    loop: true,
                    autoplay: false,
                    dots: false,
                    nav: true,
                    navText: [
                        '<span class="qodef-prev-icon"><i class="arrow_left"></i></span>',
                        '<span class="qodef-next-icon"><i class="arrow_right"></i></span>'
                    ]
                });

            });
        }

    }


    /*
     *	Preload background images for elements that have 'qodef-preload-background' class
     */
    function qodefPreloadBackgrounds() {

        $(".qodef-preload-background").each(function () {
            var preloadBackground = $(this);
            if (preloadBackground.css("background-image") !== "" && preloadBackground.css("background-image") !== "none") {

                var bgUrl = preloadBackground.attr('style');

                bgUrl = bgUrl.match(/url\(["']?([^'")]+)['"]?\)/);
                bgUrl = bgUrl ? bgUrl[1] : "";

                if (bgUrl) {
                    var backImg = new Image();
                    backImg.src = bgUrl;
                    $(backImg).on('load',function () {
                        preloadBackground.removeClass('qodef-preload-background');
                    });
                }
            } else {
                $(window).on('load',function () {
                    preloadBackground.removeClass('qodef-preload-background');
                }); //make sure that qodef-preload-background class is removed from elements with forced background none in css
            }
        });
    }

    function qodefPrettyPhoto() {
        /*jshint multistr: true */
        var markupWhole = '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                            <div class="pp_right"> \
                                <div class="pp_content"> \
                                    <div class="pp_loaderIcon"></div> \
                                    <div class="pp_fade"> \
                                        <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                                        <div class="pp_hoverContainer"> \
                                            <a class="pp_next" href="#"><span class="arrow_right"></span></a> \
                                            <a class="pp_previous" href="#"><span class="arrow_left"></span></a> \
                                        </div> \
                                        <div id="pp_full_res"></div> \
                                        <div class="pp_details"> \
                                            <div class="pp_nav"> \
                                                <a href="#" class="pp_arrow_previous">Previous</a> \
                                                <p class="currentTextHolder">0/0</p> \
                                                <a href="#" class="pp_arrow_next">Next</a> \
                                            </div> \
                                            <p class="pp_description"></p> \
                                            {pp_social} \
                                            <a class="pp_close" href="#">Close</a> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>';

        $("a[data-rel^='prettyPhoto']").prettyPhoto({
            hook: 'data-rel',
            animation_speed: 'normal', /* fast/slow/normal */
            slideshow: false, /* false OR interval time in ms */
            autoplay_slideshow: false, /* true/false */
            opacity: 0.80, /* Value between 0 and 1 */
            show_title: true, /* true/false */
            allow_resize: true, /* Resize the photos bigger than viewport. true/false */
            horizontal_padding: 0,
            default_width: 960,
            default_height: 540,
            counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
            theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
            hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
            wmode: 'opaque', /* Set the flash wmode attribute */
            autoplay: true, /* Automatically start videos: True/False */
            modal: false, /* If set to true, only the close button will close the window */
            overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
            deeplinking: false,
            custom_markup: '',
            social_tools: false,
            markup: markupWhole
        });
    }

    /*
     *	Check header style on scroll, depending on row settings
     */
    function qodefCheckHeaderStyleOnScroll() {

        if ($('[data-qodef_header_style]').length > 0 && qodef.body.hasClass('qodef-header-style-on-scroll')) {

            var waypointSelectors = $('.wpb_row.qodef-section');
            var changeStyle = function (element) {
                (element.data("qodef_header_style") !== undefined) ? qodef.body.removeClass('qodef-dark-header qodef-light-header').addClass(element.data("qodef_header_style")) : qodef.body.removeClass('qodef-dark-header qodef-light-header').addClass('' + qodef.defaultHeaderStyle);
            };

            waypointSelectors.waypoint(function (direction) {
                if (direction === 'down') {
                    changeStyle($(this.element));
                }
            }, {offset: 0});

            waypointSelectors.waypoint(function (direction) {
                if (direction === 'up') {
                    changeStyle($(this.element));
                }
            }, {
                offset: function () {
                    return -$(this.element).outerHeight();
                }
            });
        }
    }

    /*
     *	Start animations on elements
     */
    function qodefInitElementsAnimations() {

        var touchClass = $('.qodef-no-animations-on-touch'),
            noAnimationsOnTouch = true,
            elements = $('.qodef-grow-in, .qodef-fade-in-down, .qodef-element-from-fade, .qodef-element-from-left, .qodef-element-from-right, .qodef-element-from-top, .qodef-element-from-bottom, .qodef-flip-in, .qodef-x-rotate, .qodef-z-rotate, .qodef-y-translate, .qodef-fade-in, .qodef-fade-in-left-x-rotate'),
            clasess,
            animationClass,
            animationData;

        if (touchClass.length) {
            noAnimationsOnTouch = false;
        }

        if (elements.length > 0 && noAnimationsOnTouch) {
            elements.each(function () {
                $(this).appear(function () {
                    animationData = $(this).data('animation');
                    if (typeof animationData !== 'undefined' && animationData !== '') {
                        animationClass = animationData;
                        $(this).addClass(animationClass + '-on');
                    }
                }, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
            });
        }

    }


    /*
     ** Sections with parallax background image
     */
    function qodefInitParallax() {

        if (qodef.htmlEl.is('.no-touch') && $('.qodef-parallax-section-holder').length) {

            $('.qodef-parallax-section-holder').each(function () {

                var parallaxElement = $(this);

                var speed = parallaxElement.data('qodef-parallax-speed') * 0.4;

                parallaxElement.parallax("50%", speed);
            });
        }
    }

    /*
     ** Sections with parallax background image
     */
    function qodefInitFullScreenSection() {
        if ($('.qodef-full-screen-height-section').length) {
            $('.qodef-full-screen-height-section').each(function () {
                var fullScreenSection = $(this);
                fullScreenSection.height(qodef.windowHeight);
            });
        }
    }

    /*
     **	Anchor functionality
     */
    var qodefInitAnchor = qodef.modules.common.qodefInitAnchor = function () {

        /**
         * Set active state on clicked anchor
         * @param anchor, clicked anchor
         */
        var setActiveState = function (anchor) {

            $('.qodef-main-menu .qodef-active-item, .qodef-mobile-nav .qodef-active-item, .qodef-vertical-menu .qodef-active-item, .qodef-fullscreen-menu .qodef-active-item').removeClass('qodef-active-item');
            anchor.parent().addClass('qodef-active-item');

            $('.qodef-main-menu a, .qodef-mobile-nav a, .qodef-vertical-menu a, .qodef-fullscreen-menu a').removeClass('current');
            anchor.addClass('current');

            $(document).trigger('scrollHashTriggered');
        };

        /**
         * Check anchor active state on scroll
         */
        var checkActiveStateOnScroll = function () {

            $('[data-qodef-anchor]').each(function () {
                var thisAnchor = $(this);
                thisAnchor.waypoint(function (direction) {
                    if (direction === 'down') {
                        setActiveState($("a[href='" + window.location.href.split('#')[0] + "#" + thisAnchor.data("qodef-anchor") + "']"));
                    }
                }, {
                    offset: function () {
                        /* Check for header height (mobile or initial) */
                        var offset;
                        /* Check if there is vertical align in container enabled for parallax row as it adds display table and offset is changed. +1 is for calculation because of anchor point 0 height */
                        if (qodef.windowWidth > 1024) {
                            offset = qodefGlobalVars.vars.qodefMenuAreaHeight;
                            if (qodef.modules.header.behaviour === 'qodef-fixed-on-scroll' && qodef.body.hasClass('qodef-animate-fixed-header-on-scroll-yes')) {
                                offset = offset * 0.8 - 1; /* 1 is for border bottom */
                            }
                            if (thisAnchor.parents('.qodef-vertical-middle-align').length > 0) {
                                offset = qodef.windowWidth + offset;
                            }
                        } else {
                            offset = 0;
                        }
                        return offset;
                    }
                });

                thisAnchor.waypoint(function (direction) {
                    if (direction === 'up') {
                        setActiveState($("a[href='" + window.location.href.split('#')[0] + "#" + thisAnchor.data("qodef-anchor") + "']"));
                    }
                }, {
                    offset: function () {
                        var offset;
                        /* Check for header height (mobile or initial) */
                        offset = -10;
                        /* Check if there is vertical align in container enabled for parallax row as it adds display table and offset is changed. +1 is for calculation because of anchor point 0 height */
                        if (thisAnchor.parents('.qodef-vertical-middle-align').length > 0) {
                            offset = qodef.windowWidth + offset;
                        }
                        return offset;
                    }
                });
            });

        };

        /**
         * Check anchor active state on load
         */
        var checkActiveStateOnLoad = function () {
            var hash = window.location.hash.split('#')[1];

            if (hash !== "" && $('[data-qodef-anchor="' + hash + '"]').length > 0) {
                //triggers click which is handled in 'anchorClick' function
                var linkURL = window.location.href.split('#')[0] + "#" + hash;
                if ($("a[href='" + linkURL + "']").length) { //if there is a link on page with such href
                    $("a[href='" + linkURL + "']").trigger("click");
                    setActiveState($("a[href='" + linkURL + "']"));
                } else { //than create a fake link and click it
                    var link = $('<a/>').attr({'href': linkURL, 'class': 'qodef-anchor'}).appendTo('body');
                    link.trigger('click');
                }
                $(document).trigger('loadHashTriggered');
            }
        };

        /**
         * Calculate header height to be substract from scroll amount
         * @param anchoredElementOffset, anchorded element offest
         */
        var headerHeihtToSubtract = function (anchoredElementOffset, anchoredElementPosition) {

            var headerHeight;
            if (qodef.windowWidth > 1024) {

                if (qodef.modules.header.behaviour === 'qodef-sticky-header-on-scroll-down-up' || qodef.modules.header.behaviour === 'qodef-sticky-header-on-scroll-up') {
                    if (qodef.modules.header.behaviour === 'qodef-sticky-header-on-scroll-down-up') {
                        (anchoredElementOffset > qodef.modules.header.stickyAppearAmount) ? qodef.modules.header.isStickyVisible = true : qodef.modules.header.isStickyVisible = false;
                    }

                    if (qodef.modules.header.behaviour === 'qodef-sticky-header-on-scroll-up') {
                        (anchoredElementOffset > qodef.scroll) ? qodef.modules.header.isStickyVisible = false : '';
                    }

                    headerHeight = qodef.modules.header.isStickyVisible ? qodefGlobalVars.vars.qodefStickyHeaderTransparencyHeight : qodefPerPageVars.vars.qodefHeaderTransparencyHeight;
                }

                if (qodef.modules.header.behaviour === 'qodef-fixed-on-scroll') {
                    headerHeight = qodefPerPageVars.vars.qodefHeaderTransparencyHeight;
                    if (qodef.body.hasClass('qodef-animate-fixed-header-on-scroll-yes') && anchoredElementOffset > headerHeight) {
                        headerHeight = headerHeight * 0.8 - 1; /* 1 is for header border bottom */
                    }
                }
            } else {
                if (anchoredElementPosition === 'down') {
                    headerHeight = anchoredElementOffset > qodef.modules.header.stickyMobileAppearAmount ? 0 : qodef.modules.header.stickyMobileAppearAmount;
                } else {
                    headerHeight = qodefGlobalVars.vars.qodefMobileHeaderHeight;
                }
            }
            return headerHeight;
        };

        /**
         * Handle anchor click
         */
        var anchorClick = function () {
            qodef.document.on("click", ".qodef-main-menu a, .qodef-vertical-menu a, .qodef-fullscreen-menu a, .qodef-btn, .qodef-anchor, .qodef-mobile-nav a", function () {
                var scrollAmount;
                var anchor = $(this);
                var hash = anchor.prop("hash").split('#')[1];

                if (hash !== "" && $('[data-qodef-anchor="' + hash + '"]').length > 0 /*&& anchor.attr('href').split('#')[0] === window.location.href.split('#')[0]*/) {

                    var anchoredElementOffset = $('[data-qodef-anchor="' + hash + '"]').offset().top;
                    var anchoredElementPosition = anchoredElementOffset > qodef.scroll ? 'down' : 'up';
                    scrollAmount = $('[data-qodef-anchor="' + hash + '"]').offset().top - headerHeihtToSubtract(anchoredElementOffset, anchoredElementPosition);


                    qodef.html.stop().animate({
                        scrollTop: Math.round(scrollAmount)
                    }, 1000, function () {
                        //change hash tag in url
                        if (history.replaceState) {
                            history.replaceState(null, null, '#' + hash);
                        }
                    });
                    return false;
                }
            });
        };

        return {
            init: function () {
                if ($('[data-qodef-anchor]').length) {
                    anchorClick();
                    checkActiveStateOnScroll();
                    $(window).on('load',function () {
                        checkActiveStateOnLoad();
                    });
                }
            }
        };

    };

    /*
     **	Video background initialization
     */
    function qodefInitVideoBackground() {

        $('.qodef-section .qodef-video-wrap .qodef-video').mediaelementplayer({
            enableKeyboard: false,
            iPadUseNativeControls: false,
            pauseOtherPlayers: false,
            // force iPhone's native controls
            iPhoneUseNativeControls: false,
            // force Android's native controls
            AndroidUseNativeControls: false
        });

        //mobile check
        if (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
            qodefInitVideoBackgroundSize();
            $('.qodef-section .qodef-mobile-video-image').show();
            $('.qodef-section .qodef-video-wrap').remove();
        }
    }

    /*
     **	Calculate video background size
     */
    function qodefInitVideoBackgroundSize() {

        $('.qodef-section .qodef-video-wrap').each(function () {

            var element = $(this);
            var sectionWidth = element.closest('.qodef-section').outerWidth();
            element.width(sectionWidth);

            var sectionHeight = element.closest('.qodef-section').outerHeight();
            qodef.minVideoWidth = qodef.videoRatio * (sectionHeight + 20);
            element.height(sectionHeight);

            var scaleH = sectionWidth / qodef.videoWidthOriginal;
            var scaleV = sectionHeight / qodef.videoHeightOriginal;
            var scale = scaleV;
            if (scaleH > scaleV)
                scale = scaleH;
            if (scale * qodef.videoWidthOriginal < qodef.minVideoWidth) {
                scale = qodef.minVideoWidth / qodef.videoWidthOriginal;
            }

            element.find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * qodef.videoWidthOriginal + 2));
            element.find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * qodef.videoHeightOriginal + 2));
            element.scrollLeft((element.find('video').width() - sectionWidth) / 2);
            element.find('.mejs-overlay, .mejs-poster').scrollTop((element.find('video').height() - (sectionHeight)) / 2);
            element.scrollTop((element.find('video').height() - sectionHeight) / 2);
        });

    }

    /*
     **	Set content bottom margin because of the uncovering footer
     */
    function qodefSetContentBottomMargin() {
        var uncoverFooter = $('.qodef-footer-uncover');

        if (uncoverFooter.length) {
            $('.qodef-content').css('margin-bottom', $('.qodef-footer-inner').height());
        }
    }

    /*
    ** Initiate Smooth Scroll
    */
    //function qodefSmoothScroll(){
    //
    //	if(qodef.body.hasClass('qodef-smooth-scroll')){
    //
    //		var scrollTime = 0.4;			//Scroll time
    //		var scrollDistance = 300;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
    //
    //		var mobile_ie = -1 !== navigator.userAgent.indexOf("IEMobile");
    //
    //		var smoothScrollListener = function(event){
    //			event.preventDefault();
    //
    //			var delta = event.wheelDelta / 120 || -event.detail / 3;
    //			var scrollTop = qodef.window.scrollTop();
    //			var finalScroll = scrollTop - parseInt(delta * scrollDistance);
    //
    //			TweenLite.to(qodef.window, scrollTime, {
    //				scrollTo: {
    //					y: finalScroll, autoKill: !0
    //				},
    //				ease: Power1.easeOut,
    //				autoKill: !0,
    //				overwrite: 5
    //			});
    //		};
    //
    //		if (!$('html').hasClass('touch') && !mobile_ie) {
    //			if (window.addEventListener) {
    //				window.addEventListener('mousewheel', smoothScrollListener, false);
    //				window.addEventListener('DOMMouseScroll', smoothScrollListener, false);
    //			}
    //		}
    //	}
    //}

    function qodefDisableScroll() {

        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', qodefWheel, false);
        }
        window.onmousewheel = document.onmousewheel = qodefWheel;
        document.onkeydown = qodefKeydown;

        if (qodef.body.hasClass('qodef-smooth-scroll')) {
            window.removeEventListener('mousewheel', smoothScrollListener, false);
            window.removeEventListener('DOMMouseScroll', smoothScrollListener, false);
        }
    }

    function qodefEnableScroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', qodefWheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;

        if (qodef.body.hasClass('qodef-smooth-scroll')) {
            window.addEventListener('mousewheel', smoothScrollListener, false);
            window.addEventListener('DOMMouseScroll', smoothScrollListener, false);
        }
    }

    function qodefWheel(e) {
        qodefPreventDefaultValue(e);
    }

    function qodefKeydown(e) {
        var keys = [37, 38, 39, 40];

        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                qodefPreventDefaultValue(e);
                return;
            }
        }
    }

    function qodefPreventDefaultValue(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }

    function qodefInitSelfHostedVideoPlayer() {

        var players = $('.qodef-self-hosted-video');
        players.mediaelementplayer({
            audioWidth: '100%'
        });
    }

    function qodefSelfHostedVideoSize() {

        $('.qodef-self-hosted-video-holder .qodef-video-wrap').each(function () {
            var thisVideo = $(this);

            var videoWidth = thisVideo.closest('.qodef-self-hosted-video-holder').outerWidth();
            var videoHeight = videoWidth / qodef.videoRatio;

            if (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
                thisVideo.parent().width(videoWidth);
                thisVideo.parent().height(videoHeight);
            }

            thisVideo.width(videoWidth);
            thisVideo.height(videoHeight);

            thisVideo.find('video, .mejs-overlay, .mejs-poster').width(videoWidth);
            thisVideo.find('video, .mejs-overlay, .mejs-poster').height(videoHeight);
        });
    }

    function qodefToTopButton(a) {

        var b = $("#qodef-back-to-top");
        b.removeClass('off on');
        if (a === 'on') {
            b.addClass('on');
        } else {
            b.addClass('off');
        }
    }

    function qodefBackButtonShowHide() {
        qodef.window.scroll(function () {
            var b = $(this).scrollTop();
            var c = $(this).height();
            var d;
            if (b > 0) {
                d = b + c / 2;
            } else {
                d = 1;
            }
            if (d < 1e3) {
                qodefToTopButton('off');
            } else {
                qodefToTopButton('on');
            }
        });
    }

    function qodefInitBackToTop() {
        var backToTopButton = $('#qodef-back-to-top');
        backToTopButton.on('click', function (e) {
            e.preventDefault();
            qodef.html.animate({scrollTop: 0}, qodef.window.scrollTop() / 3, 'linear');
        });
    }

    function qodefSmoothTransition() {
        var loader = $('body > .qodef-smooth-transition-loader.qodef-mimic-ajax');
        if (loader.length) {
            loader.fadeOut(500);
            $(window).on("pageshow", function (event) {
                if (event.originalEvent.persisted) {
                    loader.fadeOut(500);
                }
            });

            $('a').on('click', function (e) {
                var a = $(this);
                if (
                    e.which === 1 && // check if the left mouse button has been pressed
                    a.attr('href').indexOf(window.location.host) >= 0 && // check if the link is to the same domain
                    (typeof a.data('rel') === 'undefined') && //Not pretty photo link
                    (typeof a.attr('rel') === 'undefined') && //Not VC pretty photo link
                    !a.hasClass('qodef-like') && //Not like link
                    (typeof a.attr('target') === 'undefined' || a.attr('target') === '_self') && // check if the link opens in the same window
                    (a.attr('href').split('#')[0] !== window.location.href.split('#')[0]) // check if it is an anchor aiming for a different page
                ) {
                    e.preventDefault();
                    loader.addClass('qodef-hide-spinner');
                    loader.fadeIn(500, function () {
                        window.location = a.attr('href');
                    });
                }
            });
        }
    }

    function qodefSetFooterColumnsHeight() {
        var breakpointTwoCols = 1024;
        var column = $('.qodef-footer-top').find('.qodef-column');
        var height = -1;

        if (qodef.body.hasClass('qodef-header-vertical')) {
            breakpointTwoCols = 1300;
        }
        if (qodef.windowWidth < breakpointTwoCols && qodef.windowWidth > 600) {
            var heightRow1 = -1;
            var heightRow2 = -1;
            if ($('.qodef-footer-top').find('.qodef-four-columns')) {
                heightRow1 = column.eq(0).innerHeight() > column.eq(1).innerHeight() ? column.eq(0).innerHeight() : column.eq(1).innerHeight();
                heightRow2 = column.eq(2).innerHeight() > column.eq(3).innerHeight() ? column.eq(2).innerHeight() : column.eq(3).innerHeight();
            }
            column.eq(0).css('min-height', 0).css('min-height', heightRow1);
            column.eq(1).css('min-height', 0).css('min-height', heightRow1);
            column.eq(2).css('min-height', 0).css('min-height', heightRow2);
            column.eq(3).css('min-height', 0).css('min-height', heightRow2);
        } else {
            column.each(function () {
                if ($(this).height() > height) {
                    height = $(this).innerHeight();
                }
            });
            $(".qodef-footer-top .qodef-column").css('min-height', 0).css('min-height', height);
        }
    }

})(jQuery);


