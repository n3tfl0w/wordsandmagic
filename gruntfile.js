module.exports = function (grunt) {
    // load time-grunt and all grunt plugins found in the package.json
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        csslint : {
            test : {
                options : {
                    import : 2
                },
                src : [ 'css/main.css' ]
            }
        },

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

        watch : {
            options: {
                livereload: true
            },
            files : [ '_layouts/*.html',
                      '_posts/*.md',
                      'css/main.css',
                      '_config.yml',
                      'index.html',
                      '404.html' ],
            tasks : [ 'cssmin', 'shell:jekyllBuild'],
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
        'ftp-deploy': {
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

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-ftp-sync');

    // register custom grunt tasks
    grunt.registerTask('lintcheck', [ 'cssmin', 'csslint', 'shell:jekyllBuild' ]);
    grunt.registerTask('dev', [ 'cssmin', 'newer:imagemin', 'shell:jekyllBuild' ]);
    grunt.registerTask('deploy', [ 'cssmin', 'ftp-sync']);
};
