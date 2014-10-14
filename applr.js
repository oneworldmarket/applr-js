var 
	applr = {
		Models: {
			Base: {}
		},
		Views: {},
		Collections: {},
		Templates: {}
	}
;
applr.Templates.DefaultQuestions = '';
applr.Templates.Dropdown = '';
applr.Templates.OptionalQuestions = '';
applr.Templates.Radiobuttons = '';
applr.Templates.Textarea = '';
applr.Templates.Textfield = '';
applr.Models.Base.CloseQuestion = Backbone.Model.extend({
	defaults: {
		type: 'close'
	}
});
applr.Models.Base.OpenQuestion = Backbone.Model.extend({
	defaults: {
		type: 'open'
	}
});
applr.Models.Dropdown = applr.Models.Base.CloseQuestion.extend({

});
applr.Models.Radiobuttons = applr.Models.Base.CloseQuestion.extend({

});
applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		limit: textareaDefaultLimit
	}
});
applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		limit: textfieldDefaultLimit
	}
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