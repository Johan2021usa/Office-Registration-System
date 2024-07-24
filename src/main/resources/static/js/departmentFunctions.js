//End points for VM ip
// const basic_urlDep = 'http://134.65.16.219:8080/api/departments';
// const modified_urlDep = 'http://134.65.16.219:8080/api/departments/';

//End points for local host
const basic_urlDep = 'http://localhost:8080/api/departments';
const modified_urlDep = 'http://localhost:8080/api/departments/';

// if(employee.status)
//     switch (employee.status){
//         case 500:
//             alert("THE DEPARTMENT DOESN'T EXIST");
//     }

//////////////////////Root Methods for departments///////////////////////////////////////
//Root create department
function rootCreateDep(){
    if(verifyEmptyFieldsDep()!==false){
        postDepartment();
        cleanFieldsDep();
    }
}

async function rootGetDepartmentById() {
    switch (verifyEmptyIdFieldDep()) {
        case !false:
            switch (verifyNumberDep()) {
                case true: getDepartmentById();
                    break;
            }
            break;
    }
}

//Root update employee
async function rootUpdateDep(){
    if (verifyEmptyFieldsUpdateDep()!=false){
        updateDepartment();
        cleanFieldsUpdateDep();
        showFieldsUpdateDep();
    }
}

/////////////////////Internal methods for departments////////////////////////////////////

//get employee method
async function getDepartments(){
    activeAnimationTable();
    //This line sends and promise to that url, by defect the method is get, if you wan
    fetch(basic_urlDep)
    //this line gets a response and put those values into a resp variable
    .then(
        //here we are going to create a method or functions that receives a response and converts it into a Json format, this is an clear way to show how promises works.
        function (resp){
        //This line becomes resp into a JSON object
            return resp.json();
        }
    ).then(
        function (departments){
            let placeholderHead = document.querySelector('#headTableDep');
            let placeholder = document.querySelector('#bodyTableDep');
            let out = "";
            out +=`<input class="butCloseTb" type="button" value="close" id="btnUpdateDep" onclick="closeTableDep()">`;

            out +=`
                    <tr class="backGroundCell">
                        <td>Id department</td>
                        <td>department Name</td>
                        <td>department Salary</td>
                        <td>Department level</td>
                        <td>Delete</td>
                        <td>Update</td>
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
                        <td><button class="butInternal" value="details" onclick="fillUpFieldsDep(${department.idDep})">Update</button></td>
                    </tr>
                `;
            }
            placeholder.innerHTML = out;
        }
    )
}

//Delete method with fetch
async function deleteDepartment(idDep){
    //let idEmployee = document.getElementById()
    fetch(modified_urlDep+idDep,{
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => {
        alert("the department has been deleted");
        getDepartments();
    }).catch(
        err => alert('It was not possible to delete the department')
    )
}

//Post method with fetch
async function postDepartment(){
    let departmentName = document.getElementById('departmentNameField').value;
    let departmentSalary = document.getElementById('departmentSalaryField').value;
    let departmentLevel = document.getElementById('departmentLevelField').value;

    fetch(basic_urlDep,{
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
    }).then(
        function (response){
            switch (response.status){
                case 201:
                    alert("The department has been created");
                    getDepartments();
                    break;
            }
        }
    )
}

//Get department by id
async function getDepartmentById(){
    activeAnimationTable();
    let idDepartment = document.getElementById("idDep").value;
    fetch(modified_urlDep+idDepartment)
    .then(
        function (response){
            return response.json();
        }
    ).then(
        function (department){
            //it's other way to compare the status 200/201 etc.
            if(typeof department.idDep === "number"){
                tableCreatorById(department);
            }else{
                alert("The department's id doesn't exist");
                stop();
            }
        }
    )
}

// Update department
async function updateDepartment(){
    let idDepartment = document.getElementById('id_Department').value;
    let departmentName = document.getElementById('departmentName').value;
    let departmentSalary = document.getElementById('departmentSalary').value;
    let departmentLevel = document.getElementById('departmentLevel').value;

    fetch(modified_urlDep+idDepartment,{
        //Method type
        method: 'PUT',
        //Body content
        body: JSON.stringify({
            // model - local variables
            departmentName: departmentName,
            departmentSalary: departmentSalary,
            departmentLevel: departmentLevel
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(
        function (response){
            console.log(response.status);
            alert("The department has been updated");
            getDepartments();
        }
    )
}

////////////////////////Functional methods for web pages///////////////////////////////////////

//close table
function closeTableDep(){
    //select elements by id from document html.
    let close = document.querySelector('#headTableDep');
    let closeTwo = document.querySelector('#bodyTableDep');
    //variable to be set
    let empty = "";
    //insert empty into document through an variable.
    close.innerHTML = empty;
    closeTwo.innerHTML = empty;
    deactivateAnimationTable();
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
    let emptyDep = " ";

    if(departmentName.length >0 && departmentSalary.length >0 && departmentLevel.length >0){
        for (a=0;a<generalDep.length;a++){
            let uniGenDep = [];
            uniGenDep+=generalDep[a];
            for(a2=0;a2<uniGenDep.length;a2++){
                if(emptyDep !== uniGenDep[0]){
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

//Verify values inside fields update
function verifyEmptyFieldsUpdateDep(){
    let departmentName = document.getElementById('departmentName').value;
    let departmentSalary = document.getElementById('departmentSalary').value;
    let departmentLevel = document.getElementById('departmentLevel').value;
    let generalUpdate = [departmentName,departmentSalary,departmentLevel];
    let empty = " ";

    if(departmentName.length >0 && departmentSalary.length >0 && departmentLevel.length >0){
        for (i=0;i<generalUpdate.length;i++){
            let uniGen = [];
            uniGen+=generalUpdate[i];
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
    out +=`<input class="butCloseTb" type="button" value="close" id="btnUpdateDep" onclick="closeTableDep()">`;

    out +=`
            <tr class="backGroundCell">
            <td>Id department</td>
            <td>department Name</td>
            <td>department Salary</td>
            <td>Department level</td>
            <td>Update</td>
            <td>Delete</td>
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
            <td><button class="butInternal" value="details" onclick="fillUpFieldsDep(${dep.idDep})">Update</button></td>
            <td><button class="butInternal" value="details" onclick="deleteDepartment(${dep.idDep})">Delete</button></td>
            </tr>
        `;
    placeholder.innerHTML = out;
}

function showFieldsUpdateDep(){
    //This command selects the div which contains the fields
    let divFieldsUpdate = document.getElementById('fieldsUpdateDep');
    //This command selects a button of document
    let buttonCancelUpdate = document.getElementById('btnCancelUpdateDep');
    //This command chooses attributes of a div: hidden = "hidden"
    let property = divFieldsUpdate.getAttribute('hidden');

    //if property (hidden = hidden) remove property hidden
    if(property) {
        divFieldsUpdate.removeAttribute('hidden');
        //set an attribute "value" as "close" = value = "close"
        buttonCancelUpdate.setAttribute('value', 'Cancel Update');
    }else {
        divFieldsUpdate.setAttribute('hidden','hidden');
    }
}

function fillUpFieldsDep(id){
    fetch(modified_urlDep+id)
        .then(
            function (response){
                return response.json();
            }
        ).then(
        function (department) {
            let idDepartment = document.getElementById('id_Department');
            let departmentName = document.getElementById('departmentName');
            let departmentSalary = document.getElementById('departmentSalary');
            let departmentLevel = document.getElementById('departmentLevel');

            idDepartment.value = department.idDep;
            departmentName.value = department.departmentName;
            departmentSalary.value = department.departmentSalary;
            departmentLevel.value = department.departmentLevel;
        }
    ).then(
        showFieldsUpdateDep()
    )
}

//Clean fields update form
function cleanFieldsUpdateDep(){
    let idDepartment = document.getElementById('id_Department');
    let departmentName = document.getElementById('departmentName');
    let departmentSalary = document.getElementById('departmentSalary');
    let departmentLevel = document.getElementById('departmentLevel');
    let empty = "";
    /*The difference between innerHTML and value is, the last one insert a value of an attribute into a html element,
    when we want to add text into a field we have to use field.value = "text"*/
    idDepartment.value = empty;
    departmentName.value = empty;
    departmentSalary.value = empty;
    departmentLevel.value = empty;
}

function activeAnimationTable(){
    let tableEmp= document.querySelector("#tableDep");
    let classTable = tableEmp.classList.contains('tableCenter')
    if(classTable){
        tableEmp.classList.remove('tableCenter');
        tableEmp.classList.add('tableAnimation');
    }
}

function deactivateAnimationTable(){
    let tableEmp= document.querySelector("#tableDep");
    let classTable = tableEmp.classList.contains('tableAnimation')
    if(classTable){
        tableEmp.classList.remove('tableAnimation');
        tableEmp.classList.add('tableCenter');
    }
}