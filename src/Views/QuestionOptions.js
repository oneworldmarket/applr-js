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
	}
});