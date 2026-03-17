const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { writerService } = param; 

    router.get('/', async(req, res, next) => {

        const writerslist = await writerService.getList();
        const allFanart = await writerService.getAllFanart();
        return res.render('writers', {page: 'All Writers', writerslist, fanart: allFanart});

    });

 
    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(writerService.getWriter(req.params.name));  
            promises.push(writerService.getFanartForWriter(req.params.name));  
            const result = await Promise.all(promises)  

            if(!result[0]){
                return next();
            }

            return res.render('writersDetail', {
                page: req.params.name, 
                writer: result[0],
                fanart: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

