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
            return {shortname: projects.shortname, title: projects.title, summary: projects.summary, image: projects.image };
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
            shortname: projects.shortname,
            description: projects.description,
            image: projects.image
        }
    }
}

module.exports = ProjectsService;