//Functions employees, here we are going to consume API REST, Making HttpRequest

//End points for VM ip
//const basic_ulr_emp = 'http://134.65.16.219:8080/api/employees';
//const modified_url_emp = 'http://134.65.16.219:8080/api/employees/';

//End points for local host
const basic_ulr_emp = 'http://localhost:8080/api/employees';
const modified_url_emp = 'http://localhost:8080/api/employees/';


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
    if (verifyEmptyFields()!==false){
       await postEmployeeFetch();
        cleanFields();
    }
}

//Root get employee by id
async function rootGetEmployeeById(){
    let test;
    if (verifyEmptyIdField()!==false) {
        test = true;
    }
    if(test && verifyNumber()) {
        test = "passed";
    }
    if(test==="passed"){
        await getEmployeeById();
    }
}

//Root update employee
async function rootUpdateEmployee(){
    if (verifyEmptyFieldsUpdate()!==false){
        let upStatus = updateEmployee();
        if(upStatus){
            alert("The employee has been successfully updated");
            cleanFieldsUpdate();
            showFieldsUpdate(true);
            await getEmployeeFetch2(true);
        }
        if (upStatus===false){
            alert("The Employee couldn't be updated");
        }
    }
}

///////////////////// CRUD CONSUMING METHODS ////////////////////////////////////

// GET ALL EMPLOYEES
async function getEmployeeFetch2(direct){
    fetch(basic_ulr_emp)
    .then((resp)=>{
        //This line becomes resp into a JSON object
        return resp.json();
    })
    .then((employees)=>{
        let butState = document.getElementById('getEmployeeFetch2').getAttribute('value');
        let butVal =document.getElementById('getEmployeeFetch2');
        if(butState==='Show Registers' && employees || direct){
            activeAnimationTable();
            tableCreatorAll(employees);
            butVal.setAttribute('value', "Close Registers");
        }else {
            closeTable();
            butVal.setAttribute('value', "Show Registers");
        }
    }).catch((err)=>{
        alert(`An error occurred: ${err.message}`)
    });
}

// GET A EMPLOYEE BY ID
async function getEmployeeById(){
    let idEmployee = document.getElementById('id').value;
    fetch(modified_url_emp+idEmployee)
    .then((response)=>{
        return response.json();
    })
    .then((resJson)=>{
        if(resJson.status===404){
            alert(`The employee's id isn't exist, status: ${resJson.status}`);
        }else if(resJson.status===500){
            alert(`There was an error, status: ${resJson.status}`);
        }else {
            activeAnimationTable();
            tableCreatorById(resJson);
        }
    }).catch((err) => {
        alert(err.message);
    });
}

// GET AN EMPLOYEE'S DEPARTMENT (DETAIL)
function employeeDepartmentDet(id){
    fetch(modified_url_emp+id)
    .then((response)=>{
      return response.json();
    })
    .then((resJson)=>{
        if(resJson.status===400||resJson.status===500){
            alert(`There was a error, status: ${resJson.status}`);
        }else {
            closeTable();
            setTimeout(()=>{
                activeAnimationTable();
                tableEmpDepCreator(resJson);
            },300);
        }
    }).catch((err)=>{
        alert(err.message);
    });
}

// GET AN EMPLOYEE'S VEHICLE (DETAIL)
function employeeVehicle(id){
    fetch(modified_url_emp+id)
    .then((response)=>{
        return response.json();
    })
    .then((resJson) =>{
        if(resJson.status===400||resJson.status===500){
            alert(`There was a error, status: ${resJson.status}`);
        }else {
            closeTable();
            setTimeout(()=>{
                activeAnimationTable();
                tableEmpVehCreator(resJson);
            },300);
        }
    }).catch((err)=>{
        alert(err.message);
    });
}

// CREATE AN EMPLOYEE
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
    })
    .then((response)=>{
        switch (response.status){
            case 201:{
                alert(`The employee has been created, status: ${response.status}`);
                getEmployeeFetch2();
                break;
            }
            case 500:{
                alert(`There was an error, status: ${response.status}`);
                break;
            }
        }
    }).catch((err)=>{
        alert(`There was an error: ${err.message}`);
    });
}

// DELETE AN EMPLOYEE BY ID
async function deleteEmployee(idEmployee){
    console.log(idEmployee);
    //let idEmployee = document.getElementById()
    fetch(modified_url_emp+idEmployee,{
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(resJson => {
        switch (resJson.status){
            case 200: {
                alert("The employee has been successfully deleted");
                getEmployeeFetch2(true);
                break;
            }
            case 500: {
                alert(`An error occurred, status: ${resJson.status}`);
                break;
            }
        }
    })
    .catch((err) => {
        alert(`error: ${err.message}`);
    });
}

// UPDATE AN EMPLOYEE TAKING VALUES FORM FORM UPDATE
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
    }).then((resJson)=>{
        switch (resJson.status){
            case 500 : {
                alert( `There was an error, status: ${resJson.status}`);
                return false;
            }
            case 200 : {
                return true;
            }
        }
    }).catch((err)=>{
        alert(`Error: ${err.message}`);
    });
}

//////////////////////// PRINTING METHODS AND FORM VALIDATION ///////////////////////////////////////

// 1.0 CLOSE TABLE CONTAINER BY EXECUTING THE ANIMATION AND THEN REMOVING CONTENT
function closeTable(){
    //select elements by id from document html.
    let headTable = document.querySelector('#headTable');
    let bodyTable = document.querySelector('#bodyTable');
    //variable to be set
    let empty = "";
    deactivateAnimationTable();
    setTimeout(()=>{
        headTable.innerHTML = empty;
        bodyTable.innerHTML = empty;
    },300);

}
// 1.1 PRINT TABLE (ALL EMPLOYEES)
function tableCreatorAll(employees){
    let tableHead = document.querySelector('#headTable');
    let tableBody = document.querySelector('#bodyTable');
    let content =`
        <tr>
            <td>Id employee</td>
            <td>first name</td>
            <td>Last name</td>
            <td>Email</td>
            <td>Department</td>
            <td>Vehicle</td>
            <td>Update</td>
            <td>Delete</td>
        </tr>
    `;

    tableHead.innerHTML = content;
    content = "";

    for (let employee of employees){
        content +=`
            <tr>
                <td>${employee.id}</td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.email}</td>
                <td><button class="butInternal butInternal--alt" value="details" onclick="employeeDepartmentDet(${employee.id})">${employee.department.departmentName}</button></td>
                <td><button class="butInternal butInternal--alt" value="details" onclick="employeeVehicle(${employee.id})">${employee.vehicle.model}</button></td>
                <td><button class="butInternal" value="update" onclick="fillUpFields(${employee.id})">Update</button></td>
                <td><button class="butInternal" value="delete" onclick="deleteEmployee(${employee.id})">Delete</button></td>
            </tr>
        `;
    }
    tableBody.innerHTML = content;
}
// 1.2 PRINT TABLE (ONE  VEHICLE ONLY)
function tableCreatorById(employee){
    let placeholderHead = document.querySelector('#headTable');
    let placeholder = document.querySelector('#bodyTable');
    let out = `
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
    placeholder.innerHTML = out;
}
// 1.3 PRINTING EMPLOYEE'S DEPARTMENT
function tableEmpDepCreator(employee){
    let tableHead = document.querySelector('#headTable');
    let tableBody = document.querySelector('#bodyTable');
    let cont =`
        <tr>
            <td>Id department</td>
            <td>Department's name</td>
            <td>Salary</td>
            <td>Department level</td>
        </tr>`;

    tableHead.innerHTML = cont;
    cont = "";
    cont += `
        <td>${employee.department.idDep}</td>
        <td>${employee.department.departmentName}</td>
        <td>${employee.department.departmentSalary}</td>
        <td>${employee.department.departmentLevel}</td>
    `;
    tableBody.innerHTML = cont;
}
// 1.4 PRINTING EMPLOYEE'S VEHICLE
function tableEmpVehCreator(employee){
    let tableHead = document.querySelector('#headTable');
    let tableBody = document.querySelector('#bodyTable');
    let cont = `
        <tr class="backGroundCell">
            <td>ID</td>
            <td>plate</td>
            <td>brand</td>
            <td>model</td>
            <td>color</td>
        </tr>
    `;
    tableHead.innerHTML = cont;
    cont = "";
    cont += `
        <td>${employee.vehicle.idVehicle}</td>
        <td>${employee.vehicle.plate}</td>
        <td>${employee.vehicle.brand}</td>
        <td>${employee.vehicle.model}</td>
        <td>${employee.vehicle.color}</td>
    `;
    tableBody.innerHTML = cont;
}
// 1.5 ACTIVATE ANIMATION FOR TABLE CONTAINER (FADE IN)
function activeAnimationTable(){
    let tableEmp= document.querySelector("#tableEmp");
    let classTable = tableEmp.classList.contains('tableCenter')
    if(classTable){
        tableEmp.classList.remove('tableCenter');
        tableEmp.classList.add('tableAnimation');
    }
}
// 1.6 DEACTIVATE ANIMATION FOR TABLE CONTAINER (FADE OUT)
function deactivateAnimationTable(){
    let tableEmp= document.querySelector("#tableEmp");
    let classTable = tableEmp.classList.contains('tableAnimation')
    if(classTable){
        tableEmp.classList.remove('tableAnimation');
        tableEmp.classList.add('tableCenter');
    }
}

// 2.0 VERIFY EMPTY INPUT FIELDS CREATE FORM---------------------------------------------------------
function verifyEmptyFields(){
    let firstNameVal = document.getElementById('firstName').value;
    let lastNameVal = document.getElementById('lastName').value;
    let emailVal = document.getElementById('email').value;
    let idDepVal = document.getElementById('department').value;
    let idVehVal = document.getElementById('vehicle').value;

    let general = [firstNameVal,lastNameVal,emailVal,idDepVal,idVehVal];
    let empty = " ";

    if(firstNameVal.length >0 && lastNameVal.length >0 && emailVal.length >0 && idDepVal.length >0 && idVehVal.length >0){
        for (i=0;i<general.length;i++){
            let uniGen = [];
            uniGen+=general[i];
            for(i2=0;i2<uniGen.length;i2++){
                if(empty !== uniGen[0]){
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
// 2.1 CLEAN INPUT FIELDS IN CREATE FORM
function cleanFields(){
    let firstNameVal = document.getElementById('firstName');
    let lastNameVal = document.getElementById('lastName');
    let emailVal = document.getElementById('email');
    let idDepVal = document.getElementById('department');
    let idVehVal = document.getElementById('vehicle');

    let empty = "";
    /*The difference between innerHTML and value is, the last one insert a value of an attribute into a html element,
    when we want to add text into a field we have to use field.value = "text"*/
    firstNameVal.value = empty;
    lastNameVal.value = empty;
    emailVal.value = empty;
    idDepVal.value = empty;
    idVehVal.value = empty;
}
//2.2 PRINT AND REMOVE CREATE FORM
function showFields(){
    //This command selects the div which contains the fields
    let formCrEmp = document.getElementById('fieldsEmp');
    //This command selects a button of document
    let buttonShow = document.getElementById('btnShow');
    //This command chooses attributes of a div: hidden = "hidden"

    let formContent = `
        <!--Forms-->
        <input type="text" id="firstName" placeholder="first name"><br>
        <input type="text" id="lastName" placeholder="last name"><br>
        <input type="text" id="email" placeholder="email"><br>
        <input type="number" id="department" placeholder="department id"><br>
        <input type="number" id="vehicle" placeholder="Vehicle id"><br>
        <!--Buttons-->
        <input class="butIni" type="button" value="Confirm create" id="btnCreate" onclick="rootCreateEmp()">    
   `;
    if(buttonShow.getAttribute("value")==="Create register"){
        formCrEmp.classList.remove("formsStyle");
        formCrEmp.classList.add("formsStyle--active");
        buttonShow.setAttribute('value', 'Cancel register');
        formCrEmp.innerHTML += formContent;
    }else {
        formCrEmp.classList.remove("formsStyle--active");
        formCrEmp.classList.add("formsStyle");
        buttonShow.setAttribute('value','Create register');
        setTimeout(()=>{
            formCrEmp.innerHTML = '';
        }, 300);
    }
}


// 3.0 CHECK IF AN EMPLOYEE'S ID IS A NUMBER IN SEARCH FORM -----------------------------------------
function verifyNumber(){
    let fieldValue = document.getElementById('id').value;
    let intValue = parseInt(fieldValue);
    if (!isNaN(intValue)){
        return true;
    }else {
        alert("Only numbers are allowed");
    }
}
// 3.1 VERIFY EMPTY INPUT FIELDS IN SEARCH FORM
function verifyEmptyIdField(){
    let idEmployee = document.getElementById('id').value;
    let general = idEmployee;
    let empty = " ";
    if(idEmployee.length >0){
        for (let i=0;i<general.length;i++){
            let uniGen = [];
            uniGen+=general;
            for(let i2=0;i2<uniGen.length;i2++){
                if(empty!== uniGen[i2]){
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
// 3.2 PRINT AND REMOVE SEARCH FORM
function showSearch(){
    let formFindId = document.getElementById('fieldId');
    let butSearch = document.getElementById('btnSearch');
    let buttonShow = document.getElementById('btnShow');

    let contForm = `
        <p class="footer">!Please! Insert an employee's id to search it in the system.</p>
        <input type="number" id="id" placeholder="id">
        <input class="butIni" type="button" value="Confirm" id="btnConfirm" onclick="rootGetEmployeeById()">
    `;

    if(butSearch.getAttribute("value")==='Search'){
        formFindId.classList.remove("formsStyle");
        formFindId.classList.add("formsStyle--active");
        butSearch.setAttribute('value', 'Close search');
        formFindId.innerHTML = contForm;
    }else {
        formFindId.classList.remove("formsStyle--active");
        formFindId.classList.add("formsStyle");
        butSearch.setAttribute('value', 'Search');
        buttonShow.setAttribute('value', 'Show Registers');
        closeTable();
        setTimeout(()=>{
            formFindId.innerHTML = '';
        }, 300);
    }
}

// 4.0 VERIFY EMPTY INPUT FIELDS IN UPDATE FORM ----------------------------------------------------
function verifyEmptyFieldsUpdate(){
    let firstNameValUpdate = document.getElementById('firstNameUpdate').value;
    let lastNameValUpdate = document.getElementById('lastNameUpdate').value;
    let emailValUpdate = document.getElementById('emailUpdate').value;
    let generalUpdate = [firstNameValUpdate,lastNameValUpdate,emailValUpdate];
    let empty = " ";

    if(firstNameValUpdate.length >0 && lastNameValUpdate.length >0 && emailValUpdate.length >0){
        for (let i=0;i<generalUpdate.length;i++){
            let uniGen = [];
            uniGen+=generalUpdate[i];
            for(let i2=0;i2<uniGen.length;i2++){
                if(empty !== uniGen[0]){
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
// 4.1 CLOSE UPDATE FORM
function showFieldsUpdate(direct){
    //This command selects the div which contains the fields
    let formUp = document.getElementById('fieldsUpdateEmp');
    //This command selects a button of document
    let btnCanUpd = document.getElementById('btnCancelUpdate').getAttribute("value");
    // EXECUTING A FADE OUT AND THEN REMOVING CONTENT
    if (btnCanUpd==="Cancel Update" || direct){
        formUp.classList.remove('formsStyle--active');
        formUp.classList.add('formsStyle');
        setTimeout(()=>{
            formUp.innerHTML = "";
        }, 300);
    }
}
// 4.2 PRINT UPDATE FORM
function fillUpFields(id){
    fetch(modified_url_emp+id)
    .then((response)=>{
        return response.json();
    })
    .then((employee) =>{
        let formUpVeh = document.getElementById('fieldsUpdateEmp');
        formUpVeh.classList.remove('formsStyle');
        formUpVeh.classList.add('formsStyle--active');
        formUpVeh.innerHTML = `
            <!--Forms-->
            <input type="text" id="idEmployee" placeholder="Id Employee" value="${employee.id}" disabled><br>
            <input type="text" id="firstNameUpdate" placeholder="first name" value="${employee.firstName}"><br>
            <input type="text" id="lastNameUpdate" placeholder="last name" value="${employee.lastName}"><br>
            <input type="text" id="emailUpdate" placeholder="email" value="${employee.email}"><br>
            <!--Buttons-->
            <input class="butIni" type="button" value="Confirm Update" id="btnUpdate" onclick="rootUpdateEmployee()">
            <input class="butIni" type="button" value="Cancel Update" id="btnCancelUpdate" onclick="showFieldsUpdate()">
        `;
    }).catch((err)=> {
        alert(`Error: ${err.message}`);
    });
}
// 4.3 CLEAN INPUT FIELDS OF UPDATE FORM
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





