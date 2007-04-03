/**
 * Site's description form
 */
function SiteDescription() {
	this.groupClassName = 'descgroup';
	this.minId = 500;
}

/**
 * Gets description group of the element
 *
 * @param el -- form element
 */
SiteDescription.prototype.getDescGroup = function(el) {
	return $(el).parents('.' + this.groupClassName);
}

/**
 * Creates form elements for a new description
 *
 * @param el -- form element
 */
SiteDescription.prototype.add = function(el) {
	var collect = $('#descriptions');
	var newdescr = $(el).parents('.' + this.groupClassName).clone();

	$(newdescr).find('input:text').val('');
	$(newdescr).find('textarea').empty();

	applyCountable(newdescr);

	var randId = Math.floor(Math.random() * 10000) + this.minId;

	var regexId = /_[0-9]+$/;
	var regexName = /\[\](\[[0-9]+\])?$/;

	$(newdescr).find('label').each(function() {
		this.htmlFor = this.htmlFor.replace(regexId, '_' + randId);
	});

	$(newdescr).find('input').each(function() {
		this.id = this.id.replace(regexId, '_' + randId);
	});

	$(newdescr).find('input:radio').each(function() {
		this.name = this.name.replace(regexName, '[][' + randId + ']');
	});

	$(newdescr).find('textarea').each(function() {
		this.id = this.id.replace(regexId, '_' + randId);
	});

	$(newdescr).find('select').each(function() {
		this.id = this.id.replace(regexId, '_' + randId);
	});

	return newdescr.appendTo(collect);
}

/**
 * Removes description from form
 *
 * @param el -- form element
 */
SiteDescription.prototype.remove = function(el) {
	var descr = $(el).parents('.' + this.groupClassName);
	if ($(descr).siblings('.' + this.groupClassName).length > 0) descr.remove();
}

/**
 * Switches a source, whence to take initial data for description.
 */
SiteDescription.prototype.switchSource = function(el) {
	var descr = $(el).parents('.' + this.groupClassName);
	if (el.value == 0) $(descr).children().gt(1).addClass('invisible');
	else $(descr).children().gt(1).removeClass('invisible');
}

var sitedescr = new SiteDescription();
