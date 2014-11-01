applr.Views.OptionalQuestionsAdd = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.addItem);
		this.listenTo(this.collection, "remove", this.removeItem);
	},

	tagName: 'div',

	attributes: {
		class: 'applr-add-optional-field'
	},

	template: applr.Templates.OptionalQuestionsAdd,

	render: function() {
		this.$el.append('<select id="applr-add-optional-field-select"></select>');
		this.collection.each(function(questionModel){
			var optionView = new applr.Views.OptionalQuestionsAddOption({ model: questionModel });
			this.$el.find('select').append(optionView.render().el);
		}, this);

		this.$el.append(this.template());

		return this;
	},

	events: {
		'click .add-optional-field-button' : 'addOptionalField'
	},

	addOptionalField: function(e) {
		e.preventDefault();

		var selected_id = $('#applr-add-optional-field-select').val();
		if (selected_id) {
			var model = _OptionalQuestionsCollection.findWhere({id : selected_id});
			_OptionalQuestionsCollection.remove(model);
			_OptionalQuestionsSelectedCollection.add(model);
		}
	},

	removeItem: function(model) {
		var id = model.get('id');
		this.$el.find('option[value="'+id+'"]').remove();
		this.$el.find('.select2-chosen').html('Select filter question');
	},

	addItem: function(questionModel) {
		var optionView = new applr.Views.OptionalQuestionsAddOption({ model: questionModel });
		this.$el.find('select').append(optionView.render().el);
	}
});