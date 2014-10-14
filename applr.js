;(function(){
	var
		applr = {
			Models: {
				Base: {}
			},
			Views: {
				Base: {}
			},
			Collections: {},
			Templates: {
				Base: {}
			},
			Defaults: {
				textfieldMaxLimit: 80,
				textareaMaxLimit: 200,
				textfieldDefaultLimit: 50,
				textareaDefaultLimit: 150
			}
		}
	;
	applr.Templates.Base.Question = '<a href="#"><%= ask %></a>';
	applr.Templates.DefaultQuestions = '';
	applr.Templates.Dropdown = '';
	applr.Templates.OptionalQuestions = '';
	applr.Templates.Radiobuttons = '';
	applr.Templates.Textarea = '';
	applr.Templates.Textfield = '';
	applr.Models.Base.ClosedQuestion = Backbone.Model.extend({
		defaults: {
			type: 'close'
		}
	});
	applr.Models.Base.OpenQuestion = Backbone.Model.extend({
		defaults: {
			type: 'open'
		}
	});
	applr.Models.Dropdown = applr.Models.Base.ClosedQuestion.extend({
		defaults: {
			view: 'Dropdown',
			options: {
				style: 'dropdown'
			}
		}
	});
	applr.Models.Radiobuttons = applr.Models.Base.ClosedQuestion.extend({
		defaults: {
			view: 'Radiobuttons',
			options: {
				style: 'radiobuttons'
			}
		}
	});
	applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
		defaults: {
			view: 'Textarea',
			options: {
				limit: applr.Defaults.textareaDefaultLimit
			}
		}
	});
	applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
		defaults: {
			view: 'Textfield',
			options: {
				limit: applr.Defaults.textfieldDefaultLimit
			}
		}
	});
	applr.Views.Base.Question = Backbone.View.extend({
		tagName: 'li',
	
		defaultTemplate: applr.Templates.Base.Question,
	
		render: function() {
			var templateFunction = _.template(this.defaultTemplate + this.template);
			this.$el.html( templateFunction(this.model.toJSON()));
		}
	});
	applr.Views.DefaultQuestions = Backbone.View.extend({
		tagName: 'ul',
	
		render: function() {
			this.collection.each(function(questionMmodel){
				var View = questionMmodel.get('view');
				var questionView = new applr.Views[View]({ model: questionMmodel });
				questionView.render();
				this.$el.append(questionView.el);
			}, this);
		}
	});
	applr.Views.Dropdown = applr.Views.Base.Question.extend({
		template: applr.Templates.Dropdown
	});
	applr.Views.OptionalQuestions = Backbone.View.extend({
		tagName: 'ul',
	
		render: function() {
			this.collection.each(function(questionMmodel){
				var View = questionMmodel.get('view');
				var questionView = new applr.Views[View]({ model: questionMmodel });
				questionView.render();
				this.$el.append(questionView.el);
			}, this);
		}
	});
	applr.Views.Radiobuttons = applr.Views.Base.Question.extend({
		template: applr.Templates.Radiobuttons
	});
	applr.Views.Textarea = applr.Views.Base.Question.extend({
		template: applr.Templates.Textarea
	});
	applr.Views.Textfield = applr.Views.Base.Question.extend({
		template: applr.Templates.Textfield
	});
	applr.Collections.DefaultQuestions = Backbone.Collection.extend({
	
	});
	applr.Collections.OptionalQuestions = Backbone.Collection.extend({
	
	});
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
	
				_DefaultQuestionCollectionView.render();
				_OptionalQuestionsCollectionView.render();
	
				_containerObj.append(_DefaultQuestionCollectionView.$el.html());
				_containerObj.append(_OptionalQuestionsCollectionView.$el.html());
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
})();