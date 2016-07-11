module.exports = function(grunt) {
	grunt.initConfig({

		wiredep: {
			task: {
				src: 'index.html'
			}
		}

	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.registerTask('default', ['wiredep']);
}