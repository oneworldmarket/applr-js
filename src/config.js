var
	_options = {
		//container for html
		container: '#applr-container',
		//is there will be 2 lists of questions (default+optional) or one list (default)
		mode: 'default+optional',
		//new_fields or optional_fields
		add_type: 'new_fields',
		links_default_class: 'standard-blue-link',
		text_default_class: 'standard-black',
		title_default_class: 'black-title-large',
		default_questions_class: 'applr-default-questions',
		optional_questions_class: 'applr-optional-questions',
		questions_wrapper_class: 'applr-questions-wrapper',
		question_list_wrapper_class: 'applr-question-list-wrapper',
		default_button_class: 'btn-standard btn-green',
		save_endpoint: '/c/applr/save-settings'
	},
	_field_types = {
		'Textfield' : 'Text field',
		'Textarea' : 'Textarea',
		'Dropdown' : 'Dropdown',
		'Radiobuttons' : 'Radio buttons'
	},
	_editMode = false,
	_DefaultQuestionCollection,
	_OptionalQuestionsCollection,
	_DefaultQuestionCollectionView,
	_OptionalQuestionsCollectionView,
	_containerObj,
	_AddNewFieldModel,
	_AddNewFieldView,
	_saveSettingsView
;

//some private functions
var _getJSON = function() {
	return {
		default: _DefaultQuestionCollection.toJSON(),
		optional: _OptionalQuestionsCollection.toJSON()
	}
};

var _saveSettings = function() {
	console.log(_getJSON());
};