applr.Views.OptionalQuestions = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.addNewItem);
	},

	events: {
		'update-sort': 'updateSort'
	},

	tagName: 'div',

	attributes: function() {
		return {
			class: _options.optional_questions_class + ' ' + _options.questions_wrapper_class,
			id: 'applr-optional-questions-wrapper'
		};
	},

	render: function() {
		this.$el.html(applr.Templates.OptionalQuestions({collection: this.collection.toJSON()}));
		this.$el.append('<ul class="'+_options.question_list_wrapper_class+' applr-optional-questions-list" id="applr-optional-questions-list"></ul>');

		this.collection.each(function(questionModel){
			var View = questionModel.get('view');
			console.log(questionModel);
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