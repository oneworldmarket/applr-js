window.applr = (function(applr, $){
	var facade = {
		//public variables and functions
		init: function(options) {
			this.setOptions(options);

			_containerObj = $(_options.container);

			if (_options.add_type == 'new_fields') {
				_DefaultQuestionCollection = new applr.Collections.DefaultQuestions;
				_OptionalQuestionsCollection = new applr.Collections.OptionalQuestions;
				_removedQuestionsCollection = new applr.Collections.RemovedQuestions;

				_DefaultQuestionCollectionView = new applr.Views.DefaultQuestions({collection: _DefaultQuestionCollection});
				_OptionalQuestionsCollectionView = new applr.Views.OptionalQuestions({collection: _OptionalQuestionsCollection});
			} else if (_options.add_type == 'filter_questions') {
				_OptionalQuestionsCollection = new applr.Collections.OptionalQuestions;
				_OptionalQuestionsSelectedCollection = new applr.Collections.OptionalQuestionsSelected;

				_OptionalQuestionsAddCollectionView = new applr.Views.OptionalQuestionsAdd({collection: _OptionalQuestionsCollection});
				_OptionalQuestionsSelectedCollectionView = new applr.Views.OptionalQuestionsSelected({collection: _OptionalQuestionsSelectedCollection});
			}
		},
		getOptions: function() {
			return _options;
		},
		setOptions: function(options) {
			_options = _.extend(_options, options)
		},
		restoreFromJSON: function(JSON) {
			if (_options.add_type == 'new_fields') {
				if (typeof JSON.default == 'object' && JSON.default.length > 0) {
					_.each(JSON.default, function(el){
						var modelName = _detectQuestionModel(el);
						if (modelName) {
							var model = new applr.Models[modelName](el);
							_DefaultQuestionCollection.add(model);
						}
					});
				}
				if (typeof JSON.optional == 'object' && JSON.optional.length > 0) {
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
				//_initSaveSettings();
			} else if (_options.add_type == 'filter_questions') {
				//first option
				var model = new applr.Models.Base.Question({
					ask: 'Select filter question',
					id: 0
				});
				_OptionalQuestionsCollection.add(model);
				if (typeof JSON.optional == 'object' && JSON.optional.length > 0) {
					_.each(JSON.optional, function(el){
						var modelName = _detectQuestionModel(el);
						if (modelName) {
							var model = new applr.Models[modelName](el);
							_OptionalQuestionsCollection.add(model);
						}
					});
				}

				if (typeof JSON.optional_selected == 'object' && JSON.optional_selected.length > 0) {
					_.each(JSON.optional_selected, function(el){
						var modelName = _detectQuestionModel(el);
						if (modelName) {
							var model = new applr.Models[modelName](el);
							_OptionalQuestionsSelectedCollection.add(model);
							_OptionalQuestionsCollection.remove(model);
						}
					});
				}

				_OptionalQuestionsSelectedCollectionView.render().$el.appendTo(_options.container);
				_OptionalQuestionsAddCollectionView.render().$el.appendTo(_options.container);
			}

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