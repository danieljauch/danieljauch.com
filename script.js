$(document).ready(function() {
  if ($(window).width() >= 1024) {
  	$.scrollify({
  		section: ".main-area",
  		easing: "easeOutExpo",
  		scrollSpeed: 500
  	});
  } else {
    $.scrollify.destroy();
  }
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
  // $(window).scroll(function() {
  //   if ($(window).scrollTop() > 500) {
  //     $('nav').addClass('scrolled');
  //   } else {
  //     $('nav').removeClass('scrolled');
  //   }
  // });
});
