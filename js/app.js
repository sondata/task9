'use strict';
/* Custom method for String variables */
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

/* Example JSON object */
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
var timer;

var countErrors = function() {
    errors++;
    if (errors === 3) {
        resetCountDown();
        loadTasks();
        return alert('Съжалявам, опитайте пак.');
    } else if (errors < 3) {
        alert('Грешен отговор.');
    };
};

var parseQuote = function(quote) {
    var quoteWords = quote.split(' ');
    var words = quoteWords.map(function(word){

        word = word.replace(/[\wа-я]+/ig, function(hiddenWord){
        
            if(hiddenWord.length == 2){
               hiddenWord = hiddenWord.replaceAt(0, '_'); 
            } else {
                var hiddenWordLength = Math.floor(hiddenWord.length / 2);
                for (var i = 0; i < hiddenWordLength; i++) {
                    var randomValue = Math.random() * Math.floor(hiddenWord.length);
                    if (hiddenWord.charAt(randomValue) == '_') {
                        i--;
                    } else {
                        hiddenWord = hiddenWord.replaceAt(randomValue, '_');
                    };
                };
            }
            return hiddenWord;
        });
        return word;
    });
    return words.join(' ');
};

var answare = function(obj) {
    if (obj.className.search('disable') >= 0) {
        return;
    };
    var elID = obj.rel;

    var rightAnsware = document.getElementById('answare' + elID).value.toLowerCase();
    var userAnsware = document.getElementById('user' + elID).value.toLowerCase();

    if (rightAnsware == userAnsware) {
        alert('Правилно!');
        resetCountDown();
        loadTasks();
    } else {
        countErrors();
    };
};

var resetCountDown = function() {
    clearInterval(timer);
    document.querySelector('.minutes').innerHTML = '01';
    document.querySelector('.seconds').innerHTML = '00';
};

var startCountDown = function(obj) {
    if (obj.className.search('disable') >= 0) {
        return;
    };
    var seconds = 60;

    var elID = obj.rel;
    document.querySelector('#answare-button' + elID).classList.remove('disable');
    document.querySelector('#start-button' + elID).classList.add('disable');
    document.querySelector('#user' + elID).removeAttribute('readonly');

    timer = setInterval(function(){
        document.querySelector('.minutes').innerHTML = '00';
        seconds--;
        var secondsText = seconds.toString();
        if (secondsText.length == 1) {
            secondsText = '0' + secondsText;
        };
        document.querySelector('.seconds').innerHTML = secondsText;
        if (seconds === 0) {
            resetCountDown();
            loadTasks();
            return alert('Времето Ви изтече!');
        };
        
    }, 1000);
};


/* Load HTML via JSON object. No frameworks, just pure JavaScript */
var loadTasks = function () {

    var autors  = greatQuotes.autors;
    var tasks   = document.querySelector('.tasks');

    if(autors.length) {
        tasks.innerHTML = '';
        var elIterator = 0;
        autors.forEach(function(autor){

            var autorQuote = document.createElement('blockquote');
            autorQuote.className = 'autor-quote';
            autorQuote.innerHTML = parseQuote(autor.quote);
            tasks.appendChild(autorQuote);

            var autorName = document.createElement('strong');
            autorQuote.className = 'autor-name';
            autorName.innerHTML = autor.name;
            tasks.appendChild(autorName);

            var autorDescription = document.createElement('div');
            autorDescription.className = 'autor-description';
            autorDescription.innerHTML = autor.description;
            tasks.appendChild(autorDescription);
            
            var hiddenAnsware = document.createElement('input');
            hiddenAnsware.setAttribute('type', 'hidden');
            hiddenAnsware.id = 'answare' + elIterator;
            hiddenAnsware.value = autor.quote;
            tasks.appendChild(hiddenAnsware);

            var userAnsware = document.createElement('textarea');
            userAnsware.className = 'answare-area';
            userAnsware.setAttribute('readonly', true);
            userAnsware.id = 'user' + elIterator;
            tasks.appendChild(userAnsware);


            var startButton = document.createElement('a');
            startButton.className = 'button start';
            startButton.id = 'start-button' + elIterator;
            startButton.setAttribute('rel', elIterator);
            startButton.href = 'javascript:;';
            startButton.innerHTML = 'Старт';
            startButton.onclick = function(){
                startCountDown(this);
            };
            tasks.appendChild(startButton);

            var answareButton = document.createElement('a');
            answareButton.className = 'button answare disable';
            answareButton.setAttribute('rel', elIterator);
            answareButton.id = 'answare-button' + elIterator;
            answareButton.href = 'javascript:;';
            answareButton.innerHTML = 'Отговор';
            answareButton.onclick = function () {
                answare(this);
            }
            tasks.appendChild(answareButton);

            elIterator++;

        });

    };
};



(function () {
    // document ready
    loadTasks();
})();