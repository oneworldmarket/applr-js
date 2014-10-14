applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textarea',
		options: {
			limit: applr.Defaults.textareaDefaultLimit
		}
	}
});