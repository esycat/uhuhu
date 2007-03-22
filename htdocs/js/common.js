/**
 * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:indexOf
 */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/) {
		var len = this.length;

		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;

		for (; from < len; from++) {
			if (from in this && this[from] === elt) return from;
		}

		return -1;
	};
}

/**
 * Object inheritance
 *
 * @param parent -- Function or Object
 */
Function.prototype.inherit = function(parent) {
	if (parent.constructor == Function) { // Normal inheritance
		this.prototype = new parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent.prototype;
	}
	else { // Pure virtual inheritance
		this.prototype = parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent;
	}

	return this;
}

/**
 * Opens popup window
 *
 * @param string location -- URL
 * @param string name -- name of the popup window
 * @param int width -- optional width in pixels
 * @param int height -- optional height in pixels
 * @param int left -- optional left in pixels
 * @param int right -- optional top in pixels
 * @return Object window
 */
function openPopup(location, name, width, height, left, top) {
	width = width || 640;
	height = height || 480;
	left = left || (screen.width - width) / 2;
	top = top || (screen.height - height) / 2

	var features = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",alwaysRaised=yes,dependent=yes";

	return window.open(location, name, features);
}

/**
 * Applies corner decorations to elements
 *
 * @param Object el
 * @param array settings
 * @return void
 */
function applyRoundedCorners(el, settings) {
	var content = $(el).html();
	$(el).empty();

	var tl = document.createElement('div');
	tl.className = 'rc tl';

	var tr = document.createElement('div');
	tr.className = 'rc tr';

	var br = document.createElement('div');
	br.className = 'rc br';

	var bl = document.createElement('div');
	bl.className = 'rc bl';

	var colin = document.createElement('div');
	colin.className = 'colin';

	$(colin).append(content);

	bl.appendChild(colin);
	br.appendChild(bl);
	tr.appendChild(br);
	tl.appendChild(tr);
	el.appendChild(tl);

	$(el).removeClass('rounded-corners').addClass('rc-container');
}

/**
 * Counts characters
 *
 * @param Object el -- input element
 * @param Integer maxLength
 * @param Boolean reverse
 */
function inputCounter(el, maxLength, reverse) {
	var el = this;
	var counter = $(el).parents('.field').find('.counter')
	var maxLength = maxLength || el.maxLength;

	var counterValue = (reverse) ? maxLength - el.value.length : el.value.length;

	if (reverse) el.value = el.value.substring(0, maxLength);

	if (counterValue > 0) counter.text('/' + counterValue);
	else counter.empty();

	return counterValue;
}

function applyCountable(el) {
	var el = $(el);
	if (!el.is('.countable')) el = $(el).find('.countable');

	el.change(inputCounter).keypress(inputCounter).keyup(inputCounter);
	el.change();
}

$(document).ready(function() {
	$('.rounded-corners').each(function() {applyRoundedCorners(this);})
	applyCountable();
});
