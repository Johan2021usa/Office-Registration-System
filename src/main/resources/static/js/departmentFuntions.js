const api_url = 'http://134.65.16.219:8080/api/departments';
//const api_url = 'http://localhost:8080/api/departments';


// if(employee.status)
//     switch (employee.status){
//         case 500:
//             alert("THE DEPARTMENT DOESN'T EXIST");
//     }
//////////////////////Root Methods for departments///////////////////////////////////////
//Root create department
function rootCreateDep(){
    //Requires verify existence
    // switch (verifyEmptyFieldsDep()){
    //     case !false:
    //         postDepartment();
    // }
    if(verifyEmptyFieldsDep()!==false){
        postDepartment();
        cleanFieldsDep();
    }
}

async function rootGetDepartmentById() {
    switch (verifyEmptyIdFieldDep()) {
        case !false:
            switch (verifyNumberDep()) {
                case true:
                    getDepartmentById();
            }
    }
}

/////////////////////Internal methods for departments////////////////////////////////////

//get employee method
async function getDepartments(){
    //This line sends and promise to that url, by defect the method is get, if you wan
    fetch(api_url)
        //this line gets a response and put those values into a resp variable
        .then(function (resp){
            //This line becomes resp into a JSON object
            return resp.json();
        })
        .then(function (departments){
            let placeholderHead = document.querySelector('#headTableDep');
            let placeholder = document.querySelector('#bodyTableDep');
            let out = "";
            out +=`<input class="butIni" type="button" value="close registers" id="btnUpdateDep" onclick="closeTableDep()">`;

            out +=`
                    <tr class="backGroundCell">
                        <td>Id department</td>
                        <td>department Name</td>
                        <td>department Salary</td>
                        <td>Department level</td>
                    </tr>
                `;

            placeholderHead.innerHTML = out;
            out = "";

            for (let department of departments){
                out +=`
                    <tr class="backGroundCell">
                        <td>${department.idDep}</td>
                        <td>${department.departmentName}</td>
                        <td>${department.departmentSalary}</td>
                        <td>${department.departmentLevel}</td>
                        <td><button class="butInternal" value="details" onclick="deleteDepartment(${department.idDep})">Delete</button></td>
                    </tr>
                `;
            }
            placeholder.innerHTML = out;
        })
}

//Delete method with fetch
async function deleteDepartment(idDep){
    //let idEmployee = document.getElementById()
    //fetch('http://localhost:8080/api/departments/'+idDep,{
    fetch('http://134.65.16.219:8080/api/departments/'+idDep,{
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => alert("the department has been deleted"))
        .then(getDepartments)
        .catch(err => alert('It was not possible to delete the department'));

}

//Post method with fetch
async function postDepartment(){
    let departmentName = document.getElementById('departmentNameField').value;
    let departmentSalary = document.getElementById('departmentSalaryField').value;
    let departmentLevel = document.getElementById('departmentLevelField').value;

    fetch(api_url,{
        //Method type
        method: 'POST',

        //Body content
        body: JSON.stringify({
            departmentName: departmentName,
            departmentSalary: departmentSalary,
            departmentLevel: departmentLevel,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function (response){return response.json();})
        .then(function (department){
            alert("The department has been created");
            getDepartments();
        })
}

//Get department by id
async function getDepartmentById(){
    let idDepartment = document.getElementById("idDep").value;
    //fetch('http://localhost:8080/api/departments/'+idDepartment)
    fetch('http://134.65.16.219:8080/api/departments/'+idDepartment)
        .then(function (response){return response.json();})
        .then(function (department){

            if(typeof department.idDep === "number"){
                tableCreatorById(department);
            }else{
                alert("The department doesn't exist");
                stop();
            }
        }).catch(errDep => {
           alert("The department doesn't exist");
           closeTableDep();
    });
}

////////////////////////Functional methods for web pages///////////////////////////////////////

//close table
function closeTableDep(){
    //select elements by id from document html.
    let close = document.querySelector('#headTableDep');
    let closeTwo = document.querySelector('#bodyTableDep');
    //variable to be set
    let vacio = "";
    //insert vacio into document through an variable.
    close.innerHTML = vacio;
    closeTwo.innerHTML = vacio;

}

//Verify if value is a number
function verifyNumberDep(){
    let fieldValue = document.getElementById('idDep').value;
    let intValue = parseInt(fieldValue);
    if (!isNaN(intValue)){
        return true;
    }else {
        alert("Only numbers are allowed");
    }
}

//Verify values inside fields
function verifyEmptyFieldsDep(){
    let departmentName = document.getElementById('departmentNameField').value;
    let departmentSalary = document.getElementById('departmentSalaryField').value;
    let departmentLevel = document.getElementById('departmentLevelField').value;
    let generalDep = [departmentName,departmentSalary,departmentLevel];
    let vacioDep = " ";

    if(departmentName.length >0 && departmentSalary.length >0 && departmentLevel.length >0){
        for (a=0;a<generalDep.length;a++){
            let uniGenDep = [];
            uniGenDep+=generalDep[a];
            for(a2=0;a2<uniGenDep.length;a2++){
                if(vacioDep !== uniGenDep[0]){
                }else {
                    alert("don't leave empty fields 1");+
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
function verifyEmptyIdFieldDep(){
    let idDep = document.getElementById('idDep').value;
    let general = idDep;
    let vacio = " ";

    if(idDep.length >0){
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
function cleanFieldsDep(){
    let departmentName = document.getElementById('departmentNameField');
    let departmentSalary = document.getElementById('departmentSalaryField');
    let departmentLevel = document.getElementById('departmentLevelField');
    let emptyField = "";
    //console.log(departmentName,departmentSalary,departmentLevel);
    /*The difference between innerHTML and value is, the last one insert a value of an attribute into a html element,
    when we want to add text into a field we have to use field.value = "text"*/
    departmentName.value = emptyField;
    departmentSalary.value = emptyField;
    departmentLevel.value = emptyField;
}

//Verify existence
function verifyExistenceEmp(){

}

//Show div with fields of department
function showFieldsDep(){
    //This command selects the div which contains the fields
    let divFields = document.getElementById('fieldsDep');
    //This command selects a button of document
    let buttonShow = document.getElementById('btnShowDep');
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
//Show field search by id
function showSearchDep(){
    let divFieldId = document.getElementById('fieldIdDep');
    let buttonSearch = document.getElementById('btnSearchDep');
    let property = divFieldId.getAttribute('hidden');

    if (property){
        divFieldId.removeAttribute('hidden');
        buttonSearch.setAttribute('value', 'Cancel search');
    }else {
        divFieldId.setAttribute('hidden','hidden');
        buttonSearch.setAttribute('value', 'search');
    }
}

// table creator search department by id
function tableCreatorById(dep){
    let placeholderHead = document.querySelector('#headTableDep');
    let placeholder = document.querySelector('#bodyTableDep');
    let out = "";
    out +=`<input class="butIni" type="button" value="close registers" id="btnUpdateDep" onclick="closeTableDep()">`;

    out +=`
            <tr class="backGroundCell">
            <td>Id department</td>
            <td>department Name</td>
            <td>department Salary</td>
            <td>Department level</td>
            </tr>
        `;
    placeholderHead.innerHTML = out;

    out = "";
    out +=`
            <tr class="backGroundCell">
            <td>${dep.idDep}</td>
            <td>${dep.departmentName}</td>
            <td>${dep.departmentSalary}</td>
            <td>${dep.departmentLevel}</td>
            <td><button class="butInternal" value="details" onclick="deleteDepartment(${dep.idDep})">Delete</button></td>
            </tr>
        `;
    placeholder.innerHTML = out;
}