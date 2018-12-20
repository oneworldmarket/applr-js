applr.Models.AddNewField = Backbone.Model.extend({
	defaults: {
		items: function() {
            var types = _.clone(_field_types);

			if (!_options.video_enabled) {
                types = _.filter(types, function(item){
                    if(item.type === "dropdown") {
                        item.childs = _.filter(item.childs, function(child){
                            return child.key !== 'Video';
                        });
                    }
                    return item.key !== 'Video';
                });
			}

			return types;
		}
	}
});