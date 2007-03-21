RegistrationFormValidation.inherit(FormValidation);

function RegistrationFormValidation(formId) {
	formId = formId || 'registration';

	var form = document.getElementById(formId);
    if (!form) return;

	FormValidation.call(this, form);

	this.usernameAvailabilityScriptPath = '!./modules/checkusername.php';

	this.form.elements['name'].minLength = 2;
	this.form.elements['name'].vmsg = {
		empty: "Введите имя.",
		minLength: "Имя должно быть не менее 2-х символов."
	};

	this.form.elements['email'].vregexp = this.isEmail;
	this.form.elements['email'].vmsg = {
		empty: "Введите адрес электронной почты.",
		incorrect: "Введите корректный адрес электронной почты."
	};

	this.form.elements['username'].vregexp = this.isAlnum;
	this.form.elements['username'].minLength = 4;
	this.form.elements['username'].vmsg = {
		empty: "Введите логин.",
		minLength: "Логин должен быть не менее 4-х символов.",
		incorrect: "Логин может состоять только из латинских букв и цифр.",
		notavailable: "Данное имя пользователя уже зарегистрировано. Пожалуйста, выберите другое."
	};

	this.form.elements['password'].vregexp = this.isAlnum;
	this.form.elements['password'].minLength = 6;
	this.form.elements['password'].vmsg = {
		empty: "Введите пароль.",
		minLength: "Пароль должен быть не менее 6-х символов.",
		incorrect: "Пароль может состоять только из латинских букв и цифр."
	};

	this.form.elements['password_repeat'].vmsg = {
		empty: "Для проверки введите пароль повторно.",
		incorrect: "Повторный ввод не совпадает с паролем."
	};
}

RegistrationFormValidation.prototype.validate = function(field) {
	this.status = true;

	// name
	formEl = this.form.elements['name'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// email
	formEl = this.form.elements['email'];
	if (!field || field.name == formEl.name) this.verify(formEl);

	// username
	formEl = this.form.elements['username'];

	if (!field || field.name == formEl.name) {
		if (!formEl.value.length) this.setStatus(formEl, false, formEl.vmsg['empty']);
		else if (!formEl.value.match(formEl.vregexp)) this.setStatus(formEl, false, formEl.vmsg['incorrect']);
		else if (formEl.minLength && formEl.value.length < formEl.minLength) this.setStatus(formEl, false, formEl.vmsg['minLength']);
		else {
			var usernameAvailability = true;

			$.ajaxTimeout(2000);
			$.ajaxSetup({async: false});
			$.get(
				this.usernameAvailabilityScriptPath,
				$(formEl).serialize(),
				function(status) {
					usernameAvailability = Boolean(Number(status));
				}
			);
			$.ajaxSetup({async: true});

			if (!usernameAvailability) this.setStatus(formEl, false, formEl.vmsg['notavailable']);
			else this.setStatus(formEl, true);
		}
	}

	// password
	formEl = this.form.elements['password'];

	if (!field || field.name == formEl.name) {
		this.verify(formEl);
		if (field && formEl.isValid && this.form.elements['password_repeat'].value != this.form.elements['password_repeat'].defaultValue) this.validate(this.form.elements['password_repeat']);
	}

	// password_repeat
	formEl = this.form.elements['password_repeat'];

	if (!field || field.name == formEl.name) {
		if (field && !this.form.elements['password'].isValid) this.validate(this.form.elements['password']);

		if (!formEl.value.length) this.setStatus(formEl, false, formEl.vmsg['empty']);
		else if (formEl.value != this.form.elements['password'].value) this.setStatus(formEl, false, formEl.vmsg['incorrect']);
		else this.setStatus(formEl, true);
	}

	return this.status;
}

FormValidation.prototype.test = function() {
	alert('>>> this.testVar: ' + this.testVar + "\n" + '>>> this.form: ' + this.form);
}
