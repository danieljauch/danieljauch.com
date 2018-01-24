$(document).ready(function() {
  window.sr = ScrollReveal();
  // Top menu Scroll Reveal
  // sr.reveal('.site-header .menu-item .submenu-item:first-of-type', {
  //   origin: 'left',
  //   duration: 250
  // });
  // sr.reveal('.site-header .menu-item .submenu-item:nth-of-type(2)', {
  //   origin: 'left',
  //   duration: 250,
  //   delay: 100
  // });
  // sr.reveal('.site-header .menu-item .submenu-item:nth-of-type(3)', {
  //   origin: 'left',
  //   duration: 250,
  //   delay: 150
  // });
  // sr.reveal('.site-header .menu-item .submenu-item:nth-of-type(4)', {
  //   origin: 'left',
  //   duration: 250,
  //   delay: 200
  // });

  // Title Scroll Reveal
  sr.reveal('.title-left h2', {
    origin: 'left',
    delay: 250
  });
  sr.reveal('.title-left h1', {
    origin: 'left',
    delay: 500
  });
  sr.reveal('.title-left h3', {
    origin: 'left',
    delay: 1500
  });
  sr.reveal('.title-reveal-1', {
    origin: 'left',
    delay: 2000
  });
  sr.reveal('.title-reveal-2', {
    origin: 'left',
    delay: 2250
  });
  sr.reveal('.title-reveal-3', {
    origin: 'left',
    delay: 2500
  });

  // Area Scroll Reveal
  sr.reveal('.main-area header h4', {
    origin: 'right',
    duration: 250
  });
  sr.reveal('.main-area header nav ul li:first-of-type', {
    origin: 'right',
    duration: 250,
    delay: 100
  });
  sr.reveal('.main-area header nav ul li:nth-of-type(2)', {
    origin: 'right',
    duration: 250,
    delay: 150
  });
  sr.reveal('.main-area header nav ul li:nth-of-type(3)', {
    origin: 'right',
    duration: 250,
    delay: 200
  });
  sr.reveal('.main-area header nav ul li:nth-of-type(4)', {
    origin: 'right',
    duration: 250,
    delay: 250
  });

  // // Carousels
  // sr.reveal('.main-area .subarea-carousel .content h6:first-of-type', {
  //   origin: 'right',
  //   duration: 250
  // });
  // sr.reveal('.main-area .subarea-carousel .content h6:nth-of-type(2)', {
  //   origin: 'right',
  //   duration: 250,
  //   delay: 100
  // });
  // sr.reveal('.main-area .subarea-carousel .content h6:nth-of-type(3)', {
  //   origin: 'right',
  //   duration: 250,
  //   delay: 150
  // });
  // sr.reveal('.main-area .subarea-carousel .content h6:nth-of-type(4)', {
  //   origin: 'right',
  //   duration: 250,
  //   delay: 200
  // });

  // // Contents
  // sr.reveal('.main-area .subarea-carousel .content-reveal:first-of-type', {
  //   origin: 'right',
  //   duration: 250,
  //   delay: 250
  // });
  // sr.reveal('.main-area .subarea-carousel .content-reveal:nth-of-type(2)', {
  //   origin: 'right',
  //   duration: 250,
  //   delay: 300
  // });
  // sr.reveal('.main-area .subarea-carousel .content-reveal:nth-of-type(3)', {
  //   origin: 'right',
  //   duration: 250,
  //   delay: 350
  // });
  // sr.reveal('.main-area .subarea-carousel .content-reveal:nth-of-type(4)', {
  //   origin: 'right',
  //   duration: 250,
  //   delay: 400
  // });

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
  
  $('.pointer').click(function () {
    var obj = $(this)[0],
      clas = obj.classList[0],
      match = clas.split("-")[0];
    $('#' + match).addClass('active');
    $('#' + match).siblings('.subarea').removeClass('active');
  });

  var modalOpen = false;
  
  $('.modal-open').click(function () {
    var obj = $(this)[0],
      clas = obj.classList[0],
      match = clas.split("-")[0];
    $('.modals').addClass('open').css({top: window.pageYOffset});
    $('.' + match + '-modal').addClass('open');
    $('.' + match + '-modal').siblings('.modal').removeClass('open');
    modalOpen = true;
  });
  
  $('.modal-back').click(function () {
    $('.modals').removeClass('open').css({top: -10000});
    $('.modal').removeClass('open');
    modalOpen = false;
  });

  $(window).scroll(function () {
    if (modalOpen)
      $('.modals').css({top: window.pageYOffset});
    else
      $('.modals').css({top: -10000});
  });
});
