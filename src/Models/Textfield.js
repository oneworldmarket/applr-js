applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textfield',
		options: {
			limit: applr.Defaults.textfieldDefaultLimit
		}
	}
});