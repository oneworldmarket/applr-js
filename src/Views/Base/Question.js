applr.Views.Base.Question = Backbone.View.extend({
	tagName: 'li',

	modelAttributes: {},

	attributes: {
		class: 'question-line compact'
	},

	defaultTemplate: applr.Templates['Base.Question'],

	customFieldsTemplate: applr.Templates['Base.CustomCandFields'],

	render: function() {
		this.model.set('domID', Math.random().toString(36).slice(2));

		this.$el.html(this.defaultTemplate(this.model.toJSON()) + this.template(this.model.toJSON()));
		this.$el.find('.candidate-custom-fields').html(this.customFieldsTemplate(this.model.toJSON()));
		return this;
	},

	events: {
		'click .edit-question' : 'editQuestion',
		'click .save-candidate-filter' : 'saveFilter',
		'click .cancel-candidate-filter' : 'cancelFilter',
		'change input[name="ask"]' : 'changeAsk',
		'change textarea[name="ask"]' : 'changeAsk',
		'change [name="limit"]' : 'changeLimit',
		'change [name="required"]': 'changeRequired',
		'focus [name="custom_field"] next': 'focusCustomField',
		'change [name="custom_field"]': 'changeCustomField',
		'click .remove-question' : 'destroyQuestion',
		'drop' : 'dropItem'
	},

	toggleEdit: function(e) {
		e.preventDefault();

		_editMode = !_editMode;
		_disableSortable();
		$(_options.wrapper).find('.hide-toggle').toggleClass('display-none');
		this.$el.find('.edit-mode').toggleClass('display-none');
		$(_options.wrapper).find('.question-line').toggleClass('compact');

        if (_editMode) {
            if (typeof _options.on_select_render == 'function') {
                _options.on_select_render(this.$el.find('select'));
            }
        }
	},

	editQuestion: function(e) {
        $("#description-field-"+this.model.get('domID')).kendoEditor({
            encoded: false,
            tools: [
                "createLink",
                "bold",
                "italic",
                "underline"
            ]
        });
		this.modelAttributes = _.clone(this.model.attributes);
		this.modelAttributes.options = _.clone(this.modelAttributes.options);

		if (typeof this.modelAttributes.answers != 'undefined') {
			var clonedAnserwsCollection = new applr.Collections.OptionalQuestions();
			this.modelAttributes.answers.each(function(model) {
				clonedAnserwsCollection.add(new applr.Models.CloseQuestionItem(model.toJSON()));
			});
			this.modelAttributes.answers = clonedAnserwsCollection;
		}

		this.toggleEdit(e);
	},

	changeAsk: function() {
		var value = this.$el.find('[name="ask"]').val();
		this.model.set('ask', value);
		if(this.model.attributes.type === 'description') {
            var options = this.model.get('options');
            options.ask_text = _strip_html_tags(this.model.get('ask'));
            options.ask_html = this.model.get('ask');
            options.ask_md = toMarkdown(value);
            this.model.set('ask', 'Description saved in ask_md option');
            this.model.set('options', options);
		}
		this.$el.find('.ask-val').html(this.model.get('ask'));
	},

	changeRequired: function() {
		var value = this.$el.find('input[name="required"]').is(':checked');
		var options = this.model.get('options');
		options.required = value;
		this.model.set('options', options, {validate : true});
	},

	changeCustomField: function() {
		var field = this.$el.find('[name="custom_field"]');
		var value = parseInt(field.val());
		var oldValue = parseInt(field.data('oldvalue'));

		var options = this.model.get('options');
		options.profile_field_id = value;
		this.model.set('options', options, {validate : true});

		field.data('oldvalue', value);

		if (value) {
			_options.used_custom_fields.push(value);
		}

		if (oldValue) {
			_options.used_custom_fields = _.without(_options.used_custom_fields, oldValue);
		}
	},

	closeFilter: function(e) {
		$('#question-form-' + this.model.get('domID')).validationEngine('hide');

		this.toggleEdit(e);
		_DefaultQuestionCollectionView.render();
		_OptionalQuestionsCollectionView.render();
		_initSortable();
	},

	saveFilter: function(e) {
		e.preventDefault();

		if ($('#question-form-' + this.model.get('domID')).validationEngine('validate')) {
			this.closeFilter(e);
            $('.question-form').removeClass('new');
		}
	},

	cancelFilter: function(e) {
		e.preventDefault();

		this.model.attributes = this.modelAttributes;
		var $form = $('#question-form-' + this.model.get('domID'));

		if($form.hasClass('new')){
            $form.find('.remove-question').trigger('click');
            $('.applr-add-new-field .dropdown').addClass('system-open');
		}

		this.closeFilter(e);
	},

	changeLimit: function() {
		var value = this.$el.find('[name="limit"]').val();
		var options = this.model.get('options');
		options.limit = value;
		this.model.set('options', options, {validate : true});
	},

	destroyQuestion: function(e) {
		e.preventDefault();

		this.model.collection.remove(this.model);
		if (_options.add_type == 'new_fields') {
			_removedQuestionsCollection.add(this.model);

            // we should removed question id from used_custom_fields array, when user click to remove link
            _options.used_custom_fields = _.without(_options.used_custom_fields, parseInt(this.model.attributes.options.profile_field_id));

			_disableSortable();
			_OptionalQuestionsCollectionView.render();
			_DefaultQuestionCollectionView.render();
			_initSortable();
		} else if (_options.add_type == 'filter_questions') {
			_OptionalQuestionsCollection.add(this.model);
			this.removeQuestion(e);
		}
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