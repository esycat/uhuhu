function selectedOptionChange() {
	if ($(this.options[this.selectedIndex]).is('.selected')) $(this).addClass('selected');
	else $(this).removeClass('selected');
}

$(document).ready(function() {
	if (!$.browser.msie) {
		$('.catreg').find('select').change(selectedOptionChange).change();
	}
});
