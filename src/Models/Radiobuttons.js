applr.Models.Radiobuttons = applr.Models.Base.ClosedQuestion.extend({
	defaults: {
		view: 'Radiobuttons',
		type_title: 'Radio buttons',
		options: {
			style: 'radio button',
			name: _generateName()
		},
		ask: 'New question',
		type: 'closed'
	}
});