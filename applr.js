var 
	applr = {
		Models: {},
		Views: {},
		Collections: {}
	}
;
applr.Templates.DefaultQuestions = '';
applr.Templates.Dropdown = '';
applr.Templates.OptionalQuestions = '';
applr.Templates.Radiobuttons = '';
applr.Templates.Textarea = '';
applr.Templates.Textfield = '';
applr.Models.Dropdown = Backbone.Model.extend({

});
applr.Models.Radiobuttons = Backbone.Model.extend({

});
applr.Models.Textarea = Backbone.Model.extend({

});
applr.Models.Textfield = Backbone.Model.extend({

});
applr.Views.DefaultQuestions = Backbone.View.extend({

});
applr.Views.Dropdown = Backbone.View.extend({

});
applr.Views.OptionalQuestions = Backbone.View.extend({

});
applr.Views.Radiobuttons = Backbone.View.extend({

});
applr.Views.Textarea = Backbone.View.extend({

});
applr.Views.Textfield = Backbone.View.extend({

});
applr.Collections.DefaultQuestions = Backbone.Collection.extend({

});
applr.Collections.OptionalQuestions = Backbone.Collection.extend({

});
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