const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { quotesService } = param; 
    // const { psService } = param; 
    // const { archivesService } = param; 
    // const { publicService } = param; 


    router.get('/', async(req, res, next) => {

        const quoteslist = await quotesService.getList();
        return res.render('quotes', {page: 'Quotes', quoteslist});

    });


    router.get('/ps', async(req, res, next) => {

        const quoteslist = await quotesService.getList();
        const allStories = await quotesService.getAllStories();
        return res.render('quotes/ps', {page: "Philospher's Stone", pslist, stories: allStories});

    });
 


    return router; 
};

