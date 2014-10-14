applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		options: {
			limit: applr.Defaults.textareaDefaultLimit
		}
	}
});