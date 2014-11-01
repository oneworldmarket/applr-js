applr.Views.OptionalQuestionsSelected = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.addNewItem);
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
	}
});