const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');


const createErrors = require('http-errors');
const routes = require('./routes/routes');
const configs = require('./config'); 


const AboutService = require('./services/AboutService');  
const ArtistsService = require('./services/ArtistsService');  
const BlogService = require('./services/BlogService'); 
const GamerService = require('./services/GamerService');  
const FanartService = require('./services/FanartService');  
const FanfictionService = require('./services/FanfictionService');  
const FeedbackService = require('./services/FeedbackService');  
const GotyService = require('./services/GotyService'); 
const GalleryService = require('./services/GalleryService'); 
const SfwService = require('./services/SfwService'); 
const NsfwService = require('./services/NsfwService'); 
const WritersService = require('./services/WritersService');  



const app = express(); 
const config = configs[app.get('env')];  
const PORT = process.env.PORT || 3000;


const aboutService = new AboutService(config.data.about);  
const artistsService = new ArtistsService(config.data.artists);  
const blogService = new BlogService(config.data.blog);  
const gamerService = new GamerService(config.data.gamers);  
const fanartService = new FanartService(config.data.fanart);  
const fanfictionService = new FanfictionService(config.data.fanfiction);  
const feedbackService = new FeedbackService(config.data.feedback);  
const gotyService = new GotyService(config.data.goty);  
const galleryService = new GalleryService(config.data.gallery);  
const sfwService = new SfwService(config.data.sfw);  
const nsfwService = new NsfwService(config.data.nsfw);  
const writersService = new WritersService(config.data.writers);  



app.set('view engine', 'ejs');
if(app.get('env') === 'development'){
    app.locals.pretty = true;
}

app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico', (req, res, next) => {
    return res.sendStatus(204); 
});

app.use(async (req, res, next) => {
    try {
        const names = await gamerService.getNames();
        res.locals.gamerNames = names;
        return next();
    }catch(err){
        return next(err);
    }
});

app.use('/', routes({
    aboutService: aboutService,
    artistsService: artistsService,
    blogService: blogService,
    gamerService: gamerService,
    fanartService: fanartService,
    fanfictionService: fanfictionService,
    feedbackService: feedbackService,
    gotyService: gotyService,
    galleryService: galleryService,
    sfwService: sfwService,
    nsfwService: nsfwService,
    writersService: writersService
}));



app.use((req, res, next) => {
    return next(createErrors(404, 'File not found'))
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === "development" ? err : {};
    res.status(status);
    return res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.export = app; 


