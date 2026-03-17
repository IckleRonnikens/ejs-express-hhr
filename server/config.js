const path = require('path');
module.exports = {
    development: {
        sitename: 'Harry and Hermione [Development]',
        data: {
            about: path.join(__dirname, 'data/about.json'),
            artists: path.join(__dirname, 'data/artists.json'),
            blog: path.join(__dirname, 'data/blog.json'),
            gamers: path.join(__dirname, 'data/gamers.json'),
            fanart: path.join(__dirname, 'data/fanart.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            goty: path.join(__dirname, 'data/goty.json'),
            gallery: path.join(__dirname, 'data/gallery.json'),
            sfw: path.join(__dirname, 'data/sfw.json'),
            writers: path.join(__dirname, 'data/writers.json')
        }

    },
    production: {
        sitename: 'Harry and Hermione',
        data: {
            about: path.join(__dirname, 'data/about.json'),
            artists: path.join(__dirname, 'data/artists.json'),
            blog: path.join(__dirname, 'data/blog.json'),
            gamers: path.join(__dirname, 'data/gamers.json'),
            fanart: path.join(__dirname, 'data/fanart.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            goty: path.join(__dirname, 'data/goty.json'),
            gallery: path.join(__dirname, 'data/gallery.json'),
            sfw: path.join(__dirname, 'data/sfw.json'),
            writers: path.join(__dirname, 'data/writers.json')
        }
    }
}