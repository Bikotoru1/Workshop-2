const activity			= document.querySelector    ( 'select[name="activity"]'	);
const calculatorForm	= document.getElementById	( 'calculator-form'			);
const idType			= document.getElementById	( 'id'						);
const result			= document.getElementById	( 'result'					);

activity.addEventListener(
	'click',
	()=>{
		activity.style.color = "black";
	}
)

calculatorForm.addEventListener(
    'submit',
    ( event )=>{
        event.preventDefault();
        
        calcularCalorias();
    }
);

idType.addEventListener(
	'click',
	()=>{
		idType.style.color = "black";
	}
)

function calcularCalorias(){
    const bmtMultipliers ={
        weight  : 10,
        height  : 6.25,
        age		: 5
    }

    showResult();
    
    const age			= document.getElementById   ( 'age'								);
    const height		= document.getElementById   ( 'height'							);
	const idNumber		= document.getElementById	( 'id-number'						);
    const name			= document.getElementById   ( 'name'							);
    const sex			= document.querySelector    ( 'input[name="gender"]:checked'	).value;
    const weight		= document.getElementById   ( 'weight'							);

    if( 
		activity.value == '-1' 
		||
		age.value == '' 
		|| 
		height.value == '' 
		|| 
		idType.value == '-1'
		|| 
		idNumber.value == '' 
		|| 
		name.value == '' 
		|| 
		weight.value == '' 
	){
        if( activity.value == -1 ){
            activity.style.color = "red";
        }

        if( age.value == '' ){
            age.className = "form-control input-no-content";
        }

        if( height.value == '' ){
            height.className = "form-control input-no-content";
        }

        if( idType.value == -1 ){
            idType.style.color = "red";
        }

        if( idNumber.value == '' ){
            idNumber.className = "form-control input-no-content";
        }

        if( weight.value == '' ){
            weight.className = "form-control input-no-content";
        }

        if( name.value == '' ){
            name.className = "form-control input-no-content";
        }

        showErrorMessage( 'All data is requiered.' );

        return;
    }

    let calories = activity.value * ( ( bmtMultipliers.weight * weight.value ) + ( bmtMultipliers.height * height.value ) - ( bmtMultipliers.age * age.value ) + ( sex === 'male' ? 5 : -161 ) );

    //Formula hombres: valor actividad x (10 x weight en kg) + (6,25 × height en cm) - (5 × age en años) + 5

    //Formula mujeres: valor actividad x (10 x weight en kg) + (6,25 × height en cm) - (5 × age en años) - 161
 
    if( calories < 0 ){
        showErrorMessage( 'Calc error.' );

        return;
    }

	result.innerHTML = `
		<div class="card-body d-flex justify-content-center align-items-center h-100" id="calc">
			<h2 class="card-title h2 text-center">Result</h2>
			<div class="card my-3 w-100">
				<p 
					class	="text-center" 
					style	="font-size 2rme"
				>
					The: ${ age.value < 30 ? "Young" : age.value < 60 ? "Adult" : "Elderly" } 
					${ sex == "M" ? "Man" : "Woman" } 
					${ name.value } 
					identified with ${ idType.options[ idType.selectedIndex ].innerText } 
					${ idType.selectedIndex > 1 ? "with the number " : "" }
					${ idNumber.value }, requieres a total of ${ calories } 
					kcal for the sustainment of ${ sex == "M" ? "his" : "her" } BMT.
				</p>
			</div>
		</div>
	`;

    setTimeout(
        ()=>{
            vanishResult();
        }, 
        20000
    );

    calculatorForm.reset();
}

function changeBorder( element ){
    element.style.borderColor = "red";
    element.style.borderWidth = "3px";
}

function showErrorMessage( msg ){
	const calc = document.querySelector( '#calc' );

	if( calc ){
		calc.remove();
	}

    const divError = document.createElement( 'div' );

    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${ msg }</span>`;

    result.appendChild( divError );

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
    result.style.top     = '100vh';
    result.style.display = 'block';

    let distance = 120;

    let id = setInterval(
        ()=>{
            distance           -= 2;
            result.style.top 	= `${ distance }vh`;

            if( distance <= 0 ){
                clearInterval( id );
            }
        }, 
        10
    );
}

function vanishResult(){
    let distance = 0;

    let id = setInterval(
        ()=>{
            distance           += 2;
            result.style.top 	= `${ distance }vh`;

            if( distance >= 120 ){
                clearInterval( id );

                result.style.display = 'none';
            }
        }, 
        10
    );
}