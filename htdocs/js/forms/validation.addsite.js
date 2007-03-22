AddsiteFormValidation.inherit(FormValidation);

function AddsiteFormValidation(formId) {
	formId = formId || 'addsite';

	var form = document.getElementById(formId);
		if (!form) return;

	FormValidation.call(this, form);

	this.form.elements['site_url'].vregexp = this.regexps.URL;
	this.form.elements['site_url'].vmsg = {
		empty: "Введите URL вашего сайта.",
		incorrect: "Введите корректный URL вашего сайта."
	};

	this.form.elements['site_title'].minLength = 100;
	this.form.elements['site_title'].vmsg = {
		empty: "Введите название сайта.",
		minLength: "Название сайта должно быть не менее 100 символов."
	};

	this.form.elements['site_desc'].minLength = 150;
	this.form.elements['site_desc'].vmsg = {
		empty: "Введите описание сайта.",
		minLength: "Описание сайта должно быть не менее 150 символов."
	};

	this.form.elements['site_fulldesc'].minLength = 250;
	this.form.elements['site_fulldesc'].vmsg = {
		empty: "Введите полное описание сайта.",
		minLength: "Полное описание сайта должно быть не менее 250 символов."
	};

	this.form.elements['site_keywords'].minLength = 100;
	this.form.elements['site_keywords'].vmsg = {
		empty: "Введите список ключёвых слов сайта.",
		minLength: "Список ключевых слов сайта должн быть не менее 100 символов."
	};

	this.form.elements['site_author'].minLength = 2;
	this.form.elements['site_author'].vmsg = {
		empty: "Введите имя автора.",
		minLength: "Имя должно быть не менее 2-х символов."
	};

	this.form.elements['site_email'].vregexp = this.regexps.email;
	this.form.elements['site_email'].vmsg = {
		empty: "Введите адрес электронной почты.",
		incorrect: "Введите корректный адрес электронной почты."
	};

	this.form.elements['site_username'].vregexp = this.regexps.alnum;
	this.form.elements['site_username'].minLength = 4;
	this.form.elements['site_username'].vmsg = {
		empty: "Введите логин.",
		minLength: "Логин должен быть не менее 4-х символов.",
		incorrect: "Логин может состоять только из латинских букв и цифр."
	};

	this.form.elements['site_password'].vregexp = this.regexps.alnum;
	this.form.elements['site_password'].minLength = 6;
	this.form.elements['site_password'].vmsg = {
		empty: "Введите пароль.",
		minLength: "Пароль должен быть не менее 6-х символов.",
		incorrect: "Пароль может состоять только из латинских букв и цифр."
	};

	this.form.elements['site_city'].minLength = 2;
	this.form.elements['site_city'].vmsg = {
		empty: "Введите название города.",
		minLength: "Название города должно быть не менее 2-х символов."
	};

	this.form.elements['site_phone'].minLength = 6;
	this.form.elements['site_phone'].vmsg = {
		empty: "Введите номер телефона.",
		minLength: "Номер телефона должн быть не менее 6-х символов."
	};

}

AddsiteFormValidation.prototype.validate = function(field) {
	this.status = true;

	// site_url
	formEl = this.form.elements['site_url'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_title
	formEl = this.form.elements['site_title'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_desc
	formEl = this.form.elements['site_desc'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_fulldesc
	formEl = this.form.elements['site_fulldesc'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_keywords
	formEl = this.form.elements['site_keywords'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_author
	formEl = this.form.elements['site_author'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_email
	formEl = this.form.elements['site_email'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_username
	formEl = this.form.elements['site_username'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_password
	formEl = this.form.elements['site_password'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_city
	formEl = this.form.elements['site_city'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// site_phone
	formEl = this.form.elements['site_phone'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	return this.status;
}
