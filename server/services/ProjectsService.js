const fs = require('fs'); 
const util = require('util');


const readFile = util.promisify(fs.readFile)

class ProjectsService {
    constructor(datafile){

        this.datafile = datafile;
    }
    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).projects;
    }

    async getList(){
        const data = await this.getData();
        return data.map((projects) => {
            return {
            title: projects.title,
            image: projects.image,
            imgdetail: projects.imgdetail,
            shortname: projects.shortname,
            date: projects.date,
            artwork: projects.artwork,
            creator: projects.creator,
            summary: projects.summary,
            introduction: projects.introduction,
            quote: projects.quote,
            quoteby: projects.quoteby
        };
        });
    }

    async getProjectsDetail(shortname){
        const data = await this.getData();
        const projects = data.find((projects)=> {
            return projects.shortname === shortname;
        });
        if(!projects) return null;

        return {
            title: projects.title,
            image: projects.image,
            imgdetail: projects.imgdetail,
            shortname: projects.shortname,
            date: projects.date,
            artwork: projects.artwork,
            creator: projects.creator,
            summary: projects.summary,
            introduction: projects.introduction,
            quote: projects.quote,
            quoteby: projects.quoteby
        }
    }
}

module.exports = ProjectsService;