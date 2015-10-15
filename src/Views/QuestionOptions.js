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
		'click .add-new-answer': 'addNewAnswer',
		'keypress .question-option': 'keyPressOption'
	},

	addNewAnswer: function(e) {
		e.preventDefault();

		var model = new applr.Models.CloseQuestionItem();
		this.collection.add(model);

		var View = new applr.Views.QuestionOption({ model: model });
		this.$el.find('.option-contents').append(View.render().el);
		$(View.render().el).find('.question-option').focus();
	},

	keyPressOption: function(e) {
		if (e.keyCode == 13) {
			this.addNewAnswer(e);
			return false;
		}
	}
});