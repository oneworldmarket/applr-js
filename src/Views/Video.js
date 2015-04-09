applr.Views.Video = applr.Views.Base.Question.extend({
    template: applr.Templates.Video,

    initialize: function() {
        this.listenTo(this.model, 'invalid',  this.onInvalid)
    },

    onInvalid: function(model, error) {
        alert(error);
    },

    render: function() {
        this.$el.html(this.defaultTemplate(this.model.toJSON()) + this.template(this.model.toJSON()));
        if (typeof _options.on_select_render == 'function') {
            _options.on_select_render(this.$el.find('select'));
        }
        return this;
    }
});