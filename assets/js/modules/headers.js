(function ($) {
    "use strict";

    var header = {};
    qodef.modules.header = header;

    header.isStickyVisible = false;
    header.stickyAppearAmount = 0;
    header.stickyMobileAppearAmount = 0;
    header.behaviour;
    header.qodefSideArea = qodefSideArea;
    header.qodefSideAreaScroll = qodefSideAreaScroll;
    header.qodefFullscreenMenu = qodefFullscreenMenu;
    header.qodefInitMobileNavigation = qodefInitMobileNavigation;
    header.qodefMobileHeaderBehavior = qodefMobileHeaderBehavior;
    header.qodefSetDropDownMenuPosition = qodefSetDropDownMenuPosition;
    header.qodefDropDownMenu = qodefDropDownMenu;
    header.qodefSearch = qodefSearch;

    header.qodefOnDocumentReady = qodefOnDocumentReady;
    header.qodefOnWindowLoad = qodefOnWindowLoad;
    header.qodefOnWindowResize = qodefOnWindowResize;
    header.qodefOnWindowScroll = qodefOnWindowScroll;

    $(document).ready(qodefOnDocumentReady);
    $(window).on('load',qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);
    $(window).scroll(qodefOnWindowScroll);

    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefHeaderBehaviour();
        qodefSideArea();
        qodefSideAreaScroll();
        qodefFullscreenMenu();
        qodefInitMobileNavigation();
        qodefMobileHeaderBehavior();
        qodefSetDropDownMenuPosition();
        qodefDropDownMenu();
        qodefSearch();
        qodefVerticalMenu().init();
        qodefMenuUnderline();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function qodefOnWindowLoad() {
        qodefSetDropDownMenuPosition();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function qodefOnWindowResize() {
        qodefDropDownMenu();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function qodefOnWindowScroll() {

    }


    /*
     **	Show/Hide sticky header on window scroll
     */
    function qodefHeaderBehaviour() {

        var header = $('.qodef-page-header');
        var stickyHeader = $('.qodef-sticky-header');
        var fixedHeaderWrapper = $('.qodef-fixed-wrapper');

        var headerMenuAreaOffset = $('.qodef-page-header').find('.qodef-fixed-wrapper').length ? $('.qodef-page-header').find('.qodef-fixed-wrapper').offset().top : null;

        var stickyAppearAmount;


        switch (true) {
            // sticky header that will be shown when user scrolls up
            case qodef.body.hasClass('qodef-sticky-header-on-scroll-up'):
                qodef.modules.header.behaviour = 'qodef-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = qodefGlobalVars.vars.qodefTopBarHeight + qodefGlobalVars.vars.qodefLogoAreaHeight + qodefGlobalVars.vars.qodefMenuAreaHeight + qodefGlobalVars.vars.qodefStickyHeaderHeight;

                var headerAppear = function () {
                    var docYScroll2 = $(document).scrollTop();

                    if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        qodef.modules.header.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.qodef-main-menu .second').removeClass('qodef-drop-down-start');
                    } else {
                        qodef.modules.header.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                    }

                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();

                $(window).scroll(function () {
                    headerAppear();
                });

                break;

            // sticky header that will be shown when user scrolls both up and down
            case qodef.body.hasClass('qodef-sticky-header-on-scroll-down-up'):
                qodef.modules.header.behaviour = 'qodef-sticky-header-on-scroll-down-up';

                if (qodefPerPageVars.vars.qodefStickyScrollAmount !== 0) {
                    qodef.modules.header.stickyAppearAmount = qodefPerPageVars.vars.qodefStickyScrollAmount;
                } else {
                    qodef.modules.header.stickyAppearAmount = qodefGlobalVars.vars.qodefStickyScrollAmount !== 0 ? qodefGlobalVars.vars.qodefStickyScrollAmount : qodefGlobalVars.vars.qodefTopBarHeight + qodefGlobalVars.vars.qodefLogoAreaHeight + qodefGlobalVars.vars.qodefMenuAreaHeight;
                }

                var headerAppear = function () {
                    if (qodef.scroll < qodef.modules.header.stickyAppearAmount) {
                        qodef.modules.header.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.qodef-main-menu .second').removeClass('qodef-drop-down-start');
                    } else {
                        qodef.modules.header.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                    }
                };

                headerAppear();

                $(window).scroll(function () {
                    headerAppear();
                });

                break;

            // on scroll down, part of header will be sticky
            case qodef.body.hasClass('qodef-fixed-on-scroll'):
                qodef.modules.header.behaviour = 'qodef-fixed-on-scroll';
                var headerFixed = function () {
                    if (qodef.scroll < headerMenuAreaOffset) {
                        fixedHeaderWrapper.removeClass('fixed');
                        header.css('margin-bottom', 0);
                    } else {
                        fixedHeaderWrapper.addClass('fixed');
                        header.css('margin-bottom', fixedHeaderWrapper.height());
                    }
                };

                headerFixed();

                $(window).scroll(function () {
                    headerFixed();
                });

                break;
        }
    }

    /**
     * Show/hide side area
     */
    function qodefSideArea() {

        var wrapper = $('.qodef-wrapper'),
            sideMenu = $('.qodef-side-menu'),
            sideMenuButtonOpen = $('a.qodef-side-menu-button-opener'),
            cssClass,
            //Flags
            slideFromRight = false,
            slideWithContent = false,
            slideUncovered = false;

        if (qodef.body.hasClass('qodef-side-menu-slide-from-right')) {
            $('.qodef-cover').remove();
            cssClass = 'qodef-right-side-menu-opened';
            wrapper.prepend('<div class="qodef-cover"/>');
            slideFromRight = true;

        } else if (qodef.body.hasClass('qodef-side-menu-slide-with-content')) {

            cssClass = 'qodef-side-menu-open';
            slideWithContent = true;

        } else if (qodef.body.hasClass('qodef-side-area-uncovered-from-content')) {

            cssClass = 'qodef-right-side-menu-opened';
            slideUncovered = true;

        }

        $('a.qodef-side-menu-button-opener, a.qodef-close-side-menu').on('click', function (e) {
            e.preventDefault();

            if (!sideMenuButtonOpen.hasClass('opened')) {

                sideMenuButtonOpen.addClass('opened');
                qodef.body.addClass(cssClass);

                if (slideFromRight) {
                    $('.qodef-wrapper .qodef-cover').on('click', function () {
                        qodef.body.removeClass('qodef-right-side-menu-opened');
                        sideMenuButtonOpen.removeClass('opened');
                    });
                }

                if (slideUncovered) {
                    sideMenu.css({
                        'visibility': 'visible'
                    });
                }

                var currentScroll = $(window).scrollTop();
                $(window).scroll(function () {
                    if (Math.abs(qodef.scroll - currentScroll) > 400) {
                        qodef.body.removeClass(cssClass);
                        sideMenuButtonOpen.removeClass('opened');
                        if (slideUncovered) {
                            var hideSideMenu = setTimeout(function () {
                                sideMenu.css({'visibility': 'hidden'});
                                clearTimeout(hideSideMenu);
                            }, 400);
                        }
                    }
                });

            } else {

                sideMenuButtonOpen.removeClass('opened');
                qodef.body.removeClass(cssClass);
                if (slideUncovered) {
                    var hideSideMenu = setTimeout(function () {
                        sideMenu.css({'visibility': 'hidden'});
                        clearTimeout(hideSideMenu);
                    }, 400);
                }

            }

            if (slideWithContent) {

                e.stopPropagation();
                wrapper.on('click', function () {
                    e.preventDefault();
                    sideMenuButtonOpen.removeClass('opened');
                    qodef.body.removeClass('qodef-side-menu-open');
                });

            }

        });

    }

    /*
    **  Smooth scroll functionality for Side Area
    */
    function qodefSideAreaScroll() {

        var sideMenu = $('.qodef-side-menu');

        if (sideMenu.length) {
            sideMenu.niceScroll({
                scrollspeed: 60,
                mousescrollstep: 40,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            });
        }
    }

    /**
     * Init Fullscreen Menu
     */
    function qodefFullscreenMenu() {

        if ($('a.qodef-fullscreen-menu-opener').length) {

            var popupMenuOpener = $('a.qodef-fullscreen-menu-opener'),
                popupMenuHolderOuter = $(".qodef-fullscreen-menu-holder-outer"),
                cssClass,
                //Flags for type of animation
                fadeRight = false,
                fadeTop = false,
                //Widgets
                widgetAboveNav = $('.qodef-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.qodef-fullscreen-below-menu-widget-holder'),
                //Menu
                menuItems = $('.qodef-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild = $('.qodef-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = $('.qodef-fullscreen-menu ul li:not(.has_sub) a');


            //set height of popup holder and initialize nicescroll
            popupMenuHolderOuter.height(qodef.windowHeight).niceScroll({
                scrollspeed: 30,
                mousescrollstep: 20,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            }); //200 is top and bottom padding of holder

            //set height of popup holder on resize
            $(window).resize(function () {
                popupMenuHolderOuter.height(qodef.windowHeight);
            });

            if (qodef.body.hasClass('qodef-fade-push-text-right')) {
                cssClass = 'qodef-push-nav-right';
                fadeRight = true;
            } else if (qodef.body.hasClass('qodef-fade-push-text-top')) {
                cssClass = 'qodef-push-text-top';
                fadeTop = true;
            }

            //Appearing animation
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay': 0 + 'ms',
                        '-moz-animation-delay': 0 + 'ms',
                        'animation-delay': 0 + 'ms'
                    });
                }
                menuItems.each(function (i) {
                    $(this).css({
                        '-webkit-animation-delay': (i + 1) * 70 + 'ms',
                        '-moz-animation-delay': (i + 1) * 70 + 'ms',
                        'animation-delay': (i + 1) * 70 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay': (menuItems.length + 1) * 70 + 'ms',
                        '-moz-animation-delay': (menuItems.length + 1) * 70 + 'ms',
                        'animation-delay': (menuItems.length + 1) * 70 + 'ms'
                    });
                }
            }

            // Open popup menu
            popupMenuOpener.on('click', function (e) {
                e.preventDefault();

                if (!popupMenuOpener.hasClass('opened')) {
                    popupMenuOpener.addClass('opened');
                    qodef.body.addClass('qodef-fullscreen-menu-opened');
                    qodef.body.removeClass('qodef-fullscreen-fade-out').addClass('qodef-fullscreen-fade-in');
                    qodef.body.removeClass(cssClass);
                    if (!qodef.body.hasClass('page-template-full_screen-php')) {
                        qodef.modules.common.qodefDisableScroll();
                    }
                    $(document).keyup(function (e) {
                        if (e.keyCode === 27) {
                            popupMenuOpener.removeClass('opened');
                            qodef.body.removeClass('qodef-fullscreen-menu-opened');
                            qodef.body.removeClass('qodef-fullscreen-fade-in').addClass('qodef-fullscreen-fade-out');
                            qodef.body.addClass(cssClass);
                            if (!qodef.body.hasClass('page-template-full_screen-php')) {
                                qodef.modules.common.qodefEnableScroll();
                            }
                            $("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(200, function () {
                                $('nav.popup_menu').getNiceScroll().resize();
                            });
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('opened');
                    qodef.body.removeClass('qodef-fullscreen-menu-opened');
                    qodef.body.removeClass('qodef-fullscreen-fade-in').addClass('qodef-fullscreen-fade-out');
                    qodef.body.addClass(cssClass);
                    if (!qodef.body.hasClass('page-template-full_screen-php')) {
                        qodef.modules.common.qodefEnableScroll();
                    }
                    $("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(200, function () {
                        $('nav.popup_menu').getNiceScroll().resize();
                    });
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function (e) {
                e.preventDefault();

                if ($(this).parent().hasClass('has_sub')) {
                    var submenu = $(this).parent().find('> ul.sub_menu');
                    if (submenu.is(':visible')) {
                        submenu.slideUp(200, function () {
                            popupMenuHolderOuter.getNiceScroll().resize();
                        });
                        $(this).parent().removeClass('open_sub');
                    } else {
                        $(this).parent().addClass('open_sub');
                        submenu.slideDown(200, function () {
                            popupMenuHolderOuter.getNiceScroll().resize();
                        });
                    }
                }
                return false;
            });

            //if link has no submenu and if it's not dead, than open that link
            menuItemWithoutChild.on('click', function (e) {

                if (($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")) {

                    if (e.which === 1) {
                        popupMenuOpener.removeClass('opened');
                        qodef.body.removeClass('qodef-fullscreen-menu-opened');
                        qodef.body.removeClass('qodef-fullscreen-fade-in').addClass('qodef-fullscreen-fade-out');
                        qodef.body.addClass(cssClass);
                        $("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(200, function () {
                            $('nav.popup_menu').getNiceScroll().resize();
                        });
                        qodef.modules.common.qodefEnableScroll();
                    }
                } else {
                    return false;
                }

            });

        }
    }

    function qodefInitMobileNavigation() {
        var navigationOpener = $('.qodef-mobile-header .qodef-mobile-menu-opener');
        var navigationHolder = $('.qodef-mobile-header .qodef-mobile-nav');
        var dropdownOpener = $('.qodef-mobile-nav .mobile_arrow, .qodef-mobile-nav h4, .qodef-mobile-nav a[href*="#"]');
        var animationSpeed = 200;

        //whole mobile menu opening / closing
        if (navigationOpener.length && navigationHolder.length) {
            navigationOpener.on('tap click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (navigationHolder.is(':visible')) {
                    navigationHolder.slideUp(animationSpeed);
                } else {
                    navigationHolder.slideDown(animationSpeed);
                }
            });
        }

        //dropdown opening / closing
        if (dropdownOpener.length) {
            dropdownOpener.each(function () {
                $(this).on('tap click', function (e) {
                    var dropdownToOpen = $(this).nextAll('ul').first();

                    if (dropdownToOpen.length) {
                        e.preventDefault();
                        e.stopPropagation();

                        var openerParent = $(this).parent('li');
                        if (dropdownToOpen.is(':visible')) {
                            dropdownToOpen.slideUp(animationSpeed);
                            openerParent.removeClass('qodef-opened');
                        } else {
                            dropdownToOpen.slideDown(animationSpeed);
                            openerParent.addClass('qodef-opened');
                        }
                    }

                });
            });
        }

        $('.qodef-mobile-nav a, .qodef-mobile-logo-wrapper a').on('click tap', function (e) {
            if ($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
                navigationHolder.slideUp(animationSpeed);
            }
        });
    }

    function qodefMobileHeaderBehavior() {
        if (qodef.body.hasClass('qodef-sticky-up-mobile-header')) {
            var stickyAppearAmount;
            var topBar = $('.qodef-top-bar');
            var mobileHeader = $('.qodef-mobile-header');
            var adminBar = $('#wpadminbar');
            var mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0;
            var topBarHeight = topBar.is(':visible') ? topBar.height() : 0;
            var adminBarHeight = adminBar.length ? adminBar.height() : 0;

            var docYScroll1 = $(document).scrollTop();
            qodef.modules.header.stickyMobileAppearAmount = topBarHeight + mobileHeaderHeight + adminBarHeight;
            stickyAppearAmount = qodef.modules.header.stickyMobileAppearAmount;

            $(window).scroll(function () {
                var docYScroll2 = $(document).scrollTop();

                if (docYScroll2 > stickyAppearAmount) {
                    mobileHeader.addClass('qodef-animate-mobile-header');
                    mobileHeader.css('margin-bottom', mobileHeaderHeight);
                } else {
                    mobileHeader.removeClass('qodef-animate-mobile-header');
                    mobileHeader.css('margin-bottom', 0);
                }

                if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                    mobileHeader.removeClass('mobile-header-appear');
                    if (adminBar.length) {
                        mobileHeader.find('.qodef-mobile-header-inner').css('top', 0);
                    }
                } else {
                    mobileHeader.addClass('mobile-header-appear');

                }

                docYScroll1 = $(document).scrollTop();
            });
        }
    }

    /**
     * Set dropdown position
     */
    function qodefSetDropDownMenuPosition() {

        var menuItems = $(".qodef-drop-down > ul > li.narrow");
        menuItems.each(function (i) {

            var browserWidth = qodef.windowWidth - 16; // 16 is width of scroll bar
            var menuItemPosition = $(this).offset().left;
            var dropdownMenuWidth = $(this).find('.second .inner ul').width();

            var menuItemFromLeft = 0;
            if (qodef.body.hasClass('boxed')) {
                menuItemFromLeft = qodef.boxedLayoutWidth - (menuItemPosition - (browserWidth - qodef.boxedLayoutWidth) / 2);
            } else {
                menuItemFromLeft = browserWidth - menuItemPosition;
            }

            var dropDownMenuFromLeft; //has to stay undefined beacuse 'dropDownMenuFromLeft < dropdownMenuWidth' condition will be true

            if ($(this).find('li.sub').length > 0) {
                dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
            }

            if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
                $(this).find('.second').addClass('right');
                $(this).find('.second .inner ul').addClass('right');
            }
        });

    }


    function qodefDropDownMenu() {

        var menu_items = $('.qodef-drop-down > ul > li');

        menu_items.each(function (i) {
            if ($(menu_items[i]).find('.second').length > 0) {

                var dropDownSecondDiv = $(menu_items[i]).find('.second');

                if ($(menu_items[i]).hasClass('wide')) {

                    var dropdown = $(this).find('.inner > ul');
                    var dropdownPadding = parseInt(dropdown.css('padding-left').slice(0, -2)) + parseInt(dropdown.css('padding-right').slice(0, -2));
                    var dropdownWidth = dropdown.outerWidth();

                    if (!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                        dropDownSecondDiv.css('left', 0);
                    }

                    //set columns to be same height - start
                    var tallest = 0;
                    $(this).find('.second > .inner > ul > li').each(function () {
                        var thisHeight = $(this).height();
                        if (thisHeight > tallest) {
                            tallest = thisHeight;
                        }
                    });
                    $(this).find('.second > .inner > ul > li').css("height", ""); // delete old inline css - via resize
                    $(this).find('.second > .inner > ul > li').height(tallest);
                    //set columns to be same height - end

                    if (!$(this).hasClass('wide_background')) {
                        if (!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                            var left_position = (qodef.windowWidth - 2 * (qodef.windowWidth - dropdown.offset().left)) / 2 + (dropdownWidth + dropdownPadding) / 2;
                            dropDownSecondDiv.css('left', -left_position);
                        }
                    } else {
                        if (!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                            var left_position = dropDownSecondDiv.offset().left;

                            dropDownSecondDiv.css('left', -left_position);
                            dropDownSecondDiv.css('width', qodef.windowWidth);

                        }
                    }
                }

                if (!qodef.menuDropdownHeightSet) {
                    $(menu_items[i]).data('original_height', dropDownSecondDiv.height() + 'px');
                    dropDownSecondDiv.height(0);
                }

                if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    $(menu_items[i]).on("touchstart mouseenter", function () {
                        dropDownSecondDiv.css({
                            'height': $(menu_items[i]).data('original_height'),
                            'overflow': 'visible',
                            'visibility': 'visible',
                            'opacity': '1'
                        });
                    }).on("mouseleave", function () {
                        dropDownSecondDiv.css({
                            'height': '0px',
                            'overflow': 'hidden',
                            'visibility': 'hidden',
                            'opacity': '0'
                        });
                    });

                } else {
                    if (qodef.body.hasClass('qodef-dropdown-animate-height')) {
                        $(menu_items[i]).mouseenter(function () {
                            dropDownSecondDiv.css({
                                'visibility': 'visible',
                                'height': '0px',
                                'opacity': '0'
                            });
                            dropDownSecondDiv.stop().animate({
                                'height': $(menu_items[i]).data('original_height'),
                                opacity: 1
                            }, 200, function () {
                                dropDownSecondDiv.css('overflow', 'visible');
                            });
                        }).mouseleave(function () {
                            dropDownSecondDiv.stop().animate({
                                'height': '0px'
                            }, 0, function () {
                                dropDownSecondDiv.css({
                                    'overflow': 'hidden',
                                    'visibility': 'hidden'
                                });
                            });
                        });
                    } else {
                        var config = {
                            interval: 0,
                            over: function () {
                                setTimeout(function () {
                                    dropDownSecondDiv.addClass('qodef-drop-down-start');
                                    dropDownSecondDiv.stop().css({'height': $(menu_items[i]).data('original_height')});
                                }, 150);
                            },
                            timeout: 150,
                            out: function () {
                                dropDownSecondDiv.stop().css({'height': '0px'});
                                dropDownSecondDiv.removeClass('qodef-drop-down-start');
                            }
                        };
                        $(menu_items[i]).hoverIntent(config);
                    }
                }
            }
        });
        $('.qodef-drop-down ul li.wide ul li a').on('click', function (e) {
            if (e.which === 1) {
                var $this = $(this);
                setTimeout(function () {
                    $this.mouseleave();
                }, 500);
            }
        });

        qodef.menuDropdownHeightSet = true;
    }

    /*
     * Menu underline animation
     */
    function qodefMenuUnderline() {

        //first level menu
        var firstLevelMenus = $('.qodef-main-menu > ul');

        if (firstLevelMenus.length) {
            firstLevelMenus.each(function () {
                var mainMenu = $(this);

                mainMenu.append('<li class="qodef-main-menu-line top"></li>');
                mainMenu.append('<li class="qodef-main-menu-line bottom"></li>');

                var menuLine = mainMenu.find('.qodef-main-menu-line'),
                    menuItems = mainMenu.find('> li.menu-item'),
                    initialOffset,
                    scrolling = false,
                    minusWidth;


                if (menuItems.filter('.qodef-active-item').length) {
                    var minusWidth = menuItems.filter('.qodef-active-item').outerWidth() - menuItems.filter('.qodef-active-item').find('.item_inner').width();
                } else {
                    var minusWidth = menuItems.first().outerWidth() - menuItems.first().find('.item_inner').width();
                }


                if (menuItems.filter('.qodef-active-item').length) {
                    initialOffset = menuItems.filter('.qodef-active-item').offset().left + minusWidth / 2;
                    menuLine.css('width', menuItems.filter('.qodef-active-item').outerWidth() - minusWidth);
                } else {
                    initialOffset = menuItems.first().offset().left + minusWidth / 2;
                    menuLine.css('width', menuItems.first().outerWidth() - minusWidth);
                }

                //initial positioning
                menuLine.css('left', initialOffset - mainMenu.offset().left);

                //fx on
                menuItems.mouseenter(function () {
                    if (!scrolling) {
                        var menuItem = $(this),
                            menuItemWidth = menuItem.outerWidth() - minusWidth,
                            mainMenuOffset = mainMenu.offset().left - minusWidth / 2,
                            menuItemOffset = menuItem.offset().left - mainMenuOffset;

                        menuLine.css('width', menuItemWidth);
                        menuLine.css('left', menuItemOffset);
                    }
                });

                //fx off
                mainMenu.mouseleave(function () {
                    if (menuItems.filter('.qodef-active-item').length) {
                        menuLine.css('width', menuItems.filter('.qodef-active-item').outerWidth() - minusWidth);
                        initialOffset = menuItems.filter('.qodef-active-item').offset().left + minusWidth / 2;
                    } else {
                        menuLine.css('width', menuItems.first().outerWidth() - minusWidth);
                    }

                    menuLine.css('left', initialOffset - mainMenu.offset().left);
                });

                //one page anchors
                if (menuItems.filter('.anchor-item').length) {
                    var followAnchor = function () {
                        if (menuItems.filter('.qodef-active-item').length) {
                            initialOffset = menuItems.filter('.qodef-active-item').offset().left + minusWidth / 2;
                            menuLine.css('width', menuItems.filter('.qodef-active-item').outerWidth() - minusWidth);
                            menuLine.css('left', initialOffset - mainMenu.offset().left);
                            scrolling = false;
                        }
                    }

                    menuItems.filter('.anchor-item').on('click', function () {
                        scrolling = true;
                    });

                    $(document).on('loadHashTriggered scrollHashTriggered', function () {
                        followAnchor();
                    });
                }
            });
        }

        //wide drop down
        var wideDropDowns = $('.qodef-main-menu .wide ul > li > ul');

        if (wideDropDowns.length) {
            wideDropDowns.each(function () {
                var wideMenu = $(this);

                wideMenu.append('<li class="qodef-wide-menu-line"></li>');

                var menuLine = wideMenu.find('.qodef-wide-menu-line'),
                    menuItems = wideMenu.find('> li.menu-item'),
                    setIdleState = false;


                menuItems.each(function () {
                    var menuItem = $(this),
                        wideMenuOffset = wideMenu.offset().top,
                        menuItemOffset = menuItem.find('> a').offset().top - wideMenuOffset;


                    if (!setIdleState) {
                        menuLine.css('top', menuItemOffset);
                        setIdleState = true;
                    }

                    menuItem.mouseenter(function () {
                        menuLine.css('height', '14px');
                        menuLine.css('top', menuItemOffset);
                    });
                });

                wideMenu.mouseleave(function () {
                    menuLine.css('height', 0);
                });

            });
        }

        //Vertical dropdown line
        var narrowDropDowns = $('.qodef-vertical-menu  ul ');

        if (narrowDropDowns.length) {
            narrowDropDowns.each(function () {
                var narrowMenu = $(this);

                narrowMenu.append('<li class="qodef-narrow-menu-line"></li>');

                var menuLine = narrowMenu.find('.qodef-narrow-menu-line'),
                    menuItems = narrowMenu.find('> li.menu-item'),
                    initialOffset,
                    setIdleState = false;

                if (menuItems.filter('.qodef-active-item').length) {
                    var minusWidth = menuItems.filter('.qodef-active-item').outerHeight() - menuItems.filter('.qodef-active-item').find('.item_inner').height();

                } else {
                    var minusWidth = menuItems.first().outerHeight() - menuItems.first().find('.item_inner').height();
                }


                if (menuItems.filter('.qodef-active-item').length) {
                    menuLine.css('height', menuItems.outerHeight() - minusWidth);
                    initialOffset = menuItems.filter('.qodef-active-item').offset().top + minusWidth / 2;
                } else {
                    initialOffset = menuItems.first().offset().top + minusWidth / 2;
                    menuLine.css('height', menuItems.outerHeight() - minusWidth);
                }

                //initial positioning
                menuLine.css('top', initialOffset - narrowMenu.offset().top);


                menuItems.mouseenter(function () {
                    if (!setIdleState) {
                        var menuItem = $(this),
                            menuItemHeight = menuItem.outerHeight() - minusWidth,
                            menuItemOffset = menuItem.offset().top - narrowMenu.offset().top + minusWidth / 2;

                        menuLine.css('height', menuItemHeight);
                        menuLine.css('top', menuItemOffset);
                    }
                });

                narrowMenu.mouseleave(function () {
                    if (menuItems.filter('.qodef-active-item').length) {
                        menuLine.css('height', menuItems.filter('.qodef-active-item').outerHeight() - minusWidth);
                        initialOffset = menuItems.filter('.qodef-active-item').offset().top + minusWidth / 2;
                    } else {
                        menuLine.css('height', menuItems.first().outerHeight() - minusWidth);
                    }
                    menuLine.css('top', initialOffset - narrowMenu.offset().top);
                });
            })
        }
    }

    /**
     * Init Search Types
     */
    function qodefSearch() {

        var searchOpener = $('a.qodef-search-opener'),
            searchClose,
            searchForm,
            touch = false;

        if ($('html').hasClass('touch')) {
            touch = true;
        }

        if (searchOpener.length > 0) {
            //Check for type of search
            if (qodef.body.hasClass('qodef-search-covers-header')) {
                qodefSearchCoversHeader();
            }

            //Check for hover color of search
            searchOpener.each(function () {
                var thisOpener = $(this);

                if (typeof thisOpener.data('hover-color') !== 'undefined') {
                    var changeSearchColor = function (event) {
                        event.data.searchOpener.css('color', event.data.color);
                    };

                    var originalColor = thisOpener.css('color');
                    var hoverColor = thisOpener.data('hover-color');

                    thisOpener.on('mouseenter', {searchOpener: thisOpener, color: hoverColor}, changeSearchColor);
                    thisOpener.on('mouseleave', {searchOpener: thisOpener, color: originalColor}, changeSearchColor);
                }
            });

        }


        /**
         * Search covers header type of search
         */
        function qodefSearchCoversHeader() {

            searchOpener.on('click', function (e) {
                e.preventDefault();
                var searchFormHeight,
                    searchFormHolder = $('.qodef-search-cover .qodef-form-holder-outer'),
                    searchForm,
                    searchFormLandmark; // there is one more div element if header is in grid

                if ($(this).closest('.qodef-grid').length) {
                    searchForm = $(this).closest('.qodef-grid').children().first();
                    searchFormLandmark = searchForm.parent();
                } else {
                    searchForm = $(this).closest('.qodef-menu-area').children().first();
                    searchFormLandmark = searchForm;
                }

                if ($(this).closest('.qodef-sticky-header').length > 0) {
                    searchForm = $(this).closest('.qodef-sticky-header').children().first();
                    searchFormLandmark = searchForm;
                }
                if ($(this).closest('.qodef-mobile-header').length > 0) {
                    searchForm = $(this).closest('.qodef-mobile-header').children().children().first();
                    searchFormLandmark = searchForm.parent();
                }

                //Find search form position in header and height
                if (searchFormLandmark.parent().hasClass('qodef-logo-area')) {
                    searchFormHeight = qodefGlobalVars.vars.qodefLogoAreaHeight;
                } else if (searchFormLandmark.parent().hasClass('qodef-top-bar')) {
                    searchFormHeight = qodefGlobalVars.vars.qodefTopBarHeight;
                } else if (searchFormLandmark.parent().hasClass('qodef-menu-area')) {
                    searchFormHeight = qodefGlobalVars.vars.qodefMenuAreaHeight;
                } else if (searchFormLandmark.parent().hasClass('qodef-sticky-header')) {
                    searchFormHeight = qodefGlobalVars.vars.qodefStickyHeaderTransparencyHeight;
                } else if (searchFormLandmark.parent().hasClass('qodef-mobile-header')) {
                    searchFormHeight = $('.qodef-mobile-header-inner').height();
                }

                searchFormHolder.height(searchFormHeight);
                searchForm.stop(true).fadeIn(600);
                $('.qodef-search-cover input[type="text"]').focus();
                $('.qodef-search-close, .content, footer').on('click', function (e) {
                    e.preventDefault();
                    searchForm.stop(true).fadeOut(450);
                });
                searchForm.blur(function () {
                    searchForm.stop(true).fadeOut(450);
                });
            });

        }
    }

    /**
     * Function object that represents vertical menu area.
     * @returns {{init: Function}}
     */
    var qodefVerticalMenu = function () {
        /**
         * Main vertical area object that used through out function
         * @type {jQuery object}
         */
        var verticalMenuObject = $('.qodef-vertical-menu-area');

        /**
         * Resizes vertical area. Called whenever height of navigation area changes
         * It first check if vertical area is scrollable, and if it is resizes scrollable area
         */
        //var resizeVerticalArea = function() {
        //    if(verticalAreaScrollable()) {
        //        verticalMenuObject.getNiceScroll().resize();
        //    }
        //};

        /**
         * Checks if vertical area is scrollable (if it has qodef-with-scroll class)
         *
         * @returns {bool}
         */
        //var verticalAreaScrollable = function() {
        //    return verticalMenuObject.hasClass('.qodef-with-scroll');
        //};

        /**
         * Initialzes navigation functionality. It checks navigation type data attribute and calls proper functions
         */
        var initNavigation = function () {
            var verticalNavObject = verticalMenuObject.find('.qodef-vertical-menu');
            var navigationType = typeof verticalNavObject.data('navigation-type') !== 'undefined' ? verticalNavObject.data('navigation-type') : '';

            switch (navigationType) {
                //case 'dropdown-toggle':
                //    dropdownHoverToggle();
                //    break;
                //case 'dropdown-toggle-click':
                //    dropdownClickToggle();
                //    break;
                //case 'float':
                //    dropdownFloat();
                //    break;
                //case 'slide-in':
                //    dropdownSlideIn();
                //    break;
                default:
                    dropdownFloat();
                    break;
            }

            /**
             * Initializes hover toggle navigation type. It has separate functionalities for touch and no-touch devices
             */
            //function dropdownHoverToggle() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //
            //    menuItems.each(function() {
            //        var elementToExpand = $(this).find(' > .second, > ul');
            //        var numberOfChildItems = elementToExpand.find(' > .inner > ul > li, > li').length;
            //
            //        var animSpeed = numberOfChildItems * 40;
            //        var animFunc = 'easeInOutSine';
            //        var that = this;
            //
            //        //touch devices functionality
            //        if(Modernizr.touch) {
            //            var dropdownOpener = $(this).find('> a');
            //
            //            dropdownOpener.on('click tap', function(e) {
            //                e.preventDefault();
            //                e.stopPropagation();
            //
            //                if(elementToExpand.is(':visible')) {
            //                    $(that).removeClass('open');
            //                    elementToExpand.slideUp(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                } else {
            //                    $(that).addClass('open');
            //                    elementToExpand.slideDown(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                }
            //            });
            //        } else {
            //            $(this).hover(function() {
            //                $(that).addClass('open');
            //                elementToExpand.slideDown(animSpeed, animFunc, function() {
            //                    resizeVerticalArea();
            //                });
            //            }, function() {
            //                setTimeout(function() {
            //                    $(that).removeClass('open');
            //                    elementToExpand.slideUp(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                }, 1000);
            //            });
            //        }
            //    });
            //}

            /**
             * Initializes click toggle navigation type. Works the same for touch and no-touch devices
             */
            //function dropdownClickToggle() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //
            //    menuItems.each(function() {
            //        var elementToExpand = $(this).find(' > .second, > ul');
            //        var menuItem = this;
            //        var dropdownOpener = $(this).find('> a');
            //        var slideUpSpeed = 'fast';
            //        var slideDownSpeed = 'slow';
            //
            //        dropdownOpener.on('click tap', function(e) {
            //            e.preventDefault();
            //            e.stopPropagation();
            //
            //            if(elementToExpand.is(':visible')) {
            //                $(menuItem).removeClass('open');
            //                elementToExpand.slideUp(slideUpSpeed, function() {
            //                    resizeVerticalArea();
            //                });
            //            } else {
            //                if(!$(this).parents('li').hasClass('open')) {
            //                    menuItems.removeClass('open');
            //                    menuItems.find(' > .second, > ul').slideUp(slideUpSpeed);
            //                }
            //
            //                $(menuItem).addClass('open');
            //                elementToExpand.slideDown(slideDownSpeed, function() {
            //                    resizeVerticalArea();
            //                });
            //            }
            //        });
            //    });
            //}

            /**
             * Initializes floating navigation type (it comes from the side as a dropdown)
             */
            function dropdownFloat() {
                var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
                var allDropdowns = menuItems.find(' > .second, > ul');

                menuItems.each(function () {
                    var elementToExpand = $(this).find(' > .second, > ul');
                    var menuItem = this;

                    if (Modernizr.touch) {
                        var dropdownOpener = $(this).find('> a');

                        dropdownOpener.on('click tap', function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            if (elementToExpand.hasClass('qodef-float-open')) {
                                elementToExpand.removeClass('qodef-float-open');
                                $(menuItem).removeClass('open');
                            } else {
                                if (!$(this).parents('li').hasClass('open')) {
                                    menuItems.removeClass('open');
                                    allDropdowns.removeClass('qodef-float-open');
                                }

                                elementToExpand.addClass('qodef-float-open');
                                $(menuItem).addClass('open');
                            }
                        });
                    } else {
                        //must use hoverIntent because basic hover effect doesn't catch dropdown
                        //it doesn't start from menu item's edge
                        $(this).hoverIntent({
                            over: function () {
                                elementToExpand.addClass('qodef-float-open');
                                $(menuItem).addClass('open');
                            },
                            out: function () {
                                elementToExpand.removeClass('qodef-float-open');
                                $(menuItem).removeClass('open');
                            },
                            timeout: 300
                        });
                    }
                });
            }

            /**
             * Initializes slide in navigation type (dropdowns are coming on top of parent element and cover whole navigation area)
             */
            //function dropdownSlideIn() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //    var menuItemsLinks = menuItems.find('> a');
            //
            //    menuItemsLinks.each(function() {
            //        var elementToExpand = $(this).next('.second, ul');
            //        appendToExpandableElement(elementToExpand, this);
            //
            //        if($(this).parent('li').is('.current-menu-ancestor', '.current_page_parent', '.current-menu-parent ')) {
            //            elementToExpand.addClass('qodef-vertical-slide-open');
            //        }
            //
            //        $(this).on('click tap', function(e) {
            //            e.preventDefault();
            //            e.stopPropagation();
            //
            //            menuItems.removeClass('open');
            //
            //            $(this).parent('li').addClass('open');
            //            elementToExpand.addClass('qodef-vertical-slide-open');
            //        });
            //    });
            //
            //    var previousLevelItems = menuItems.find('li.qodef-previous-level > a');
            //
            //    previousLevelItems.on('click tap', function(e) {
            //        e.preventDefault();
            //        e.stopPropagation();
            //
            //        menuItems.removeClass('open');
            //        $(this).parents('.qodef-vertical-slide-open').first().removeClass('qodef-vertical-slide-open');
            //    });
            //
            //    /**
            //     * Appends 'li' element as first element in dropdown, which will close current dropdown when clicked
            //     * @param {jQuery object} elementToExpand current dropdown to append element to
            //     * @param currentMenuItem
            //     */
            //    function appendToExpandableElement(elementToExpand, currentMenuItem) {
            //        var itemUrl = $(currentMenuItem).attr('href');
            //        var itemText = $(currentMenuItem).text();
            //
            //        var liItem = $('<li />', {class: 'qodef-previous-level'});
            //
            //        $('<a />', {
            //            'href': itemUrl,
            //            'html': '<i class="qodef-vertical-slide-arrow fa fa-angle-left"></i>' + itemText
            //        }).appendTo(liItem);
            //
            //        if(elementToExpand.hasClass('second')) {
            //            elementToExpand.find('> div > ul').prepend(liItem);
            //        } else {
            //            elementToExpand.prepend(liItem);
            //        }
            //    }
            //}
        };

        /**
         * Initializes scrolling in vertical area. It checks if vertical area is scrollable before doing so
         */
        //var initVerticalAreaScroll = function() {
        //    if(verticalAreaScrollable()) {
        //        verticalMenuObject.niceScroll({
        //            scrollspeed: 60,
        //            mousescrollstep: 40,
        //            cursorwidth: 0,
        //            cursorborder: 0,
        //            cursorborderradius: 0,
        //            cursorcolor: "transparent",
        //            autohidemode: false,
        //            horizrailenabled: false
        //        });
        //    }
        //};

        //var initHiddenVerticalArea = function() {
        //    var verticalLogo = $('.qodef-vertical-area-bottom-logo');
        //    var verticalMenuOpener = verticalMenuObject.find('.qodef-vertical-menu-hidden-button');
        //    var scrollPosition = 0;
        //
        //    verticalMenuOpener.on('click tap', function() {
        //        if(isVerticalAreaOpen()) {
        //            closeVerticalArea();
        //        } else {
        //            openVerticalArea();
        //        }
        //    });
        //
        //    //take click outside vertical left/right area and close it
        //    $j(verticalMenuObject).outclick({
        //        callback: function() {
        //            closeVerticalArea();
        //        }
        //    });
        //
        //    $(window).scroll(function() {
        //        if(Math.abs($(window).scrollTop() - scrollPosition) > 400){
        //            closeVerticalArea();
        //        }
        //    });
        //
        //    /**
        //     * Closes vertical menu area by removing 'active' class on that element
        //     */
        //    function closeVerticalArea() {
        //        verticalMenuObject.removeClass('active');
        //
        //        if(verticalLogo.length) {
        //            verticalLogo.removeClass('active');
        //        }
        //    }
        //
        //    /**
        //     * Opens vertical menu area by adding 'active' class on that element
        //     */
        //    function openVerticalArea() {
        //        verticalMenuObject.addClass('active');
        //
        //        if(verticalLogo.length) {
        //            verticalLogo.addClass('active');
        //        }
        //
        //        scrollPosition = $(window).scrollTop();
        //    }
        //
        //    function isVerticalAreaOpen() {
        //        return verticalMenuObject.hasClass('active');
        //    }
        //};

        return {
            /**
             * Calls all necessary functionality for vertical menu area if vertical area object is valid
             */
            init: function () {
                if (verticalMenuObject.length) {
                    initNavigation();
                    //initVerticalAreaScroll();
                    //
                    //if(qodef.body.hasClass('qodef-vertical-header-hidden')) {
                    //    initHiddenVerticalArea();
                    //}
                }
            }
        };
    };

})(jQuery);