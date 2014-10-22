;(function(){
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
			optional_questions_class: 'applr-questions-wrapper applr-optional-questions',
			default_button_class: 'btn-standard btn-green',
			save_endpoint: '/c/applr/save-settings'
		},
		_field_types = {
			'Textfield' : 'Text field',
			'Textarea' : 'Textarea',
			'Dropdown' : 'Dropdown',
			'Radiobuttons' : 'Radio buttons'
		},
		_editMode = false,
		_DefaultQuestionCollection,
		_OptionalQuestionsCollection,
		_DefaultQuestionCollectionView,
		_OptionalQuestionsCollectionView,
		_containerObj,
		_AddNewFieldModel,
		_AddNewFieldView,
		_saveSettingsView
	;
	
	//some private functions
	var _getJSON = function() {
		return {
			default: _DefaultQuestionCollection.toJSON(),
			optional: _OptionalQuestionsCollection.toJSON()
		}
	};
	
	var _saveSettings = function() {
		console.log(_getJSON());
	};
	var applrTemplates = (function () {
	  this["Templates"] = this["Templates"] || {};
	  this["Templates"]["Base.Question"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<a href="#" class="' + ((__t = (_options.links_default_class)) == null ? '' : __t) + ' edit-question hide-toggle">\n\t' + ((__t = (ask)) == null ? '' : __t) + '\n</a>\n<span class="' + ((__t = (_options.text_default_class)) == null ? '' : __t) + ' hide-toggle">(' + ((__t = (type_title)) == null ? '' : __t) + ')</span>\n<a href="#" class="' + ((__t = (_options.links_default_class)) == null ? '' : __t) + ' remove-question hide-toggle">remove</a>';
	    }
	    return __p;
	  };
	  this["Templates"]["AddNewField"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<select name="add-new-field-select">\n\t<option value="0">Select field type</option>\n\t';
	      _.each(items, function (item, item_key) {
	        __p += '\n\t\t<option value="' + ((__t = (item_key)) == null ? '' : __t) + '">' + ((__t = (item)) == null ? '' : __t) + '</option>\n\t';
	      });
	      __p += '\n</select>\n<button class="' + ((__t = (_options.default_button_class)) == null ? '' : __t) + ' add-new-field-button">Add new field</button>';
	    }
	    return __p;
	  };
	  this["Templates"]["CloseQuestion"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<div class="edit-mode display-none">\n\t<h2><span class="ask-val">' + ((__t = (ask)) == null ? '' : __t) + '</span> (edit)</h2>\n\n\t<div>\n\t\t<label>\n\t\t\tLabel\n\t\t</label>\n\n\t\t<input type="text" name="ask" value="' + ((__t = (ask)) == null ? '' : __t) + '" />\n\t</div>\n\n\t<div>\n\t\t<label>\n\t\t\tOptions\n\t\t</label>\n\t\t<div class="optional-questions"></div>\n\t</div>\n\n\t<button class="' + ((__t = (_options.default_button_class)) == null ? '' : __t) + ' save-candidate-filter">SAVE CANDIDATE FILTER</button>\n</div>';
	    }
	    return __p;
	  };
	  this["Templates"]["DefaultQuestions"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<h2 class="' + ((__t = (_options.title_default_class)) == null ? '' : __t) + ' hide-toggle">Default questions</h2>';
	    }
	    return __p;
	  };
	  this["Templates"]["Dropdown"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '';
	    }
	    return __p;
	  };
	  this["Templates"]["OpenQuestion"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<div class="edit-mode display-none">\n\t<h2><span class="ask-val">' + ((__t = (ask)) == null ? '' : __t) + '</span> (edit)</h2>\n\n\t<div>\n\t\t<label>\n\t\t\tLabel\n\t\t</label>\n\n\t\t<input type="text" name="ask" value="' + ((__t = (ask)) == null ? '' : __t) + '" />\n\t</div>\n\n\t<div>\n\t\t<label>\n\t\t\tLimit\n\t\t</label>\n\t\t<input type="text" name="limit" value="' + ((__t = (options.limit)) == null ? '' : __t) + '" />\n\t</div>\n\n\t<button class="' + ((__t = (_options.default_button_class)) == null ? '' : __t) + ' save-candidate-filter">SAVE CANDIDATE FILTER</button>\n</div>';
	    }
	    return __p;
	  };
	  this["Templates"]["OptionalQuestions"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<h2 class="' + ((__t = (_options.title_default_class)) == null ? '' : __t) + ' hide-toggle">Optional questions</h2>';
	    }
	    return __p;
	  };
	  this["Templates"]["QuestionOption"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<td><input type="text" value="' + ((__t = (answer)) == null ? '' : __t) + '" name="answer"></td>\n<td><input type="checkbox" name="reject" value="1" ';
	      if (reject) {
	        __p += ' checked=checked ';
	      }
	      __p += ' ></td>\n<td><a href="#" class="' + ((__t = (_options.links_default_class)) == null ? '' : __t) + ' remove-answer">remove</a></td>\n';
	    }
	    return __p;
	  };
	  this["Templates"]["QuestionOptions"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<thead>\n\t<td>Label</td>\n\t<td>Reject?</td>\n\t<td></td>\n</thead>\n<tbody class="option-contents">\n\n</tbody>\n<tr>\n\t<td colspan="3">\n\t\t<a href="#" class="' + ((__t = (_options.links_default_class)) == null ? '' : __t) + ' add-new-answer">add row</a>\n\t</td>\n</tr>';
	    }
	    return __p;
	  };
	  this["Templates"]["Radiobuttons"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '';
	    }
	    return __p;
	  };
	  this["Templates"]["SaveSettings"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<button class="' + ((__t = (_options.default_button_class)) == null ? '' : __t) + ' save-settings-button">Save settings</button>';
	    }
	    return __p;
	  };
	  this["Templates"]["Textarea"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '';
	    }
	    return __p;
	  };
	  this["Templates"]["Textfield"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '';
	    }
	    return __p;
	  };
	  return this["Templates"];
	});
	var
		applr = {
			Models: {
				Base: {}
			},
			Views: {
				Base: {}
			},
			Collections: {},
			Templates:  new applrTemplates(),
			Defaults: {
				textfieldMaxLimit: 80,
				textareaMaxLimit: 200,
				textfieldDefaultLimit: 50,
				textareaDefaultLimit: 150
			}
		}
	;
	
	//return models and collections also when using toJSON
	Backbone.Model.prototype.toJSON = function() {
		var json = _.clone(this.attributes);
	
		for(var attr in json) {
			if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
				json[attr] = json[attr].toJSON();
			}
		}
		return json;
	};
	applr.Collections.DefaultQuestions = Backbone.Collection.extend({
	
	});
	applr.Collections.OptionalQuestions = Backbone.Collection.extend({
	
	});
	applr.Collections.QuestionsOptions = Backbone.Collection.extend({
	
	});
	applr.Models.Base.ClosedQuestion = Backbone.Model.extend({
		defaults: {
			type: 'close',
			ask: 'New question'
		},
	
		initialize: function(attr) {
			this.attributes.answers = new applr.Collections.OptionalQuestions();
	
			if (attr !== undefined && attr.answers !== undefined && attr.answers.length > 0) {
				_.each(attr.answers, function(el) {
					var model = new applr.Models.CloseQuestionItem(el);
					this.attributes.answers.add(model);
				}, this);
			} else {
				var model = new applr.Models.CloseQuestionItem();
				this.attributes.answers.add(model);
			}
		}
	});
	applr.Models.Base.OpenQuestion = Backbone.Model.extend({
		defaults: {
			type: 'open',
			ask: 'New question'
		}
	});
	applr.Models.AddNewField = Backbone.Model.extend({
		defaults: {
			items: _field_types
		}
	});
	applr.Models.CloseQuestionItem = Backbone.Model.extend({
		defaults: {
			answer: '',
			reject: false
		}
	});
	applr.Models.Dropdown = applr.Models.Base.ClosedQuestion.extend({
		defaults: {
			view: 'Dropdown',
			type_title: 'Dropdown',
			options: {
				style: 'dropdown'
			},
			ask: 'New question'
		}
	});
	
	applr.Models.Radiobuttons = applr.Models.Base.ClosedQuestion.extend({
		defaults: {
			view: 'Radiobuttons',
			type_title: 'Radio buttons',
			options: {
				style: 'radiobuttons'
			},
			ask: 'New question'
		}
	});
	applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
		defaults: {
			view: 'Textarea',
			type_title: 'Textarea',
			options: {
				limit: applr.Defaults.textareaDefaultLimit
			},
			ask: 'New question'
		}
	});
	applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
		defaults: {
			view: 'Textfield',
			type_title: 'Textfield',
			options: {
				limit: applr.Defaults.textfieldDefaultLimit
			},
			ask: 'New question'
		}
	});
	applr.Views.Base.Question = Backbone.View.extend({
		initialize: function() {
			this.listenTo(this.model, 'destroy', this.removeQuestion);
		},
	
		tagName: 'li',
	
		defaultTemplate: applr.Templates['Base.Question'],
	
		render: function() {
			this.$el.html(this.defaultTemplate(this.model.toJSON()) + this.template(this.model.toJSON()));
			return this;
		},
	
		events: {
			'click .edit-question' : 'toggleEdit',
			'click .save-candidate-filter' : 'saveFilter',
			'change input[name="ask"]' : 'changeAsk',
			'change input[name="limit"]' : 'changeLimit',
			'click .remove-question' : 'destroyQuestion'
		},
	
		toggleEdit: function(e) {
			e.preventDefault();
	
			_editMode = !_editMode;
			$(_options.container).find('.hide-toggle').toggleClass('display-none');
			this.$el.find('.edit-mode').toggleClass('display-none');
		},
	
		changeAsk: function() {
			var value = this.$el.find('input[name="ask"]').val();
			this.model.set('ask', value);
			this.$el.find('.ask-val').html(this.model.get('ask'));
		},
	
		saveFilter: function(e) {
			this.toggleEdit(e);
			_DefaultQuestionCollectionView.render();
			_OptionalQuestionsCollectionView.render();
		},
	
		changeLimit: function() {
			var value = this.$el.find('input[name="limit"]').val();
			var options = this.model.get('options');
			options.limit = value;
			this.model.set('options', options);
		},
	
		destroyQuestion: function(e) {
			e.preventDefault();
	
			this.model.destroy();
		},
	
		removeQuestion: function() {
			this.$el.remove();
		}
	});
	applr.Views.Base.OpenQuestion = applr.Views.Base.Question.extend({
		template: applr.Templates.OpenQuestion
	});
	applr.Views.Base.ClosedQuestion = applr.Views.Base.Question.extend({
		template: applr.Templates.CloseQuestion,
	
		render: function() {
			//rendering question options (answers)
			var QuestionOptionsView = new applr.Views.QuestionOptions({collection: this.model.attributes.answers})
	
			this.$el.html(this.defaultTemplate(this.model.toJSON()) + this.template(this.model.toJSON()));
			this.$el.find('.optional-questions').html(QuestionOptionsView.render().$el);
			return this;
		}
	});
	applr.Views.AddNewField = Backbone.View.extend({
		tagName: 'div',
	
		template: applr.Templates.AddNewField,
	
		attributes: {
			class: 'applr-add-new-field hide-toggle'
		},
	
		render: function() {
			var html = this.template(this.model.toJSON());
			this.$el.html(html);
			return this;
		},
	
		events: {
			'click .add-new-field-button' : 'addNewField'
		},
	
		addNewField: function() {
			var field_type = this.$el.find('select[name="add-new-field-select"]').val();
	
			if (field_type != '0') {
				var model = new applr.Models[field_type];
				_OptionalQuestionsCollection.add(model);
			}
		}
	});
	applr.Views.DefaultQuestions = Backbone.View.extend({
		tagName: 'div',
	
		attributes: {
			class: _options.optional_questions_class,
			id: 'applr-default-questions-wrapper'
		},
	
		render: function() {
			this.$el.html(applr.Templates.DefaultQuestions);
			this.$el.append('<ul></ul>');
	
			this.collection.each(function(questionModel){
				var View = questionModel.get('view');
				var questionView = new applr.Views[View]({ model: questionModel });
				this.$el.find('ul').append(questionView.render().el);
			}, this);
			return this;
		}
	});
	applr.Views.Dropdown = applr.Views.Base.ClosedQuestion.extend({
	
	});
	applr.Views.OptionalQuestions = Backbone.View.extend({
		initialize: function() {
			this.listenTo(this.collection, "add", this.addNewItem);
		},
	
		tagName: 'div',
	
		attributes: {
			class: _options.optional_questions_class,
			id: 'applr-optional-questions-wrapper'
		},
	
		render: function() {
			this.$el.html(applr.Templates.OptionalQuestions);
			this.$el.append('<ul></ul>');
	
			this.collection.each(function(questionModel){
				var View = questionModel.get('view');
				var questionView = new applr.Views[View]({ model: questionModel });
				this.$el.find('ul').append(questionView.render().el);
			}, this);
			return this;
		},
	
		addNewItem: function(questionModel) {
			var View = questionModel.get('view');
			var questionView = new applr.Views[View]({ model: questionModel });
			this.$el.find('ul').append(questionView.render().el);
		}
	});
	applr.Views.QuestionOption = Backbone.View.extend({
		initialize: function(){
			this.model.on('destroy', this.remove, this);
		},
	
		tagName: 'tr',
	
		template: applr.Templates.QuestionOption,
	
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
	
		events: {
			'click .remove-answer' : 'removeAnswer',
			'change input' : 'updateData'
		},
	
		updateData: function() {
			this.model.set('answer', this.$el.find('input[name="answer"]').val());
			this.model.set('reject', this.$el.find('input[name="reject"]').is(':checked'));
		},
	
		removeAnswer: function() {
			this.model.destroy();
		},
	
		remove: function(){
			this.$el.remove();
		}
	});
	applr.Views.QuestionOptions = Backbone.View.extend({
		tagName: 'table',
	
		template: applr.Templates.QuestionOptions,
	
		render: function() {
			this.$el.html(this.template());
	
			this.collection.each(function(model){
				var View = new applr.Views.QuestionOption({ model: model });
				this.$el.find('.option-contents').append(View.render().el);
			}, this);
			return this;
		},
	
		events: {
			'click .add-new-answer': 'addNewAnswer'
		},
	
		addNewAnswer: function(e) {
			e.preventDefault();
	
			var model = new applr.Models.CloseQuestionItem();
			this.collection.add(model);
	
			var View = new applr.Views.QuestionOption({ model: model });
			this.$el.find('.option-contents').append(View.render().el);
		}
	});
	applr.Views.Radiobuttons = applr.Views.Base.ClosedQuestion.extend({
	
	});
	applr.Views.SaveSettings =  Backbone.View.extend({
		attributes: {
			class: 'applr-save-settings hide-toggle goRight'
		},
	
		template: applr.Templates.SaveSettings,
	
		render: function() {
			this.$el.html(this.template());
			return this;
		},
	
		events: {
			'click .save-settings-button' : 'saveSettings'
		},
	
		saveSettings: function(e) {
			e.preventDefault();
			_saveSettings();
		}
	});
	applr.Views.Textarea = applr.Views.Base.OpenQuestion.extend({
	
	});
	applr.Views.Textfield = applr.Views.Base.OpenQuestion.extend({
	
	});
	window.applr = (function(applr, $){
		//private variables and functions
		var
			_debug = true,
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
			},
	
			_initSortable = function() {
	
			},
			_initAddNewField = function() {
				_AddNewFieldModel = new applr.Models.AddNewField();
				_AddNewFieldView = new applr.Views.AddNewField({model:_AddNewFieldModel});
	
				_AddNewFieldView.render().$el.appendTo(_options.container);
			},
	
			_initSaveSettings = function() {
				_saveSettingsView = new applr.Views.SaveSettings();
				_saveSettingsView.render().$el.appendTo(_options.container);
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
	
				_DefaultQuestionCollectionView.render().$el.appendTo(_options.container);
				_OptionalQuestionsCollectionView.render().$el.appendTo(_options.container);
	
				_initAddNewField();
				_initSaveSettings();
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
})();