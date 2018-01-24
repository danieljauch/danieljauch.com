$(document).ready(function() {
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
  
  $('.modal-open').click(function () {
    var obj = $(this)[0],
      clas = obj.classList[0],
      match = clas.split("-")[0];
    $('.modals').addClass('open');
    $('.' + match + '-modal').addClass('open');
    $('.' + match + '-modal').siblings('.modal').removeClass('open');
  });
  
  $('.modal-back').click(function () {
    $('.modals').removeClass('open');
    $('.modal').removeClass('open');
  });
});
