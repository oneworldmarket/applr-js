applr.Models.AddNewField = Backbone.Model.extend({
	defaults: {
		items: function() {
            var result = _.clone(_field_types);

			if (_options.video_enabled) {
                result['Video'] = 'Video';
			}

			return result;
		}
	}
});