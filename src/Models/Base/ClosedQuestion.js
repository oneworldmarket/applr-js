applr.Models.Base.ClosedQuestion = applr.Models.Base.Question.extend({
	defaults: {
		type: 'closed',
		ask: 'New question'
	},

	initialize: function(attr) {
		this.attributes.answers = new applr.Collections.OptionalQuestions();

		if (attr !== undefined && attr.answers !== undefined && attr.answers.length > 0) {
			_.each(attr.answers, function(el) {
				var model = new applr.Models.CloseQuestionItem(el);
				this.attributes.answers.add(model);
			}, this);
		} else {
			var model = new applr.Models.CloseQuestionItem();
			this.attributes.answers.add(model);
		}
		if (attr !== undefined && attr.options !== undefined && attr.options.name == undefined) {
			this.attributes.options.name = _generateName();
		}
	}
});