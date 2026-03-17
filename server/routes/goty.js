const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { gamerService } = param; 
    const { gotyService } = param;

    router.get('/', async(req, res, next) => {
        const gamerslist = await gamerService.getList();
        const gotylist = await gotyService.getList();
        const allFanart = await gamerService.getAllFanart();
        return res.render('goty', {page: 'Game of the Year', gamerslist, gotylist, fanart: allFanart});

    });

    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(gotyService.getGotyDetail(req.params.name)); 
            const result = await Promise.all(promises) 
            console.log(result[0])
            if(!result[0]){
                return next();
            }

            return res.render('gotyDetail', {
                page: req.params.name, 
                gotyDetail: result[0],
                fanart: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

