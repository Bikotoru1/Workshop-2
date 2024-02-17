const formularioCalculadora = document.querySelector('#formulario-calculadora');
const resultado = document.querySelector('#resultado');

formularioCalculadora.addEventListener('submit', (e) => {
    e.preventDefault();
    calcularCalorias();
});


function calcularCalorias() {
    aparecerResultado();
    const peso = document.querySelector('#peso').value;
    const altura = document.querySelector('#altura').value;
    const edad = document.querySelector('#edad').value;
    const sexo = document.querySelector('input[name="genero"]:checked').value;

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    const valorActividad = document.querySelector('select[name="actividad"]').value;

    if (peso === '' || altura === '' || edad === '' || valorActividad === '') {
        mostrarMensajeDeError('Todos los campos son obligatorios');
        return;
    }

    if (isNaN(peso) || isNaN(altura) || isNaN(edad)) {
        mostrarMensajeDeError('Todos los campos deben ser números');
        return;
    }

    if (peso <= 0 || altura <= 0 || edad <= 0) {

        mostrarMensajeDeError('Todos los campos deben ser mayores a 0');

        return;

    }

    let calculoCalorias = 0;

    if (sexo === 'hombre') {
        calculoCalorias = valorActividad * ((multiplicadorTMB.peso * peso) + (multiplicadorTMB.altura * altura) - (multiplicadorTMB.edad * edad) + 5);

    } else {
        calculoCalorias = valorActividad * ((multiplicadorTMB.peso * peso) + (multiplicadorTMB.altura * altura) - (multiplicadorTMB.edad * edad) - 161);
    }

    

        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5

        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161

    
    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;
    
    resultado.innerHTML = `
        <div class="alert alert-success text-center mt-3 p-3 rounded" role="alert">
            <strong>Resultado:</strong> ${Math.floor(calculoCalorias)} kcal
        </div>
    `;

    setTimeout(() => {
        desvanecerResultado();
    }

    , 10000);   

    if (calculoCalorias < 0) {
        mostrarMensajeDeError('Error en el cálculo');
        return;
    }

    formularioCalculadora.reset();
}

function mostrarMensajeDeError(msg) {
    resultado.innerHTML = `
        <div class="alert alert-danger text-center mt-4 mb-4 p-2" role="alert">


            <strong>Error!</strong> ${msg}
        </div>

    `;
    setTimeout(() => {
        desvanecerResultado();
    }, 3000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.display = 'block';
    let distancia = 100;

    let id = setInterval(() => {
        distancia -= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia <= 0) {
            clearInterval(id);
        }
    }, 10);
}

function desvanecerResultado() {
    let distancia = 0;

    let id = setInterval(() => {
        distancia += 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia >= 100) {
            clearInterval(id);
            resultado.style.display = 'none';
        }
    }, 10);
}