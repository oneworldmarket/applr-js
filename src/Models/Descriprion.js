applr.Models.Description = applr.Models.Base.OpenQuestion.extend({
    defaults: {
        view: 'Description',
        type_title: 'Description',
        options: {
            label: 'Description field',
            required: false
        },
        ask: '',
        type: 'description'
    }
});