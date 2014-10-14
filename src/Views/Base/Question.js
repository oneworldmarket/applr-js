applr.Views.Base.Question = Backbone.View.extend({
	tagName: 'li',

	defaultTemplate: applr.Templates.Base.Question,

	render: function() {
		var templateFunction = _.template(this.defaultTemplate + this.template);
		this.$el.html( templateFunction(this.model.toJSON()));
	}
});