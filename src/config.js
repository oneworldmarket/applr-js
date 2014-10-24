var
	//debug mode
	_debug = true,
	//configurable options
	_options = {
		//container for html
		container: '#applr-container',
		//is there will be 2 lists of questions (default+optional) or one list (default)
		mode: 'default+optional',
		//new_fields or optional_fields
		add_type: 'new_fields',
		links_default_class: 'standard-blue-link',
		links_medium_class: 'medium-blue-link',
		text_default_class: 'standard-black',
		input_class: 'input-standart',
		title_default_class: 'red-title',
		default_questions_class: 'applr-default-questions',
		optional_questions_class: 'applr-optional-questions',
		questions_wrapper_class: 'applr-questions-wrapper',
		question_list_wrapper_class: 'applr-question-list-wrapper',
		default_button_class: 'btn-standard btn-green',
		save_button_class: 'btn-standard btn-blue',
		save_endpoint: '/c/applr/save-settings',
		input_container: 'input-form-container',
		labels_style: 'bronze-info',
		labels_large: 'bronze-info-large',
		open_quesion_fieild_wrapper : 'open-quesion-fieild-wrapper',
		full_line_input: 'full-line-input',
		applr_row : 'applr_row',
		label_input_options : 'label_input_options'
	},
	_field_types = {
		'Textfield' : 'Text field',
		'Textarea' : 'Textarea',
		'Dropdown' : 'Dropdown',
		'Radiobuttons' : 'Radio buttons'
	},
	_editMode = false,
	_sortableEnabled = false,

	_DefaultQuestionCollection,
	_OptionalQuestionsCollection,
	_DefaultQuestionCollectionView,
	_OptionalQuestionsCollectionView,
	_containerObj,
	_AddNewFieldModel,
	_AddNewFieldView,
	_saveSettingsView,
	_sortableElements = '#applr-optional-questions-list, #applr-default-questions-list'
;

//some private functions
var
	_detectQuestionModel = function(el) {
		var result = false;

		if (el.type == 'open') {
			if (el.options.limit > 0 && el.options.limit <= applr.Defaults.textfieldMaxLimit) {
				result = 'Textfield';
			} else if (el.options.limit > 0 && el.options.limit <= applr.Defaults.textareaMaxLimit && el.options.limit > applr.Defaults.textfieldMaxLimit) {
				result = 'Textarea';
			}
		} else if (el.type == 'closed') {
			if (el.options.style == 'dropdown') {
				result = 'Dropdown';
			} else if (el.options.style == 'radiobuttons') {
				result = 'Radiobuttons';
			}
		}

		return result;
	},

	_initSortable = function() {
		$(_sortableElements).sortable({
			connectWith: "." + _options.question_list_wrapper_class,
			handle: '.drag-icon',
			stop: function(event, ui) {
				ui.item.trigger('drop', ui.item.index());
			}
		}).disableSelection();
		_sortableEnabled = true;
	},

	_disableSortable = function() {
		if (_sortableEnabled) {
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
		return {
			default: _DefaultQuestionCollection.toJSON(),
			optional: _OptionalQuestionsCollection.toJSON()
		}
	},

	 _saveSettings = function() {
		console.log(_getJSON());
	 }
;