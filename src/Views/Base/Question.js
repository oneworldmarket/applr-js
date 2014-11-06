applr.Views.Base.Question = Backbone.View.extend({
	tagName: 'li',

	attributes: {
		class: 'question-line compact'
	},

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
		'click .remove-question' : 'destroyQuestion',
		'drop' : 'dropItem'
	},

	toggleEdit: function(e) {
		e.preventDefault();

		_editMode = !_editMode;
		_disableSortable();
		$(_options.container).find('.hide-toggle').toggleClass('display-none');
		this.$el.find('.edit-mode').toggleClass('display-none');
		$(_options.container).find('.question-line').toggleClass('compact');
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
		_initSortable();
	},

	changeLimit: function() {
		var value = this.$el.find('input[name="limit"]').val();
		var options = this.model.get('options');
		options.limit = value;
		this.model.set('options', options, {validate : true});
	},

	destroyQuestion: function(e) {
		e.preventDefault();

		this.model.collection.remove(this.model);
		if (_options.add_type == 'new_fields') {
			_removedQuestionsCollection.add(this.model);
		} else if (_options.add_type == 'filter_questions') {
			_OptionalQuestionsCollection.add(this.model);
		}
		this.removeQuestion(e);
	},

	removeQuestion: function(event, index) {
		this.$el.remove();
	},

	dropItem: function(event, index) {
		if (_options.add_type == 'new_fields') {
			_DefaultQuestionCollection.remove(this.model);
			_OptionalQuestionsCollection.remove(this.model);
		}

		this.$el.trigger('update-sort', [this.model, index]);
	}
});