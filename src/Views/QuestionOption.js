applr.Views.QuestionOption = Backbone.View.extend({
	tagName: 'tr',

	template: applr.Templates.QuestionOption,

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});