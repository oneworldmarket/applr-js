applr.Views.AddNewField = Backbone.View.extend({
	tagName: 'div',

	template: applr.Templates.AddNewField,

	attributes: {
		class: 'applr-add-new-field'
	},

	render: function() {
		var html = this.template(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
});