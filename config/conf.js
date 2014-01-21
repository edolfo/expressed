module.exports = {
    development:{
        db: {
            username: '',
            password: '',
            db: '',
            options: {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                logging: console.log, // either false or a function
                freezeTableName: true,
                omitNull: true,
                sync: { force: true },
                pool: { maxConnections: 1, maxIdleTime: 30},
                syncOnAssociation: true,
                underscored: true,
                native: true
            }
        },
        server: {
            port: 3001,
            host: 'localhost',
            controllers: { directory: 'controllers' },
            models: { directory: 'models' },
            views: {
                directory: 'views',
                engine: 'dustjs-linkedin',
                extension: 'dust'
            },
            assets: { directory: 'public' },
            debug: true
        }
    },
    production: {

    },
    test: {

    }
};