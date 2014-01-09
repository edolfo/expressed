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
        }
    });

    grunt.registerTask('server', ['nodemon']);
};
