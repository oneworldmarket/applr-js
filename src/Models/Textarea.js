applr.Models.Textarea = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textarea',
		type_title: 'Textarea',
		options: {
			limit: _textareaDefaultLimit,
			required: true,
			profile_field_id: 0
		},
		ask: 'New question',
		type: 'open'
	}
});