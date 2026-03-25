const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { creditsService } = param; 

    router.get('/', async(req, res, next) => {

        const creditslist = await creditsService.getList();
        return res.render('credits', {page: 'Credits', creditslist});

    });

    return router; 
};

