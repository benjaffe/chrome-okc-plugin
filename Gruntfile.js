module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
    compress: {
      zip: {
        options: {
          archive: './<%= pkg.version =%>.zip',
          mode: 'zip'
        },
        files: {
          { src: './plugin/**'}
        }
      }
    }
  });

  // Load the plugins
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  
  // Default task(s).
  grunt.registerTask('default', ['compress']);

};