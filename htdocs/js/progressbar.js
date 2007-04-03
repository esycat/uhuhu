/**
 * Progress bar
 *
 * @param String id -- progress bar element ID
 * @param String requestURL -- URL for request progress data updates
 * @param Integer delay -- default delay between requests
 */
function ProgressBar(id, requestURL, delay) {
	this.data = {};
	this.observers = [];
	this.iteration = 0;

	this.requestURL = requestURL;
	this.delay = delay || 1000;

	this.progressBar = $('#' + id);
	this.metre       = $(this.progressBar).find('.metre');
	this.sessionid   = $('#reg-sessionid').serialize();
}

/**
 * Requests progress data and runs this.update();
 */
ProgressBar.prototype.getData = function() {
	var self = this;
	var delay = this.data.delay ? this.data.delay : this.delay;
	var requestData = this.sessionid + '&iteration=' + ++this.iteration;

	$.ajaxSetup({
		timeout: delay
	});

	$.getJSON(
		this.requestURL,
		requestData,
		function(json) {self.update(json);}
	);

	if (isNaN(this.data.complete) || this.data.complete < this.data.total) {
		setTimeout(function() {self.getData();}, delay);
	}
}

/**
 * Updates progress bar and runs this.getData() again
 *
 * @param Object json -- JSON data, returned by backend
 */
ProgressBar.prototype.update = function(json) {
	this.data = json;

	var progress = Math.round(this.data.complete / this.data.total * 1000) / 10;
	this.metre.css('width', progress + '%');

	if (this.data.complete == this.data.total) this.progressBar.addClass('complete');

	this.notifyObservers();
}

ProgressBar.prototype.notifyObservers = function() {
	//for (var i in this.observers) this.observers[i].update(context);
	for (var i = 0; i < this.observers.length; i++) this.observers[i].update(this);
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
