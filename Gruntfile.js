'use strict';

module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({

     karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    browserify: {
      dev: {
        src: ['app.js'],
        dest: 'build/app_bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['test.js'],
        dest: 'angular_test_bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },

  });

  grunt.registerTask('test',['browserify:test','karma:unit']);
  grunt.registerTask('default','test');
}