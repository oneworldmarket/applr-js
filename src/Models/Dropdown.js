applr.Models.Dropdown = applr.Models.Base.ClosedQuestion.extend({
	defaults: {
		view: 'Dropdown',
		type_title: 'Dropdown',
		options: {
			style: 'dropdown',
			required: true,
			profile_field_id: 0
		},
		ask: 'New question',
		type: 'closed'
	}
});