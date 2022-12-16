<?php
if(!function_exists('geko_qodef_design_styles')) {
    /**
     * Generates general custom styles
     */
    function geko_qodef_design_styles() {

        $preload_background_styles = array();

        if(geko_qodef_options()->getOptionValue('preload_pattern_image') !== ""){
            $preload_background_styles['background-image'] = 'url('.geko_qodef_options()->getOptionValue('preload_pattern_image').') !important';
        }else{
            $preload_background_styles['background-image'] = 'url('.esc_url(QODE_ASSETS_ROOT."/img/preload_pattern.png").') !important';
        }

        echo geko_qodef_dynamic_css('.qodef-preload-background', $preload_background_styles);

		if (geko_qodef_options()->getOptionValue('google_fonts')){
			$font_family = geko_qodef_options()->getOptionValue('google_fonts');
			if(geko_qodef_is_font_option_valid($font_family)) {
				echo geko_qodef_dynamic_css('body', array('font-family' => geko_qodef_get_font_option_val($font_family)));
			}
		}

        if(geko_qodef_options()->getOptionValue('first_color') !== "") {
            $color_selector = array(
                'a',
                'h1 a:hover',
                'h2 a:hover',
                'h3 a:hover',
                'h4 a:hover',
                'h5 a:hover',
                'h6 a:hover',
                'p a',
                '.qodef-comment-holder .qodef-comment-date',
                '.qodef-comment-holder .qodef-comment-text .comment-edit-link:hover',
                '.qodef-comment-holder .qodef-comment-text .comment-reply-link:hover',
                '.qodef-comment-holder .qodef-comment-text .replay:hover',
                '.comment-respond .comment-reply-title #cancel-comment-reply-link',
                '.comment-respond .logged-in-as a:hover',
                '.qodef-main-menu ul li.qodef-active-item a',
                '.qodef-main-menu ul li:hover a',
                '.qodef-main-menu>ul>li.qodef-active-item>a',
                'body:not(.qodef-menu-item-first-level-bg-color) .qodef-main-menu>ul>li:hover>a',
                '.qodef-light-header .qodef-page-header>div:not(.qodef-sticky-header) .qodef-main-menu>ul>li.qodef-active-item>a',
                '.qodef-light-header .qodef-page-header>div:not(.qodef-sticky-header) .qodef-main-menu>ul>li:hover>a',
                '.qodef-light-header.qodef-header-style-on-scroll .qodef-page-header .qodef-main-menu>ul>li.qodef-active-item>a',
                '.qodef-light-header.qodef-header-style-on-scroll .qodef-page-header .qodef-main-menu>ul>li:hover>a',
                '.qodef-drop-down .second .inner ul li.sub ul li:hover>a',
                '.qodef-drop-down .second .inner>ul>li:hover>a',
                '.qodef-drop-down .wide .second .inner>ul>li>a:hover',
                '.qodef-top-bar a:hover',
                '.qodef-header-vertical .qodef-vertical-dropdown-float .second .inner ul li a:hover',
                '.qodef-header-vertical .qodef-vertical-menu ul li a:hover',
                '.qodef-mobile-header .qodef-mobile-nav a:hover',
                '.qodef-mobile-header .qodef-mobile-nav h4:hover',
                '.qodef-mobile-header .qodef-mobile-menu-opener a:hover',
                '.qodef-title .qodef-title-holder .qodef-breadcrumbs a:hover',
                '.qodef-title .qodef-title-holder .qodef-breadcrumbs span.qodef-current',
                '.qodef-title.qodef-standard-type .qodef-breadcrumbs-holder .qodef-breadcrumbs span.qodef-current',
                '.qodef-side-menu-button-opener:hover',
                'nav.qodef-fullscreen-menu ul li a:hover',
                'nav.qodef-fullscreen-menu ul li ul li a:hover',
                '.qodef-team.main-info-below-image.info-below-image-boxed .qodef-team-social-wrapp .qodef-icon-shortcode .flip-icon-holder .icon-normal span',
                '.qodef-team.main-info-below-image.info-below-image-standard .qodef-team-social-wrapp .qodef-icon-shortcode .flip-icon-holder .icon-flip span',
                '.qodef-icon-shortcode .qodef-icon-element',
                '.qodef-ordered-list ol>li:before',
                '.qodef-icon-list-item .qodef-icon-list-icon-holder-inner .font_elegant',
                '.qodef-icon-list-item .qodef-icon-list-icon-holder-inner i',
                '.qodef-testimonials.background-image:before',
                '.qodef-testimonials.background-image .qodef-testimonial-content .qodef-testimonials-author-holder .qodef-testimonial-job',
                '.qodef-testimonials.cards .qodef-testimonials-author-holder .qodef-testimonial-author .qodef-testimonial-job',
                '.qodef-pricing-tables .qodef-price-table .qodef-price-table-inner ul li.qodef-table-content ul li:before',
                '.qodef-blog-list-holder .qodef-item-info-section.qodef-section-top>div a',
                '.qodef-blog-list-holder .qodef-item-info-section.qodef-section-bottom .qodef-post-info-author a:hover',
                '.qodef-blog-list-holder .qodef-item-info-section.qodef-section-bottom .qodef-blog-like:hover i:first-child',
                '.qodef-blog-list-holder .qodef-item-info-section.qodef-section-bottom .qodef-blog-like:hover span:first-child',
                '.qodef-blog-list-holder .qodef-item-info-section.qodef-section-bottom .qodef-post-info-comments-holder:hover span:first-child',
                '.qodef-blog-list-holder.qodef-minimal .qodef-item-title:before',
                '.qodef-btn.qodef-btn-outline',
                '.qodef-video-button .qodef-video-button-play .qodef-video-button-wrapper:hover',
                '.qodef-video-button.light .qodef-video-button-play .qodef-video-button-wrapper:hover',
                '.qodef-dropcaps',
                '.qodef-portfolio-filter-holder .qodef-portfolio-filter-holder-inner ul li.active span',
                '.qodef-portfolio-filter-holder .qodef-portfolio-filter-holder-inner ul li.current span',
                '.qodef-portfolio-slider-holder .qodef-portfolio-list-holder.owl-carousel .owl-nav .qodef-next-icon i',
                '.qodef-portfolio-slider-holder .qodef-portfolio-list-holder.owl-carousel .owl-nav .qodef-prev-icon i',
                '.qodef-item-showcase .qodef-item .qodef-item-icon',
                '.qodef-icon-box-holder .qodef-icon-box-icon-holder .qodef-icon-shortcode .qodef-icon-element',
                '.qodef-process-holder .qodef-process-item:hover .qodef-process-number',
                '.qodef-process-holder.light-skin .qodef-process-item:hover .qodef-process-number',
                '.qodef-pricing-info .qodef-pricing-info-pricing .qodef-value',
                '.qodef-pricing-info .qodef-pricing-info-pricing .qodef-price',
                '.qodef-pricing-info.qodef-pricing-info-extended .qodef-pricing-info-right .qodef-pricing-info-content ul li:before',
                '.qodef-service-table table tbody td .qodef-mark.qodef-checked',
                '.qodef-blog-slider-holder .qodef-blog-slider-item .qodef-item-text-holder .qodef-item-info-section .qodef-post-info-author .qodef-post-info-author-by',
                '.qodef-blog-slider-holder .qodef-blog-slider-item .qodef-item-text-holder .qodef-item-info-section .qodef-post-info-comments-holder a:hover',
                '.qodef-numbered-steps-holder .qodef-text .qodef-subtitle-holder h6',
                '.qodef-sidebar .widget ul li a:hover',
                '.qodef-sidebar .widget.qodef-latest-posts-widget .qodef-blog-list-holder ul>li.qodef-blog-list-item a:hover',
                '.qodef-twitter-widget li .qodef-tweet-icon-holder .qodef-social-twitter',
                'footer .widget a:hover',
                '.qodef-blog-holder article.sticky .qodef-post-title a',
                '.qodef-blog-holder article .qodef-post-info.qodef-section-bottom .qodef-post-info-author a:hover',
                '.qodef-blog-holder article .qodef-post-info.qodef-section-bottom .qodef-blog-like:hover i:first-child',
                '.qodef-blog-holder article .qodef-post-info.qodef-section-bottom .qodef-blog-like:hover span:first-child',
                '.qodef-blog-holder article .qodef-post-info.qodef-section-bottom .qodef-post-info-comments-holder:hover span:first-child',
                '.qodef-filter-blog-holder li.qodef-active',
                '.qodef-filter-blog-holder li:hover',
                '.qodef-blog-holder.qodef-blog-type-masonry article .qodef-post-info-author a:hover',
                '.qodef-blog-holder.qodef-blog-single .qodef-blog-single-navigation .qodef-blog-single-nav-title .qodef-blog-navigation-info:hover',
                '.woocommerce .star-rating',
                '.qodef-woo-single-page .qodef-accordion-holder #reviews .comment-respond .comment-form-rating .stars span:after',
                '.qodef-woo-single-page .qodef-accordion-holder #reviews .comment-respond .comment-form-rating .stars span a:after',
                '.qodef-single-product-summary .product_meta>span a:hover',
                'ul.products>.product .qodef-pl-text-wrapper .qodef-pl-categories-holder a:hover',
                '.qodef-woocommerce-page.woocommerce-account .woocommerce-MyAccount-navigation ul li.is-active a',
                '.qodef-woocommerce-page.woocommerce-account .woocommerce-MyAccount-navigation ul li a:hover',
                '.qodef-woocommerce-page.woocommerce-account .woocommerce-MyAccount-content mark',
                '.qodef-woocommerce-page.woocommerce-account .woocommerce table.shop_table td.order-number a:hover',
                '.widget.woocommerce.widget_rating_filter a:hover .star-rating',
                '.widget.woocommerce.widget_recent_reviews a:hover',
                '.widget.woocommerce.widget_product_tag_cloud a:hover',
                '.qodef-shopping-cart-dropdown .qodef-item-info-holder .remove:hover',
                '.qodef-shopping-cart-dropdown .qodef-cart-bottom .qodef-subtotal-holder .qodef-total-amount',
                '.qodef-side-menu #lang_sel ul ul a:hover span',
                '.qodef-top-bar #lang_sel .lang_sel_sel:after'
            );

            $color_important_selector = array(
                '.qodef-light-header .qodef-top-bar .widget a:hover',
                '.qodef-light-header .qodef-top-bar .widget i:hover',
                '.qodef-btn.qodef-btn-transparent:not(.qodef-btn-custom-hover-color):hover'
            );

            $background_color_selector = array(
                '.qodef-st-loader .pulse',
                '.qodef-st-loader .double_pulse .double-bounce1',
                '.qodef-st-loader .double_pulse .double-bounce2',
                '.qodef-st-loader .cube',
                '.qodef-st-loader .rotating_cubes .cube1',
                '.qodef-st-loader .rotating_cubes .cube2',
                '.qodef-st-loader .stripes>div',
                '.qodef-st-loader .wave>div',
                '.qodef-st-loader .two_rotating_circles .dot1',
                '.qodef-st-loader .two_rotating_circles .dot2',
                '.qodef-st-loader .five_rotating_circles .container1>div',
                '.qodef-st-loader .five_rotating_circles .container2>div',
                '.qodef-st-loader .five_rotating_circles .container3>div',
                '.qodef-st-loader .atom .ball-1:before',
                '.qodef-st-loader .atom .ball-2:before',
                '.qodef-st-loader .atom .ball-3:before',
                '.qodef-st-loader .atom .ball-4:before',
                '.qodef-st-loader .clock .ball:before',
                '.qodef-st-loader .mitosis .ball',
                '.qodef-st-loader .lines .line1',
                '.qodef-st-loader .lines .line2',
                '.qodef-st-loader .lines .line3',
                '.qodef-st-loader .lines .line4',
                '.qodef-st-loader .fussion .ball',
                '.qodef-st-loader .fussion .ball-1',
                '.qodef-st-loader .fussion .ball-2',
                '.qodef-st-loader .fussion .ball-3',
                '.qodef-st-loader .fussion .ball-4',
                '.qodef-st-loader .wave_circles .ball',
                '.qodef-st-loader .pulse_circles .ball',
                '.fusion-pulse-circles::after',
                '.fusion-pulse-circles div',
                '.fusion-pulse-circles div::after',
                '.fusion-pulse-circles div::before',
                '.post-password-form input[type=submit]',
                'input.wpcf7-form-control.wpcf7-submit',
                '.post-password-form input[type=submit]:hover',
                'input.wpcf7-form-control.wpcf7-submit:hover',
                '.qodef-subscription-form input.wpcf7-form-control.wpcf7-submit',
                '.woocommerce-page .qodef-subscription-form input.wpcf7-form-control.wpcf7-submit',
                '.qodef-pagination li.qodef-pagination-number:hover',
                '.qodef-pagination li.qodef-pagination-number.active',
                '#qodef-back-to-top>span',
                '.qodef-header-vertical .qodef-vertical-menu>ul>li>a:before',
                '.qodef-header-vertical .qodef-vertical-menu>ul>li>a:after',
                '.qodef-fullscreen-menu-opener:hover .qodef-line',
                '.qodef-fullscreen-menu-opener.opened:hover .qodef-line:after',
                '.qodef-fullscreen-menu-opener.opened:hover .qodef-line:before',
                '.qodef-progress-bar .qodef-progress-content-outer .qodef-progress-content',
                '.qodef-testimonials.background-image .owl-controls .owl-nav .qodef-next-icon',
                '.qodef-testimonials.background-image .owl-controls .owl-nav .qodef-prev-icon',
                '.qodef-pricing-tables .qodef-price-table .qodef-price-table-inner ul li.qodef-table-title',
                '.qodef-pricing-tables .qodef-price-table .qodef-price-table-inner ul li.qodef-price-button .qodef-hover-background',
                '.qodef-pie-chart-doughnut-holder .qodef-pie-legend ul li .qodef-pie-color-holder',
                '.qodef-pie-chart-pie-holder .qodef-pie-legend ul li .qodef-pie-color-holder',
                '.qodef-tabs.qodef-horizontal-tab .qodef-tabs-nav li.ui-state-active a:before',
                '.qodef-tabs.qodef-horizontal-tab .qodef-tabs-nav li.ui-state-hover a:before',
                '.qodef-tabs.qodef-vertical-tab .qodef-tabs-nav li.ui-state-active a:before',
                '.qodef-tabs.qodef-vertical-tab .qodef-tabs-nav li.ui-state-hover a:before',
                '.qodef-accordion-holder .qodef-title-holder:hover:before',
                '.qodef-accordion-holder .qodef-title-holder.ui-state-active:before',
                '.qodef-accordion-holder .qodef-title-holder.ui-state-hover:before',
                '.qodef-btn.qodef-btn-sweep.qodef-btn-outline .qodef-hover-background',
                '.qodef-image-gallery .owl-dots .owl-dot.active span',
                '.qodef-dropcaps.qodef-circle',
                '.qodef-dropcaps.qodef-square',
                '.qodef-icon-box-holder.overlapping-icon .qodef-overlapping-icon-box-line',
                '.qodef-icon-box-holder.overlapping-icon .qodef-overlapping-icon-box-icon-holder .qodef-overlapping-icon-box-icon-holder-inner .qodef-icon-holder-inner',
                '.qodef-social-share-holder.qodef-dropdown .qodef-social-share-dropdown ul li a span',
                '.qodef-blog-slider-holder .qodef-blog-slider-item .qodef-section-button-holder .qodef-btn',
                '.qodef-blog-slider-holder .owl-controls .owl-dots .owl-dot.active span',
                '.qodef-sidebar .widget.widget_tag_cloud a',
                '.qodef-blog-holder article.format-audio .mejs-container.mejs-audio .mejs-controls .mejs-play button:after',
                '.qodef-blog-holder article.format-audio .mejs-container.mejs-audio .mejs-controls .mejs-pause button:after',
                '.woocommerce-page .qodef-content a.added_to_cart',
                '.woocommerce-page .qodef-content a.button',
                '.woocommerce-page .qodef-content button[type=submit]',
                '.woocommerce-page .qodef-content input[type=submit]',
                'div.woocommerce a.added_to_cart',
                'div.woocommerce a.button',
                'div.woocommerce button[type=submit]',
                'div.woocommerce input[type=submit]',
                '.woocommerce-pagination .page-numbers li a.current',
                '.woocommerce-pagination .page-numbers li a:hover',
                '.woocommerce-pagination .page-numbers li>span.current',
                '.woocommerce .added_to_cart:hover:after',
                '.woocommerce .qodef-btn:hover i',
                '.woocommerce .qodef-btn:hover span:not(.qodef-btn-text)',
                'ul.products>.product .added_to_cart:hover:before',
                'ul.products>.product .button:hover:before',
                '.widget.woocommerce.widget_price_filter .price_slider_wrapper .ui-widget-content .ui-slider-handle',
                '.widget.woocommerce.widget_price_filter .price_slider_amount .button',
                '.widget.woocommerce.widget_price_filter .price_slider_amount .button:hover',
                '.qodef-shopping-cart-holder .qodef-header-cart .qodef-cart-info',
                '.qodef-shopping-cart-dropdown .qodef-cart-bottom .qodef-view-cart'
            );

            $background_color_important_selector = array(
                '.qodef-search-cover .qode_search_button.qodef-btn.qodef-btn-solid',
                '.qodef-pricing-tables .qodef-price-table .qodef-price-table-inner ul li.qodef-price-button .qodef-btn.qodef-btn-solid:hover',
                '.qodef-btn.qodef-btn-outline:not(.qodef-btn-custom-hover-bg).qodef-btn-sweep:hover',
                '.qodef-btn.qodef-btn-outline:not(.qodef-btn-custom-hover-bg):hover'
            );

            $border_color_selector = array(
                '.qodef-st-loader .pulse_circles .ball',
                '.post-password-form input[type=submit]',
                'input.wpcf7-form-control.wpcf7-submit',
                '.post-password-form input[type=submit]:hover',
                'input.wpcf7-form-control.wpcf7-submit:hover',
                '.qodef-pricing-tables .qodef-price-table .qodef-price-table-inner ul li.qodef-price-button .qodef-hover-background',
                '.qodef-btn.qodef-btn-outline',
                '.qodef-btn.qodef-btn-sweep.qodef-btn-outline .qodef-hover-background',
                '.qodef-blog-slider-holder .qodef-blog-slider-item .qodef-section-button-holder .qodef-btn',
                '.woocommerce-page .qodef-content a.added_to_cart',
                '.woocommerce-page .qodef-content a.button',
                '.woocommerce-page .qodef-content button[type=submit]',
                '.woocommerce-page .qodef-content input[type=submit]',
                'div.woocommerce a.added_to_cart',
                'div.woocommerce a.button',
                'div.woocommerce button[type=submit]',
                'div.woocommerce input[type=submit]',
                '.widget.woocommerce.widget_price_filter .price_slider_amount .button',
                '.widget.woocommerce.widget_product_tag_cloud a:hover'
            );

            $border_color_important_selector = array(
                '.qodef-pricing-tables .qodef-price-table .qodef-price-table-inner ul li.qodef-price-button .qodef-btn.qodef-btn-solid:hover',
                '.qodef-btn.qodef-btn-outline:not(.qodef-btn-custom-border-hover):hover',
                '.qodef-process-holder .qodef-process-item:hover .qodef-process-item-number-holder'
            );

            echo geko_qodef_dynamic_css($color_selector, array('color' => geko_qodef_options()->getOptionValue('first_color')));
            echo geko_qodef_dynamic_css($color_important_selector, array('color' => geko_qodef_options()->getOptionValue('first_color').'!important'));
            echo geko_qodef_dynamic_css('::selection', array('background' => geko_qodef_options()->getOptionValue('first_color')));
            echo geko_qodef_dynamic_css('::-moz-selection', array('background' => geko_qodef_options()->getOptionValue('first_color')));
            echo geko_qodef_dynamic_css($background_color_selector, array('background-color' => geko_qodef_options()->getOptionValue('first_color')));
            echo geko_qodef_dynamic_css($background_color_important_selector, array('background-color' => geko_qodef_options()->getOptionValue('first_color').'!important'));
            echo geko_qodef_dynamic_css($border_color_selector, array('border-color' => geko_qodef_options()->getOptionValue('first_color')));
            echo geko_qodef_dynamic_css($border_color_important_selector, array('border-color' => geko_qodef_options()->getOptionValue('first_color').'!important'));

            $border_top_color_selector = array(
                '.qodef-main-menu .qodef-main-menu-line',
                '.qodef-light-header .qodef-page-header>div:not(.qodef-sticky-header) .qodef-main-menu>ul>li.qodef-main-menu-line',
                '.qodef-light-header.qodef-header-style-on-scroll .qodef-page-header .qodef-main-menu>ul>li.qodef-main-menu-line',
                '.qodef-drop-down .second',
                '.qodef-shopping-cart-dropdown'
            );

            $border_bottom_color_selector = array(
                '.qodef-testimonials.cards.light .qodef-testimonial-separator',
                '.qodef-pie-chart-holder .qodef-pie-chart-text .qodef-pie-chart-separator-holder .qodef-pie-chart-separator',
                '.qodef-pie-chart-with-icon-holder .qodef-pie-chart-text .qodef-pie-chart-separator-holder .qodef-pie-chart-separator',
                '.qodef-iwt .qodef-iwt-title-separator-holder .qodef-iwt-title-separator',
                '.qodef-sidebar .widget ul li a:hover'
            );

            $border_left_color_selector = array(
                '.qodef-header-vertical .qodef-vertical-menu ul>li.qodef-narrow-menu-line'
            );

            echo geko_qodef_dynamic_css($border_top_color_selector, array('border-top-color' => geko_qodef_options()->getOptionValue('first_color')));
            echo geko_qodef_dynamic_css($border_bottom_color_selector, array('border-bottom-color' => geko_qodef_options()->getOptionValue('first_color')));
            echo geko_qodef_dynamic_css($border_left_color_selector, array('border-left-color' => geko_qodef_options()->getOptionValue('first_color')));
        }

		if (geko_qodef_options()->getOptionValue('page_background_color')) {
			$background_color_selector = array(
                '.qodef-content .qodef-content-inner > .qodef-container',
                '.qodef-content .qodef-content-inner > .qodef-full-width'
			);
			echo geko_qodef_dynamic_css($background_color_selector, array('background-color' => geko_qodef_options()->getOptionValue('page_background_color')));
		}

		if (geko_qodef_options()->getOptionValue('selection_color')) {
			echo geko_qodef_dynamic_css('::selection', array('background' => geko_qodef_options()->getOptionValue('selection_color')));
			echo geko_qodef_dynamic_css('::-moz-selection', array('background' => geko_qodef_options()->getOptionValue('selection_color')));
		}

		$boxed_background_style = array();
		if (geko_qodef_options()->getOptionValue('page_background_color_in_box')) {
			$boxed_background_style['background-color'] = geko_qodef_options()->getOptionValue('page_background_color_in_box');
		}

		if (geko_qodef_options()->getOptionValue('boxed_background_image')) {
			$boxed_background_style['background-image'] = 'url('.esc_url(geko_qodef_options()->getOptionValue('boxed_background_image')).')';
			$boxed_background_style['background-position'] = 'center 0px';
			$boxed_background_style['background-repeat'] = 'no-repeat';
		}

		if (geko_qodef_options()->getOptionValue('boxed_pattern_background_image')) {
			$boxed_background_style['background-image'] = 'url('.esc_url(geko_qodef_options()->getOptionValue('boxed_pattern_background_image')).')';
			$boxed_background_style['background-position'] = '0px 0px';
			$boxed_background_style['background-repeat'] = 'repeat';
		}

		if (geko_qodef_options()->getOptionValue('boxed_background_image_attachment')) {
			$boxed_background_style['background-attachment'] = (geko_qodef_options()->getOptionValue('boxed_background_image_attachment'));
		}

		echo geko_qodef_dynamic_css('.qodef-boxed .qodef-wrapper', $boxed_background_style);
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_design_styles');
}

if (!function_exists('geko_qodef_h1_styles')) {

    function geko_qodef_h1_styles() {

        $h1_styles = array();

        if(geko_qodef_options()->getOptionValue('h1_color') !== '') {
            $h1_styles['color'] = geko_qodef_options()->getOptionValue('h1_color');
        }
        if(geko_qodef_options()->getOptionValue('h1_google_fonts') !== '-1') {
            $h1_styles['font-family'] = geko_qodef_get_formatted_font_family(geko_qodef_options()->getOptionValue('h1_google_fonts'));
        }
        if(geko_qodef_options()->getOptionValue('h1_fontsize') !== '') {
            $h1_styles['font-size'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h1_fontsize')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h1_lineheight') !== '') {
            $h1_styles['line-height'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h1_lineheight')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h1_texttransform') !== '') {
            $h1_styles['text-transform'] = geko_qodef_options()->getOptionValue('h1_texttransform');
        }
        if(geko_qodef_options()->getOptionValue('h1_fontstyle') !== '') {
            $h1_styles['font-style'] = geko_qodef_options()->getOptionValue('h1_fontstyle');
        }
        if(geko_qodef_options()->getOptionValue('h1_fontweight') !== '') {
            $h1_styles['font-weight'] = geko_qodef_options()->getOptionValue('h1_fontweight');
        }
        if(geko_qodef_options()->getOptionValue('h1_letterspacing') !== '') {
            $h1_styles['letter-spacing'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h1_letterspacing')).'px';
        }

        $h1_selector = array(
            'h1'
        );

        if (!empty($h1_styles)) {
            echo geko_qodef_dynamic_css($h1_selector, $h1_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_h1_styles');
}

if (!function_exists('geko_qodef_h2_styles')) {

    function geko_qodef_h2_styles() {

        $h2_styles = array();

        if(geko_qodef_options()->getOptionValue('h2_color') !== '') {
            $h2_styles['color'] = geko_qodef_options()->getOptionValue('h2_color');
        }
        if(geko_qodef_options()->getOptionValue('h2_google_fonts') !== '-1') {
            $h2_styles['font-family'] = geko_qodef_get_formatted_font_family(geko_qodef_options()->getOptionValue('h2_google_fonts'));
        }
        if(geko_qodef_options()->getOptionValue('h2_fontsize') !== '') {
            $h2_styles['font-size'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h2_fontsize')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h2_lineheight') !== '') {
            $h2_styles['line-height'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h2_lineheight')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h2_texttransform') !== '') {
            $h2_styles['text-transform'] = geko_qodef_options()->getOptionValue('h2_texttransform');
        }
        if(geko_qodef_options()->getOptionValue('h2_fontstyle') !== '') {
            $h2_styles['font-style'] = geko_qodef_options()->getOptionValue('h2_fontstyle');
        }
        if(geko_qodef_options()->getOptionValue('h2_fontweight') !== '') {
            $h2_styles['font-weight'] = geko_qodef_options()->getOptionValue('h2_fontweight');
        }
        if(geko_qodef_options()->getOptionValue('h2_letterspacing') !== '') {
            $h2_styles['letter-spacing'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h2_letterspacing')).'px';
        }

        $h2_selector = array(
            'h2'
        );

        if (!empty($h2_styles)) {
            echo geko_qodef_dynamic_css($h2_selector, $h2_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_h2_styles');
}

if (!function_exists('geko_qodef_h3_styles')) {

    function geko_qodef_h3_styles() {

        $h3_styles = array();

        if(geko_qodef_options()->getOptionValue('h3_color') !== '') {
            $h3_styles['color'] = geko_qodef_options()->getOptionValue('h3_color');
        }
        if(geko_qodef_options()->getOptionValue('h3_google_fonts') !== '-1') {
            $h3_styles['font-family'] = geko_qodef_get_formatted_font_family(geko_qodef_options()->getOptionValue('h3_google_fonts'));
        }
        if(geko_qodef_options()->getOptionValue('h3_fontsize') !== '') {
            $h3_styles['font-size'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h3_fontsize')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h3_lineheight') !== '') {
            $h3_styles['line-height'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h3_lineheight')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h3_texttransform') !== '') {
            $h3_styles['text-transform'] = geko_qodef_options()->getOptionValue('h3_texttransform');
        }
        if(geko_qodef_options()->getOptionValue('h3_fontstyle') !== '') {
            $h3_styles['font-style'] = geko_qodef_options()->getOptionValue('h3_fontstyle');
        }
        if(geko_qodef_options()->getOptionValue('h3_fontweight') !== '') {
            $h3_styles['font-weight'] = geko_qodef_options()->getOptionValue('h3_fontweight');
        }
        if(geko_qodef_options()->getOptionValue('h3_letterspacing') !== '') {
            $h3_styles['letter-spacing'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h3_letterspacing')).'px';
        }

        $h3_selector = array(
            'h3'
        );

        if (!empty($h3_styles)) {
            echo geko_qodef_dynamic_css($h3_selector, $h3_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_h3_styles');
}

if (!function_exists('geko_qodef_h4_styles')) {

    function geko_qodef_h4_styles() {

        $h4_styles = array();

        if(geko_qodef_options()->getOptionValue('h4_color') !== '') {
            $h4_styles['color'] = geko_qodef_options()->getOptionValue('h4_color');
        }
        if(geko_qodef_options()->getOptionValue('h4_google_fonts') !== '-1') {
            $h4_styles['font-family'] = geko_qodef_get_formatted_font_family(geko_qodef_options()->getOptionValue('h4_google_fonts'));
        }
        if(geko_qodef_options()->getOptionValue('h4_fontsize') !== '') {
            $h4_styles['font-size'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h4_fontsize')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h4_lineheight') !== '') {
            $h4_styles['line-height'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h4_lineheight')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h4_texttransform') !== '') {
            $h4_styles['text-transform'] = geko_qodef_options()->getOptionValue('h4_texttransform');
        }
        if(geko_qodef_options()->getOptionValue('h4_fontstyle') !== '') {
            $h4_styles['font-style'] = geko_qodef_options()->getOptionValue('h4_fontstyle');
        }
        if(geko_qodef_options()->getOptionValue('h4_fontweight') !== '') {
            $h4_styles['font-weight'] = geko_qodef_options()->getOptionValue('h4_fontweight');
        }
        if(geko_qodef_options()->getOptionValue('h4_letterspacing') !== '') {
            $h4_styles['letter-spacing'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h4_letterspacing')).'px';
        }

        $h4_selector = array(
            'h4'
        );

        if (!empty($h4_styles)) {
            echo geko_qodef_dynamic_css($h4_selector, $h4_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_h4_styles');
}

if (!function_exists('geko_qodef_h5_styles')) {

    function geko_qodef_h5_styles() {

        $h5_styles = array();

        if(geko_qodef_options()->getOptionValue('h5_color') !== '') {
            $h5_styles['color'] = geko_qodef_options()->getOptionValue('h5_color');
        }
        if(geko_qodef_options()->getOptionValue('h5_google_fonts') !== '-1') {
            $h5_styles['font-family'] = geko_qodef_get_formatted_font_family(geko_qodef_options()->getOptionValue('h5_google_fonts'));
        }
        if(geko_qodef_options()->getOptionValue('h5_fontsize') !== '') {
            $h5_styles['font-size'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h5_fontsize')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h5_lineheight') !== '') {
            $h5_styles['line-height'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h5_lineheight')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h5_texttransform') !== '') {
            $h5_styles['text-transform'] = geko_qodef_options()->getOptionValue('h5_texttransform');
        }
        if(geko_qodef_options()->getOptionValue('h5_fontstyle') !== '') {
            $h5_styles['font-style'] = geko_qodef_options()->getOptionValue('h5_fontstyle');
        }
        if(geko_qodef_options()->getOptionValue('h5_fontweight') !== '') {
            $h5_styles['font-weight'] = geko_qodef_options()->getOptionValue('h5_fontweight');
        }
        if(geko_qodef_options()->getOptionValue('h5_letterspacing') !== '') {
            $h5_styles['letter-spacing'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h5_letterspacing')).'px';
        }

        $h5_selector = array(
            'h5'
        );

        if (!empty($h5_styles)) {
            echo geko_qodef_dynamic_css($h5_selector, $h5_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_h5_styles');
}

if (!function_exists('geko_qodef_h6_styles')) {

    function geko_qodef_h6_styles() {

        $h6_styles = array();

        if(geko_qodef_options()->getOptionValue('h6_color') !== '') {
            $h6_styles['color'] = geko_qodef_options()->getOptionValue('h6_color');
        }
        if(geko_qodef_options()->getOptionValue('h6_google_fonts') !== '-1') {
            $h6_styles['font-family'] = geko_qodef_get_formatted_font_family(geko_qodef_options()->getOptionValue('h6_google_fonts'));
        }
        if(geko_qodef_options()->getOptionValue('h6_fontsize') !== '') {
            $h6_styles['font-size'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h6_fontsize')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h6_lineheight') !== '') {
            $h6_styles['line-height'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h6_lineheight')).'px';
        }
        if(geko_qodef_options()->getOptionValue('h6_texttransform') !== '') {
            $h6_styles['text-transform'] = geko_qodef_options()->getOptionValue('h6_texttransform');
        }
        if(geko_qodef_options()->getOptionValue('h6_fontstyle') !== '') {
            $h6_styles['font-style'] = geko_qodef_options()->getOptionValue('h6_fontstyle');
        }
        if(geko_qodef_options()->getOptionValue('h6_fontweight') !== '') {
            $h6_styles['font-weight'] = geko_qodef_options()->getOptionValue('h6_fontweight');
        }
        if(geko_qodef_options()->getOptionValue('h6_letterspacing') !== '') {
            $h6_styles['letter-spacing'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('h6_letterspacing')).'px';
        }

        $h6_selector = array(
            'h6'
        );

        if (!empty($h6_styles)) {
            echo geko_qodef_dynamic_css($h6_selector, $h6_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_h6_styles');
}

if (!function_exists('geko_qodef_text_styles')) {

    function geko_qodef_text_styles() {

        $text_styles = array();

        if(geko_qodef_options()->getOptionValue('text_color') !== '') {
            $text_styles['color'] = geko_qodef_options()->getOptionValue('text_color');
        }
        if(geko_qodef_options()->getOptionValue('text_google_fonts') !== '-1') {
            $text_styles['font-family'] = geko_qodef_get_formatted_font_family(geko_qodef_options()->getOptionValue('text_google_fonts'));
        }
        if(geko_qodef_options()->getOptionValue('text_fontsize') !== '') {
            $text_styles['font-size'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('text_fontsize')).'px';
        }
        if(geko_qodef_options()->getOptionValue('text_lineheight') !== '') {
            $text_styles['line-height'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('text_lineheight')).'px';
        }
        if(geko_qodef_options()->getOptionValue('text_texttransform') !== '') {
            $text_styles['text-transform'] = geko_qodef_options()->getOptionValue('text_texttransform');
        }
        if(geko_qodef_options()->getOptionValue('text_fontstyle') !== '') {
            $text_styles['font-style'] = geko_qodef_options()->getOptionValue('text_fontstyle');
        }
        if(geko_qodef_options()->getOptionValue('text_fontweight') !== '') {
            $text_styles['font-weight'] = geko_qodef_options()->getOptionValue('text_fontweight');
        }
        if(geko_qodef_options()->getOptionValue('text_letterspacing') !== '') {
            $text_styles['letter-spacing'] = geko_qodef_filter_px(geko_qodef_options()->getOptionValue('text_letterspacing')).'px';
        }

        $text_selector = array(
            'p'
        );

        if (!empty($text_styles)) {
            echo geko_qodef_dynamic_css($text_selector, $text_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_text_styles');
}

if (!function_exists('geko_qodef_link_styles')) {

    function geko_qodef_link_styles() {

        $link_styles = array();

        if(geko_qodef_options()->getOptionValue('link_color') !== '') {
            $link_styles['color'] = geko_qodef_options()->getOptionValue('link_color');
        }
        if(geko_qodef_options()->getOptionValue('link_fontstyle') !== '') {
            $link_styles['font-style'] = geko_qodef_options()->getOptionValue('link_fontstyle');
        }
        if(geko_qodef_options()->getOptionValue('link_fontweight') !== '') {
            $link_styles['font-weight'] = geko_qodef_options()->getOptionValue('link_fontweight');
        }
        if(geko_qodef_options()->getOptionValue('link_fontdecoration') !== '') {
            $link_styles['text-decoration'] = geko_qodef_options()->getOptionValue('link_fontdecoration');
        }

        $link_selector = array(
            'a',
            'p a'
        );

        if (!empty($link_styles)) {
            echo geko_qodef_dynamic_css($link_selector, $link_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_link_styles');
}

if (!function_exists('geko_qodef_link_hover_styles')) {

    function geko_qodef_link_hover_styles() {

        $link_hover_styles = array();

        if(geko_qodef_options()->getOptionValue('link_hovercolor') !== '') {
            $link_hover_styles['color'] = geko_qodef_options()->getOptionValue('link_hovercolor');
        }
        if(geko_qodef_options()->getOptionValue('link_hover_fontdecoration') !== '') {
            $link_hover_styles['text-decoration'] = geko_qodef_options()->getOptionValue('link_hover_fontdecoration');
        }

        $link_hover_selector = array(
            'a:hover',
            'p a:hover'
        );

        if (!empty($link_hover_styles)) {
            echo geko_qodef_dynamic_css($link_hover_selector, $link_hover_styles);
        }

        $link_heading_hover_styles = array();

        if(geko_qodef_options()->getOptionValue('link_hovercolor') !== '') {
            $link_heading_hover_styles['color'] = geko_qodef_options()->getOptionValue('link_hovercolor');
        }

        $link_heading_hover_selector = array(
            'h1 a:hover',
            'h2 a:hover',
            'h3 a:hover',
            'h4 a:hover',
            'h5 a:hover',
            'h6 a:hover'
        );

        if (!empty($link_heading_hover_styles)) {
            echo geko_qodef_dynamic_css($link_heading_hover_selector, $link_heading_hover_styles);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_link_hover_styles');
}

if (!function_exists('geko_qodef_smooth_page_transition_styles')) {

    function geko_qodef_smooth_page_transition_styles() {
        
        $loader_style = array();

        if(geko_qodef_options()->getOptionValue('smooth_pt_bgnd_color') !== '') {
            $loader_style['background-color'] = geko_qodef_options()->getOptionValue('smooth_pt_bgnd_color');
        }

        $loader_selector = array('.qodef-smooth-transition-loader');

        if (!empty($loader_style)) {
            echo geko_qodef_dynamic_css($loader_selector, $loader_style);
        }

        $spinner_style = array();

        if(geko_qodef_options()->getOptionValue('smooth_pt_spinner_color') !== '') {
            $spinner_style['background-color'] = geko_qodef_options()->getOptionValue('smooth_pt_spinner_color');
        }

        $spinner_selectors = array(
            '.qodef-st-loader .pulse', 
            '.qodef-st-loader .double_pulse .double-bounce1', 
            '.qodef-st-loader .double_pulse .double-bounce2', 
            '.qodef-st-loader .cube', 
            '.qodef-st-loader .rotating_cubes .cube1', 
            '.qodef-st-loader .rotating_cubes .cube2', 
            '.qodef-st-loader .stripes > div', 
            '.qodef-st-loader .wave > div', 
            '.qodef-st-loader .two_rotating_circles .dot1', 
            '.qodef-st-loader .two_rotating_circles .dot2', 
            '.qodef-st-loader .five_rotating_circles .container1 > div', 
            '.qodef-st-loader .five_rotating_circles .container2 > div', 
            '.qodef-st-loader .five_rotating_circles .container3 > div', 
            '.qodef-st-loader .atom .ball-1:before', 
            '.qodef-st-loader .atom .ball-2:before', 
            '.qodef-st-loader .atom .ball-3:before', 
            '.qodef-st-loader .atom .ball-4:before', 
            '.qodef-st-loader .clock .ball:before', 
            '.qodef-st-loader .mitosis .ball', 
            '.qodef-st-loader .lines .line1', 
            '.qodef-st-loader .lines .line2', 
            '.qodef-st-loader .lines .line3', 
            '.qodef-st-loader .lines .line4', 
            '.qodef-st-loader .fussion .ball', 
            '.qodef-st-loader .fussion .ball-1', 
            '.qodef-st-loader .fussion .ball-2', 
            '.qodef-st-loader .fussion .ball-3', 
            '.qodef-st-loader .fussion .ball-4', 
            '.qodef-st-loader .wave_circles .ball', 
            '.qodef-st-loader .pulse_circles .ball' 
        );

        if (!empty($spinner_style)) {
            echo geko_qodef_dynamic_css($spinner_selectors, $spinner_style);
        }
    }

    add_action('geko_qodef_style_dynamic', 'geko_qodef_smooth_page_transition_styles');
}