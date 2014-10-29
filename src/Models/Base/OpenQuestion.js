applr.Models.Base.OpenQuestion = applr.Models.Base.Question.extend({
	defaults: {
		type: 'open',
		ask: 'New question'
	},

	initialize: function(attr) {
		if (attr !== undefined && attr.options !== undefined && attr.options.name == undefined) {
			this.attributes.options.name = _generateName();
		}
	}
});