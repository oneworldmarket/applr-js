module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: ['src/init.js', 'src/Models/*.js', 'src/Views/*.js', 'src/main.js'],
				dest: 'applr.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['concat']);
};