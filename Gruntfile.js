module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'src/config.js',
					'tmp/templates.js',
					'src/init.js',
					'src/Models/Base/*.js',
					'src/Models/*.js',
					'src/Views/Base/*.js',
					'src/Views/*.js',
					'src/Collections/*.js',
					'src/main.js'
				],
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
			}
		},
		'template-module': {
			compile: {
				options: {
					module: false,
					provider: 'underscore',
					namespace: 'Templates',
					prettify: true,
					processName: function(filename) {
						var filePath = filename.split('/');
						//skip extra path
						filePath.shift(); filePath.shift();
						return filePath.join('.').slice(0, -5);
					},
					amdWrapper: 'var applrTemplates = (function(){'
				},
				files: {
					"tmp/templates.js": ["src/Templates/Base/*.html", "src/Templates/*.html"]
				}
			}
		},
		watch: {
			js: {
				files: [
					'src/*.js',
					'src/Models/**.js',
					'src/Views/**.js',
					'src/Collections/**.js'
				],
				tasks: 'watch-js'
			},
			templates: {
				files: 'src/Templates/**',
				tasks: 'default'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-wrap');
	grunt.loadNpmTasks('grunt-template-module');

	// Default task(s).
	grunt.registerTask('default', ['template-module', 'concat', 'wrap']);
	grunt.registerTask('watch-js', ['concat', 'wrap']);
};