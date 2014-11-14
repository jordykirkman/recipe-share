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
					// exclude: [ 'jquery', 'handlebars' ],
					// map: {
					// 	'*' : {
					// 		'ember': 'lib/ember.prod',
					// 		'ember-data': 'lib/ember-data-canary.prod'
					// 	}
					// },

					// map: {
					// 	'*': {
					// 		css: 'lib/require/require-css/css'
					// 	}
					// },

					// paths: {
					// 	'jquery': 'empty:',
					// 	'jqueryui': 'empty:',
					// 	'handlebars': 'empty:',
					// 	'ember': 'lib/ember.prod',
					// 	'ember-data': 'lib/ember-data-canary.prod'
					// }
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
				] }
		},

	});


	/*
	 * Tasks!
	 * Run `grunt [task]` from the project root directory.
	 */
	grunt.registerTask( 'default',    ['copy', 'requirejs', 'clean'] );

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
};