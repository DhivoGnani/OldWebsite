/* Author: Dhivo Gnani */

  $(document).ready(function(){

    $("a").on('click', function(event) {

      if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;

        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 2000, function(){
     
          window.location.hash = hash;
        });
      }
    });

  });

  function openMenu() {
      var x = document.getElementById("Nav");
      if (x.className === "nav") {
          x.className += " responsive";
      } else {
          x.className = "nav";
      }
  }

  function openNav() {
      document.getElementById("Sidenav").style.width = "250px";
  }

  function closeNav() {
      document.getElementById("Sidenav").style.width = "0";
  }

