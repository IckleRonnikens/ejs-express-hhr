const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { gamerService } = param; 
    const { blogService } = param;

    router.get('/', async(req, res, next) => {
        const gamerslist = await gamerService.getList();
        const bloglist = await blogService.getList();
        const allFanart = await gamerService.getAllFanart();
        return res.render('blog', {page: 'Blogs', gamerslist, bloglist, fanart: allFanart});

    });

    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(blogService.getBlogDetail(req.params.name)); 
            const result = await Promise.all(promises) 
            console.log(result[0])
            if(!result[0]){
                return next();
            }

            return res.render('blogDetail', {
                page: req.params.name, 
                blogDetail: result[0],
                fanart: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

