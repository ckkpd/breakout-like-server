import Nedb from 'nedb'
import config from './config'

let db = new Nedb({
    filename: config.db,
    timestampData: true
})

db.loadDatabase(e => {
    if(e) {
        console.log(e)
        process.exit(1)
    }
})

export default db