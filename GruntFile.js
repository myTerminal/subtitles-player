/* global module */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "bower_components/jquery/dist/",
                        src: ["jquery.min.js"],
                        dest: "scripts/vendor/"
                    }
                ]
            }
        },
        less: {
            css: {
                files: [
                    {
                        src: ["styles/subtitles-player.less"],
                        dest: "styles/subtitles-player.css"
                    }
                ]
            }
        },
        watch: {
            css: {
                files: "styles/**/*.less",
                tasks: ["less"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask("default", ["build"]);
    grunt.registerTask("build", ["copy", "less"]);
    grunt.registerTask("develop", ["watch"]);
};
