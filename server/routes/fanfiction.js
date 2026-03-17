const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { fanfictionService } = param; 
    const { writersService } = param; 
    const { archivesService } = param; 
    const { publicService } = param; 


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

    router.get('/sfw', async(req, res, next) => {


        const sfwlist = await sfwService.getList();
        const allScreenshot = await sfwService.getAllScreenshot();
        return res.render('fanart/sfw', {page: 'SFW', sfwlist, screenshot: allScreenshot});

    });

    router.get('/nsfw', async(req, res, next) => {


        const nsfwlist = await nsfwService.getList();
        const allScreenshot = await nsfwService.getAllScreenshot();
        return res.render('fanart/nsfw', {page: 'NSFW', nsfwlist, screenshot: allScreenshot});

    });
 


    return router; 
};

