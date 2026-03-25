const fs = require('fs'); 
const util = require('util'); 

const readFile = util.promisify(fs.readFile)

class ArchivesService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).archives;
    }

    async getNames(){
        const data = await this.getData();
        return data.map((archives) => {
            return {name:archives.name, shortname: archives.shortname};
        });

    }

    async getList(){
        const data = await this.getData();
        return data.map((archives) => {
            return {name:archives.name, shortname: archives.shortname, title: archives.title, summary: archives.summary};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((archives) => {
            return {name:archives.name, shortname: archives.shortname, title: archives.title};
        });
    }

    async getArchives(shortname){
        const data = await this.getData();
        const archives = data.find((archives)=> {
            return archives.shortname === shortname;
        });
        if(!archives) return null;

        return {
            title: archives.title,
            name: archives.name,
            shortname: archives.shortname,
            description: archives.description,
        }
    }

    async getScreenshotForArchives(shortname){
        const data = await this.getData();
        const archives = data.find((archives) => {
            return archives.shortname === shortname;
        });

        if(!archives || !archives.screenshot) return null; 
        return archives.screenshot; 
    }

    async getAllScreenshot(){

        const data = await this.getData();
        const screenshots = data.map((archives) => {
            return archives.screenshot;
        });

        var allScreenshot = [];

        screenshots.forEach(function(element) {
            allScreenshot.push(...element);
        });
        
        return allScreenshot;
    }
}

module.exports = ArchivesService;