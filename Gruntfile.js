module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: true
                },
            }
        },
        jshint: {
            options: {
                globals: {
                    jQuery: true
                }
            },
            src_files: ['Gruntfile.js', '/static/js/*.js'],
            local: {
                options: {
                    reporter: require('jshint-html-reporter'),
                    reporterOutput: 'jshint.html'
                },
                src: ["<%= jshint.src_files %>"]
            },
            jenkins: {
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: 'jshint.xml'
                },
                src: ["<%= jshint.src_files %>"]
            }
        },
        copy: {
            main: {
                files: [{
                    src: './node_modules/knockout/build/output/knockout-latest.js',
                    dest: './static/vendors/knockout.js',
                    filter: 'isFile'
                }, {
                    src: './node_modules/jquery/dist/jquery.js',
                    dest: './static/vendors/jquery.js',
                    filter: 'isFile'
                }, {
                    src: './node_modules/bootstrap/dist/css/bootstrap.css',
                    dest: './static/vendors/bootstrap.css',
                    filter: 'isFile'
                }],
            },
        },

    })
    ;
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('lint', ['jshint:jenkins']);
    grunt.registerTask('lint-local', ['jshint:local']);
};
