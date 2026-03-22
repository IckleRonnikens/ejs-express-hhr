const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { projectsService } = param;

    router.get('/', async(req, res, next) => {
        const projectslist = await projectsService.getList();
        return res.render('projects', {page: 'Projects', projectslist});

    });

    router.get('/:name', async(req, res, next) => {

        try {
            const promises = []; 
            promises.push(projectsService.getProjectsDetail(req.params.name)); 
            const result = await Promise.all(promises) 
            console.log(result[0])
            if(!result[0]){
                return next();
            }

            return res.render('projectsDetail', {
                page: req.params.name, 
                projectsDetail: result[0],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

