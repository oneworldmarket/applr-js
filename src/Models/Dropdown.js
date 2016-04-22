applr.Models.Dropdown = applr.Models.Base.ClosedQuestion.extend({
	defaults: {
		view: 'Dropdown',
		type_title: 'Dropdown',
		options: {
			style: 'dropdown',
			required: true
		},
		ask: 'New question',
		type: 'closed'
	}
});