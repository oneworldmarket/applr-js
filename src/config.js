var
	//debug mode
	_debug = true,
	//configurable options
	_options = {
		//container for html
		container: '#applr-container',
		//is there will be 2 lists of questions (default+optional) or one list (default)
		mode: 'default+optional',
		//new_fields or filter_questions
		add_type: 'new_fields',
		links_default_class: 'standard-blue-link',
		links_medium_class: 'medium-blue-link',
		text_default_class: 'standard-black',
		input_class: 'input-standart',
		title_default_class: 'red-title',
		filter_questions_title_class: 'key-contacts-list-title',
		default_questions_class: 'applr-default-questions',
		optional_questions_class: 'applr-optional-questions',
		questions_wrapper_class: 'applr-questions-wrapper',
		question_list_wrapper_class: 'applr-question-list-wrapper',
		default_button_class: 'btn-standard btn-green',
		save_button_class: 'btn-standard btn-blue',
		cancel_button_class: 'btn-standard btn-red',
		input_container: 'input-form-container',
		labels_style: 'bronze-info',
		labels_large: 'bronze-info-large',
		open_quesion_fieild_wrapper : 'open-quesion-fieild-wrapper',
		full_line_input: 'full-line-input',
		standart_line_input: 'default-field',
		small_line_input: 'small-field',
		applr_row : 'applr_row',
		label_input_options : 'label_input_options',
		save_endpoint: '/c/applr/save-settings',
		on_save: function(result) {},
		placeholder_class: 'item-placeholder',
		wrapper: '#applr-wrapper'
	},
	_field_types = {
		'Textfield' : 'Text field',
		'Textarea' : 'Textarea',
		'Dropdown' : 'Dropdown',
		'Radiobuttons' : 'Radio buttons'
	},

	_textfieldMaxLimit =  100,
	_textareaMaxLimit =  5000,
	_textfieldDefaultLimit = 80,
	_textareaDefaultLimit = 800,

	_editMode = false,
	_sortableEnabled = false,

	_DefaultQuestionCollection,
	_OptionalQuestionsCollection,
	_DefaultQuestionCollectionView,
	_OptionalQuestionsCollectionView,
	_removedQuestionsCollection,

	_OptionalQuestionsAddCollectionView,
	_OptionalQuestionsSelectedCollection,
	_OptionalQuestionsSelectedCollectionView,

	_containerObj,
	_AddNewFieldModel,
	_AddNewFieldView,
	_saveSettingsView,
	_sortableElements_new_fields = '#applr-optional-questions-list, #applr-default-questions-list',
	_sortableElements_filter_questions = '#applr-optional-selected-questions-list'
;

//some private functions
var
	_detectQuestionModel = function(el) {
		var result = false;

		if (el.type == 'open') {
			if (el.options.limit > 0 && el.options.limit <= _textfieldMaxLimit) {
				result = 'Textfield';
			} else if (el.options.limit > 0 && el.options.limit <= _textareaMaxLimit && el.options.limit > _textfieldMaxLimit) {
				result = 'Textarea';
			}
		} else if (el.type == 'closed') {
			if (el.options.style == 'dropdown') {
				result = 'Dropdown';
			} else if (el.options.style == 'radio button') {
				result = 'Radiobuttons';
			}
		}

		return result;
	},

	_initSortable = function() {
		if (_options.add_type == 'new_fields') {
			$(_sortableElements_new_fields).sortable({
				connectWith: "." + _options.question_list_wrapper_class,
				handle: '.drag-icon',
				placeholder: _options.placeholder_class,
				stop: function(event, ui) {
					ui.item.trigger('drop', ui.item.index());
				}
			}).disableSelection();
		} else if (_options.add_type == 'filter_questions') {
			$(_sortableElements_filter_questions).sortable({
				handle: '.drag-icon',
				placeholder: _options.placeholder_class,
				stop: function(event, ui) {
					ui.item.trigger('drop', ui.item.index());
				}
			}).disableSelection();
		}
		_sortableEnabled = true;
	},

	_disableSortable = function() {
		if (_sortableEnabled) {
			var _sortableElements;
			if (_options.add_type == 'new_fields') {
				_sortableElements = _sortableElements_new_fields
			} else if (_options.add_type == 'filter_questions') {
				_sortableElements = _sortableElements_filter_questions;
			}
			$(_sortableElements).sortable('destroy').enableSelection();
		}
		_sortableEnabled = false;
	},

	_initAddNewField = function() {
		_AddNewFieldModel = new applr.Models.AddNewField();
		_AddNewFieldView = new applr.Views.AddNewField({model:_AddNewFieldModel});

		_AddNewFieldView.render().$el.appendTo(_options.container);
	},

	_initSaveSettings = function() {
		_saveSettingsView = new applr.Views.SaveSettings();
		_saveSettingsView.render().$el.appendTo(_options.container);
	},

	_getJSON = function() {
		if (_options.add_type == 'new_fields') {
			return {
				default: _DefaultQuestionCollection.toJSON(),
				optional: _OptionalQuestionsCollection.toJSON(),
				removed: _removedQuestionsCollection.toJSON()
			}
		} else if (_options.add_type == 'filter_questions') {
			return {
				optional_selected: _OptionalQuestionsSelectedCollection.toJSON()
			}
		}
	},

	 _saveSettings = function() {
		 $.ajax({
			 url: _options.save_endpoint,
			 dataType: 'json',
			 type: 'post',
			 data: _getJSON(),
			 success:function (resp) {
				 if (typeof _options.on_save == 'function') {
					 return _options.on_save(resp);
				 }
			 },
			 error: function() {
				 console.log(arguments);
			 }
		 });
	 }

	_generateName = function() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 15; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
;