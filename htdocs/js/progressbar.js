function ProgressBar(id, requestURL, delay) {
	this.data = {};
	this.observers = [];

	this.requestURL = requestURL;
	this.delay = delay || 1000;

	this.progressBar = $('#' + id);
	this.metre       = $(this.progressBar).find('.metre');
	this.sessionid   = $('#reg-sessionid').serialize();
}

ProgressBar.prototype.getData = function() {
	var self = this;
	$.getJSON(
		this.requestURL,
		this.sessionid,
		function(json) {self.update(json);}
	);
}

ProgressBar.prototype.update = function(json) {
	this.data = json;

	var progress = Math.round(this.data.complete / this.data.total * 1000) / 10;
	this.metre.css('width', progress + '%');

	if (this.data.complete < this.data.total) {
		var self = this;
		setTimeout(function() {self.getData();}, this.data.delay ? this.data.delay : this.delay);
	}
	else this.progressBar.addClass('complete');

	this.notifyObservers();
}

ProgressBar.prototype.notifyObservers = function(context) {
	//for (var i in this.observers) this.observers[i].update(context);
	for (var i = 0; i < this.observers.length; i++) this.observers[i].update(context);
}

ProgressBar.prototype.addObserver = function(observer) {
	if (!observer.update) throw 'Wrong parameter';
	this.observers.push(observer);
}

ProgressBar.prototype.deleteObserver = function(observer) {
	if (!observer.update) throw 'Wrong parameter';
	this.observers.splice(this.observers.indexOf(observer), 1);
}

ProgressBar.prototype.deleteObservers = function() {
	this.observers = [];
}
