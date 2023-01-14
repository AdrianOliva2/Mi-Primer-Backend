let txtLocalidad;
let btnConsultar;
let divTiempo;
let errorTxt;

function obtenerTiempo(e) {
    e.preventDefault();
    if (txtLocalidad.value === "") {
        errorTxt.innerHTML = "";
        let text = document.createTextNode('Primero introduce la localidad');
        errorTxt.appendChild(text);
    } else {
        errorTxt.innerHTML = "";
        //http://localhost:3000/api/weather?loc=${txtLocalidad.value}
        fetch(`http://localhost:3000/api/weather?loc=${txtLocalidad.value}`)
        .then(result => {return result.json();})
        .then(data => {
            if (data === undefined) {
                let text = document.createTextNode('Esa localidad no existe');
                errorTxt.classList.remove('text-danger');
                errorTxt.classList.add('text-warning')
                errorTxt.appendChild(text);
            } else {
                divTiempo.innerHTML = `
                <div class="mt-2 card text-left">
                    <div class="card-body">
                        <h4 class="card-title text-center">${txtLocalidad.value}</h4>
                        <p class="text-center"><img src="${data.current.weather_icons[0]}"/></p>
                        <h4 class="card-title text-center">${data.current.temperature}º</h4>
                    </div>
                </div>
                `;
            }
        })
        .catch(err => {console.log(err);})
    }
}

function main() {
    txtLocalidad = document.querySelector('#txtLocalidad');
    btnConsultar = document.querySelector('#btnConsultar');
    divTiempo = document.querySelector('#divTiempo');
    errorTxt = document.querySelector('#errorTxt');
    btnConsultar.addEventListener('click', (e) => {obtenerTiempo(e)});
}

window.addEventListener('load', main);