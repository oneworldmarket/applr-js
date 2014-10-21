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
		default_questions_class: 'applr-questions-wrapper applr-default-questions',
		optional_questions_class: 'applr-questions-wrapper applr-optional-questions'
	},
	_field_types = [
		'Textfield',
		'Textarea',
		'Dropdown',
		'Radiobuttons'
	],
	_editMode = false
;


