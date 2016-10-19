/*
bs3 Atomic assemble generator
Nelson Patrao - 2016
 */
'use strict'

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('_config.yml'),
    watch: {
      assemble: {
        files: ['<%= site.src %>/templates/**/*.hbs'],
        tasks: ['assemble'],
        options: {
          livereload: true,
          interrupt: true,
          debounceDelay: 250
        }
      },
      css: {
        files: ['<%= site.src %>/assets/stylus/*.styl'],
        tasks: ['stylus'],
        options: {
          livereload: true,
          interrupt: true,
          debounceDelay: 250
        }
      },
      js: {
        files: ['<%= site.src %>/assets/js/*.js'],
        tasks: ['uglify'],
        options: {
          livereload: true,
          interrupt: true,
          debounceDelay: 250
        }
      },
      fonts: {
        files: ['<%= site.src %>/assets/fonts/*.{svg,ttf,otf,eot,woff,woff2,svgz}'],
        tasks: ['newer:copy'],
        options: {
          debounceDelay: 250
        }
      },
      images: {
        files: ['<%= site.src %>/assets/img/*.{png,jpg,gif,svg}'],
        tasks: ['newer:imagemin'],
        options: {
          debounceDelay: 250
        }
      }
    },
    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= site.assets %>',
          layout: '<%= site.layout %>',
                            // data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= site.partials %>'
        },
        files: {
          '<%= site.dest %>/': ['<%= site.pages %>/*.hbs']
        }
      }
    },
    stylus: {
      compile: {
        options: {
                      // linenos : true,
                      // paths: ['<%= site.root %>/assets/stylus/'],
          use: [
            require('nib')
          ]
        },
        files: {
          '<%= site.dest %>/css/style.css': '<%= site.src %>/assets/stylus/main.styl' // 1:1 compile
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          '<%= site.dest %>/js/main.min.js': ['<%= site.src %>/assets/js/main.js'],
          '<%= site.dest %>/js/jquery.min.js': ['bower_components/jquery/dist/jquery.js']
        }
      }
    },
    browserSync: {
      bsFiles: {
        src: 'dist/**/*.{html,js,css}'
      },
      options: {
        reloadOnRestart: true,
        notify: false,
        background: true,
        watchTask: true,
        server: {
          baseDir: '.'
                        // directory: true
        },
        startPath: '/dist/',
        open: (grunt.option('open')) ? true : false
      }
    }

  })

            // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-newer')
  grunt.loadNpmTasks('assemble')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-browser-sync')

            // Default task to be run with the "grunt" command.
  grunt.registerTask('default', ['newer:assemble'])
            // Specific tasks to be run with the "grunt" command.
  grunt.registerTask('serve', ['browserSync', 'watch'])
  grunt.registerTask('dist', ['assemble', 'stylus', 'uglify'])
}
