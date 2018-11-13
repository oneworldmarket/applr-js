applr.Models.Checkbox = applr.Models.Base.ClosedQuestion.extend({
	defaults: {
		view: 'Checkbox',
		type_title: 'Checkbox',
		options: {
			style: 'checkbox',
			required: true,
			profile_field_id: 0
		},
		ask: 'New question',
		type: 'closed'
	}
});