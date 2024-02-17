const resultado     = document.getElementById( "resultado"      );
const submitButton  = document.getElementById( "submit-button"  );

let activity;
let age;
let height;
let weight;

submitButton.addEventListener(
    "click",
    ()=>{
        showResult();
        
        if( ! validate() ){
            vanishResult();

            return;
        }
    }
);

function validate(){
    if( ! ( activity  = document.getElementById( "actividad"  ) ).value ){
        activity.className = "form-control input-no-content";

        showErrorMessage( "You have to place the intencity of your activity." );

        return false;
    }

    if( ! ( age  = document.getElementById( "edad"  ) ).value ){
        age.className = "form-control input-no-content";

        showErrorMessage( "You have to place your age." );

        return false;
    }

    if( ! ( height  = document.getElementById( "altura"  ) ).value ){
        age.className = "form-control input-no-content";

        showErrorMessage( "You have to place your height." );

        return false;
    }

    if( ! ( weight  = document.getElementById( "peso"  ) ).value ){
        age.className = "form-control input-no-content";

        showErrorMessage( "You have to place your weight." );

        return false;
    }

    return true;
}

function calcularCalorias(){
    const multiplicadorTMB = {
        peso    : 10,
        altura  : 6.25,
        edad    : 5
    }

    let calories;

        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5

        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161

    
    totalCalories.value = `${ Math.floor( calories ) } kcal`;
    
    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${ totalCalories } kcal" style="font-size: 2rem" disabled>
            </div>
        </div>
    `
     // Volver a limpiar variables

}

function showErrorMessage( msg ){
    const calculo = document.querySelector( '#calculo' );

    if( calculo ){
        calculo.remove();
    }

    const divError = document.createElement('div');

    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${ msg }</span>`;

    resultado.appendChild( divError );

    setTimeout(
        () => {
            divError.remove();

            vanishResult();
        },
        5000
    );
}


// Animations
function showResult(){
    resultado.style.top     = '100vh';
    resultado.style.display = 'block';
    
    let distancia   = 100;
    let resta       = 0.3;

    let id  = setInterval(
        () => {
            resta               *= 1.1;
            resultado.style.top = `${ distancia - resta }vh`;

            if( resta > 100 ){
                clearInterval( id );
            }
        },
        10
    )
}

function vanishResult(){
    let distancia = 1;

    let id = setInterval(
        () => {
            distancia           *= 2;
            resultado.style.top = `${ distancia }vh`;

            if( distancia > 100 ){
                clearInterval( id );

                resultado.style.display = 'none';
                resultado.style.top     = 0;
            }
        },
        10
    )
}