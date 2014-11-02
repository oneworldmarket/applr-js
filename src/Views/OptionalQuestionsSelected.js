applr.Views.OptionalQuestionsSelected = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.addNewItem);
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