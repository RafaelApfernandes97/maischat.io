(function($) {
    'use strict';

    var woocommerce = {};
    qodef.modules.woocommerce = woocommerce;

    woocommerce.qodefInitQuantityButtons = qodefInitQuantityButtons;
    woocommerce.qodefInitSelect2 = qodefInitSelect2;

    woocommerce.qodefOnDocumentReady = qodefOnDocumentReady;
    woocommerce.qodefOnWindowLoad = qodefOnWindowLoad;
    woocommerce.qodefOnWindowResize = qodefOnWindowResize;
    woocommerce.qodefOnWindowScroll = qodefOnWindowScroll;

    $(document).ready(qodefOnDocumentReady);
    $(window).on('load',qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);
    $(window).scroll(qodefOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefInitQuantityButtons();
        qodefInitSelect2();
        qodefReInitSelect2CartAjax();
        qodefInitSingleProductLightbox();
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

    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function qodefOnWindowScroll() {

    }
    
    /*
    ** Init quantity buttons to increase/decrease products for cart
    */
    function qodefInitQuantityButtons() {
    
        $(document).on( 'click', '.qodef-quantity-minus, .qodef-quantity-plus', function(e) {
            e.stopPropagation();

            var button = $(this),
                inputField = button.siblings('.qodef-quantity-input'),
                step = parseFloat(inputField.attr('step')),
                max = parseFloat(inputField.attr('max')),
                minus = false,
                inputValue = parseFloat(inputField.val()),
                newInputValue;

            if (button.hasClass('qodef-quantity-minus')) {
                minus = true;
            }

            if (minus) {
                newInputValue = inputValue - step;
                if (newInputValue >= 1) {
                    inputField.val(newInputValue);
                } else {
                    inputField.val(1);
                }
            } else {
                newInputValue = inputValue + step;
                if ( max === undefined ) {
                    inputField.val(newInputValue);
                } else {
                    if ( newInputValue >= max ) {
                        inputField.val(max);
                    } else {
                        inputField.val(newInputValue);
                    }
                }
            }

            inputField.trigger( 'change' );
        });
    }

    /*
    ** Init select2 script for select html dropdowns
    */
    function qodefInitSelect2() {

        if ($('.woocommerce-ordering .orderby').length ||  $('#calc_shipping_country').length ) {

            $('.woocommerce-ordering .orderby').select2({
                minimumResultsForSearch: Infinity
            });

            $('#calc_shipping_country').select2();
        }
    }

    /*
     ** Re Init select2 script for select html dropdowns
     */
    function qodefReInitSelect2CartAjax() {

        $(document).ajaxComplete(function() {
            if ($('#calc_shipping_country').length) {

                $('#calc_shipping_country').select2();
            }
        });
    }

    /*
     ** Init Product Single Pretty Photo attributes
     */
    function qodefInitSingleProductLightbox() {
        var item = $('.qodef-woo-single-page .qodef-single-product-content .images .woocommerce-product-gallery__image');

        if(item.length) {
            item.each(function() {
                var thisItem = $(this).children('a');

                thisItem.attr('data-rel', 'prettyPhoto[woo_single_pretty_photo]');

                if (typeof qodef.modules.common.qodefPrettyPhoto === "function") {
                    qodef.modules.common.qodefPrettyPhoto();
                }
            });
        }
    }

})(jQuery);