applr.Models.Textfield = applr.Models.Base.OpenQuestion.extend({
	defaults: {
		view: 'Textfield',
		type_title: 'Textfield',
		options: {
			limit: applr.Defaults.textfieldDefaultLimit,
			name: _generateName()
		},
		ask: 'New question',
		type: 'open'
	}
});