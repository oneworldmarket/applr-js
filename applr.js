;(function(){
	var
		//debug mode
		_debug = true,
		//configurable options
		_options = {
			//container for html
			container: '#applr-container',
			//is there will be 2 lists of questions (default+optional) or one list (default)
			mode: 'default+optional',
			//new_fields or filter_questions
			add_type: 'new_fields',
			links_default_class: 'standard-blue-link',
			links_medium_class: 'medium-blue-link',
			text_default_class: 'standard-black',
			input_class: 'input-standart',
			title_default_class: 'red-title',
			filter_questions_title_class: 'key-contacts-list-title',
			default_questions_class: 'applr-default-questions',
			optional_questions_class: 'applr-optional-questions',
			questions_wrapper_class: 'applr-questions-wrapper',
			question_list_wrapper_class: 'applr-question-list-wrapper',
			default_button_class: 'btn-standard btn-green',
			save_button_class: 'btn-standard btn-blue',
			cancel_button_class: 'btn-standard btn-red',
			input_container: 'input-form-container',
			labels_style: 'bronze-info',
			labels_large: 'bronze-info-large',
			open_quesion_fieild_wrapper : 'open-quesion-fieild-wrapper',
			full_line_input: 'full-line-input',
			standart_line_input: 'default-field',
			small_line_input: 'small-field',
			applr_row : 'applr_row',
			label_input_options : 'label_input_options',
			save_endpoint: '/c/applr/save-settings',
			on_save: function(result) {},
			placeholder_class: 'item-placeholder',
			wrapper: '#applr-wrapper'
		},
		_field_types = {
			'Textfield' : 'Text field',
			'Textarea' : 'Textarea',
			'Dropdown' : 'Dropdown',
			'Radiobuttons' : 'Radio buttons'
		},
	
		_textfieldMaxLimit =  100,
		_textareaMaxLimit =  5000,
		_textfieldDefaultLimit = 80,
		_textareaDefaultLimit = 800,
	
		_editMode = false,
		_sortableEnabled = false,
	
		_DefaultQuestionCollection,
		_OptionalQuestionsCollection,
		_DefaultQuestionCollectionView,
		_OptionalQuestionsCollectionView,
		_removedQuestionsCollection,
	
		_OptionalQuestionsAddCollectionView,
		_OptionalQuestionsSelectedCollection,
		_OptionalQuestionsSelectedCollectionView,
	
		_containerObj,
		_AddNewFieldModel,
		_AddNewFieldView,
		_saveSettingsView,
		_sortableElements_new_fields = '#applr-optional-questions-list, #applr-default-questions-list',
		_sortableElements_filter_questions = '#applr-optional-selected-questions-list'
	;
	
	//some private functions
	var
		_detectQuestionModel = function(el) {
			var result = false;
	
			if (el.type == 'open') {
				if (el.options.limit > 0 && el.options.limit <= _textfieldMaxLimit) {
					result = 'Textfield';
				} else if (el.options.limit > 0 && el.options.limit <= _textareaMaxLimit && el.options.limit > _textfieldMaxLimit) {
					result = 'Textarea';
				}
			} else if (el.type == 'closed') {
				if (el.options.style == 'dropdown') {
					result = 'Dropdown';
				} else if (el.options.style == 'radio button') {
					result = 'Radiobuttons';
				}
			}
	
			return result;
		},
	
		_initSortable = function() {
			if (_options.add_type == 'new_fields') {
				$(_sortableElements_new_fields).sortable({
					connectWith: "." + _options.question_list_wrapper_class,
					handle: '.drag-icon',
					placeholder: _options.placeholder_class,
					stop: function(event, ui) {
						ui.item.trigger('drop', ui.item.index());
					}
				}).disableSelection();
			} else if (_options.add_type == 'filter_questions') {
				$(_sortableElements_filter_questions).sortable({
					handle: '.drag-icon',
					placeholder: _options.placeholder_class,
					stop: function(event, ui) {
						ui.item.trigger('drop', ui.item.index());
					}
				}).disableSelection();
			}
			_sortableEnabled = true;
		},
	
		_disableSortable = function() {
			if (_sortableEnabled) {
				var _sortableElements;
				if (_options.add_type == 'new_fields') {
					_sortableElements = _sortableElements_new_fields
				} else if (_options.add_type == 'filter_questions') {
					_sortableElements = _sortableElements_filter_questions;
				}
				$(_sortableElements).sortable('destroy').enableSelection();
			}
			_sortableEnabled = false;
		},
	
		_initAddNewField = function() {
			_AddNewFieldModel = new applr.Models.AddNewField();
			_AddNewFieldView = new applr.Views.AddNewField({model:_AddNewFieldModel});
	
			_AddNewFieldView.render().$el.appendTo(_options.container);
		},
	
		_initSaveSettings = function() {
			_saveSettingsView = new applr.Views.SaveSettings();
			_saveSettingsView.render().$el.appendTo(_options.container);
		},
	
		_getJSON = function() {
			if (_options.add_type == 'new_fields') {
				return {
					default: _DefaultQuestionCollection.toJSON(),
					optional: _OptionalQuestionsCollection.toJSON(),
					removed: _removedQuestionsCollection.toJSON()
				}
			} else if (_options.add_type == 'filter_questions') {
				return {
					optional_selected: _OptionalQuestionsSelectedCollection.toJSON()
				}
			}
		},
	
		 _saveSettings = function() {
			 $.ajax({
				 url: _options.save_endpoint,
				 dataType: 'json',
				 type: 'post',
				 data: _getJSON(),
				 success:function (resp) {
					 if (typeof _options.on_save == 'function') {
						 return _options.on_save(resp);
					 }
				 },
				 error: function() {
					 console.log(arguments);
				 }
			 });
		 }
	
		_generateName = function() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
			for( var i=0; i < 15; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));
	
			return text;
		}
	;
	var applrTemplates = (function () {
	  this["Templates"] = this["Templates"] || {};
	  this["Templates"]["Base.Question"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '';
	      if (_options.add_type == 'new_fields') {
	        __p += '\n\t<a href="#" class="' + ((__t = (_options.links_medium_class)) == null ? '' : __t) + ' edit-question hide-toggle">\n';
	      }
	      __p += '\n\t' + ((__t = (ask)) == null ? '' : __t) + '\n';
	      if (_options.add_type == 'new_fields') {
	        __p += '\n\t</a>\n';
	      }
	      __p += '\n<span class="' + ((__t = (_options.text_default_class)) == null ? '' : __t) + ' hide-toggle">\n\t(' + ((__t = (type_title)) == null ? '' : __t) + '';
	      if (_options.add_type == 'new_fields' && type == 'open') {
	        __p += ', Limit: ' + ((__t = (options.limit)) == null ? '' : __t) + '';
	      }
	      __p += ')\n</span>\n<a href="#" class="' + ((__t = (_options.links_default_class)) == null ? '' : __t) + ' remove-question hide-toggle">remove</a>\n<span class="goRight hide-toggle drag-icon"></span>\n<div class="clearfix"></div>';
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
	      __p += '<div>\n<select name="add-new-field-select">\n\t<option value="0">Select field type</option>\n\t';
	      _.each(items, function (item, item_key) {
	        __p += '\n\t\t<option value="' + ((__t = (item_key)) == null ? '' : __t) + '">' + ((__t = (item)) == null ? '' : __t) + '</option>\n\t';
	      });
	      __p += '\n</select>\n<button class="' + ((__t = (_options.default_button_class)) == null ? '' : __t) + ' add-new-field-button">Add new field</button>\n</div>';
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
	      __p += '<div class="edit-mode display-none">\n\t<h2><span class="ask-val ' + ((__t = (_options.title_default_class)) == null ? '' : __t) + '">' + ((__t = (ask)) == null ? '' : __t) + '</span> <span class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + '">(edit)</span></h2>\n\n\t<div class="' + ((__t = (_options.applr_row)) == null ? '' : __t) + '">\n\t\t<label class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + ' ' + ((__t = (_options.labels_large)) == null ? '' : __t) + ' ">\n\t\t\tLabel\n\t\t</label>\n\t\t<input type="text" class="' + ((__t = (_options.input_class)) == null ? '' : __t) + ' ' + ((__t = (_options.full_line_input)) == null ? '' : __t) + '" name="ask" value="' + ((__t = (ask)) == null ? '' : __t) + '" />\n\t</div>\n\n\t<div class="' + ((__t = (_options.applr_row)) == null ? '' : __t) + '">\n\t\t<label class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + ' ' + ((__t = (_options.labels_large)) == null ? '' : __t) + ' ">\n\t\t\tOptions\n\t\t</label>\n\t\t<div class="optional-questions"></div>\n\t</div>\n\n\t<button class="' + ((__t = (_options.cancel_button_class)) == null ? '' : __t) + ' cancel-candidate-filter goLeft">CANCEL</button>\n\t<button class="' + ((__t = (_options.save_button_class)) == null ? '' : __t) + ' save-candidate-filter goRight">SAVE CANDIDATE FILTER</button>\n</div>';
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
	      __p += '<h2 class="' + ((__t = (_options.title_default_class)) == null ? '' : __t) + ' hide-toggle">Default questions</h2>\n';
	      if (collection.length == 0) {
	        __p += '\n\t<span class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + ' hide-toggle">No questions to list here</span>\n';
	      }
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
	      __p += '<div class="edit-mode display-none">\n\t<h2><span class="ask-val ' + ((__t = (_options.title_default_class)) == null ? '' : __t) + ' ">' + ((__t = (ask)) == null ? '' : __t) + '</span> <span class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + '">(edit)</span></h2>\n\t<div class="question-settings">\n\t\t<div class="' + ((__t = (_options.open_quesion_fieild_wrapper)) == null ? '' : __t) + '">\n\t\t\t<div class="goRight ' + ((__t = (_options.input_container)) == null ? '' : __t) + '">\n\t\t\t\t<input type="text"  class="' + ((__t = (_options.input_class)) == null ? '' : __t) + ' ' + ((__t = (_options.standart_line_input)) == null ? '' : __t) + '" name="ask" value="' + ((__t = (ask)) == null ? '' : __t) + '" />\n\t\t\t</div>\n\t\t\t<label class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + ' ' + ((__t = (_options.labels_large)) == null ? '' : __t) + ' goRight"> \n\t\t\t\tLabel\n\t\t\t</label>\n\t\t</div>\n\t\t<div class="' + ((__t = (_options.open_quesion_fieild_wrapper)) == null ? '' : __t) + '">\n\t\t\t<div class="goRight ' + ((__t = (_options.input_container)) == null ? '' : __t) + '">\n\t\t\t\t<input type="text" class="' + ((__t = (_options.input_class)) == null ? '' : __t) + ' ' + ((__t = (_options.small_line_input)) == null ? '' : __t) + '" name="limit" value="' + ((__t = (options.limit)) == null ? '' : __t) + '" />\n\t\t\t</div>\n\t\t\t<label class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + ' ' + ((__t = (_options.labels_large)) == null ? '' : __t) + ' goRight"> \n\t\t\t\tLimit\n\t\t\t\t';
	      if (view == 'Textfield') {
	        __p += ' (1-' + ((__t = (_textfieldMaxLimit)) == null ? '' : __t) + ') ';
	      }
	      __p += '\n\t\t\t\t';
	      if (view == 'Textarea') {
	        __p += ' (' + ((__t = ((_textfieldMaxLimit + 1))) == null ? '' : __t) + '-' + ((__t = (_textareaMaxLimit)) == null ? '' : __t) + ') ';
	      }
	      __p += '\n\t\t\t</label>\n\t\t</div>\n\t\t<span class="clearfix"></span>\n\t</div>\n\n\t<button class="' + ((__t = (_options.cancel_button_class)) == null ? '' : __t) + ' cancel-candidate-filter goLeft">CANCEL</button>\n\t<button class="' + ((__t = (_options.save_button_class)) == null ? '' : __t) + ' save-candidate-filter goRight">SAVE CANDIDATE FILTER</button>\n</div>';
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
	      __p += '<h2 class="' + ((__t = (_options.title_default_class)) == null ? '' : __t) + ' hide-toggle">Optional questions</h2>\n';
	      if (collection.length == 0) {
	        __p += '\n\t<span class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + ' hide-toggle">No questions to list here</span>\n';
	      }
	      __p += '';
	    }
	    return __p;
	  };
	  this["Templates"]["OptionalQuestionsAdd"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<button class="' + ((__t = (_options.default_button_class)) == null ? '' : __t) + ' add-optional-field-button">Add</button>';
	    }
	    return __p;
	  };
	  this["Templates"]["OptionalQuestionsAddOption"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '' + ((__t = (ask)) == null ? '' : __t) + '';
	    }
	    return __p;
	  };
	  this["Templates"]["OptionalQuestionsSelected"] = function (obj) {
	    var __t, __p = '',
	        __j = Array.prototype.join,
	        print = function () {
	        __p += __j.call(arguments, '');
	        };
	    with(obj || {}) {
	      __p += '<h2 class="' + ((__t = (_options.filter_questions_title_class)) == null ? '' : __t) + '">Candidate filter Questions</h2>';
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
	      __p += '<td class="option-table-input"><input class="' + ((__t = (_options.input_class)) == null ? '' : __t) + '" type="text" value="' + ((__t = (answer)) == null ? '' : __t) + '" name="answer"></td>\n<td class="option-table-checkbox"><input type="checkbox" name="reject" value="1" ';
	      if (reject && reject != '0') {
	        __p += ' checked=checked ';
	      }
	      __p += ' ></td>\n<td><a href="#" class="' + ((__t = (_options.links_default_class)) == null ? '' : __t) + ' remove-answer">(remove)</a></td>\n\n\n';
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
	      __p += '<thead>\n\t<td class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + '" > Label</td>\n\t<td class="' + ((__t = (_options.labels_style)) == null ? '' : __t) + '" > Reject?</td>\n\t<td></td>\n</thead>\n<tbody class="option-contents">\n\n</tbody>\n<tr>\n\t<td colspan="3">\n\t\t<a href="#" class="' + ((__t = (_options.links_medium_class)) == null ? '' : __t) + ' add-new-answer">add row</a>\n\t</td>\n</tr>\n\n\n';
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
	      __p += '<button class="' + ((__t = (_options.save_button_class)) == null ? '' : __t) + ' save-settings-button" id="applr-save-settings-button">Save settings</button>';
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
	applr.Collections.OptionalQuestionsSelected = Backbone.Collection.extend({
	
	});
	applr.Collections.QuestionsOptions = Backbone.Collection.extend({
	
	});
	applr.Collections.RemovedQuestions = Backbone.Collection.extend({
	
	});
	applr.Models.Base.Question = Backbone.Model.extend({
	
	});
	applr.Models.Base.OpenQuestion = applr.Models.Base.Question.extend({
		defaults: {
			type: 'open',
			ask: 'New question'
		},
	
		initialize: function(attr) {
			if ((attr !== undefined && attr.options !== undefined && attr.options.name == undefined) || attr == undefined) {
				this.attributes.options.name = _generateName();
			}
		},
	
		validate: function(attrs) {
			//checking limit
			var
				min_limit,
				max_limit
			;
			if (attrs.view == 'Textfield') {
				min_limit = 1;
				max_limit = _textfieldMaxLimit;
			} else if (attrs.view == 'Textarea') {
				min_limit = _textfieldMaxLimit + 1;
				max_limit = _textareaMaxLimit;
			}
	
			if (attrs.options.limit > max_limit || attrs.options.limit < min_limit) {
				return 'Incorrect value for limit field';
			}
		}
	});
	applr.Models.Base.ClosedQuestion = applr.Models.Base.Question.extend({
		defaults: {
			type: 'closed',
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
			if ((attr !== undefined && attr.options !== undefined && attr.options.name == undefined) || attr == undefined) {
				this.attributes.options.name = _generateName();
			}
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
			ask: 'New question',
			type: 'closed'
		}
	});
	applr.Models.Radiobuttons = applr.Models.Base.ClosedQuestion.extend({
		defaults: {
			view: 'Radiobuttons',
			type_title: 'Radio buttons',
			options: {
				style: 'radio button'
			},
			ask: 'New question',
			type: 'closed'
		}
	});
	applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
		defaults: {
			view: 'Textarea',
			type_title: 'Textarea',
			options: {
				limit: _textareaDefaultLimit
			},
			ask: 'New question',
			type: 'open'
		}
	});
	applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
		defaults: {
			view: 'Textfield',
			type_title: 'Textfield',
			options: {
				limit: _textfieldDefaultLimit
			},
			ask: 'New question',
			type: 'open'
		}
	});
	applr.Views.Base.Question = Backbone.View.extend({
		tagName: 'li',
	
		modelAttributes: {},
	
		attributes: {
			class: 'question-line compact'
		},
	
		defaultTemplate: applr.Templates['Base.Question'],
	
		render: function() {
			this.$el.html(this.defaultTemplate(this.model.toJSON()) + this.template(this.model.toJSON()));
			return this;
		},
	
		events: {
			'click .edit-question' : 'editQuestion',
			'click .save-candidate-filter' : 'saveFilter',
			'click .cancel-candidate-filter' : 'cancelFilter',
			'change input[name="ask"]' : 'changeAsk',
			'change input[name="limit"]' : 'changeLimit',
			'click .remove-question' : 'destroyQuestion',
			'drop' : 'dropItem'
		},
	
		toggleEdit: function(e) {
			e.preventDefault();
	
			_editMode = !_editMode;
			_disableSortable();
			$(_options.wrapper).find('.hide-toggle').toggleClass('display-none');
			this.$el.find('.edit-mode').toggleClass('display-none');
			$(_options.wrapper).find('.question-line').toggleClass('compact');
		},
	
		editQuestion: function(e) {
			this.modelAttributes = _.clone(this.model.attributes);
			this.modelAttributes.options = _.clone(this.modelAttributes.options);
	
			if (typeof this.modelAttributes.answers != 'undefined') {
				var clonedAnserwsCollection = new applr.Collections.OptionalQuestions();
				this.modelAttributes.answers.each(function(model) {
					clonedAnserwsCollection.add(new applr.Models.CloseQuestionItem(model.toJSON()));
				});
				this.modelAttributes.answers = clonedAnserwsCollection;
			}
	
			this.toggleEdit(e);
		},
	
		changeAsk: function() {
			var value = this.$el.find('input[name="ask"]').val();
			this.model.set('ask', value);
			this.$el.find('.ask-val').html(this.model.get('ask'));
		},
	
		closeFilter: function(e) {
			this.toggleEdit(e);
			_DefaultQuestionCollectionView.render();
			_OptionalQuestionsCollectionView.render();
			_initSortable();
		},
	
		saveFilter: function(e) {
			this.closeFilter(e);
		},
	
		cancelFilter: function(e) {
			e.preventDefault();
	
			this.model.attributes = this.modelAttributes;
	
			this.closeFilter(e);
		},
	
		changeLimit: function() {
			var value = this.$el.find('input[name="limit"]').val();
			var options = this.model.get('options');
			options.limit = value;
			this.model.set('options', options, {validate : true});
		},
	
		destroyQuestion: function(e) {
			e.preventDefault();
	
			this.model.collection.remove(this.model);
			if (_options.add_type == 'new_fields') {
				_removedQuestionsCollection.add(this.model);
				_disableSortable();
				_OptionalQuestionsCollectionView.render();
				_DefaultQuestionCollectionView.render();
				_initSortable();
			} else if (_options.add_type == 'filter_questions') {
				_OptionalQuestionsCollection.add(this.model);
				this.removeQuestion(e);
			}
		},
	
		removeQuestion: function(event, index) {
			this.$el.remove();
		},
	
		dropItem: function(event, index) {
			if (_options.add_type == 'new_fields') {
				_DefaultQuestionCollection.remove(this.model);
				_OptionalQuestionsCollection.remove(this.model);
			}
	
			this.$el.trigger('update-sort', [this.model, index]);
		}
	});
	applr.Views.Base.OpenQuestion = applr.Views.Base.Question.extend({
		template: applr.Templates.OpenQuestion,
	
		initialize: function() {
			this.listenTo(this.model, 'invalid',  this.onInvalid)
		},
	
		onInvalid: function(model, error) {
			alert(error);
		}
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
	
		addNewField: function(e) {
			e.preventDefault();
	
			var field_type = this.$el.find('select[name="add-new-field-select"]').val();
	
			if (field_type != '0') {
				var model = new applr.Models[field_type]();
				var json = model.toJSON();
				var options = _.clone(json.options);
				model.set('options', options);
	
				_OptionalQuestionsCollection.add(model);
			}
	
			_disableSortable();
			_OptionalQuestionsCollectionView.render();
			_DefaultQuestionCollectionView.render();
			_initSortable();
		}
	});
	applr.Views.DefaultQuestions = Backbone.View.extend({
		tagName: 'div',
	
		events: {
			'update-sort': 'updateSort'
		},
	
		attributes: {
			class: _options.optional_questions_class + ' ' + _options.questions_wrapper_class,
			id: 'applr-default-questions-wrapper'
		},
	
		render: function() {
			this.$el.html(applr.Templates.DefaultQuestions({collection: this.collection.toJSON()}));
			this.$el.append('<ul class="'+_options.question_list_wrapper_class+'" id="applr-default-questions-list"></ul>');
	
			this.collection.each(function(questionModel){
				var View = questionModel.get('view');
				var questionView = new applr.Views[View]({ model: questionModel });
				this.$el.find('ul').append(questionView.render().el);
			}, this);
			return this;
		},
	
		updateSort: function(event, model, position) {
			this.collection.each(function (model, index) {
				var ordinal = index;
				if (index >= position) {
					ordinal += 1;
				}
				model.set('ordinal', ordinal);
			});
	
			model.set('ordinal', position);
			this.collection.add(model, {at: position});
	
			_disableSortable();
			_OptionalQuestionsCollectionView.render();
			_DefaultQuestionCollectionView.render();
			_initSortable();
		}
	});
	applr.Views.Dropdown = applr.Views.Base.ClosedQuestion.extend({
	
	});
	applr.Views.OptionalQuestions = Backbone.View.extend({
		initialize: function() {
			this.listenTo(this.collection, "add", this.addNewItem);
		},
	
		events: {
			'update-sort': 'updateSort'
		},
	
		tagName: 'div',
	
		attributes: {
			class: _options.optional_questions_class + ' ' + _options.questions_wrapper_class,
			id: 'applr-optional-questions-wrapper'
		},
	
		render: function() {
			this.$el.html(applr.Templates.OptionalQuestions({collection: this.collection.toJSON()}));
			this.$el.append('<ul class="'+_options.question_list_wrapper_class+' applr-optional-questions-list" id="applr-optional-questions-list"></ul>');
	
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
		},
	
		updateSort: function(event, model, position) {
			this.collection.each(function (model, index) {
				var ordinal = index;
				if (index >= position) {
					ordinal += 1;
				}
				model.set('ordinal', ordinal);
			});
	
			model.set('ordinal', position);
			this.collection.add(model, {at: position});
	
			_disableSortable();
			_OptionalQuestionsCollectionView.render();
			_DefaultQuestionCollectionView.render();
			_initSortable();
		}
	});
	applr.Views.OptionalQuestionsAdd = Backbone.View.extend({
		initialize: function() {
			this.listenTo(this.collection, "add", this.addItem);
			this.listenTo(this.collection, "remove", this.removeItem);
		},
	
		tagName: 'div',
	
		attributes: {
			class: 'applr-add-optional-field'
		},
	
		template: applr.Templates.OptionalQuestionsAdd,
	
		render: function() {
			this.$el.append('<select id="applr-add-optional-field-select"></select>');
			this.collection.each(function(questionModel){
				var optionView = new applr.Views.OptionalQuestionsAddOption({ model: questionModel });
				this.$el.find('select').append(optionView.render().el);
			}, this);
	
			this.$el.append(this.template());
	
			return this;
		},
	
		events: {
			'click .add-optional-field-button' : 'addOptionalField'
		},
	
		addOptionalField: function(e) {
			e.preventDefault();
	
			var selected_id = $('#applr-add-optional-field-select').val();
			if (selected_id) {
				var model = _OptionalQuestionsCollection.findWhere({id : selected_id});
				_OptionalQuestionsCollection.remove(model);
				_OptionalQuestionsSelectedCollection.add(model);
			}
		},
	
		removeItem: function(model) {
			var id = model.get('id');
			this.$el.find('option[value="'+id+'"]').remove();
			this.$el.find('.select2-chosen').html('Select filter question');
		},
	
		addItem: function(questionModel) {
			var optionView = new applr.Views.OptionalQuestionsAddOption({ model: questionModel });
			this.$el.find('select').append(optionView.render().el);
		}
	});
	applr.Views.OptionalQuestionsAddOption = Backbone.View.extend({
		tagName: 'option',
	
		template: applr.Templates.OptionalQuestionsAddOption,
	
		render: function() {
			this.$el.attr('value', this.model.get('id'));
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	applr.Views.OptionalQuestionsSelected = Backbone.View.extend({
		initialize: function() {
			this.listenTo(this.collection, "add", this.addNewItem);
		},
	
		attributes: {
			class: 'applr-optional-questions-selected'
		},
	
		events: {
			'update-sort': 'updateSort'
		},
	
		template: applr.Templates.OptionalQuestionsSelected,
	
		render: function() {
			this.$el.html(this.template());
			this.$el.append('<ul class="'+_options.question_list_wrapper_class+'" id="applr-optional-selected-questions-list"></ul>');
	
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
		},
	
		updateSort: function(event, model, position) {
			this.collection.remove(model);
	
			this.collection.each(function (model, index) {
				var ordinal = index;
				if (index >= position) {
					ordinal += 1;
				}
				model.set('ordinal', ordinal);
			});
	
			model.set('ordinal', position);
			this.collection.add(model, {at: position});
	
			_disableSortable();
			this.render();
			_initSortable();
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
	
		removeAnswer: function(e) {
			e.preventDefault();
	
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
})();