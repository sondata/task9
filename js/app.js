'use strict';

    var greatQuotes = {
        autors: [
            {
                quote: 'Когато някой казва, че няма никой, значи има някой.',
                name: 'Мечо Пух',
                description: 'Литературен и анимационен герой'
            },
            {
               quote: 'Някои хора казват, че съм ужасен човек, но не е истина...',
                name: 'Стивън Кинг',
                description: '...аз имам сърце на младо момче - в буркан на бюрото ми.'
            },
            {
                quote: 'Казах на момчетата да играят бавно, но бързо.',
                name: 'Димитър Пенев',
                description: 'Треньор №1 по футбол на България за 20-ти век'
            }
        ]
    };

    var errors = 0;

    var countErrors = function () {
        
        if (errors === 3) {
            return error;
        };
        errors++;
    };

    var success = function () {
        
    };

    var error = function () {
        console.log('error');
    };

    function loadTasks() {
        if(greatQuotes.autors) {
            
        };
    }



	(function () {
        // document ready

        loadTasks();
        document.querySelector('.button').onclick = function () {
            countErrors();
            console.log(this);
        }
    })();