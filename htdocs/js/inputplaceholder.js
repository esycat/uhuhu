/**
 * Input placeholder class
 *
 * @author Eugene Janusov <esycat@gmail.com>
 */
function InputPlaceholder() {
	this.className = 'placeholder';
}

/**
 * На событие загрузки документа добавляем анонимную функцию,
 * которая выбирает все элементы с классом placeholder
 * и добавляем этим элементам обработчики событий focus, blur
 * и change, которые выполняют функцию inputPlaceholder.
 *
 * Документ может быть перезагружен, поэтому с самого начала
 * нужно пропустить все элементы через inputPlaceholder.
 */
InputPlaceholder.prototype.init = function() {
	var self = this;
	var handler = function(event) {self.handler(event, this)};

	$("." + this.className).focus(handler);
	$("." + this.className).blur(handler);
	$("." + this.className).change(handler);
	$("." + this.className).each(handler);
}

/**
 * Handles input elements
 *
 * @param Event event
 * @param HTMLInputElement el
 */
InputPlaceholder.prototype.handler = function(event, el) {
	/**
	 * If there is no default value (being placeholder), then stop processing.
	 */
	if (el.defaultValue == '') return false;

	/**
	 * Если событие является фокусировкой текстового поля,
	 * а его значение равно значению по умолчанию,
	 * то заменяем текст заполнителя на пустую строку.
	 *
	 * Если событие является потерей фокуса текстового поля,
	 * а его значение равно пустой строке, то в качестве текста
	 * указываем значение по умолчанию.
	 */
	if (event) {
		if (event.type == 'focus' && el.value == el.defaultValue) {
			el.value = '';
		}
		else if (event.type == 'blur' && el.value == '') {
			el.value = el.defaultValue;
		}
	}

	/**
	 * Depending on value of an element change style.
	 */
	if (el.value == el.defaultValue) {
		$(el).addClass(this.className);
	}
	else {
		$(el).removeClass(this.className);
	}

}

$(document).ready(function() {
	var inputPlaceholder = new InputPlaceholder();
	inputPlaceholder.init();
});
