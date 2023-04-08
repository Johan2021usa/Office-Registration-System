//Functions employees, here we are going to consume API REST, Making HttpRequest

//End points for VM ip
const basic_ulr_emp = 'http://134.65.16.219:8080/api/employees';
const modified_url_emp = 'http://134.65.16.219:8080/api/employees/';

//End points for local host
// const basic_ulr_emp = 'http://localhost:8080/api/employees';
// const modified_url_emp = 'http://localhost:8080/api/employees/';



// //Get employees #1
// //Get method using AJAX
// function getEmployeeAjax(){
//     $.ajax({
//         url:basic_ulr_emp,
//         //data:'{}',
//         type:'GET',
//         dataType: 'json',
//         contentType: "application/json; charset=utf-8",
//         //el succes es necesario para crear y almacenar una variable con los datos que recibe ajax en este caso
//
//         success :
//             function (dataEmployees){
//             console.log(dataEmployees);
//             },
//         error :
//             function(xhr, status) {
//             alert('ha sucedido un problema ayax simple:'+ status);
//             }
//     });
// }
//
// //Get employees #2
// //Using XMLHttpRequest
// // funcion para cuando la llamada es exitosa
// function exito() {
//     var datos = JSON.parse(this.responseText); //convertir a JSON
//     console.log(datos);
// }
// // funcion para la llamada fallida
// function error(err) {
//     console.log('Solicitud fallida', err); //los detalles en el objecto "err"
// }
//
// function getEmployeeXmlh(){
//     var xhr = new XMLHttpRequest(); //invocar nueva instancia de XMLHttpRequest
//     xhr.onload = exito; // llamar a la funcion exito si exitosa
//     xhr.onerror = error;  // llamar a la funcion error si fallida
//     xhr.open('GET', basic_ulr_emp); // Abrir solicitud GET
//     xhr.send(); // mandar la solicitud al vervidor.
// }
//
// //Get employess #3
// //Using Fetch
//
// async function getEmployeeFetch(){
//     let graficador = document.getElementById('spanEmployee');
//     let graficadorDepartment = document.getElementById('contenedorDepartment');
//     let dataHTML = '';
//
//     //as predeterminate fetch provides a get request, otherwise, you have to use headers to place a getById, post, update or delete method.
//     await fetch(basic_ulr_emp)
//         //receives a response and this one is converted into a JSON.
//         .then(resEmployee => resEmployee.json())
//         //then data is handled with a loop.
//         .then(data => {
//
//             //This is a for each based on json variable which contains the response
//             data.forEach(employee => {
//
//                 //Create an element according to each JSON value
//                 const EmpResp = document.createElement('idEmpResp' + 'firstNameResp'+ 'lastNameResp' + 'emailEmpResp'+'departmentEmpResp');
//
//                 //create an InnerHTML variable according to each crated element.
//                 let idEmployee = EmpResp.innerHTML = employee.id;
//                 let firstNameEmp = EmpResp.innerHTML = employee.firstName;
//                 let lastNameEmp = EmpResp.innerHTML = employee.lastName;
//                 let emailEmp = EmpResp.innerHTML = employee.email;
//                 let departmentEmp = EmpResp.innerHTML = employee.department;
//
//                 // Create an ArrayList with all innerHTML Values.
//                 const datosEmployee = [idEmployee, firstNameEmp,lastNameEmp,emailEmp];
//                 //showEmployee(datosEmployee);
//
//                 //Additional variable
//                 const totalDepartment = [];
//
//                 /*This for (Loop) is used to iterate the object in order to become it into an Array, there are two i,
//                 because the first one iterates the attribute name, and the second one the value, for instance: [dep_id, 2].
//                 If you need only the value of that attribute you can remove the first i, look at the line 84.
//
//                 //Push a bi dimensional array into totalDepartment.
//                     for(var i in departmentEmp){
//                  totalDepartment.push([i,departmentEmp[i]]);
//                 };
//
//                 //Show an array into the screen through a container
//                 for(var i in totalDepartment){
//                     graficadorDepartment.append(totalDepartment[i][1]+ " ");
//                 }
//                 */
//
//                 //Array list - one dimension
//                 for(var i in departmentEmp){
//                     totalDepartment.push(departmentEmp[i]);
//                 };
//
//                 //Loop to append each value into the container to show values into the screen
//                 for(var i in datosEmployee){
//                     graficador.append(datosEmployee[i] + " ");
//                 }
//                 for(var i in totalDepartment){
//                     graficadorDepartment.append(totalDepartment[i]+ " ");
//                 }
//
//                 //console.log(datosEmployee);
//                 //console.log(totalDepartment);
//             })
//         })
//         // if a promise is not completed it will show an error.
//         .catch(err => console.log('Solicitud fallida', err));
// }
// /*
// //Get employee Using fetch #4
// async function getEmployeeFetch2(){
//     //container which will receive JSON values in order to be showed.
//     let graficadorDos = document.getElementById('spanEmployee');
//     let graficadorDepartmentDos = document.getElementById('contenedorDepartment');
//
//     //Fetch method to get all employees.
//         await fetch(basic_ulr_emp)
//             .then(resEmployee => resEmployee.json())
//             .then(data => {
//                 data.forEach(data => {
//
//                     //This is a new way to get the information of each parameter from a response.
//                     const {id, firstName, lastName, email, department} = data;
//                     const {idDep, departmentName, departmentSalary, departmentLevel} = department;
//
//                     //put each value form response into an Array
//                     const dataEmployee = [id, firstName,lastName, email];
//                     const employeeDepartment = [idDep, departmentName, departmentSalary, departmentLevel];
//
//                     //Append the information obtained to a container os span (screen)
//                     graficadorDos.append(dataEmployee);
//                     graficadorDepartmentDos. append(employeeDepartment);
//
//                 })
//             })
//             .catch(err => console.log('Solicitud fallida', err));
// }
// */

//Root create employee
async function rootCreateEmp(){
    //Requires verify existence
    if (verifyEmptyFields()!=false){
        postEmployeeFetch();
        cleanFields();
    }
}

//Root get employee by id
async function rootGetEmployeeById(){
    switch (verifyEmptyIdField()){
        case !false:
                switch (verifyNumber()){
                    case true : getEmployeeById();
                        break;
                }
            break;
    }
}

//Root update employee
async function rootUpdateEmployee(){
    if (verifyEmptyFieldsUpdate()!=false){
        updateEmployee();
        cleanFieldsUpdate();
        showFieldsUpdate();
    }
}

//////////////////////Internal methods for employee////////////////////////////////////

//get employee method
async function getEmployeeFetch2(){
    activeAnimationTable();
    //This line sends and promise to that url, by defect the method is get, if you wan
    fetch(basic_ulr_emp)
        //this line gets a response and put those values into a resp variable
    .then(
        function (resp){
        //This line becomes resp into a JSON object
            return resp.json();
        }
    ).then(
        function (employees){
            let tableHead = document.querySelector('#headTable');
            let tableBody = document.querySelector('#bodyTable');
            let content = "";
                content +=`<input class="butIni" type="button" value="close registers" id="btnUpdate" onclick="closeTable()">`;

                content +=`
                    <tr class="backGroundCell">
                        <td>Id employee</td>
                        <td>first name</td>
                        <td>Last name</td>
                        <td>Email</td>
                        <td>Department</td>
                        <td>Vehicle</td>
                        <td>Delete</td>
                        <td>Update</td>
                    </tr>
                `;

            tableHead.innerHTML = content;
            content = "";

            for (let employee of employees){
                content +=`
                    <tr class="backGroundCell">
                        <td>${employee.id}</td>
                        <td>${employee.firstName}</td>
                        <td>${employee.lastName}</td>
                        <td>${employee.email}</td>
                        <td><button class="butInternal" value="details" onclick="employeeDepartmentDet(${employee.id})">${employee.department.departmentName}</button></td>
                        <td><button class="butInternal" value="details" onclick="employeeVehicle(${employee.id})">${employee.vehicle.model}</button></td>
                        <td><button class="butInternal" value="delete" onclick="deleteEmployee(${employee.id})">Delete</button></td>
                        <td><button class="butInternal" value="update" onclick="fillUpFields(${employee.id})">Update</button></td>
                    </tr>
                `;
            }
            tableBody.innerHTML = content;
        }
    )
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
//Get employee's department
function employeeDepartmentDet(id){
    fetch(modified_url_emp+id)
    .then(
        function (response){
          return response.json();
        }
    ).then(
        function (employee) {
        //console.log(id);
            let placeholderHead = document.querySelector('#headTable');
            let placeholder = document.querySelector('#bodyTable');
            let out = "";
            out +=`<input class="butIni" type="button" value="close registers" id="btnUpdate" onclick="closeTable()">`;

            out += `
                    <tr class="backGroundCell">
                        <td>Id department</td>
                        <td>Department's name</td>
                        <td>Salary</td>
                        <td>Department level</td>
                    </tr>
                `;

            placeholderHead.innerHTML = out;
            //Here the variable out which will be insert into the html document using innerHTML is cleaned.
            out = "";
                out += `
                    <td>${employee.department.idDep}</td>
                    <td>${employee.department.departmentName}</td>
                    <td>${employee.department.departmentSalary}</td>
                    <td>${employee.department.departmentLevel}</td>
                `;
            /*innerHTML is a better way to insert information in the html document, in this case the code is adding
            the variable called out, which contains the table looped.
            * */
            placeholder.innerHTML = out;
        }
    )
}

function employeeVehicle(id){
    fetch(modified_url_emp+id)
    .then(
        function (response){
            return response.json();
        }
    ).then(
        function (employee) {
            console.log(employee);
            let placeholderHead = document.querySelector('#headTable');
            let placeholder = document.querySelector('#bodyTable');
            let out = "";
            out +=`<input class="butIni" type="button" value="close registers" id="btnUpdate" onclick="closeTable()">`;
            out += `
                    <tr class="backGroundCell">
                        <td>Id vehicle</td>
                        <td>plate</td>
                        <td>brand</td>
                        <td>model</td>
                        <td>color</td>
                    </tr>
                `;

            placeholderHead.innerHTML = out;
            //Here the variable out which will be insert into the html document using innerHTML is cleaned.
            out = "";
            out += `
                    <td>${employee.vehicle.idVehicle}</td>
                    <td>${employee.vehicle.plate}</td>
                    <td>${employee.vehicle.brand}</td>
                    <td>${employee.vehicle.model}</td>
                    <td>${employee.vehicle.color}</td>
                `;
            /*innerHTML is a better way to insert information in the html document, in this case the code is adding
            the variable called out, which contains the table looped.
            * */
            placeholder.innerHTML = out;
        }
    )
}

//-------------------------------------------------------------------------------------------------------------------------------------------------
//Get employee by id method
async function getEmployeeById(){
    let idEmployee = document.getElementById('id').value;
    fetch(modified_url_emp+idEmployee)
    .then(
        function (response){
            return response.json();
        }
    ).then(
        function (employee) {
            let placeholderHead = document.querySelector('#headTable');
            let placeholder = document.querySelector('#bodyTable');
            let out = "";
            out +=`<input class="butIni" type="button" value="close registers" id="btnUpdate" onclick="closeTable()">`;

            out += `
                    <tr class="backGroundCell">
                        <td>Id employee</td>
                        <td>first name</td>
                        <td>Last name</td>
                        <td>Email</td>
                        <td>Department</td>
                        <td>Vehicle</td>
                        <td>Delete</td>
                        <td>Update</td>
                    </tr>
                `;

            placeholderHead.innerHTML = out;
            //Here the variable out which will be insert into the html document using innerHTML is cleaned.
            out = "";
            out += `
                    <td>${employee.id}</td>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.email}</td>
                    <td><button class="butInternal" value="details" onclick="employeeDepartmentDet(${employee.id})">${employee.department.departmentName}</button></td>
                    <td><button class="butInternal" value="details" onclick="employeeVehicle(${employee.id})">${employee.vehicle.model}</button></td>
                    <td><button class="butInternal" value="delete" onclick="deleteEmployee(${employee.id})">Delete</button></td>
                    <td><button class="butInternal" value="update" onclick="fillUpFields(${employee.id})">Update</button></td>
                `;
            /*innerHTML is a better way to insert information in the html document, in this case the code is adding
            the variable called out, which contains the table looped.
            * */
            placeholder.innerHTML = out;
        }
    ).catch(
        err => {
            alert("the employee doesn't exist");
            closeTable();
        }
    )
}

//Post method with fetch
async function postEmployeeFetch(){
    let firstNameVal = document.getElementById('firstName').value;
    let lastNameVal = document.getElementById('lastName').value;
    let emailVal = document.getElementById('email').value;
    let idDepVal = document.getElementById('department').value;
    let idVehVal = document.getElementById('vehicle').value;

    fetch(basic_ulr_emp,{
        //Method type
        method: 'POST',
        //Body content
        body: JSON.stringify({
            firstName: firstNameVal,
            lastName: lastNameVal,
            email: emailVal,
            department: {idDep: idDepVal},
            vehicle: {idVehicle: idVehVal}
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(
        function (response){
            if (response.status==201) {
                alert("The employee has been created");
                getEmployeeFetch2();
            }
            if (response.status==500){
                alert("The department's or Vehicle's id doesn't exist or you are using a vehicle's id that has been already used");
            }

        }
    )
}

//Delete method with fetch
async function deleteEmployee(idEmployee){
    console.log(idEmployee);
    //let idEmployee = document.getElementById()
    fetch(modified_url_emp+idEmployee,{
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => {
        alert("the employee has been deleted");
        getEmployeeFetch2();
    })
    .catch(
        err => alert('It was not possible to delete the employee')
    )
}

//Update method with fetch
async function updateEmployee(){
    let idEmployeeValUpdate = document.getElementById('idEmployee').value;
    let firstNameValUpdate = document.getElementById('firstNameUpdate').value;
    let lastNameValUpdate = document.getElementById('lastNameUpdate').value;
    let emailValUpdate = document.getElementById('emailUpdate').value;

    fetch(modified_url_emp+idEmployeeValUpdate,{
        //Method type
        method: 'PUT',

        //Body content
        body: JSON.stringify({
            firstName: firstNameValUpdate,
            lastName: lastNameValUpdate,
            email: emailValUpdate
            /** For data integrity purposes, don't modify foreign keys and Primary key
             * But in some case you need to know how to set a value of a foreign key is like this:
             * department: {
             *  idDep: 60,
             *  departmentName: "Gis"
             * }
             * */
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(
        function (response){
            response.json();
            alert("The employee has been updated");
            getEmployeeFetch2();
        }
    )
}
////////////////////////Functional methods for web pages///////////////////////////////////////

//close table
function closeTable(){
    //select elements by id from document html.
    let close = document.querySelector('#headTable');
    let closeTwo = document.querySelector('#bodyTable');
    //variable to be set
    let empty = "";
    //insert empty into document through an variable.
    close.innerHTML = empty;
    closeTwo.innerHTML = empty;
    deactivateAnimationTable();
}

//Verify if value is a number (search by id)
function verifyNumber(){
    let fieldValue = document.getElementById('id').value;
    let intValue = parseInt(fieldValue);
    if (!isNaN(intValue)){
        return true;
    }else {
        alert("Only numbers are allowed");
    }
}

//Verify values inside fields form
function verifyEmptyFields(){
    let firstNameVal = document.getElementById('firstName').value;
    let lastNameVal = document.getElementById('lastName').value;
    let emailVal = document.getElementById('email').value;
    let idDepVal = document.getElementById('department').value;
    let idVehVal = document.getElementById('vehicle').value;

    let general = [firstNameVal,lastNameVal,emailVal,idDepVal,idVehVal];
    let vacio = " ";

    if(firstNameVal.length >0 && lastNameVal.length >0 && emailVal.length >0 && idDepVal.length >0 && idVehVal.length >0){
        for (i=0;i<general.length;i++){
            let uniGen = [];
            uniGen+=general[i];
            for(i2=0;i2<uniGen.length;i2++){
                if(vacio !== uniGen[0]){
                }else {
                    alert("don't leave empty fields 1");
                    stop();
                    return false;
                }
            }
        }
    }else {
        alert("don't leave empty fields 2");
        return false;
    }
}

//Verify values inside fields update
function verifyEmptyFieldsUpdate(){
    let firstNameValUpdate = document.getElementById('firstNameUpdate').value;
    let lastNameValUpdate = document.getElementById('lastNameUpdate').value;
    let emailValUpdate = document.getElementById('emailUpdate').value;
    let generalUpdate = [firstNameValUpdate,lastNameValUpdate,emailValUpdate];
    let vacio = " ";

    if(firstNameValUpdate.length >0 && lastNameValUpdate.length >0 && emailValUpdate.length >0){
        for (i=0;i<generalUpdate.length;i++){
            let uniGen = [];
            uniGen+=generalUpdate[i];
            for(i2=0;i2<uniGen.length;i2++){
                if(vacio !== uniGen[0]){
                }else {
                    alert("don't leave empty fields 1");
                    stop();
                    return false;
                }
            }
        }
    }else {
        alert("don't leave empty fields 2");
        return false;
    }
}

//Verify empty fields in search button
function verifyEmptyIdField(){
    let idEmployee = document.getElementById('id').value;
    let general = idEmployee;
    let vacio = " ";

    if(idEmployee.length >0){
        for (i=0;i<general.length;i++){
            let uniGen = [];
            uniGen+=general;
            for(i2=0;i2<uniGen.length;i2++){
                if(vacio!= uniGen[i2]){
                    return true;
                }else {
                    alert("don't leave empty fields 1");
                    stop();
                    return false;
                }
            }
        }
    }else {
        alert("don't leave empty fields 2");
        return false;
    }
}

//clean fields
function cleanFields(){
    let firstNameVal = document.getElementById('firstName');
    let lastNameVal = document.getElementById('lastName');
    let emailVal = document.getElementById('email');
    let idDepVal = document.getElementById('department');
    let idVehVal = document.getElementById('vehicle');

    let vacio = "";
    /*The difference between innerHTML and value is, the last one insert a value of an attribute into a html element,
    when we want to add text into a field we have to use field.value = "text"*/
    firstNameVal.value = vacio;
    lastNameVal.value = vacio;
    emailVal.value = vacio;
    idDepVal.value = vacio;
    idVehVal.value = vacio;
}

//Clean fields update form
function cleanFieldsUpdate(){
    let idEmployeeUpdate = document.getElementById('idEmployee');
    let firstNameValUpdate = document.getElementById('firstNameUpdate');
    let lastNameValUpdate = document.getElementById('lastNameUpdate');
    let emailValUpdate = document.getElementById('emailUpdate');
    let empty = "";
    /*The difference between innerHTML and value is, the last one insert a value of an attribute into a html element,
    when we want to add text into a field we have to use field.value = "text"*/
    idEmployeeUpdate.value = empty;
    firstNameValUpdate.value = empty;
    lastNameValUpdate.value = empty;
    emailValUpdate.value = empty;
}

function showFields(){
    //This command selects the div which contains the fields
    let divFields = document.getElementById('fieldsEmp');
    //This command selects a button of document
    let buttonShow = document.getElementById('btnShow');
    //This command chooses attributes of a div: hidden = "hidden"
    let property = divFields.getAttribute('hidden');

    //if property (hidden = hidden) remove property hidden
    if(property) {
        divFields.removeAttribute('hidden');
        //set an attribute "value" as "close" = value = "close"
        buttonShow.setAttribute('value', 'Cancel register')
    }else {
        divFields.setAttribute("hidden", "hidden");
        buttonShow.setAttribute('value','Create register')
    }
}

function showSearch(){
    let divFieldId = document.getElementById('fieldId');
    let buttonSearch = document.getElementById('btnSearch');
    let property = divFieldId.getAttribute('hidden');

    if (property){
        divFieldId.removeAttribute('hidden');
        buttonSearch.setAttribute('value', 'Cancel search');
    }else {
        divFieldId.setAttribute('hidden','hidden');
        buttonSearch.setAttribute('value', 'Search');
    }
}

function showFieldsUpdate(){
    //This command selects the div which contains the fields
    let divFieldsUpdate = document.getElementById('fieldsUpdateEmp');
    //This command selects a button of document
    let buttonCancelUpdate = document.getElementById('btnCancelUpdate');
    //This command chooses attributes of a div: hidden = "hidden"
    let property = divFieldsUpdate.getAttribute('hidden');

    //if property (hidden = hidden) remove value hidden
    if(property) {
        divFieldsUpdate.removeAttribute('hidden');
        //set an attribute "value" as "close" = value = "close"
        buttonCancelUpdate.setAttribute('value', 'Cancel Update');
    }else {
        divFieldsUpdate.setAttribute('hidden','hidden');
    }
}

function fillUpFields(id){
    fetch(modified_url_emp+id)
    .then(
        function (response){
            return response.json();
        }
    ).then(
        function (employee) {
            let idEmployeeVal = document.getElementById('idEmployee');
            let firstNameVal = document.getElementById('firstNameUpdate');
            let lastNameVal = document.getElementById('lastNameUpdate');
            let emailVal = document.getElementById('emailUpdate');

            idEmployeeVal.value = employee.id;
            firstNameVal.value = employee.firstName;
            lastNameVal.value = employee.lastName;
            emailVal.value = employee.email;
        }
    ).then(
        function (response){
            showFieldsUpdate();
        }
    )
}

function activeAnimationTable(){
    let tableEmp= document.querySelector("#tableEmp");
    let classTable = tableEmp.classList.contains('tableCenter')
    if(classTable){
        tableEmp.classList.remove('tableCenter');
        tableEmp.classList.add('tableAnimation');
    }
}

function deactivateAnimationTable(){
    let tableEmp= document.querySelector("#tableEmp");
    let classTable = tableEmp.classList.contains('tableAnimation')
    if(classTable){
        tableEmp.classList.remove('tableAnimation');
        tableEmp.classList.add('tableCenter');
    }
}
/*Annotations
Check them out then
${}} -> this command is called string interpolation, topic to be reviewed.
dataHTML += `<tr><td>${totalDepartmentDos}</td></tr>`;
*/

