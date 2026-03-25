const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { fanfictionService } = param; 
    const { writersService } = param; 
    const { archivesService } = param; 
    const { publiclistService } = param; 


    router.get('/', async(req, res, next) => {

        const fanfictionlist = await fanfictionService.getList();
        return res.render('fanfiction', {page: 'Fanfiction', fanfictionlist});

    });

    router.get('/writers', async(req, res, next) => {

        const writerslist = await writersService.getList();
        const allStories = await writersService.getAllStories();
        return res.render('fanfiction/writers', {page: 'All Writers', writerslist, stories: allStories});

    });

 
    router.get('/writers/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(writersService.getWriters(req.params.name));  
            promises.push(writersService.getStoriesForWriters(req.params.name));  
            const result = await Promise.all(promises)  

            if(!result[0]){
                return next();
            }

            return res.render('fanfiction/writersDetail', {
                page: req.params.name, 
                writers: result[0],
                stories: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    router.get('/archives', async(req, res, next) => {


        const archiveslist = await archivesService.getList();
        const allScreenshot = await archivesService.getAllScreenshot();
        return res.render('fanfiction/archives', {page: 'Archives', archiveslist, screenshot: allScreenshot});

    });

    router.get('/publiclist', async(req, res, next) => {


        const publiclistlist = await publiclistService.getList();
        const allScreenshot = await publiclistService.getAllScreenshot();
        return res.render('fanfiction/publiclist', {page: 'Publiclist', publiclistlist, screenshot: allScreenshot});

    });
 


    return router; 
};

