/**
 * Site registration class
 *
 * Responsible for the control and management of registration process.
 * Initializes progress bar and observes it.
 *
 * debugURL -- URL of a script, which returns debug forms
 * progressUpdateURL -- URL of a script, which returns updates of the progress
 */
function Sitereg(formId) {
	formId = formId || 'debug';
	this.form = document.getElementById(formId);

	this.debugURL = './modules/regdebug.php';
	this.progressUpdateURL = './modules/progressbar.php';
	this.progressBarId = 'reg-progressbar';

	if ($('#' + this.progressBarId).length) {
		this.progressBar = new ProgressBar(this.progressBarId, this.progressUpdateURL);
		this.progressBar.addObserver(this);
		this.progressBar.getData();

		this.total      = $('#reg-total');
		this.complete   = $('#reg-complete');
		this.success    = $('#reg-success');
		this.notrespond = $('#reg-notrespond');
		this.errors     = $('#reg-errors');
	}
}

Sitereg.prototype.update = function(context) {
	var data = this.progressBar.data;

	this.total.text(data.total.toString());
	this.complete.text(data.complete.toString());
	this.success.text(data.success.toString());
	this.notrespond.text(data.notrespond.toString());
	this.errors.text(data.errors.toString());

	if (data.errors) $('#reg-errors-showhide').removeClass('invisible');
	else $('#reg-errors-showhide').addClass('invisible');
}

Sitereg.prototype.switchDebugForm = function() {
	$(this.form).toggleClass('invisible');
	$('#reg-errors-show').toggleClass('invisible');
	$('#reg-errors-hide').toggleClass('invisible');
	this.updateForm();
}

Sitereg.prototype.siteSuccess = function() {
	this.updateForm(true);
}

Sitereg.prototype.siteFail = function() {
	this.updateForm(false);
}

Sitereg.prototype.updateForm = function(status) {
	var data = $(this.form).find('input[@type="hidden"]').serialize();
	if (!isNaN(status)) data += '&status=' + status;

	var self = this;
	$.ajax({
		type: 'POST',
		url: this.debugURL,
		data: data,
		success: function(form) {
			self.updateForm2(form);
		}
	});

	$(this.form).find('#reg-form-loading').show();
}


Sitereg.prototype.updateForm2 = function(fields) {
	$(this.form).find('#reg-form-loading').hide();
	$(this.form).find('#reg-form').empty().append(fields);
	this.form.action = this.form.elements['form_action'].value;
	this.form.method = this.form.elements['form_method'].value;
}

var sitereg;

$(document).ready(function() {
	sitereg = new Sitereg;
});
