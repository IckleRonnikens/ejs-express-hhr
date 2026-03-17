const fs = require('fs'); 
const util = require('util'); 

const readFile = util.promisify(fs.readFile)

class NsfwService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).nsfw;
    }

    async getNames(){
        const data = await this.getData();
        return data.map((nsfw) => {
            return {name:nsfw.name, shortname: nsfw.shortname};
        });

    }

    async getList(){
        const data = await this.getData();
        return data.map((nsfw) => {
            return {name:nsfw.name, shortname: nsfw.shortname, title: nsfw.title, summary: nsfw.summary};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((nsfw) => {
            return {name:nsfw.name, shortname: nsfw.shortname, title: nsfw.title};
        });
    }

    async getNsfw(shortname){
        const data = await this.getData();
        const nsfw = data.find((nsfw)=> {
            return nsfw.shortname === shortname;
        });
        if(!nsfw) return null;

        return {
            title: nsfw.title,
            name: nsfw.name,
            shortname: nsfw.shortname,
            description: nsfw.description,
        }
    }

    async getScreenshotForNsfw(shortname){
        const data = await this.getData();
        const nsfw = data.find((nsfw) => {
            return nsfw.shortname === shortname;
        });

        if(!nsfw || !nsfw.screenshot) return null; 
        return nsfw.screenshot; 
    }

    async getAllScreenshot(){

        const data = await this.getData();
        const screenshots = data.map((nsfw) => {
            return nsfw.screenshot;
        });

        var allScreenshot = [];

        screenshots.forEach(function(element) {
            allScreenshot.push(...element);
        });
        
        return allScreenshot;
    }
}

module.exports = NsfwService;