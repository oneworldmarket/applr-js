applr.Models.Base.ClosedQuestion = Backbone.Model.extend({
	defaults: {
		type: 'close'
	},

	answersCollection: {},

	initialize: function(attr) {
		this.answersCollection = new applr.Collections.OptionalQuestions();

		if (attr.answers != null && attr.answers.length > 0) {
			_.each(attr.answers, function(el) {
				var model = new applr.Models.CloseQuestionItem(el);
				this.answersCollection.add(model);
			}, this);
		} else {
			var model = new applr.Models.CloseQuestionItem();
			this.answersCollection.add(model);
		}
	}
});