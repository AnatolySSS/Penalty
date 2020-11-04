$(document).ready(function(){
	// Toggle plus minus icon on show hide of collapse element
	$(".collapse").on('show.bs.collapse', function(){
		$(this).parent(".card").find(".toggle").addClass("rotate");
	}).on('hide.bs.collapse', function(){
		$(this).parent(".card").find(".toggle").removeClass("rotate");
	});
});

$(document).ready(function(){
	$("#first_app_btn").on('click', function(){
		if (!($("#first_app_toggle").hasClass("rotate"))) {
			$("#first_app_toggle").addClass("rotate");
		} else {
			$("#first_app_toggle").removeClass("rotate");
		}
	});
});

var acc = document.getElementsByClassName("accordion_right");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
			$(".accordion_right").find(".toggle").removeClass("rotate");
    } else {
      panel.style.display = "block";
			$(".accordion_right").find(".toggle").addClass("rotate");
    }
  });
}

var add_info = document.getElementsByClassName("add_info");
var j;

for (var j = 0; j < add_info.length; j++) {
	add_info[j].addEventListener("click", function() {
		if (!($(this).find(".toggle").hasClass("rotate"))) {
			$(this).parent().parent().next().show('fast');
			$(this).find(".toggle").addClass("rotate");
		} else {
			$(this).parent().parent().next().hide('fast');
			$(this).find(".toggle").removeClass("rotate");
		}
	});
}
