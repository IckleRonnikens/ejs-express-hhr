const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { quotesService } = param; 


    router.get('/', async(req, res, next) => {
        const quoteslist = await quotesService.getList();
        return res.render('quotes', {page: 'Quotes', quoteslist});
    });


    router.get('/ps', async(req, res, next) => {
        const quoteslist = await quotesService.getList();
        return res.render('quotes/ps', {page: "Philospher's Stone", quoteslist });
    });
 


    return router; 
};

