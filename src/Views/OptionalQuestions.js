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