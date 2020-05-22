(function () {


    var speakBtn = document.querySelector('#speakbt');
    var resultSpeaker = document.querySelector('#resultSpeak');

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        var myRecognition = new SpeechRecognition();

        myRecognition.lang = 'pt-BR';
        myRecognition.continuous = true;


        var listening;
        speakBtn.addEventListener('click', function () {
            try {

                myRecognition.start();
                listening = setInterval(function () {
                    if (speakBtn.classList.contains("class-white")) {
                        speakBtn.classList.remove("class-white");
                        speakBtn.classList.add("class-navy");
                        return;
                    }
                    speakBtn.classList.remove("class-navy");
                    speakBtn.classList.add("class-white")
                }, 1000)

                resultSpeaker.innerHTML = "Estou te ouvindo!";

            } catch (erro) {
                alert('erro:' + erro.message);
            }

        }, false);

        myRecognition.addEventListener('result', function (evt) {

            var resultSpeak = evt.results[0][0].transcript;

            stopListening(listening);

            console.log(resultSpeak);

            resultSpeaker.innerHTML = resultSpeak;

            switch (resultSpeak.toLowerCase()) {
                case 'clarear':
                    document.body.style.backgroundColor = '#33cc99';
                    break;
                case 'escurecer':
                    document.body.style.backgroundColor = '#047751';
                    break;
            }

            if (resultSpeak.match(/buscar por/)) {

                resultSpeaker.innerHTML = 'Redirecionando...';

                setTimeout(function () {

                    var resultado = resultSpeak.split('buscar por');
                    window.open('https://www.google.com.br/search?q=' + resultado[1]);

                }, 2000);
            }

        }, false);

        myRecognition.addEventListener('error', function (evt) {

            resultSpeaker.innerHTML = 'Se você disse alguma coisa, não ouvi muito bem!';
            stopListening(listening);

        }, false);

    } else {
        resultSpeaker.innerHTML = 'Seu navegador não suporta tanta tecnoligia!';
    }

    function stopListening(listening) {
        clearInterval(listening);
        if (speakBtn.classList.contains("class-white")) {
            speakBtn.classList.remove("class-white");
            speakBtn.classList.add("class-navy");
        }
    }

})();
