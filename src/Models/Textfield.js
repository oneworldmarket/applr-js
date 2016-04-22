applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textfield',
		type_title: 'Textfield',
		options: {
			limit: _textfieldDefaultLimit,
			required: false
		},
		ask: 'New question',
		type: 'open'
	}
});