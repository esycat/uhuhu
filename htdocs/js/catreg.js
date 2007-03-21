$(document).ready(function() {
	$('select').change(function() {
		if ($(this.options[this.selectedIndex]).is('.selected')) $(this).addClass('selected');
		else $(this).removeClass('selected');
	}).change();
});
