applr.Views.DefaultQuestions = Backbone.View.extend({
	tagName: 'div',

	attributes: {
		class: _options.optional_questions_class + ' ' + _options.questions_wrapper_class,
		id: 'applr-default-questions-wrapper'
	},

	render: function() {
		this.$el.html(applr.Templates.DefaultQuestions);
		this.$el.append('<ul class="'+_options.question_list_wrapper_class+'" id="applr-default-questions-list"></ul>');

		this.collection.each(function(questionModel){
			var View = questionModel.get('view');
			var questionView = new applr.Views[View]({ model: questionModel });
			this.$el.find('ul').append(questionView.render().el);
		}, this);
		return this;
	}
});