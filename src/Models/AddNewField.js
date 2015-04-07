applr.Models.AddNewField = Backbone.Model.extend({
	defaults: {
		items: function() {
			if (_options.video_enabled) {
				return _.extend(_field_types, {
					'Video': 'Video'
				});
			}
			return _field_types;
		}
	}
});