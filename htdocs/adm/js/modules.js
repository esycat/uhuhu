function Modules() {
  this.modules = $('#modules');

  this.groups = $(this.modules).find('.module_group');
  this.selectedGroup;

  this.availableList = $(this.modules).find('#available_modules');
  this.activeList = $(this.modules).find('#active_modules');
  this.availableSelected;
  this.activeSelected;

  this.activeListTmp = document.getElementById('active_modules');

  this.forms = [];
}

Modules.prototype.updateState = function() {
  this.availableSelected = $(this.availableList).find('li.selected');
  this.activeSelected = $(this.activeList).find('li.selected');

  $('button#buttonAdd').attr('disabled', !(this.availableSelected.length && this.selectedGroup));
  $('button#buttonRemove').attr('disabled', !this.activeSelected.length);
}

Modules.prototype.run = function() {
  this.updateState();

  $(this.groups).find('.header').click(function() {
    modules.selectGroup($(this).parent('.module_group'));
  });

  $(this.scope).find('a').click(function() {
    modules.select($(this).parent('li'));
  });

  dragsort = ToolMan.dragsort();
  junkdrawer = ToolMan.junkdrawer();
  dragsort.makeListSortable(this.activeListTmp, verticalOnly);
}

Modules.prototype.selectGroup = function(group) {
  this.selectedGroup = $(group);
  this.groups.removeClass('selected');
  this.selectedGroup.addClass('selected');

  this.updateState();
}

Modules.prototype.select = function(module) {
  this.availableSelected.removeClass('selected');
  this.activeSelected.removeClass('selected');
  $(module).addClass('selected');

  this.updateState();

  $('#properties div.moduleForm').hide();
  if (this.activeSelected.length) this.loadForm(this.selected);
}

Modules.prototype.addSelected = function() {
  this.add(this.availableSelected);
}

Modules.prototype.removeSelected = function() {
  this.remove(this.activeSelected);
}

Modules.prototype.add = function(moduleList) {
  var addedModules = moduleList.clone().appendTo(this.selectedGroup.find('ul'));

  addedModules.each(function() {
    var rndVal = Math.round(Math.random() * 100);
    $(this).id('module' + rndVal);
  });

  this.run();
  this.select(addedModules);
}

Modules.prototype.remove = function(moduleList) {
/*
  moduleList.each(function() {
    $(this.form).remove();
  });
*/

  moduleList.remove();

  this.updateState();
}

Modules.prototype.getId = function(module) {
  return $(module).id();
}

Modules.prototype.getTypeId = function(module) {
  return $(module).children('input').val();
}

Modules.prototype.loadForm = function(module) {
  return;
  var typeId = this.getTypeId(module);
  var formId = this.getId(module) + '_form';

  if (typeof this.forms[typeId] == 'undefined') {
    return $.ajax({
      type: 'GET',
      url: './form' + typeId + '.xml',
      dataType: 'html',
      complete: function(request) {
        modules.storeForm(typeId, request.responseText);
        modules.loadForm(module);
      }
    });
  }

  if (!$('#' + formId).length) {
    $('#properties').append(this.forms[typeId]);
    var form = $('#moduleForm').id(formId).addClass('moduleForm');
    module.get(0).form = form.get(0);
  }

  $('#properties > div.moduleForm').hide();
  $('#' + formId).show();
}

Modules.prototype.storeForm = function(typeId, form) {
  this.forms[typeId] = form;
}

Modules.prototype.showForm = function(module) {
  var formId = this.getId(module) + '_form';

  $('#properties > div.moduleForm').hide();
  $('#' + formId).show();
}

function verticalOnly(item) {
  item.toolManDragGroup.verticalOnly();
}

var modules;
var dragsort;
var junkdrawer;

function init() {
  modules = new Modules;
  modules.run();
}

$(document).ready(init);
