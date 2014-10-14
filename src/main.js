applr = (function(applr){
	//private variables and functions
	var
		_field_types = [
			'Textfield',
			'Textarea',
			'Dropdown',
			'Radiobuttons'
		],
		_options = {
			//container for html
			container: '#applr-container',
			//is there will be 2 lists of questions (default+optional) or one list (default)
			mode: 'default+optional',
			//new_fields or optional_fields
			add_type: 'new_fields'
		},
		_DefaultQuestionCollection,
		_OptionalQuestionsCollection,
		textfieldMaxLimit = 80,
		textareaMaxLimit = 200,
		textfieldDefaultLimit = 50,
		textareaDefaultLimit = 150
	;

	return _.extend({
		//public variables and functions
		init: function(options) {
			this.setOptions(options);

			_DefaultQuestionCollection = new applr.Collections.DefaultQuestions;
			_OptionalQuestionsCollection = new applr.Collections.OptionalQuestions;
		},
		getOptions: function() {
			return _options;
		},
		setOptions: function(options) {
			_options = _.extend(_options, options)
		},
		restoreFromJSON: function(JSON) {
			if (typeof JSON.default == 'object' && JSON.default.length > 0) {
				_.each(JSON.default, function(el){
					//console.log(el);
				});
			}
		}
	}, applr);
})(applr);