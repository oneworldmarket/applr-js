applr.Views.OptionalQuestionsAdd = Backbone.View.extend({
	tagName: 'div',

	attributes: {
		class: 'applr-add-optional-field'
	},

	template: applr.Templates.OptionalQuestionsAdd,

	render: function() {
		this.$el.append('<select></select>');
		this.collection.each(function(questionModel){
			var optionView = new applr.Views.OptionalQuestionsAddOption({ model: questionModel });
			this.$el.find('select').append(optionView.render().el);
		}, this);

		this.$el.append(this.template());

		return this;
	}
});