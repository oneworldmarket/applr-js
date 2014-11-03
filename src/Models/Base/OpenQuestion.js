applr.Models.Base.OpenQuestion = applr.Models.Base.Question.extend({
	defaults: {
		type: 'open',
		ask: 'New question'
	},

	initialize: function(attr) {
		if (attr !== undefined && attr.options !== undefined && attr.options.name == undefined) {
			this.attributes.options.name = _generateName();
		}
	},

	validate: function(attrs) {
		//checking limit
		var
			min_limit,
			max_limit
		;
		if (attrs.view == 'Textfield') {
			min_limit = 1;
			max_limit = _textfieldMaxLimit;
		} else if (attrs.view == 'Textarea') {
			min_limit = _textfieldMaxLimit + 1;
			max_limit = _textareaMaxLimit;
		}

		if (attrs.options.limit > max_limit || attr.options.limit < min_limit) {
			return 'Incorrect value for limit field';
		}
	}
});