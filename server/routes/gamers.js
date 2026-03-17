const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { gamerService } = param; 

    router.get('/', async(req, res, next) => {

        const gamerslist = await gamerService.getList();
        const allFanart = await gamerService.getAllFanart();
        return res.render('gamers', {page: 'All Gamers', gamerslist, fanart: allFanart});

    });

 
    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(gamerService.getGamer(req.params.name));  
            promises.push(gamerService.getFanartForGamer(req.params.name));  
            const result = await Promise.all(promises)  

            if(!result[0]){
                return next();
            }

            return res.render('gamersDetail', {
                page: req.params.name, 
                gamer: result[0],
                fanart: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

