//Funciones employess, here we are going to consume API REST, Making HttpRequest

//Get employees #1
//Get method using AJAX
function getEmployee2(){
    $.ajax({
        url:'http://localhost:8080/api/employees',
        //data:'{}',
        type:'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        //el succes es necesario para crear y almacenar una variable con los datos que recibe ajax en este caso

        success :
            function (dataEmployees){
            console.log(dataEmployees);
            },
        error :
            function(xhr, status) {
            alert('ha sucedido un problema ayax simple:'+ status);
            }
    });
}

//Get employees #2
//Using XMLHttpRequest
// funcion para cuando la llamada es exitosa
function exito() {
    var datos = JSON.parse(this.responseText); //convertir a JSON
    console.log(datos);
}
// funcion para la llamada fallida
function error(err) {
    console.log('Solicitud fallida', err); //los detalles en el objecto "err"
}

function getEmployee(){
    var xhr = new XMLHttpRequest(); //invocar nueva instancia de XMLHttpRequest
    xhr.onload = exito; // llamar a la funcion exito si exitosa
    xhr.onerror = error;  // llamar a la funcion error si fallida
    xhr.open('GET', 'http://localhost:8080/api/employees'); // Abrir solicitud GET
    xhr.send(); // mandar la solicitud al vervidor.
}

//Get employess #3
//Using Fetch

function getEmployee3(){
    const graficador = document.querySelector('.containerEmployee')
    const listEmp = [];
    console.log(listEmp);
    graficarEmployee(listEmp);
    //as predeterminate fetch provides a get request, otherwise, you have to use headers to place a getById, post, update or delete method.
    fetch('http://localhost:8080/api/employees')
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => {
            //This is a for each based on json variable which contains the response
            json.forEach(employee => {
                //console.log(employee.id, employee.firstName,employee.lastName, employee.email)
                const e = document.createElement('e')
                const fN = document.createElement('fN')
                const lN = document.createElement('lN')
                const eM = document.createElement('eM')

                let idE = e.innerHTML = employee.id;
                let fNE = fN.innerHTML = employee.firstName;
                let lNE = lN.innerHTML = employee.lastName;
                let eME = eM.innerHTML = employee.email;

                const dataEmp = [idE, fNE,lNE,eME];
                listEmp.push(dataEmp);


                //graficador.append(listaEmp);


            })

            //console.log(json)
        })
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
}