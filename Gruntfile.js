module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                globals: {
                    jQuery: true
                }
            },
            src_files: ['Gruntfile.js', 'app/static/js/*.js'],
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
                    dest: './static/js/knockout.js',
                    filter: 'isFile'
                }],
            },
        },

    })
    ;
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('lint', ['jshint:jenkins']);
    grunt.registerTask('lint-local', ['jshint:local']);
};
