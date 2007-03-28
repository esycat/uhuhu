/**
 * Site registration class
 *
 * Responsible for the control and management of registration process.
 * Initializes progress bar and observes it.
 *
 * debugURL -- URL of a script, which returns debug forms
 * progressUpdateURL -- URL of a script, which returns updates of the progress
 *
 * @param String formId -- optional site registration form's ID
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

	if (!$(this.form).is('.invisible')) this.sendUpdate();
}

/**
 * Updates site registration form
 *
 * @param Object context -- observable subject
 * @return void;
 */
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

Sitereg.prototype.siteSuccess = function() {
	this.sendUpdate(true);
}

Sitereg.prototype.siteFail = function() {
	this.sendUpdate(false);
}

/**
 * Toggles visibility of the debug form  
 */
Sitereg.prototype.toggleForm = function() {
	$(this.form).toggleClass('invisible');
	$('#reg-errors-show').toggleClass('invisible');
	$('#reg-errors-hide').toggleClass('invisible');
	this.sendUpdate();
}

/**
 * Sends catalogue debug form's data
 *
 * @access protected
 * @param Boolean status -- user's input status
 * @return void
 */
Sitereg.prototype.sendUpdate = function(status) {
	var data = $(this.form).find('input[@type="hidden"]').serialize();

	var category = document.getElementById('catalog_category');
	if (category) data += '&category_id=' + category.value;

	if (!isNaN(status)) data += '&status=' + status;

	var self = this;
	$.ajax({
		type: 'POST',
		url: this.debugURL,
		data: data,
		success: function(form) {
			self.updateForm(form);
		}
	});

	$(this.form).find('#reg-form-loading').show();
}


Sitereg.prototype.updateForm = function(form) {
	$(this.form).find('#reg-form-loading').hide();
	$(this.form).find('#reg-form').empty().append(form);
	this.form.action = this.form.elements['form_action'].value;
	this.form.method = this.form.elements['form_method'].value;
}

var sitereg;

$(document).ready(function() {
	sitereg = new Sitereg();
});
