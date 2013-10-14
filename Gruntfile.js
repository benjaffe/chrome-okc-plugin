module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compress: {
      zip: {
        options: {
          archive: './<%= pkg.version %>.zip',
          mode: 'zip'
        },
        files: [
          { src: './plugin/**'}
        ]
      }
    },
    open : {
      dev : {
        path: 'https://chrome.google.com/webstore/developer/edit/cgdblghohnaeeejaoincmbcdkdnodkei',
        app: 'Google Chrome Canary'
      },
      file : {
        path : '/Users/ben/Sites/chrome-okc-plugin'
      }
    },
    watch: {
      scripts: {
        files: ['plugin/manifest.json'],
        tasks: ['package-the-plugin']
      }
    }
  });

  // Load the plugins
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('package-the-plugin', function() {
    var manifestTemp = require('./plugin/manifest.json');
    var packageTemp = require('./package.json');
    packageTemp.version = manifestTemp.version;
    console.log('hi');
    console.log(packageTemp.version);
    var fs = require('fs');
    fs.writeFileSync('./package.json', JSON.stringify(packageTemp,null,2));

    grunt.config('compress.zip.options.archive',packageTemp.version+'.zip');
    grunt.task.run('compress');
    grunt.task.run('open');
  });

  grunt.registerTask('default', []);
};