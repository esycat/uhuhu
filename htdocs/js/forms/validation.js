/**
 * Main form validation class
 *
 * @param HTMLFormElement form 
 */
function FormValidation(form) {
	this.errorClassName = 'error';
	this.correctClassName = 'correct';
	this.messageClassName = 'message';

	this.patterns = {
		//protocol: '((http|ftp)s?)',
		protocol: 'https?',
		domain: '(([0-9a-z])(([0-9a-z\-]*)?[0-9a-z])?\.)+([a-z]{2,})',
		username: '[0-9a-z]([0-9a-z\-.]*[0-9a-z])?'
	}

	this.regexps = {
		alnum: new RegExp('^[0-9a-z]+$', 'i'),
		email: new RegExp('^(' + this.patterns.username + ')@(' + this.patterns.domain + ')$', 'i'),
		//URL: new RegExp('^' + this.patterns.protocol + '://(' + this.patterns.domain + ')/(.*?)$', 'i')
		URL: new RegExp('^' + this.patterns.protocol + '://(' + this.patterns.domain + ')(.*?)$', 'i')
	}

	this.form = form;
	if (this.form && this.validate) this.form.validate = this.validate;
}

/**
 * Initializes form element handlers
 */
FormValidation.prototype.init = function() {
	var self = this;
	this.onsubmit = $(this.form).submit(function() {return self.validate();});
	$(this.form).find('input:text').change(function() {self.validate(this);});
	$(this.form).find('input:password').change(function() {self.validate(this);});
	$(this.form).find('textarea').change(function() {self.validate(this);});

	$(this.form).find('input:text').attr('autocomplete', 'off');
}

/**
 * Validates form field
 *
 * @param Object formEl
 */
FormValidation.prototype.verify = function(formEl) {
	if (!formEl.value.length) this.setStatus(formEl, false, formEl.vmsg['empty']);
	else if (formEl.minLength && formEl.value.length < formEl.minLength) this.setStatus(formEl, false, formEl.vmsg['minLength']);
	else if (formEl.maxLength && formEl.value.length > formEl.maxLength) this.setStatus(formEl, false, formEl.vmsg['maxLength']);
	else if (formEl.vregexp && !formEl.value.match(formEl.vregexp)) this.setStatus(formEl, false, formEl.vmsg['incorrect']);
	else this.setStatus(formEl, true);
}

/**
 * Sets field status and message text
 *
 * @param Object formEl -- form field
 * @param Boolean status -- value validation status
 * @param String text -- message text
*/
FormValidation.prototype.setStatus = function(formEl, status, text) {
	if (!status) this.status = false;
	formEl.isValid = status;

	//formEl.focus();

	var field = $(formEl).parents('.field').lt(1);

	if (status) field.removeClass(this.errorClassName).addClass(this.correctClassName);
	else field.removeClass(this.correctClassName).addClass(this.errorClassName);

	if (text) {
		var messageBox = field.find('.message');

		if (!messageBox.length) {
			messageBox = document.createElement('div');
			messageBox.className = this.messageClassName;
			//$(field).append(messageBox);
			$(field).find('.cleaner').before(messageBox)
		}

		$(messageBox).text(text);
	}
}
