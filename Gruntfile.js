module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: ['src/init.js', 'src/Templates/*.js', 'src/Models/*.js', 'src/Views/*.js', 'src/Collections/*.js', 'src/main.js'],
				dest: 'applr.js'
			}
		},
		watch: {
			src: {
				files: 'src/**',
				tasks: 'default'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['concat']);
};