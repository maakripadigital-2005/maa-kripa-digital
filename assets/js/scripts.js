(function ($) {
  'use strict';

  //===== Variables =====//
  var width = window.innerWidth,
    menuHeight,
    max_tilt,
    perspective,
    scale,
    speed,
    tilt,
    wow,
    styles;

  $(document).ready(function () {
    //===== Custom Padding & Margin Classes =====//
    const max = 500;
    const base = 16;
    styles = '';

    for (let i = 1; i <= max; i++) {
      let remValue = (i / base).toFixed(3);
      styles += `
            .p-${i} { padding: ${remValue}rem !important; }
            .m-${i} { margin: ${remValue}rem !important; }
            .pt-${i} { padding-top: ${remValue}rem !important; }
            .pb-${i} { padding-bottom: ${remValue}rem !important; }
            .pl-${i} { padding-left: ${remValue}rem !important; }
            .pr-${i} { padding-right: ${remValue}rem !important; }
            .mt-${i} { margin-top: ${remValue}rem !important; }
            .mb-${i} { margin-bottom: ${remValue}rem !important; }
            .ml-${i} { margin-left: ${remValue}rem !important; }
            .mr-${i} { margin-right: ${remValue}rem !important; }
        `;
    }

    document.getElementById('dynamic-spacing').innerHTML = styles;

    //===== Tilt =====//
    if ($.isFunction($.fn.tilt)) {
      jQuery('.tilt').each(function (i, el) {
        max_tilt = jQuery(el).data('max_tilt');
        perspective = jQuery(el).data('perspective');
        scale = jQuery(el).data('scale');
        speed = jQuery(el).data('speed');
        tilt = jQuery(el).tilt({
          maxTilt: max_tilt,
          perspective: perspective,
          easing: 'cubic-bezier(.03,.98,.52,.99)',
          scale: scale,
          speed: speed,
          transition: true,
          disableAxis: null,
          reset: true,
          glare: false,
          maxGlare: 1,
        });
        tilt.tilt.reset.call(tilt);
      });
    }

    //===== Tooltip =====//
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    //===== Projects =====//
    $('.projects-list .project-list-item').on('mouseenter', function () {
      // Remove 'active' from all list items in the same projects list
      $(this).siblings('.project-list-item').removeClass('active');
      // Add 'active' to the hovered item
      $(this).addClass('active');
    });

    //===== Wow Animation Setting =====//
    if ($('.wow').length > 0) {
      wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: true, // default
        live: true, // default
      });

      wow.init();
    }

    //===== Side Menu =====//
    $('.menu-trigger').on('click', function () {
      $('nav').addClass('slidein');
      return false;
    });
    $('.menu-close-trigger').on('click', function () {
      $('nav').removeClass('slidein');
      return false;
    });
    $('nav li.menu-item-has-children > a').on('click', function () {
      $(this).parent().siblings('li').children('ul').slideUp();
      $(this).parent().siblings('li').removeClass('active');
      $(this).parent().children('ul').slideToggle();
      $(this).parent().toggleClass('active');
      return false;
    });

    //===== Select =====//
    if ($('.selectpicker > select').length > 0) {
      $('.selectpicker > select').selectpicker();
    }

    //===== Circular Progress =====//
    if ($.isFunction($.fn.circlechart)) {
      $('.circular-progress').circlechart();
    }

    //===== Slick Carousel =====//
    if ($.isFunction($.fn.slick)) {
      //=== Hero Carousel ===//
      $('.hero-sec-caro').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        autoplay: true,
        fade: true,
        autoplaySpeed: 5000,
        speed: 500,
        draggable: true,
        dots: false,
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        pauseOnHover: true,
        appendArrows: $('.slick-arrows'),
        prevArrow:
          "<button type='button' class='slick-prev'><i class='far fa-chevron-up'></i></button>",
        nextArrow:
          "<button type='button' class='slick-next'><i class='far fa-chevron-down'></i></button>",
      });
      //=== Footer Image Carousel ===//
      $('.footer-img-caro').slick({
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        autoplay: true,
        fade: true,
        autoplaySpeed: 5000,
        speed: 500,
        draggable: true,
        dots: true,
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        pauseOnHover: true,
        prevArrow:
          "<button type='button' class='slick-prev'><i class='far fa-arrow-right'></i></button>",
        nextArrow:
          "<button type='button' class='slick-next'><i class='far fa-arrow-left'></i></button>",
      });
    }

    //===== Custom Cursor =====//
    if (window.matchMedia('(pointer: fine)').matches) {
      const $cursor = $('<div class="custom-cursor"></div>');
      const $cursorDot = $('<div class="custom-cursor-dot"></div>');
      $('body').append($cursor).append($cursorDot);

      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;
      let dotX = 0, dotY = 0;
      let hasMoved = false;

      $(window).on('mousemove', function (e) {
        if (!hasMoved) {
          $cursor.css('opacity', 1);
          $cursorDot.css('opacity', 1);
          cursorX = dotX = mouseX = e.clientX;
          cursorY = dotY = mouseY = e.clientY;
          hasMoved = true;
        } else {
          mouseX = e.clientX;
          mouseY = e.clientY;
        }
      });

      function animateCursor() {
        if (hasMoved) {
          cursorX += (mouseX - cursorX) * 0.15;
          cursorY += (mouseY - cursorY) * 0.15;
          $cursor.css({
            left: cursorX + 'px',
            top: cursorY + 'px',
          });

          dotX += (mouseX - dotX) * 0.3;
          dotY += (mouseY - dotY) * 0.3;
          $cursorDot.css({
            left: dotX + 'px',
            top: dotY + 'px',
          });
        }
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      const hoverElements = 'a, button, input[type="submit"], input[type="button"], select, textarea, .theme-btn, .menu-trigger, .project-list-item, .tech-icon, .social-inner a, .slick-arrow, .slick-dots li, .useful-links li a';
      $(document).on('mouseenter', hoverElements, function () {
        $cursor.addClass('hover');
        $cursorDot.addClass('hover');
      });
      $(document).on('mouseleave', hoverElements, function () {
        $cursor.removeClass('hover');
        $cursorDot.removeClass('hover');
      });

      $(window).on('mousedown', function () {
        $cursor.addClass('click');
        $cursorDot.addClass('click');
      });
      $(window).on('mouseup', function () {
        $cursor.removeClass('click');
        $cursorDot.removeClass('click');
      });

      // Hide cursor when leaving window
      $(document).on('mouseleave', function () {
        $cursor.css('opacity', 0);
        $cursorDot.css('opacity', 0);
      });
      $(document).on('mouseenter', function () {
        if (hasMoved) {
          $cursor.css('opacity', 1);
          $cursorDot.css('opacity', 1);
        }
      });
    }
  }); //===== Document Ready Ends =====//

  //===== Window OnLoad =====//
  $(window).on('load', function () {
    'use strict';
  }); //===== Window OnLoad Ends =====//

  //===== Sticky Header =====//
  $(window).on('scroll', function () {
    'use strict';

    if (width > 990) {
      menuHeight = $('header').innerHeight();
      var scrollTopVal = $(window).scrollTop();
      if (scrollTopVal >= menuHeight) {
        $('body').addClass('sticky');
      } else {
        $('body').removeClass('sticky');
      }
    }
  }); //===== Window onScroll Ends =====//
})(jQuery);
