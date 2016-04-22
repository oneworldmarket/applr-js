applr.Models.Radiobuttons = applr.Models.Base.ClosedQuestion.extend({
	defaults: {
		view: 'Radiobuttons',
		type_title: 'Radio buttons',
		options: {
			style: 'radio',
			required: true
		},
		ask: 'New question',
		type: 'closed'
	}
});