applr.Views.SaveSettings =  Backbone.View.extend({
	attributes: {
		class: 'applr-save-settings hide-toggle goRight'
	},

	template: applr.Templates.SaveSettings,

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	events: {
		'click .save-settings-button' : 'saveSettings'
	},

	saveSettings: function(e) {
		e.preventDefault();
		_saveSettings();
	}
});