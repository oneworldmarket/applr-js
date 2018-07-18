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
		text_default_class: 'standard-black',
		input_class: 'input-standart',
		required_class: 'validate[required,maxSize[255]]',
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
		open_quesion_fieild_wrapper : 'open-quesion-fieild-wrapper',
		full_line_input: 'full-line-input',
		standart_line_input: 'default-field',
		small_line_input: 'small-field',
		add_new_field_wrapper_class: 'applr-add-new-field',
		edit_mode_wrapper_class: '',
		applr_row : 'applr_row',
		label_input_options : 'label_input_options',
		save_endpoint: '/c/applr/save-settings',
		on_save: function(result) {},
		placeholder_class: 'item-placeholder tmp1',
		wrapper: '#applr-wrapper',
		video_enabled: false,
		on_select_render: function() {},
		text: {
			fld_btn_save: 'SAVE CANDIDATE FILTER',
			optional_head_title: 'Optional questions'
		},
        video_limit_options: {
            15: '15 seconds',
            30: '30 seconds',
            45: '45 seconds',
            60: '1 minute',
            120: '2 minutes',
            180: '3 minutes'
        },
		custom_fields_enabled: false,
		custom_fields: [],
		used_custom_fields: []
	},

	_field_types = {
		'Textfield' : 'Text field',
		'Textarea' : 'Textarea',
		'Dropdown' : 'Dropdown',
		'Radiobuttons' : 'Radio buttons',
		'Checkbox': 'Checkboxes'
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
	_sortableElements_filter_questions = '#applr-optional-selected-questions-list',

    _videofieldDefaultLimit = 60
;