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
            return {name:writers.name, shortname: writers.shortname, aurl:writers.aurl};
        });
    }

    async getList(){
        const data = await this.getData();
        return data.map((writers) => {
            return {name:writers.name, shortname: writers.shortname, summary: writers.summary, aurl:writers.aurl};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((writers) => {
            return {name:writers.name, shortname: writers.shortname, summary: writers.summary, aurl:writers.aurl};
        });
    }

    async getWriters(shortname){
        const data = await this.getData();
        const writers = data.find((writers)=> {
            return writers.shortname === shortname;
        });
        if(!writers) return null;
        
        return {
            name: writers.name,
            shortname: writers.shortname,
            description: writers.description, 
            summary: writers.summary, 
            aurl:writers.aurl
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
}
module.exports = WritersService;