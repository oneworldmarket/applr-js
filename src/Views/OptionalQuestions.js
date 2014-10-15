applr.Views.OptionalQuestions = Backbone.View.extend({
	tagName: 'ul',

	render: function() {
		this.collection.each(function(questionMmodel){
			var View = questionMmodel.get('view');
			var questionView = new applr.Views[View]({ model: questionMmodel });
			this.$el.append(questionView.render().el);
		}, this);
		return this;
	}
});