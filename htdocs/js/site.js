function SiteDescription() {
	this.groupClassName = 'descgroup';
	this.minId = 500;
}

SiteDescription.prototype.getDescGroup = function(el) {
	return $(el).parents('.' + this.groupClassName);
}

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

SiteDescription.prototype.remove = function(el) {
	var descr = $(el).parents('.' + this.groupClassName);
	if ($(descr).siblings('.' + this.groupClassName).length > 0) descr.remove();
}

SiteDescription.prototype.switchSource = function(el) {
	var descr = $(el).parents('.' + this.groupClassName);
	if (el.value == 0) $(descr).children().gt(1).addClass('invisible');
	else $(descr).children().gt(1).removeClass('invisible');
}

var sitedescr = new SiteDescription();
