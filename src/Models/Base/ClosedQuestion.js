applr.Models.Base.ClosedQuestion = Backbone.Model.extend({
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
	}
});