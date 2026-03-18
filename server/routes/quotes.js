const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { quotesService } = param; 
    // const { writersService } = param; 
    // const { archivesService } = param; 
    // const { publicService } = param; 


    router.get('/', async(req, res, next) => {

        const quoteslist = await quotesService.getList();
        return res.render('quotes', {page: 'Quotes', quoteslist});

    });



 


    return router; 
};

