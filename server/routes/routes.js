
const express = require('express'); 
const aboutRoutes = require('./about'); 
const blogRoutes = require('./blog');
const fanartRoutes = require('./fanart');
const feedbackRoutes = require('./feedback');
const galleryRoutes = require('./gallery');
const gamersRoutes = require('./gamers'); 
const gotyRoutes = require('./goty');
const writersRoutes = require('./writers'); 



const router = express.Router();

module.exports = (param) => {

    const { gamerService } = param; 
    const { writerService } = param; 


    router.get('/', async(req, res, next) => {

        const gamerslist = await gamerService.getListShort();
        const writerslist = await writerService.getListShort();
        return res.render('index', {page: 'Home', gamerslist, writerslist});
        
    });

    router.use('/about', aboutRoutes(param));
    router.use('/gamers', gamersRoutes(param));
    router.use('/fanart', fanartRoutes(param));
    router.use('/feedback', feedbackRoutes(param));
    router.use('/blog', blogRoutes(param));
    router.use('/goty', gotyRoutes(param));
    router.use('/gallery', galleryRoutes(param));
    router.use('/writers', writersRoutes(param));




    return router;
};

