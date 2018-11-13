var
	applr = {
		Models: {
			Base: {}
		},
		Views: {
			Base: {}
		},
		Collections: {},
		Templates:  new applrTemplates(),
		Defaults: {

		}
	}
;

//return models and collections also when using toJSON
Backbone.Model.prototype.toJSON = function() {
	var json = _.clone(this.attributes);

	for(var attr in json) {
		if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
			json[attr] = json[attr].toJSON();
		}
	}
	return json;
};