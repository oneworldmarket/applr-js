applr.Models.Video = applr.Models.Base.Question.extend({
    defaults: {
        view: 'Video',
        type_title: 'Video',
        options: {
            maxtime: _videofieldDefaultLimit
        },
        ask: 'New question',
        type: 'video',
        time_options: _options.video_limit_options
    }
})