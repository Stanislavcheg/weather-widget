
module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Настройка для объединения файлов находится тут
            dist: {
                src: [
                    'js/app/**/*.js',  // Конкретный файл
                ],
                dest: 'build/js/production.js',
            }
        },
        uglify: {
            build: {
                src: 'build/js/production.js',
                dest: 'build/js/production.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['js/app/**/*.js'],
                tasks: ['concat', 'uglify']
            }
        },
        notify: {
            default: {
                options: {
                    title: "Task Complete",
                    message: "Your files has been concatanatated and uglified!"
                }
            }
        }
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat','uglify']);

};