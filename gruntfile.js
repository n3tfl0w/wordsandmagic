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
        responsive_images: {
            myTask: {
              options: {
                engine: 'im',
                sizes: [{
                  width: 640,
                },{
                  width: 1298,
                  rename: false,
                  name: 'full',
                }]
              },
              files: [{
                expand: true,
                src: ['**.{jpg,gif,png}'],
                cwd: 'images/',
                dest: 'images/'
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
                forceVerbose: true,
                keepAlive: 90000
            }
        },
        ftp_push: {
          wam: {
            options: {
              host: 'wordsandmagic.com',
              dest: '/public_html/wordsandmagic.com/',
              authKey: "wam",
              incrementalUpdates: true,
              debug: true // Show JSFTP Debugging information
            },
            files: [
              {expand: true, cwd: './', src: ['_site/**']}
            ]
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-ftp-sync');
    grunt.loadNpmTasks('grunt-ftp-push');
    grunt.loadNpmTasks('grunt-responsive-images');

    // register custom grunt tasks
    grunt.registerTask('lintcheck', [ 'cssmin', 'csslint', 'shell:jekyllBuild' ]);
    grunt.registerTask('dev-buddy', [ 'cssmin', 'responsive_images' ]);
    grunt.registerTask('dev', [ 'cssmin', 'newer:imagemin', 'shell:jekyllBuild' ]);
    grunt.registerTask('deploy', [ 'cssmin', 'ftp-sync']);
    grunt.registerTask('deploy-buddy', [ 'cssmin', 'ftp_push:wam']);
};
