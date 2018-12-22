module.exports = function(grunt){
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Sass Task
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                  'src/compiled_styles/style.css': 'src/styles.scss'  
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'src/compiled_styles/style-min.css': 'src/styles.scss'
                }
            }
        },
        // Watch Task
        watch: {
            css: {
                files: 'src/app/**/*.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask ('default', ['watch']);
}