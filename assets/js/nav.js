
// FIXME...
 $(function() {
  $("li").on("click",function() {

  	if (this.id == 1)
 	{
        $('html, body').animate({
			scrollTop: 0
		}, 2000);
 	}
 	if (this.id == 4)
 	{
        $('html, body').animate({
			scrollTop: $("#About").offset().top
		}, 2000);
 	}
 	if (this.id == 3)
 	{
        $('html, body').animate({
			scrollTop: $("#Contact").offset().top
		}, 2000);
 	}
  });

  $("a").click(function() {
 	if (this.id == 9)
 	{
        $('html, body').animate({
			scrollTop: $("#2A").offset().top
		}, 2000);
 	}
});
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}