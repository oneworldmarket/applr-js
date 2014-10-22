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