applr.Models.Uploadbutton = applr.Models.Base.OpenQuestion.extend({
    defaults: {
        view: 'Uploadbutton',
        type_title: 'Upload button',
        options: {
            disable_label: true,
            required: false
        },
        ask: '',
        type: 'uploadbutton'
    }
});