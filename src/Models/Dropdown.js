applr.Models.Dropdown = applr.Models.Base.ClosedQuestion.extend({
	defaults: {
		view: 'Dropdown',
		type_title: 'Dropdown',
		options: {
			style: 'dropdown',
			name: _generateName()
		},
		ask: 'New question',
		type: 'closed'
	}
});