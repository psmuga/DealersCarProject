import path from 'path'

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: process.env.PORT || 9000,
        ip: process.env.IP || '0.0.0.0',
        apiRoot: process.env.API_ROOT || '/api',
        mongo: {
            options: {
                db: {
                    safe: true
                }
            }
        }
    },
    test: {
        mongo: {
            uri: 'mongodb://localhost/iedb-test',
            options: {
                debug: false
            }
        }
        },
    development: {
        mongo: {
            uri: 'mongodb://localhost/iedb-test',
            options: {
                debug: true
            }
        }
    },
    production: {
        mongo: {
            uri: 'mongodb://localhost/iedb',
            options: {
                debug: false
            }
        }
    }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports