const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { aboutService } = param; 

    router.get('/', async(req, res, next) => {

        const aboutlist = await aboutService.getList();
        return res.render('about', {page: 'About', aboutlist});

    });

    return router; 
};

