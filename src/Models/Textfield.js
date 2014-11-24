applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textfield',
		type_title: 'Textfield',
		options: {
			limit: _textfieldDefaultLimit
		},
		ask: 'New question',
		type: 'open'
	}
});