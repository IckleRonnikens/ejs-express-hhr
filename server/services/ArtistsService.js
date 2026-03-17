const fs = require('fs'); 
const util = require('util'); 




const readFile = util.promisify(fs.readFile)

class ArtistsService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).artists;
    }

    async getNames(){
        const data = await this.getData();


        return data.map((artists) => {
            return {name:artists.name, shortname: artists.shortname, aurl:artists.aurl};
        });
    }

    async getList(){
        const data = await this.getData();
        return data.map((artists) => {
            return {name:artists.name, shortname: artists.shortname, summary: artists.summary, aurl:artists.aurl};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((artists) => {
            return {name:artists.name, shortname: artists.shortname, summary: artists.summary, aurl:artists.aurl};
        });
    }

    async getArtists(shortname){
        const data = await this.getData();
        const artists = data.find((artists)=> {
            return artists.shortname === shortname;
        });
        if(!artists) return null;
        
        return {
            name: artists.name,
            shortname: artists.shortname,
            description: artists.description, 
            summary: artists.summary, 
            aurl:artists.aurl
        }
    }

    async getFanartForArtists(shortname){
        const data = await this.getData();
        const artists = data.find((artists) => {
            return artists.shortname === shortname;
        });

        if(!artists || !artists.fanart) return null; 
        return artists.fanart; 
    }

    async getAllFanart(){

        const data = await this.getData();
        const fanarts = data.map((artists) => {
            return artists.fanart;
        });

        var allFanart = [];

        fanarts.forEach(function(element) {

            allFanart.push(...element);
        });
        return allFanart;
    }
}
module.exports = ArtistsService;