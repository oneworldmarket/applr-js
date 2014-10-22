applr.Models.Base.ClosedQuestion = Backbone.Model.extend({
	defaults: {
		type: 'close',
		ask: 'New question'
	},

	answersCollection: {},

	initialize: function(attr) {
		this.answersCollection = new applr.Collections.OptionalQuestions();

		console.log(attr);
		if (attr !== undefined && attr.answers !== undefined && attr.answers.length > 0) {
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