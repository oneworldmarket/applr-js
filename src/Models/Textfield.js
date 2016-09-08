applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textfield',
		type_title: 'Textfield',
		options: {
			limit: _textfieldDefaultLimit,
			required: true,
			profile_field_id: 0
		},
		ask: 'New question',
		type: 'open'
	}
});