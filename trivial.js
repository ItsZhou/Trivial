let CORRECTANSWER = "";
let IDCOUNTDOWN = 0;

const TIMETOANSWER = 5;

window.onload = onLoad;

// Crear arrays asociativo con las preguntas y las respuestas y la respuesta valida.

// Generar pregunta aleatoria.

// Y la muestro en pantalla.

// Definir eventos sobre las tag p de answer.
// Y cuando pulsa, verificar si es correcta la respuesta dada por el usuario contra la información escrita en el array asociativo.

// Respecto al contador del tiempo.
// Crear un bucle que cambie el valor numérico reduciendolo en uno. ( setTimeout o setInterval)
// Controlar cuando llega a 0 para que te indique la respuesta correcta.

// Si la respuesta es correcta, a los 5 segundos o con un botón(clic) te muestra la siguiente pregunta.
// Si la respuesta es fallida, te indica el numero de preguntas acertadas. 

function onLoad() {
    newQuestion();
    defClickAnswers();
    defClickOtraPartida();
    
}

function newQuestion() {
    let arQuestion;
    initTrivial(); 
    arQuestion = getQuestion();
    CORRECTANSWER = arQuestion.correctAnswer;
    showQuestion( arQuestion );
    countDown();
}

function countDown() {
    let node;
    
    node = document.querySelector( ".time" );
    
    if ( parseInt( node.innerText ) === 1 ) {
        node.innerText = parseInt( node.innerText ) - 1;
        highlightCorrectAnswer();
        showMessage("<h1>El tiempo y el juego ha finalizado</h1>");

        // Mostrar mensaje el tiempo finalizo.
    } else { // Reduce el tiempo desde 11 seg a 1.
        node.innerText = parseInt( node.innerText ) - 1;
        IDCOUNTDOWN = setTimeout( countDown, 1000 );
    }
}

function defClickAnswers() {
    let nodesAnswers;
    
    nodesAnswers = document.querySelectorAll( "p.answer" );

    nodesAnswers.forEach( element => {
        element.onclick = onClickAnswerUser;
    });

    /* nodesAnswers[ 0 ].onclick = onClickAnswerUser;
    nodesAnswers[ 1 ].onclick = onClickAnswerUser; */
}

function defClickOtraPartida() {
    let nodeOtraPartida;
    
    document.querySelector( ".overlay > p" ).onclick = onClickOtraPartida;
    
}

function highlightCorrectAnswer ( ) {
    let nodosA;
    nodosA = document.querySelectorAll ( ".answer" );
    nodosA.forEach( element => {
        if ( element.innerText === CORRECTANSWER ) {
            element.classList.add( "correct" );
        }
    });
}

function onClickOtraPartida() {
    newQuestion();
}

function onClickAnswerUser( arQuestion ) {
    if ( this.innerText === CORRECTANSWER ) {
        this.classList.add ( "correct" );
        clearTimeout ( IDCOUNTDOWN );

        setTimeout( newQuestion, 3000 );
       
    } else { // Respuesta fallida.
        this.classList.add ( "incorrect" );
        clearTimeout ( IDCOUNTDOWN );
        highlightCorrectAnswer();
        /* for ( const element of nodosA ) {
            console.log( "for of" );
            if ( element.innerText === CORRECTANSWER ) {
                element.classList.add( "correct" );
                break;
            }
        } */
        showMessage( "<h1>El juego ha finalizado</h1>" );
    }
}

function showMessage( message ) {
    let node = document.querySelector( ".overlay" );

    node.insertAdjacentHTML ( "afterbegin", message );
    //node.innerHTML = message + node.innerHTML;
    node.classList.remove( "hidden" );

}

function initTrivial() {
    let nodosA;
    let nodoTime;
    let nodeOverlay;
    let nodeOverlayH1;
    nodosA = document.querySelectorAll ( ".answer" );

    /* for ( let i = 0; i < nodosA.length; i++ ) {
        nodosA[ i ].classList.remove( "correct" );
    } */
    nodosA.forEach( element => {
        element.classList.remove( "correct" );
        element.classList.remove( "incorrect" );
    });
    // Inicializar el contador de tiempo a su estado inicial( 11 segundos. )
    nodoTime = document.querySelector ( ".time" );
    nodoTime.innerText = TIMETOANSWER;

    nodeOverlay = document.querySelector ( ".overlay" );
    nodeOverlay.classList.add( "hidden" );

    nodeOverlayH1 = document.querySelector ( ".overlay > h1" );
    console.log( "nodeOverlayH1", nodeOverlayH1 );
    if ( nodeOverlayH1 !== null ) {
        nodeOverlay.removeChild( nodeOverlayH1 );
    }
}

function showQuestion( arQuestion ) {
    let nodoQ;      // Tag p de la pregunta.
    let nodosA;     // Tags p de las respuestas.

    nodoQ = document.querySelector ( ".question" );
    console.log( nodoQ );
    /* 
    nodo.innerHTML = arQuestion.question;
    nodo.insertAdjacentHTML( "afterbegin", "Pregunta:" ); 
    */

    nodoQ.innerHTML = arQuestion.question;

    nodosA = document.querySelectorAll ( ".answer" );
    console.log( nodosA );

    /*  
    nodosA[ 0 ].innerText = arQuestion.answerA;
    nodosA[ 1 ].innerText = arQuestion.answerB;
    nodosA[ 2 ].innerText = arQuestion.answerC;
    nodosA[ 3 ].innerText = arQuestion.answerD; */

    //for ( i = 0; i < arQuestion[ "answers" ].length; i++ ) {
    for ( let i = 0; i < arQuestion.answers.length; i++ ) {
        nodosA[ i ].innerText = arQuestion.answers[ i ];
    }
}

function getQuestion() {
    let arQuestions;
    let iQuestion;
    arQuestions = [
            {
                "question"      : "¿Quién descubrió América?",
                /* 
                "answerA"       : "Americo Vespucio",
                "answerB"       : "Colón",
                "answerC"       : "Los Reyes Católicos",
                "answerD"       : "Magallanes",  */
                
                "answers"       : [ "Americo Vespucio", "Colón", "Los Reyes Católicos", "Magallanes" ],
                "correctAnswer" : "Colón"
            },
            {
                "question"      : "¿Quién es el <strong>presidente</strong> actual de EEUU( año:2022 )?",
                "answers"       : [ "Donald Trump", "Barack Obama", "Joe Biden", "Hilary Clinton" ],
                "correctAnswer" : "Joe Biden"
            },
            {
                "question"      : "¿Quién pinto la <strong>Mona-Lisa</strong>?",
                "answers"       : [ "Dalí", "Picasso", "Van Gogh", "Leonardo Da Vinci" ],
                "correctAnswer" : "Leonardo Da Vinci"
            }
    ];  

    iQuestion = getNumberRandom( 0, arQuestions.length - 1 );

    return arQuestions[ iQuestion ];
}

function getNumberRandom( nMin, nMax ) {
    let numRandom;

    numRandom = Math.floor( Math.random() * ( nMax - nMin + 1 ) ) + nMin;
    return numRandom;
}