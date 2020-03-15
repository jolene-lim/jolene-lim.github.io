function scrollAbout() {
  
  var topPos = document.getElementById('about').offsetTop;
  document.getElementById('landing').scrollTop = topPos-10;

};

function scrollFeatures() {
  
  var topPos = document.getElementById('features').offsetTop;
  document.getElementById('landing').scrollTop = topPos-10;

};

$(document).ready(function() {
  $('section#landing').on('scroll', function() {

    var aboutPos = document.getElementById('about').offsetTop;
    var featurePos = document.getElementById('features').offsetTop;
    
    if ($('#landing').scrollTop() < featurePos) {
      $('.dropdown-menu').removeClass('features');
      $('.dropdown-menu').removeClass('about');
    }

    else if ($('#landing').scrollTop() < aboutPos) {
      $('.dropdown-menu').toggleClass('features');
    }

    else if ($('#landing').scrollTop() >= aboutPos) {
      $('.dropdown-menu').toggleClass('about');
    }

    /*
    $('btn').toggleClass('scrolled', $('#landing').scrollTop() > topPos);*/
  });
});