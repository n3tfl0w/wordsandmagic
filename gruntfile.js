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
        responsive_images: {
            myTask: {
                options: {
                  customIn: ['-sampling-factor', '4:2:0','-interlace', 'line', '-strip'],
                  engine: "im",
                  sizes: [{ name: 'small', width: 320, quality: 85 },{ name: 'medium', width: 640, quality: 85 },{ name: 'large', width: 1298, quality: 85 },{ name: 'orig', width: 1398, rename: false, quality: 85 }]
                },
                files: [{
                  expand: true,
                  src: ['**.{jpg,gif,png}'],
                  cwd: 'images/',
                  dest: '_site/images/'
                }]
            }
        },
        responsive_images_extender: {
          target: {
              options: {
            baseDir: '_site',
            srcAttribute: 'smallest',
            ignore: ['.icons', '.logo', 'figure img', 'iframe img', '.avatar', '.external']
            },
              files: [{
                  expand: true,
                  src: ['**/*.{html,htm,php}'],
            cwd: '_site/',
                  dest: '_site/'
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
              authKey: "wam",
              dest: '/public_html/wordsandmagic.com/',
              incrementalUpdates: true,
              debug: true // Show JSFTP Debugging information
            },
            files: [
              {expand: true, cwd: '.', src: ['_site/**'], dest: './'}
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
    grunt.loadNpmTasks('grunt-responsive-images-extender');

    // register custom grunt tasks
    grunt.registerTask('lintcheck', [ 'cssmin', 'csslint', 'shell:jekyllBuild' ]);
    grunt.registerTask('dev-buddy', [ 'cssmin', 'responsive_images' ]);
    grunt.registerTask('dev', [ 'cssmin', 'newer:imagemin', 'shell:jekyllBuild' ]);
    grunt.registerTask('deploy', [ 'cssmin', 'ftp-sync']);
    grunt.registerTask('deploy-buddy', [ 'cssmin', 'ftp_push:wam' ]);
    grunt.registerTask('imgres-buddy', [ 'cssmin', 'responsive_images_extender']);
};
