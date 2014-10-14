module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: ['src/init.js', 'src/Templates/*.js', 'src/Models/Base/*.js', 'src/Models/*.js', 'src/Views/*.js', 'src/Collections/*.js', 'src/main.js'],
				dest: 'tmp/applr.js'
			}
		},
		wrap: {
			basic: {
				src: 'tmp/applr.js',
				dest: 'applr.js',
				options: {
					wrapper: [';(function(){', '})();'],
					indent: '\t'
				}
			},
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
	grunt.loadNpmTasks('grunt-wrap');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'wrap']);
};