window.applr = (function(applr, $){
	//private variables and functions
	var
		_debug = true,
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
		_DefaultQuestionCollectionView,
		_OptionalQuestionsCollectionView,
		_containerObj,

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
		}
	;

	var facade = {
		//public variables and functions
		init: function(options) {
			this.setOptions(options);

			_containerObj = $(_options.container);

			_DefaultQuestionCollection = new applr.Collections.DefaultQuestions;
			_OptionalQuestionsCollection = new applr.Collections.OptionalQuestions;

			_DefaultQuestionCollectionView = new applr.Views.DefaultQuestions({collection: _DefaultQuestionCollection});
			_OptionalQuestionsCollectionView = new applr.Views.OptionalQuestions({collection: _OptionalQuestionsCollection});
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
					el.add_type = _options.add_type;
					var modelName = _detectQuestionModel(el);
					if (modelName) {
						var model = new applr.Models[modelName](el);
						_DefaultQuestionCollection.add(model);
					}
				});
			}
			if (typeof JSON.optional == 'object' && JSON.default.length > 0) {
				_.each(JSON.optional, function(el){
					el.add_type = _options.add_type;
					var modelName = _detectQuestionModel(el);
					if (modelName) {
						var model = new applr.Models[modelName](el);
						_OptionalQuestionsCollection.add(model);
					}
				});
			}

			_DefaultQuestionCollectionView.render().$el.appendTo(_options.container);
			_OptionalQuestionsCollectionView.render().$el.appendTo(_options.container);
		}
	};

	//debug functions
	if (_debug) {
		_.extend(facade, applr, {
			getDefaultQuestionCollection: function() {
				return _DefaultQuestionCollection;
			},
			getOptionalQuestionsCollection: function() {
				return _OptionalQuestionsCollection;
			}
		});
	}

	return facade;
})(applr, jQuery);