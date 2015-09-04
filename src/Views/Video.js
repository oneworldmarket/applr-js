applr.Views.Video = applr.Views.Base.Question.extend({
    template: applr.Templates.Video,

    initialize: function() {
        this.listenTo(this.model, 'invalid',  this.onInvalid)
    },

    onInvalid: function(model, error) {
        alert(error);
    },

    render: function() {
        this.model.set('domID', Math.random().toString(36).slice(2));

        this.$el.html(this.defaultTemplate(this.model.toJSON()) + this.template(this.model.toJSON()));
        return this;
    }
});