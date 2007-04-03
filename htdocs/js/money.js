/**
 * Toggles visibility of the money log entry's details
 *
 * @param el -- element of the money log entry
 */
function moneyLogDetails(el) {
	$(el).siblings('.details').toggleClass('invisible');
}