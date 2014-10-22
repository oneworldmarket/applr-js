applr.Views.Base.Question = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'destroy', this.removeQuestion);
	},

	tagName: 'li',

	defaultTemplate: applr.Templates['Base.Question'],

	render: function() {
		this.$el.html(this.defaultTemplate(this.model.toJSON()) + this.template(this.model.toJSON()));
		return this;
	},

	events: {
		'click .edit-question' : 'toggleEdit',
		'click .save-candidate-filter' : 'saveFilter',
		'change input[name="ask"]' : 'changeAsk',
		'change input[name="limit"]' : 'changeLimit',
		'click .remove-question' : 'destroyQuestion'
	},

	toggleEdit: function(e) {
		e.preventDefault();

		_editMode = !_editMode;
		$(_options.container).find('.hide-toggle').toggleClass('display-none');
		this.$el.find('.edit-mode').toggleClass('display-none');
	},

	changeAsk: function() {
		var value = this.$el.find('input[name="ask"]').val();
		this.model.set('ask', value);
		this.$el.find('.ask-val').html(this.model.get('ask'));
	},

	saveFilter: function(e) {
		this.toggleEdit(e);
		_DefaultQuestionCollectionView.render();
		_OptionalQuestionsCollectionView.render();
	},

	changeLimit: function() {
		var value = this.$el.find('input[name="limit"]').val();
		var options = this.model.get('options');
		options.limit = value;
		this.model.set('options', options);
	},

	destroyQuestion: function(e) {
		e.preventDefault();

		this.model.destroy();
	},

	removeQuestion: function() {
		this.$el.remove();
	}
});