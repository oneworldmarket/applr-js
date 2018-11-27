applr.Views.AddNewField = Backbone.View.extend({
	tagName: 'div',

	template: applr.Templates.AddNewField,

	attributes: function() {
		return {class: _options.add_new_field_wrapper_class + ' hide-toggle'};
	},

	render: function() {
		var html = this.template(this.model.toJSON());
		this.$el.html(html);

        $(document).on('click', '.dropdown-submenu a.item', function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).next('ul').toggle();
            $(this).toggleClass('open');
        });
        this.$el.on('click', '.dropdown', function(e){
        	if($(this).hasClass('system-open')){
        		e.preventDefault();
        		e.stopPropagation();
                $(this).removeClass('system-open');
			}
        });
		return this;
	},

	events: {
		'click .add-new-field-select' : 'addNewField'
	},

	addNewField: function(e) {
		e.preventDefault();

		var field_type = $(e.target).data('value');

        if (field_type === '') {
        	return false;
        }

		var model = new applr.Models[field_type](),
			json = model.toJSON(),
			options = _.clone(json.options);

		model.set('options', options);

		_OptionalQuestionsCollection.add(model);


		_disableSortable();
		_OptionalQuestionsCollectionView.render();
		_DefaultQuestionCollectionView.render();
		_initSortable();

		if(model !== false) {
            $('#question-form-' + model.get('domID')).addClass('new').find('.edit-question').click();
        }
        $('.dropdown').removeClass('open system-open');
	}
});