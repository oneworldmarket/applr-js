applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textarea',
		type_title: 'Textarea',
		options: {
			limit: applr.Defaults.textareaDefaultLimit
		},
		ask: 'New question',
		type: 'open'
	}
});