applr = (function(applr){
	//private variables and functions
	var _field_types = [
		'Textfield',
		'Textarea',
		'Dropdown',
		'Radiobuttons'
	];

	var
		_options = {
			//container for html
			container : '#applr-container',
			//is there will be 2 lists of questions (default+optional) or one list (default)
			mode: 'default+optional'
		},
		_DefaultQuestionCollection,
		_OptionalQuestionsCollection
	;

	return _.extend({
		//public variables and functions
		init: function(options) {
			this.setOptions(options);

			switch (_options.mode) {
				case 'default+optional':

					break;
				case 'default':
				default:

					break;
			}
		},
		getOptions: function() {
			return _options;
		},
		setOptions: function(options) {
			_options = _.extend(_options, options)
		}
	}, applr);
})(applr);