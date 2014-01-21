module.exports = function(grunt){
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); // load all grunt tasks

    grunt.initConfig({
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    nodeArgs: ['--debug'],
                    ignoredFiles: ['node_modules/**'],
                    watchedExtensions: ['js', 'dust'],
                    watchedFolders: ['controllers', 'views', 'models', 'lib'],
                    delayTime: 1,
                    env: {
                        PORT: '3001'
                    },
                    cwd: __dirname
                }
            }
        },
        karma: {
            unit: { configFile: 'tests/config/karma.unit.conf.js' },
            e2e: { configFile: 'tests/config/karma.e2e.conf.js' }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'nyan'
                },
                src: ['tests/server/**/*.js']
            }
        }
    });

    grunt.registerTask('server', ['nodemon']);
};
