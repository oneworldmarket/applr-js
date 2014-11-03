applr.Views.Base.OpenQuestion = applr.Views.Base.Question.extend({
	template: applr.Templates.OpenQuestion,

	initialize: function() {
		this.listenTo(this.model, 'invalid',  this.onInvalid)
	},

	onInvalid: function(model, error) {
		alert(error);
	}
});