const path = require('path');
module.exports = {
    development: {
        sitename: 'Harry and Hermione [Development]',
        data: {
            about: path.join(__dirname, 'data/about.json'),
            blog: path.join(__dirname, 'data/blog.json'),
            credits: path.join(__dirname, 'data/credits.json'),
            privacy: path.join(__dirname, 'data/privacy.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            projects: path.join(__dirname, 'data/projects.json'),
            gallery: path.join(__dirname, 'data/gallery.json'),
            quotes: path.join(__dirname, 'data/quotes.json'),
            fanart: path.join(__dirname, 'data/fanart.json'),
            artists: path.join(__dirname, 'data/artists.json'),
            nsfw: path.join(__dirname, 'data/nsfw.json'),
            sfw: path.join(__dirname, 'data/sfw.json'),
            publiclist: path.join(__dirname, 'data/publiclist.json'),
            archives: path.join(__dirname, 'data/archives.json'),
            fanfiction: path.join(__dirname, 'data/fanfiction.json'),
            writers: path.join(__dirname, 'data/writers.json')
        }

    },
    production: {
        sitename: 'Harry and Hermione',
        data: {
            about: path.join(__dirname, 'data/about.json'),
            blog: path.join(__dirname, 'data/blog.json'),
            credits: path.join(__dirname, 'data/credits.json'),
            quotes: path.join(__dirname, 'data/quotes.json'),
            privacy: path.join(__dirname, 'data/privacy.json'),
            fanart: path.join(__dirname, 'data/fanart.json'),
            artists: path.join(__dirname, 'data/artists.json'),
            nsfw: path.join(__dirname, 'data/nsfw.json'),
            sfw: path.join(__dirname, 'data/sfw.json'),
            publiclist: path.join(__dirname, 'data/publiclist.json'),
            archives: path.join(__dirname, 'data/archives.json'),
            fanfiction: path.join(__dirname, 'data/fanfiction.json'),
            writers: path.join(__dirname, 'data/writers.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            projects: path.join(__dirname, 'data/projects.json'),
            gallery: path.join(__dirname, 'data/gallery.json')

        }
    }
}