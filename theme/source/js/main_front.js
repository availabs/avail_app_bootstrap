/*

Main javascript functions to init most of the elements

#1. TESTIMONIALS
#2. PROJECTS SLIDER

*/

$(function(){


  // #3. RANGE SLIDER
  if($('.ion-range-slider').length){
    $('.ion-range-slider').ionRangeSlider({
      type: "double", 
      min: 0,
      max: 1000000,
      from: 200000,
      to: 800000,
      prefix: "$",
      step: 50000
    });
  }

  // #4. FEATURES SELECT


  if($('.select2').length){
    $('.select2').select2();
  }



  // #5. STAR RATING

  $('.item-star-rating').barrating({theme: 'osadmin', readonly: true});


  // #6. DATE RANGE PICKER
  var rental_start = moment();
  var rental_end = moment().add(14, 'days');
  $('.date-range-picker').daterangepicker({
    startDate: rental_start,
    endDate: rental_end,
    locale: {
      format: 'MMM D, YYYY'
    }
  });


  // #6. FILTER TOGGLER

  $('.filter-toggle').on('click', function(){
    var $filter_w = $(this).closest('.filter-w');
    if($filter_w.hasClass('collapsed')){
      $filter_w.find('.filter-body').slideDown(300, function(){
        $filter_w.removeClass('collapsed');
      });
    }else{
      $filter_w.find('.filter-body').slideUp(300, function(){
        $filter_w.addClass('collapsed');
      });
    }
    return false;
  });


  // #7. FILTERS PANEL MAIN TOGGLER

  $('.filters-toggler').on('click', function(){
    $('.rentals-list-w').toggleClass('hide-filters');
    return false;
  });

  // #1. TESTIMONIALS
  $('.testimonials-slider').slick({
    infinite: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false
      }
    }]
  });

  // #2. PROJECTS SLIDER
  $('.projects-slider-i').slick({
    infinite: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false
      }
    }]
  });

  $('.main-menu li a').on('click', function(){
    $('.main-menu li.active').removeClass('active');
    $(this).closest('li').addClass('active');
  });

  $('.mobile-menu-trigger').on('click', function(){
    $('.mobile-menu-holder').slideToggle(400);
  });

});
