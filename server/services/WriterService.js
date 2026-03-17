const fs = require('fs'); 
const util = require('util'); 




const readFile = util.promisify(fs.readFile)

class WriterService {

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


        return data.map((writer) => {
            return {name:writer.name, shortname: writer.shortname, aurl:writer.aurl};
        });
    }

    async getList(){
        const data = await this.getData();
        return data.map((writer) => {
            return {name:writer.name, shortname: writer.shortname, summary: writer.summary, aurl:writer.aurl};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((writer) => {
            return {name:writer.name, shortname: writer.shortname, summary: writer.summary, aurl:writer.aurl};
        });
    }

    async getWriter(shortname){
        const data = await this.getData();
        const writer = data.find((writer)=> {
            return writer.shortname === shortname;
        });
        if(!writer) return null;
        
        return {
            name: writer.name,
            shortname: writer.shortname,
            description: writer.description, 
            summary: writer.summary, 
            aurl:writer.aurl
        }
    }

    async getFanartForWriter(shortname){
        const data = await this.getData();
        const writer = data.find((writer) => {
            return writer.shortname === shortname;
        });

        if(!writer || !writer.fanart) return null; 
        return writer.fanart; 
    }

    async getAllFanart(){

        const data = await this.getData();
        const fanarts = data.map((writer) => {
            return writer.fanart;
        });

        var allFanart = [];

        fanarts.forEach(function(element) {

            allFanart.push(...element);
        });
        return allFanart;
    }
}
module.exports = WriterService;