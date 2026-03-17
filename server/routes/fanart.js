const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { fanartService } = param; 
    const { artistsService } = param; 
    const { sfwService } = param; 
    const { nsfwService } = param; 


    router.get('/', async(req, res, next) => {

        const fanartlist = await fanartService.getList();
        return res.render('fanart', {page: 'Fanart', fanartlist});

    });

    router.get('/artists', async(req, res, next) => {

        const artistslist = await artistsService.getList();
        const allFanart = await artistsService.getAllFanart();
        return res.render('fanart/artists', {page: 'All Artists', artistslist, fanart: allFanart});

    });

 
    router.get('/artists/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(artistsService.getArtists(req.params.name));  
            promises.push(artistsService.getFanartForArtists(req.params.name));  
            const result = await Promise.all(promises)  

            if(!result[0]){
                return next();
            }

            return res.render('fanart/artistsDetail', {
                page: req.params.name, 
                artists: result[0],
                fanart: result[1],
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

