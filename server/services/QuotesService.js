const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class QuotesService {
  constructor(datafile) {
    this.datafile = datafile;
  }
  async getList() {
    const data = await this.getData();
    return data;
  }

  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }


    async getList(){
        const data = await this.getData();
        return data.map((ps) => {
            return {
            book: ps.book,
            chapter: ps.chapter, 
            quote: ps.quote,
            shortname: ps.shortname
            };
        });
    }

    async getPs(shortname){
        const data = await this.getData();
        const ps = data.find((ps)=> {
            return ps.shortname === shortname;
        });
        if(!ps) return null;

        return {
            book: ps.book,
            chapter: ps.chapter, 
            quote: ps.quote,
            shortname: ps.shortname
        }
    }
}

module.exports = QuotesService;