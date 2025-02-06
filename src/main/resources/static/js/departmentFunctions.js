const prod = false;
let basic_urlDep, modified_urlDep;
if(prod){
    //End points for VM ip
    basic_urlDep = 'http://134.65.16.219:8080/api/departments';
    modified_urlDep = 'http://134.65.16.219:8080/api/departments/';
}else{
    //End points for local host
    basic_urlDep = 'http://localhost:8080/api/departments';
    modified_urlDep = 'http://localhost:8080/api/departments/';
}

//////////////////////Root Methods for departments///////////////////////////////////////
// ROOT CREATE DEPARTMENT
async function rootCreateDep(){
    if(verifyEmptyFieldsDep()!==false){
        await postDepartment();
        cleanFieldsDep();
    }
}
// ROOT GET ALL VEHICLES
async function rootGetDepartmentById() {
    let test;
    if(verifyEmptyIdFieldDep()!==false) {
        test=true;
    }
    if (test && verifyNumberDep()) {
        test = 'passed';
    }
    if (test==='passed'){
        await getDepartmentById();
    }
}

// ROOT UPDATE DEPARTMENT
async function rootUpdateDep(){
    if (verifyEmptyFieldsUpdateDep()!==false){
        let upStatus = updateDepartment();
        if(upStatus){
            alert("Department has been successfully updated");
            cleanFieldsUpdateDep();
            showFieldsUpdateDep(true);
            await getDepartments(true)
        }
        if(upStatus===false){
            alert("Department couldn't be updated");
        }
    }
}

///////////////////// CRUD CONSUMING METHODS ////////////////////////////////////

// GET ALL DEPARTMENTS
async function getDepartments(direct){
    fetch(basic_urlDep) //This line sends and promise to that url, by defect the method is GET
    .then((resp)=>{
        return resp.json(); //This line becomes resp into a JSON object
    })
    .then((departments)=>{
        let butState = document.getElementById('getDepartments').getAttribute('value');
        let butVal =document.getElementById('getDepartments');
        if(butState==='Show Registers' && departments || direct){
            activeAnimationTable();
            tableCreatorAll(departments);
            butVal.setAttribute('value', "Close Registers");
        }else {
            closeTableDep();
            butVal.setAttribute('value', "Show Registers");
        }
    })
    .catch((err)=>{
        alert(err.message);
    });
}

// GET A DEPARTMENT BY ID
async function getDepartmentById(){
    let idDepartment = document.getElementById("idDep").value;
    fetch(modified_urlDep+idDepartment)
    .then((response)=>{
        return response.json();
    })
    .then((resJson)=>{
        if(resJson.status===404){
            alert(`The department's id isn't exist: status: ${resJson.status}`);
        }else if(resJson.status===500){
            alert(`There was an error, status: ${resJson.status}`);
        }else {
            activeAnimationTable();
            tableCreatorById(resJson);
        }
    }).catch((err)=>{
        alert(err.message);
    });
}

// DELETE A VEHICLE BY ID
async function deleteDepartment(idDep){
    //let idEmployee = document.getElementById()
    fetch(modified_urlDep+idDep,{
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => {
        switch (response.status){
            case 200: {
                alert("the department has been deleted");
                getDepartments(true);
                break;
            }
            case 500:{
                alert("It wasn't possible to delete the department");
                break;
            }
        }
    }).catch((err) => {
        alert(`error: ${err.message}`);
    });
}

// CREATE A DEPARTMENT
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
    }).then((response)=>{
        switch (response.status){
            case 201:{
                alert(`The department has been created, status: ${response.status}`);
                getDepartments();
                break;
            }
            case 500:{
                alert(`There was an error, status: ${response.status}`);
                break;
            }
        }
    });
}

// UPDATE A DEPARTMENT TAKING VALUES FROM FORM UPDATE
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
    }).then((response)=>{
        switch (response.status){
            case 500 : {
                alert( `There was an error, status: ${response.status}`);
                return false;
            }
            case 200 : {
                return true;
            }
        }
    });
}

//////////////////////// PRINTING METHODS AND FORM VALIDATIONS ///////////////////////////////////////

// 1.0 CLOSE TABLE CONTAINER BY EXECUTING THE ANIMATION AND THEN REMOVING CONTENT ----------------
function closeTableDep(){
    //select elements by id from document html.
    let headTable = document.querySelector('#headTableDep');
    let bodyTable = document.querySelector('#bodyTableDep');
    let empty = "";
    deactivateAnimationTable();
    setTimeout(()=>{
        headTable.innerHTML = empty;
        bodyTable.innerHTML = empty;
    },300);
    /**
     * Disclaimer:
     * Timeout must be minor than animation duration, otherwise, it will affect other functions...
     * case of "show table" and "close table" in which, when the table was closed the timeout to remove the content...
     * was executed after finishing the animation; so that it affected the "show table" removing the tables content.
     *
     * */
}
// 1.1 PRINT TABLE (ALL DEPARTMENTS
function tableCreatorAll(departments){
    let tableHead = document.querySelector('#headTableDep');
    let tableBody = document.querySelector('#bodyTableDep');
    let cont = `
            <tr>
                <td>Id department</td>
                <td>department Name</td>
                <td>department Salary</td>
                <td>Department level</td>
                <td>Update</td>
                <td>Delete</td>
            </tr>`;

    tableHead.innerHTML = cont;
    cont = "";

    for (let department of departments){
        cont +=`
                <tr>
                    <td>${department.idDep}</td>
                    <td>${department.departmentName}</td>
                    <td>${department.departmentSalary}</td>
                    <td>${department.departmentLevel}</td>
                    <td><button class="butInternal" value="updateDep" onclick="fillUpFieldsDep(${department.idDep})">Update</button></td>
                    <td><button class="butInternal" value="deleteDep" onclick="deleteDepartment(${department.idDep})">Delete</button></td>
                </tr>`;
    }
    tableBody.innerHTML = cont;
}
// 1.2 PRINT TABLE (ONE DEPARTMENT ONLY)
function tableCreatorById(dep){
    let placeholderHead = document.querySelector('#headTableDep');
    let placeholder = document.querySelector('#bodyTableDep');
    let cont = `
            <tr>
            <td>Id department</td>
            <td>department Name</td>
            <td>department Salary</td>
            <td>Department level</td>
            <td>Update</td>
            <td>Delete</td>
            </tr>`;
    placeholderHead.innerHTML = cont;

    cont = "";
    cont +=`
            <tr>
            <td>${dep.idDep}</td>
            <td>${dep.departmentName}</td>
            <td>${dep.departmentSalary}</td>
            <td>${dep.departmentLevel}</td>
            <td><button class="butInternal" value="updateDep" onclick="fillUpFieldsDep(${dep.idDep})">Update</button></td>
            <td><button class="butInternal" value="deleteDep" onclick="deleteDepartment(${dep.idDep})">Delete</button></td>
            </tr>
        `;
    placeholder.innerHTML = cont;
}
// 1.3 ACTIVATE ANIMATION FOR TABLE CONTAINER (FADE IN)
function activeAnimationTable(){
    let tableEmp= document.querySelector("#tableDep");
    let classTable = tableEmp.classList.contains('tableCenter')
    if(classTable){
        tableEmp.classList.remove('tableCenter');
        tableEmp.classList.add('tableAnimation');
    }
}
// 1.4 DEACTIVATE ANIMATION FOR TABLE CONTAINER (FADE OUT)
function deactivateAnimationTable(){
    let tableEmp= document.querySelector("#tableDep");
    let classTable = tableEmp.classList.contains('tableAnimation')
    if(classTable){
        tableEmp.classList.remove('tableAnimation');
        tableEmp.classList.add('tableCenter');
    }
}

// 2.0 VERY EMPTY INPUT FIELDS CREATE FORM ----------------------------------------------------------
function verifyEmptyFieldsDep(){
    let departmentName = document.getElementById('departmentNameField').value;
    let departmentSalary = document.getElementById('departmentSalaryField').value;
    let departmentLevel = document.getElementById('departmentLevelField').value;
    let generalDep = [departmentName,departmentSalary,departmentLevel];
    let emptyDep = " ";

    if(departmentName.length >0 && departmentSalary.length >0 && departmentLevel.length >0){
        for (let a=0;a<generalDep.length;a++){
            let uniGenDep = [];
            uniGenDep+=generalDep[a];
            for(let a2=0;a2<uniGenDep.length;a2++){
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
// 2.1 CLEAN INPUT FIELDS IN CREATE FORM
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
// 2.2 PRINT AND REMOVE CRATE FORM
function showFieldsDep(){
    //This command selects the div which contains the fields
    let formCrDep = document.getElementById('fieldsDep');
    //This command selects a button of document
    let buttonShow = document.getElementById('btnShowDep');
    //This command chooses attributes of a div: hidden = "hidden"
    // let property = divFields.getAttribute('hidden');

    let formContent = `
        <input type="text" id="departmentNameField" placeholder="department name"><br>
        <input type="number" id="departmentSalaryField" placeholder="department salary"><br>
        <input type="text" id="departmentLevelField" placeholder="department level"><br>
        <input class="butIni" type="button" value="Confirm Register" id="btnCreateDep" onclick="rootCreateDep()">
    `;

    if(buttonShow.getAttribute("value")==="Create register"){
        formCrDep.classList.remove("formsStyle");
        formCrDep.classList.add("formsStyle--active");
        buttonShow.setAttribute('value', 'Cancel register');
        formCrDep.innerHTML += formContent;
    }else {
        formCrDep.classList.remove("formsStyle--active");
        formCrDep.classList.add("formsStyle");
        buttonShow.setAttribute('value','Create register');
        setTimeout(()=>{
            formCrDep.innerHTML = '';
        }, 300);
    }
}

// 3.0 CHECK IF DEPARTMENT'S ID IS A NUMBER IN SEARCH FORM -----------------------------------------
function verifyNumberDep(){
    let fieldValue = document.getElementById('idDep').value;
    let intValue = parseInt(fieldValue);
    if (!isNaN(intValue)){
        return true;
    }else {
        alert("Only numbers are allowed");
    }
}
// 3.1 VERIFY EMPTY INPUT FIELDS IN SEARCH FORM
function verifyEmptyIdFieldDep(){
    let idDep = document.getElementById('idDep').value;
    let general = idDep;
    let empty = " ";

    if(idDep.length >0){
        for (let i=0;i<general.length;i++){
            let uniGen = [];
            uniGen+=general;
            for(let i2=0;i2<uniGen.length;i2++){
                if(empty!== uniGen[i2]){
                    return true;
                }else {
                    alert("don't leave empty fields 1");
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
function showSearchDep(){
    let formFindId = document.getElementById('fieldIdDep');
    let buttonSearchDep = document.getElementById('btnSearchDep');
    let buttonShow = document.getElementById('getDepartments');
    let contForm = `
        <p class="footer">!Please! Insert a department's id to search it in the system.</p>
        <input type="number" id="idDep" placeholder="id department">
        <input class="butIni" type="button" value="Confirm" id="btnConfirmDep" onclick="rootGetDepartmentById()">
    `;

    if(buttonSearchDep.getAttribute("value")==='Search'){
        formFindId.classList.remove("formsStyle");
        formFindId.classList.add("formsStyle--active");
        buttonSearchDep.setAttribute('value', 'Close search');
        formFindId.innerHTML = contForm;
    }else {
        formFindId.classList.remove("formsStyle--active");
        formFindId.classList.add("formsStyle");
        buttonSearchDep.setAttribute('value', 'Search');
        buttonShow.setAttribute('value', 'Show Registers');
        closeTableDep();
        setTimeout(()=>{
            formFindId.innerHTML = '';
        }, 300);
    }
}

// 4.0 VERIFY EMPTY INPUT FIELDS IN UPDATE FORM ----------------------------------------------------
function verifyEmptyFieldsUpdateDep(){
    let departmentName = document.getElementById('departmentName').value;
    let departmentSalary = document.getElementById('departmentSalary').value;
    let departmentLevel = document.getElementById('departmentLevel').value;
    let generalUpdate = [departmentName,departmentSalary,departmentLevel];
    let empty = " ";

    if(departmentName.length >0 && departmentSalary.length >0 && departmentLevel.length >0){
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
function showFieldsUpdateDep(direct){
    //This command selects the div which contains the fields
    let formUpDep = document.getElementById('fieldsUpdateDep');
    //This command selects a button of document
    let btnCanUpd = document.getElementById('btnCancelUpdateDep').getAttribute("value");
    // EXECUTING A FADE OUT AND THEN REMOVING CONTENT
    if (btnCanUpd==="Cancel Update" || direct){
        formUpDep.classList.remove('formsStyle--active');
        formUpDep.classList.add('formsStyle');
        setTimeout(()=>{
            formUpDep.innerHTML = "";
        }, 300);
    }

}
// 4.2 PRINT UPDATE FORM
function fillUpFieldsDep(id){
    fetch(modified_urlDep+id)
    .then((response)=>{
        return response.json();
    })
    .then((department)=>{
        let formUpVeh = document.getElementById('fieldsUpdateDep');
        formUpVeh.classList.remove('formsStyle');
        formUpVeh.classList.add('formsStyle--active');
        formUpVeh.innerHTML = `
            <input type="text" id="id_Department" placeholder="Id Department" value="${department.idDep}" disabled><br>
            <input type="text" id="departmentName" placeholder="Department name" value="${department.departmentName}"><br>
            <input type="number" id="departmentSalary" placeholder="Department salary" value="${department.departmentSalary}"><br>
            <input type="text" id="departmentLevel" placeholder="Department level" value="${department.departmentLevel}"><br>
            <input class="butIni" type="button" value="Confirm Update" id="btnUpdateDep" onclick="rootUpdateDep()">
            <input class="butIni" type="button" value="Cancel Update" id="btnCancelUpdateDep" onclick="showFieldsUpdateDep()">
        `;
    });
}
// 4.3 CLEAN INPUT FIELDS OF UPDATE FORM
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

