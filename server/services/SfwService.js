const fs = require('fs'); 
const util = require('util'); 

const readFile = util.promisify(fs.readFile)

class SfwService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).sfw;
    }

    async getNames(){
        const data = await this.getData();
        return data.map((sfw) => {
            return {name:sfw.name, shortname: sfw.shortname};
        });

    }

    async getList(){
        const data = await this.getData();
        return data.map((sfw) => {
            return {name:sfw.name, shortname: sfw.shortname, title: sfw.title, summary: sfw.summary};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((sfw) => {
            return {name:sfw.name, shortname: sfw.shortname, title: sfw.title};
        });
    }

    async getSfw(shortname){
        const data = await this.getData();
        const sfw = data.find((sfw)=> {
            return sfw.shortname === shortname;
        });
        if(!sfw) return null;

        return {
            title: sfw.title,
            name: sfw.name,
            shortname: sfw.shortname,
            description: sfw.description,
        }
    }

    async getScreenshotForSfw(shortname){
        const data = await this.getData();
        const sfw = data.find((sfw) => {
            return sfw.shortname === shortname;
        });

        if(!sfw || !sfw.screenshot) return null; 
        return sfw.screenshot; 
    }

    async getAllScreenshot(){

        const data = await this.getData();
        const screenshots = data.map((sfw) => {
            return sfw.screenshot;
        });

        var allScreenshot = [];

        screenshots.forEach(function(element) {
            allScreenshot.push(...element);
        });
        
        return allScreenshot;
    }
}

module.exports = SfwService;