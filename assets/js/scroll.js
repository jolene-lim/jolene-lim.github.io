window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  $(document).ready( function () {
   $('#down.a').on('click',function () {
     $('html, body').animate({
       scrollTop: $('#about').offset().top
   }, 1000);
   });

   $('#down.f').on('click',function () {
     $('html, body').animate({
       scrollTop: $('#features').offset().top
   }, 1000);
   });

  });