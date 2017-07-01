module.exports = function (grunt) {
    // load time-grunt and all grunt plugins found in the package.json
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        
        cssmin : {
            dist : {
                src : 'css/main.css',
                dest : 'css/main.min.css'
            }
        },

        shell : {
            jekyllDeploy : {
                command : 'glynn'
            },
            jekyllBuild : {
                command : 'jekyll build'
            }
        },
        
        imagemin: {                         // Another target
            dist: {
                options: {                       // Target options
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'pre-images/',                   // Src matches are relative to this path
                    src: '*.{png,jpg,gif}',   // Actual patterns to match
                    dest: 'images/'                  // Destination path prefix
                }]
            }
        },
        'ftp-sync': {
            build: {
                auth: {
                    host: 'wordsandmagic.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: '_site/',
                dest: '/public_html/wordsandmagic.com/',
                exclusions: ['pre-images/**/*'],
                forceVerbose: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-ftp-sync');

    // register custom grunt tasks
    grunt.registerTask('lintcheck', [ 'cssmin', 'csslint', 'shell:jekyllBuild' ]);
    grunt.registerTask('dev-buddy', [ 'cssmin', 'newer:imagemin' ]);
    grunt.registerTask('dev', [ 'cssmin', 'newer:imagemin', 'shell:jekyllBuild' ]);
    grunt.registerTask('deploy', [ 'cssmin', 'ftp-sync']);
};
