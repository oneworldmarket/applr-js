applr.Models.Description = applr.Models.Base.OpenQuestion.extend({
    defaults: {
        view: 'Description',
        type_title: 'Description',
        options: {
            label: 'Please, put your text',
            required: false
        },
        ask: '',
        type: 'description'
    }
});