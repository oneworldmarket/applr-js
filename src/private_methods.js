//some private functions
var
    _detectQuestionModel = function(el) {
        var result = false;

        if (el.type == 'open') {
            if (el.options.limit > 0 && el.options.limit <= _textfieldMaxLimit) {
                result = 'Textfield';
            } else if (el.options.limit > 0 && el.options.limit <= _textareaMaxLimit && el.options.limit > _textfieldMaxLimit) {
                result = 'Textarea';
            }
        } else if (el.type == 'closed') {
            if (el.options.style == 'dropdown') {
                result = 'Dropdown';
            } else if (el.options.style == 'radio') {
                result = 'Radiobuttons';
            } else if (el.options.style == 'checkbox') {
                result = 'Checkbox';
            }
        } else if (el.type == 'video') {
            result = 'Video';
        } else if (el.type == 'description') {
            result = 'Description';
        } else if (el.type == 'uploadbutton') {
            result = 'Uploadbutton';
        }

        return result;
    },

    _initSortable = function() {
        if (_options.add_type == 'new_fields') {
            $(_sortableElements_new_fields).sortable({
                connectWith: "." + _options.question_list_wrapper_class,
                handle: '.drag-icon',
                placeholder: _options.placeholder_class,
                stop: function(event, ui) {
                    ui.item.trigger('drop', ui.item.index());
                }
            }).disableSelection();
        } else if (_options.add_type == 'filter_questions') {
            $(_sortableElements_filter_questions).sortable({
                handle: '.drag-icon',
                placeholder: _options.placeholder_class,
                stop: function(event, ui) {
                    ui.item.trigger('drop', ui.item.index());
                }
            }).disableSelection();
        }
        _sortableEnabled = true;
    },

    _disableSortable = function() {
        if (_sortableEnabled) {
            var _sortableElements;
            if (_options.add_type == 'new_fields') {
                _sortableElements = _sortableElements_new_fields
            } else if (_options.add_type == 'filter_questions') {
                _sortableElements = _sortableElements_filter_questions;
            }
            $(_sortableElements).sortable('destroy').enableSelection();
        }
        _sortableEnabled = false;
    },

    _initAddNewField = function() {
        _AddNewFieldModel = new applr.Models.AddNewField();
        _AddNewFieldView = new applr.Views.AddNewField({model:_AddNewFieldModel});

        _AddNewFieldView.render().$el.appendTo(_options.container);
    },

    _initSaveSettings = function() {
        _saveSettingsView = new applr.Views.SaveSettings();
        _saveSettingsView.render().$el.appendTo(_options.container);
    },

    _getJSON = function() {
        if (_options.add_type == 'new_fields') {
            return {
                default: _DefaultQuestionCollection.toJSON(),
                optional: _OptionalQuestionsCollection.toJSON(),
                removed: _removedQuestionsCollection.toJSON()
            }
        } else if (_options.add_type == 'filter_questions') {
            return {
                optional_selected: _OptionalQuestionsSelectedCollection.toJSON()
            }
        }
    },

    _saveSettings = function() {
        $.ajax({
            url: _options.save_endpoint,
            dataType: 'json',
            type: 'post',
            data: _getJSON(),
            success:function (resp) {
                if (typeof _options.on_save == 'function') {
                    return _options.on_save(resp);
                }
            },
            error: function() {
                console.log(arguments);
            }
        });
    },

    _generateName = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    _strip_html_tags = function (str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }
;