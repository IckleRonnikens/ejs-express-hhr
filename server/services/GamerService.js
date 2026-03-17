const fs = require('fs'); 
const util = require('util'); 




const readFile = util.promisify(fs.readFile)

class GamerService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).gamers;
    }

    async getNames(){
        const data = await this.getData();


        return data.map((gamer) => {
            return {name:gamer.name, shortname: gamer.shortname, gamertag:gamer.gamertag};
        });
    }

    async getList(){
        const data = await this.getData();
        return data.map((gamer) => {
            return {name:gamer.name, shortname: gamer.shortname, title: gamer.title, summary: gamer.summary, gamertag:gamer.gamertag};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((gamer) => {
            return {name:gamer.name, shortname: gamer.shortname, title: gamer.title, summary: gamer.summary, gamertag:gamer.gamertag};
        });
    }

    async getGamer(shortname){
        const data = await this.getData();
        const gamer = data.find((gamer)=> {
            return gamer.shortname === shortname;
        });
        if(!gamer) return null;
        
        return {
            title: gamer.title,
            name: gamer.name,
            shortname: gamer.shortname,
            description: gamer.description, 
            summary: gamer.summary, 
            gamertag:gamer.gamertag
        }
    }

    async getFanartForGamer(shortname){
        const data = await this.getData();
        const gamer = data.find((gamer) => {
            return gamer.shortname === shortname;
        });

        if(!gamer || !gamer.fanart) return null; 
        return gamer.fanart; 
    }

    async getAllFanart(){

        const data = await this.getData();
        const fanarts = data.map((gamer) => {
            return gamer.fanart;
        });

        var allFanart = [];

        fanarts.forEach(function(element) {

            allFanart.push(...element);
        });
        return allFanart;
    }
}
module.exports = GamerService;