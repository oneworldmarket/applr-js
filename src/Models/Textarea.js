applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textarea',
		type_title: 'Textarea',
		options: {
			limit: _textareaDefaultLimit,
			required: false
		},
		ask: 'New question',
		type: 'open'
	}
});