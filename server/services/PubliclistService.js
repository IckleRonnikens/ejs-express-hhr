const fs = require('fs'); 
const util = require('util'); 

const readFile = util.promisify(fs.readFile)

class PubliclistService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).publiclist;
    }

    async getNames(){
        const data = await this.getData();
        return data.map((publiclist) => {
            return {name:publiclist.name, shortname: publiclist.shortname};
        });

    }

    async getList(){
        const data = await this.getData();
        return data.map((publiclist) => {
            return {name:publiclist.name, shortname: publiclist.shortname, title: publiclist.title, summary: publiclist.summary};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((publiclist) => {
            return {name:publiclist.name, shortname: publiclist.shortname, title: publiclist.title};
        });
    }

    async getPubliclist(shortname){
        const data = await this.getData();
        const publiclist = data.find((publiclist)=> {
            return publiclist.shortname === shortname;
        });
        if(!publiclist) return null;

        return {
            title: publiclist.title,
            name: publiclist.name,
            shortname: publiclist.shortname,
            description: publiclist.description,
        }
    }

    async getScreenshotForPubliclist(shortname){
        const data = await this.getData();
        const publiclist = data.find((publiclist) => {
            return publiclist.shortname === shortname;
        });

        if(!publiclist || !publiclist.screenshot) return null; 
        return publiclist.screenshot; 
    }

    async getAllScreenshot(){

        const data = await this.getData();
        const screenshots = data.map((publiclist) => {
            return publiclist.screenshot;
        });

        var allScreenshot = [];

        screenshots.forEach(function(element) {
            allScreenshot.push(...element);
        });
        
        return allScreenshot;
    }
}

module.exports = PubliclistService;