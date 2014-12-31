'use strict';

var path      = require('path');

module.exports = function( grunt ) {
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		/*
		 * Copy files to a temp dir
		 */
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd:    'app/',
						src:    ['**'],
						dest:   'dist/'
					}
				]
			},
			
		},

		/*
		 * Optimize modules using requirejs
		 */
		requirejs: {
			build: {
				options: {
					baseUrl:                 'app',
					mainConfigFile:          'app/scripts/app.js',
					name:                    'app',
					out:                     'dist/scripts/app.js',
					logLevel:                0,
					optimize:                'uglify',
					optimizeCss:             'none',
					removeCombined:          true,
					preserveLicenseComments: false,
					findNestedDependencies:  true,
				}
			}
		},

		/**
		 * Sass
		 */
		sass: {
			dist: {
			  options: {
			    style: 'expanded'
			  },
			  files: {
			    'app/css/terrain.css': 'app/css/terrain.scss', 
			  }
			}
		},

		/*
		 * Remove the temp & build directories
		 */
		clean: {
			// build: { src: [''] },
			scripts: { src: [
				'dist/scripts/routes',
				'dist/css/terrain',
				'dist/css/_default_settings.scss',
				'dist/css/terrain.scss',
				] }
		},

	});


	/*
	 * Tasks!
	 * Run `grunt [task]` from the project root directory.
	 */
	grunt.registerTask( 'default', ['sass', 'copy', 'requirejs', 'clean'] );


	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
};