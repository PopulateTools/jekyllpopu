//= require analytics
//= require vendor/jquery-2.2.0.min
//= require vendor/sticky-kit.min
//= require vendor/velocity.min
//= require vendor/jquery.magnific-popup.min
//= require vendor/jquery.waypoints.min
//= require vendor/jquery.waypoints.inview
//= require vendor/tipsy
//= require vendor/flight.min
//= require vendor/select-and-tweet
//= require vendor/klass
//= require components/shareContent

// some config
var min_scroll_to_show_social_links = 650;

function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

function rebindAll() {
  $('.tipsit').tipsy({fade: true, gravity: 's', html: true});
  $('.tipsit-n').tipsy({fade: true, gravity: 'n', html: true});
  $('.tipsit-w').tipsy({fade: true, gravity: 'w', html: true});
  $('.tipsit-e').tipsy({fade: true, gravity: 'e', html: true});
}

function show_social_links_footer() {
  $('.social_links_container').velocity("fadeIn");
  show_social_links_footer = function() {};
}

function show_temp(el, time, show_after) {
  show_after = show_after || "";
  el.velocity("fadeIn");
  $('.progress span').velocity({ width: '100%'}, {duration: time}, "linear");
  el.velocity("fadeOut", {
    delay: time,
    complete: function() {
      show_after.velocity("fadeIn");
    }
  });

  if(el.length) {
    gaEvent('OnScroll', 'Show', 'Donation Time Bomb');
  }
  // only run once
  show_temp = function() {};
}

$(function(){

  rebindAll();

  $('article a').after(function() {
    if($(this).attr('href').match(/^http/) !== null){
      $(this).attr('target', '_blank');
    }
  });

  // autocaptions for article images
  $('article img.caption').after(function() {
    if($(this).attr('title') !== undefined && $(this).attr('title').length > 0) {

      var classesToAdd = '';
      if($(this).hasClass('inline')) {
        classesToAdd += ' inline ';
      }
      if($(this).hasClass('f_right')) {
        classesToAdd += ' f_right ';
      }
      if($(this).hasClass('f_left')) {
        classesToAdd += ' f_left ';
      }

      $(this).wrap('<div class="image ' + classesToAdd + ' "></div>');
      $(this).after('<caption>' + $(this).attr('title') + '</caption></div>');
    }
  });


  // autocaptions for article header image
  if($('article img.heading').length > 0 && $('article img.heading').attr('title').length > 0) {
    $('header img.heading').after(function() {
      $(this).after('<caption><i class="fa fa-info-circle"></i> <span>' + $(this).attr('title') + '</span></caption>');
    });
    $('header caption').hover(function(e) {
      // e.preventDefault();
      $('header caption span').show();
    }, function(e) {
      $('header caption span').hide();
    });
  }


  // slideout menu on logo hover
  window.sidebarTimerID = null;
  if(($(window).width() > 740)) {
    $('.site-title,menu.on_logo_hover').hover(function(e) {
      if(window.sidebarTimerID !== null) {
        window.clearTimeout(window.sidebarTimerID);
      }
      // e.preventDefault();
      var header_offset = $('header.project').offset().top + $('header.project').height() - $(window).scrollTop();
      $('menu.on_logo_hover').css('top', header_offset);
      // $('menu.on_logo_hover').velocity('fadeIn');
      $('menu.on_logo_hover').show();
      $('menu.on_logo_hover').css('opacity', 1);
    }, function(e) {
      window.sidebarTimerID = window.setTimeout(function(){
        // $('menu.on_logo_hover').hide();
        $('menu.on_logo_hover').velocity('fadeOut');
      }, 200);
    });
  }

  // init fixed header
  $(".stickable").stick_in_parent().
    on("sticky_kit:stick", function(e) {
      $("header.project").addClass('sticked');
    })
    .on("sticky_kit:unstick", function(e) {
      $("header.project").removeClass('sticked');
    });

  // Show tweet_box when a on_viewport tweet is onview
  if($('.on_viewport').length) {
    var $tweetText = $('.tweet_to_show');
    var $tweetBox = $('.tweet_box');
    var waypointsDisabled = [];

    $('.on_viewport').each(function(){
      var $element = $(this);
      var w = new Waypoint.Inview({
        element: $element,
        enabled: false,
        entered: function(direction) {
          $tweetText.html($element.data('tweet'));
          $tweetText.data('data-share-text', $element.data('tweet'));
          $tweetBox.velocity("fadeIn");
          gaEvent('OnScroll', 'Show', 'Tweet');
        },
        exited: function(direction) {
          $tweetBox.velocity("fadeOut");
        }
      });
      waypointsDisabled.push(w);
    });

    $(window).scroll(function (event){
      waypointsDisabled.forEach(function(w){
        w.enable();
      });
      waypointsDisabled = [];
    });
  }

  // Progress Bar in Articles
  var winHeight = $(window).height(),
      docHeight = $(document).height(),
      progressBar = $('progress'),
      max, value;

  /* Set the max scrollable area */
  max = docHeight - winHeight;
  progressBar.attr('max', max);

  $(document).on('scroll', function(){
    value = $(window).scrollTop();
    progressBar.attr('value', value);

    if(($(window).width() < 740) && ($(window).scrollTop() > min_scroll_to_show_social_links)) {
      show_social_links_footer();
    }
  });

  // Modals
  $('.open_modal').magnificPopup({
    type: 'inline',
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });

  $('.close_modal').click(function(e) {
    $.magnificPopup.close();
  });

  // Galleries
  var magnificPopupOptions = {
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return '<div data-share data-anchor="gallery"><p data-share-text>' + item.el.attr('title') + '</p><small>' + item.el.attr('subtitle') + '</small>' +
          '<div class="social_links_container"><a href="#" class="twitter" data-share-network="twitter" data-track-event="Social Share|Click Twitter|From Gallery Item"><i class="fa fa-twitter"></i></a> <a href="#" class="facebook" data-share-network="facebook" data-track-event="Social Share|Click Facebook|From Gallery Item"><i class="fa fa-facebook"></i></a></div></div>';
      }
    },
    callbacks: {
      updateStatus: function(data){
        if(data.status === "ready"){
          window.shareContent.attachTo('[data-share]');
        }
      }
    }
  };

  $('.popup-gallery').magnificPopup(jQuery.extend(magnificPopupOptions,{mainClass: 'mfp-image-mobile'}));
  $('.popup-gallery-full').magnificPopup(jQuery.extend(magnificPopupOptions, {mainClass: 'popup-gallery-full'}));

  $('.open_mobile_menu').magnificPopup({
    type: 'inline',
    removalDelay: 300,
    mainClass: 'mobile_menu',
    fixedContentPos: true
  });

  $(document).on('click', '[data-track-event]', function(e){
    var parameters = $(this).data('track-event');
    if(parameters !== undefined){
      parameters = parameters.split('|');
      if(parameters.length == 4 && $(window).width() < 740){
        parameters[3] = 'Mobile';
      }
      gaEvent.apply(this, parameters);
    }
  });
});
