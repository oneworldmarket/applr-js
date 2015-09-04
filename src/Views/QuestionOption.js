applr.Views.QuestionOption = Backbone.View.extend({
	initialize: function(){
		this.model.on('destroy', this.remove, this);
	},

	tagName: 'tr',

	template: applr.Templates.QuestionOption,

	render: function() {
		this.model.set('domID', Math.random().toString(36).slice(2));

		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	events: {
		'click .remove-answer' : 'removeAnswer',
		'change input' : 'updateData'
	},

	updateData: function() {
		this.model.set('answer', this.$el.find('input[name="answer"]').val());
		this.model.set('reject', this.$el.find('input[name="reject"]').is(':checked'));
	},

	removeAnswer: function(e) {
		e.preventDefault();

		this.model.destroy();
	},

	remove: function(){
		this.$el.remove();
	}
});