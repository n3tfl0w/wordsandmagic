module.exports = function( grunt ) {
    // load time-grunt and all grunt plugins found in the package.json
    require( 'time-grunt' )( grunt );
    require( 'load-grunt-tasks' )( grunt );
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
            tasks : [ 'cssmin','shell:jekyllBuild' ],
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-shell');

    // register custom grunt tasks
    grunt.registerTask( 'lintcheck', [ 'cssmin','csslint', 'shell:jekyllBuild' ] )
    grunt.registerTask( 'dev', [ 'cssmin', 'shell:jekyllBuild', 'watch' ] )
    grunt.registerTask( 'deploy', [ 'cssmin', 'shell:jekyllDeploy' ] )
};
