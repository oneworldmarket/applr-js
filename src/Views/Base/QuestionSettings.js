applr.Views.Base.Question = Backbone.View.extend({
	tagName: 'li',

	defaultTemplate: applr.Templates['Base.Question'],

	render: function() {
		this.$el.html(this.defaultTemplate(this.model.toJSON()) + this.template(this.model.toJSON()));
		return this;
	}
});