window.applr = (function(applr, $){
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
					var modelName = _detectQuestionModel(el);
					if (modelName) {
						var model = new applr.Models[modelName](el);
						_DefaultQuestionCollection.add(model);
					}
				});
			}
			if (typeof JSON.optional == 'object' && JSON.default.length > 0) {
				_.each(JSON.optional, function(el){
					var modelName = _detectQuestionModel(el);
					if (modelName) {
						var model = new applr.Models[modelName](el);
						_OptionalQuestionsCollection.add(model);
					}
				});
			}

			_DefaultQuestionCollectionView.render().$el.appendTo(_options.container);
			_OptionalQuestionsCollectionView.render().$el.appendTo(_options.container);

			_initAddNewField();
			_initSaveSettings();
			_initSortable();
		},
		getJSON: function() {
			return _getJSON();
		},
		saveSettings: function() {
			return _saveSettings();
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