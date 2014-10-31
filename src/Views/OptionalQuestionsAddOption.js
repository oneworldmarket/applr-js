applr.Views.OptionalQuestionsAddOption = Backbone.View.extend({
	tagName: 'option',

	template: applr.Templates.OptionalQuestionsAddOption,

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});