applr.Views.DefaultQuestions = Backbone.View.extend({
	tagName: 'ul',

	render: function() {
		this.collection.each(function(questionMmodel){
			var View = questionMmodel.get('view');
			var questionView = new applr.Views[View]({ model: questionMmodel });
			questionView.render();
			this.$el.append(questionView.el);
		}, this);
	}
});