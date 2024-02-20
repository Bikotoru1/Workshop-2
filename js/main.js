const activity			= document.querySelector    ( 'select[name="activity"]'	);
const calculatorForm	= document.getElementById	( 'calculator-form'			);
const idType			= document.getElementById	( 'id'						);
const result			= document.getElementById	( 'result'					);

activity.addEventListener(
	'click',
	()=>{
		activity.style.color = getComputedStyle( activity ).getPropertyValue( '--text-color' );
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
		idType.style.color = getComputedStyle( idType ).getPropertyValue( '--text-color' );
	}
)
//cambio de idioma Al cargar la página

document.addEventListener(
	"DOMContentLoaded",
	 function() {
		// Recuperar el estado del switch desde local storage
		var langSwitch 	= document		.getElementById	( "languageSwitch"	);
		var lang 		= localStorage	.getItem		( "language"		);

		langSwitch.checked = lang === "es";
	}
);
  
function changeLanguage(){
    var langSwitch = document.getElementById( "languageSwitch" );
  
    // Guardar el estado del switch en local storage
    localStorage.setItem("language", langSwitch.checked ? "es" : "en" );
  
    // Redireccionar a la página correspondiente
	window.location.href = langSwitch.checked ? "index_es.html" : "index_en.html";
}

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

	if( ! validateData() ){
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
		<div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calc">
			<div class="card my-3" style="width: 30rem;">
			    <h2 class="card-title h2 text-center mb-4" style="font-size: 3rem;">Result</h2>
				<p 
					class	="text-center card-text p-3"
					style	="font-size 3rme"
				>
					${
						localStorage.getItem( "language" ) == "en"
							? `
								The 
								<span class="value-span">
									${ age.value < 30 ? "Young" : age.value < 60 ? "Adult" : "Elderly" } 
									${ sex == "M" ? "Man" : "Woman" } ${ name.value }
								</span> 
								identified with 
								<span class="value-span">
									${ idType.options[ idType.selectedIndex ].innerText } ${ idType.selectedIndex > 1 ? "with the number " : "" } 
									${ idNumber.value }
								</span>
								, requieres a total of 
								<span class="value-span">
									${ calories } kcal
								</span> 
								for the sustainment of ${ sex == "M" ? "his" : "her" } BMT.
							`
							:`
								${ sex == "M" ? "El" : "La" }
								<span class="value-span">
									${ 
										age.value < 30
											? "Joven" 
											: age.value < 60 
												? sex == "M"
													? "Hombre Adulto"
													: "Mujer Adulta" 
												: sex == "M"
													? "Hombre Anciano"
													: "Mujer Anciana" 
									} 
									${ name.value }
								</span> 
								identificado con 
								<span class="value-span">
									${ idType.options[ idType.selectedIndex ].innerText }
								</span> 
								número
								<span class="value-span">
									${ idNumber.value }
								</span>
								, requiere un total de 
								<span class="value-span">
									${ calories } kcal
								</span> 
								para el sostenimiento de su TBM.
							`
					}
				</p>
			</div>
		</div>
	`;

    setTimeout(
        ()=>{
            vanishResult();
        }, 
        15000
    );

	activity.style.color = 
	idType	.style.color = getComputedStyle( idType ).getPropertyValue( '--text-color' );

	age		.className =
	height	.className =
	idNumber.className =
	weight	.className =
	name	.className = "form-control";

    calculatorForm.reset();
}

function validateData(){
    const age			= document.getElementById( 'age'		);
    const height		= document.getElementById( 'height'		);
	const idNumber		= document.getElementById( 'id-number'	);
    const name			= document.getElementById( 'name'		);
    const weight		= document.getElementById( 'weight'		);

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

        return false;
    }

	return true;
}

function showErrorMessage( msg ){
	const calc = document.querySelector( '#calc' );

	if( calc ){
		calc.remove();
	}

    const divError = document.createElement( 'div' );

    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center" role="alert" style="font-size: 2rem; width: 30rem;">${ msg }</span>`;

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
    result.style.top     =  '120vh';
    result.style.display = 'block';

    let distance = 120;

    let id = setInterval(
        ()=>{
            distance                    -= 2;
            result.style.top 	        = `${ distance }vh`;
            result.style.opacity        = 1 - (distance / 120) ;
            result.style.backdropFilter = `blur( ${ 5 - ( distance / 12 ) }px )`;

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
            distance			        += 2;
            result.style.top	        = `${ distance }vh`;
            result.style.opacity        = 1 - ( distance / 120 );
            result.style.backdropFilter = `blur( ${ 5 + ( distance / 12 ) }px )`;

            if( distance >= 120 ){
                clearInterval( id );

                result.style.display = 'none';
            }
        }, 
        10
    );
}

function toggleTheme(){
    document.documentElement.classList.toggle( 'dark-theme' );

    var themeIcon = document.getElementById( 'theme-icon' );

    themeIcon.src = themeIcon.getAttribute( 'src' ) == 'img/light.png'
        ? 'img/dark.png'
        : 'img/light.png';

    var themeText = document.getElementById( 'theme-text' );

    themeText.innerHTML = themeText.innerHTML == 'Modo Oscuro'
        ? 'Modo Claro'
        : 'Modo Oscuro';
}