const fs = require('fs'); 
const util = require('util'); 




const readFile = util.promisify(fs.readFile)

class WritersService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).writers;
    }

    async getNames(){
        const data = await this.getData();


        return data.map((writers) => {
            return {
                name:writers.name, 
                shortname: writers.shortname, 
                aurl:writers.aurl, 
                furl:writers.furl, 
                summary: writers.summary, 
                introduction:writers.introduction,
                quote:writers.quote,
                quoteby:writers.quoteby,
                suggestions:writers.suggestions
            };
        });
    }

    async getList(){
        const data = await this.getData();
        return data.map((writers) => {
            return {
                name:writers.name, 
                shortname: writers.shortname, 
                aurl:writers.aurl, 
                furl:writers.furl, 
                summary: writers.summary, 
                introduction:writers.introduction,
                quote:writers.quote,
                quoteby:writers.quoteby,
                suggestions:writers.suggestions
            };
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((writers) => {
            return {
                name:writers.name, 
                shortname: writers.shortname, 
                aurl:writers.aurl, 
                furl:writers.furl, 
                summary: writers.summary, 
                introduction:writers.introduction,
                quote:writers.quote,
                quoteby:writers.quoteby,
                suggestions:writers.suggestions
            };
        });
    }

    async getWriters(shortname){
        const data = await this.getData();
        const writers = data.find((writers)=> {
            return writers.shortname === shortname;
        });
        if(!writers) return null;
        
        return {
                name:writers.name, 
                shortname: writers.shortname, 
                aurl:writers.aurl, 
                furl:writers.furl, 
                summary: writers.summary, 
                introduction:writers.introduction,
                quote:writers.quote,
                quoteby:writers.quoteby,
                suggestions:writers.suggestions
        }
    }

    async getStoriesForWriters(shortname){
        const data = await this.getData();
        const writers = data.find((writers) => {
            return writers.shortname === shortname;
        });

        if(!writers || !writers.stories) return null; 
        return writers.stories; 
    }

    async getAllStories(){

        const data = await this.getData();
        const stories = data.map((writers) => {
            return writers.stories;
        });

        var allStories = [];

        stories.forEach(function(element) {

            allStories.push(...element);
        });
        return allStories;
    }


    async getStorieslinksForWriters(shortname){
        const data = await this.getData();
        const writers = data.find((writers) => {
            return writers.shortname === shortname;
        });

        if(!writers || !writers.storieslinks) return null; 
        return writers.storieslinks; 
    }

async getAllStorieslinks() {
    const data = await this.getData();

    const allStorieslinks = [];

    data.forEach(w => {
        allStorieslinks.push(...(w.storieslinks || []));
    });

    return allStorieslinks;
}

}
module.exports = WritersService;