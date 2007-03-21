JoinFormValidation.inherit(FormValidation);

function JoinFormValidation(formId) {
	formId = formId || 'join';

	var form = document.getElementById(formId);
    if (!form) return;

	FormValidation.call(this, form);

	this.registrationForm = new RegistrationFormValidation(form.id);
	this.addsiteForm = new AddsiteFormValidation(form.id);
}

JoinFormValidation.prototype.validate = function(field) {
	this.status = true;

	if (!this.registrationForm.validate(field)) this.status = false;
	if (!this.form.elements['addsite_now'].checked) return this.status;
	if (!this.addsiteForm.validate(field)) this.status = false;

	return this.status;
}
