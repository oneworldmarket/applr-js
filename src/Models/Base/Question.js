applr.Models.Base.Question = Backbone.Model.extend({
    initialize: function(attr) {
        if ((attr !== undefined && attr.options !== undefined && attr.options.name == undefined) || attr == undefined) {
            this.attributes.options.name = _generateName();
        }
    }
});