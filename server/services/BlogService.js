const fs = require('fs'); 
const util = require('util');


const readFile = util.promisify(fs.readFile)

class BlogService {
    constructor(datafile){

        this.datafile = datafile;
    }
    async getData(){
        const data = await readFile(this.datafile, 'utf8');
        if(!data) {
            return [];
        }
        return JSON.parse(data).blogs;
    }

    async getList(){
        const data = await this.getData();
        return data.map((blog) => {
            return {shortname: blog.shortname, title: blog.title, author: blog.author, summary: blog.summary, image: blog.image, artwork: blog.artwork, figure: blog.figure, quote: blog.quote};
        });
    }

    async getBlogDetail(shortname){
        const data = await this.getData();
        const blog = data.find((blog)=> {
            return blog.shortname === shortname;
        });
        if(!blog) return null;

        return {
            title: blog.title,
            author: blog.author, 
            shortname: blog.shortname,
            summary: blog.summary,
            introduction: blog.introduction,
            image: blog.image,
            date: blog.date,
            artwork: blog.artwork,
            figure: blog.figure,
            quote: blog.quote
        }
    }
}

module.exports = BlogService;