type Config = {
    db: string
    port: number
    resetEndpoint: string
    removeEndpoint: string
}

let config = require('../config.json') as Config
export default config