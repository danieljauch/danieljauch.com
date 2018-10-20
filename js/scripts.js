$(document).ready(function() {
  $(".menu__toggle").click(function() {
    $("#menu .menu").toggleClass("open");
    $(".site__footer").toggleClass("open");
  })
})
