const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { privacyService } = param; 

    router.get('/', async(req, res, next) => {

        const privacylist = await privacyService.getList();
        return res.render('privacy', {page: 'Privacy Policy', privacylist});

    });

    return router; 
};

