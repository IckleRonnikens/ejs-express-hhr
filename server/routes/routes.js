
const express = require('express'); 
const aboutRoutes = require('./about'); 
const blogRoutes = require('./blog');
const fanartRoutes = require('./fanart');
const fanfictionRoutes = require('./fanfiction');
const feedbackRoutes = require('./feedback');
const galleryRoutes = require('./gallery');
const gamersRoutes = require('./gamers'); 
const projectsRoutes = require('./projects');
const privacyRoutes = require('./privacy');
const quotesRoutes = require('./quotes');



const router = express.Router();

module.exports = (param) => {

    const { gamerService } = param; 
    const { writersService } = param; 
    const { artistsService } = param; 


    router.get('/', async(req, res, next) => {

        const gamerslist = await gamerService.getListShort();
        const writerslist = await writersService.getListShort();
        const artistslist = await artistsService.getListShort();
        return res.render('index', {page: 'Home', gamerslist, writerslist, artistslist});
        
    });

    router.use('/about', aboutRoutes(param));
    router.use('/gamers', gamersRoutes(param));
    router.use('/fanart', fanartRoutes(param));
    router.use('/fanfiction', fanfictionRoutes(param));
    router.use('/feedback', feedbackRoutes(param));
    router.use('/blog', blogRoutes(param));
    router.use('/projects', projectsRoutes(param));
    router.use('/gallery', galleryRoutes(param));
    router.use('/privacy', privacyRoutes(param));
    router.use('/quotes', quotesRoutes(param));




    return router;
};

