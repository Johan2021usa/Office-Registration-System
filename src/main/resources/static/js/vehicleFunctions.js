//End points for VM ip
//const basic_urlVeh = 'http://134.65.16.219:8080/api/vehicles';
//const modified_urlVeh = 'http://134.65.16.219:8080/api/vehicles/';

//End points for local host
const basic_urlVeh = 'http://localhost:8080/api/vehicles';
const modified_urlVeh = 'http://localhost:8080/api/vehicles/';

////////////////////// Root Methods for vehicles ///////////////////////////////////////

//Root create vehicles
async function rootCreateVeh(){
    if(verifyEmptyFieldsVeh()!==false){
        await postVehicles();
        cleanFieldsVeh();
    }
}

// Root get Vehicles
async function rootGetVehicleByID() {
    let test;
    if (verifyEmptyIdFieldVeh()!==false) {
        test = true;
    }
    if(test && verifyNumberVeh()) {
        test = "passed";
    }
    if(test==="passed"){
        await getVehicleById();
    }
}

//Root update vehicles
async function rootUpdateVeh(){
    if (verifyEmptyFieldsUpdateVeh()!==false){
        let upStatus = updateVehicle();
        //console.log(upStatus);
        if(upStatus){
            alert("Vehicle has been successfully updated");
            cleanFieldsUpdateVeh();
            showFieldsUpdateVeh(true);
            await getVehicles(true);
        }
        if(upStatus===false){
            alert("Vehicle couldn't be updated");
        }
    }
}

///////////////////// CRUD CONSUMING METHODS ////////////////////////////////////

// GET ALL VEHICLES
async function getVehicles(direct){
    //This line sends and promise to that url, by defect the method is GET
    fetch(basic_urlVeh)//this line gets a response and put those values into a resp variable
    .then((resp)=>{
        return resp.json();
    })
    .then((vehicles)=>{
        let butState = document.getElementById('getVehicles').getAttribute('value');
        let butVal =document.getElementById('getVehicles');
        if(butState==='Show Registers' && vehicles || direct){
            activeAnimationTable();
            tableCreatorAll(vehicles);

            butVal.setAttribute('value', "Close Registers");
        }else {
            closeTableVeh();
            butVal.setAttribute('value', "Show Registers");
        }
    })
    .catch((err)=>{
        alert(err.message);
    });
}

// GET A VEHICLE BY ID
async function getVehicleById(){
    let idVehicle = document.getElementById("idVehicleSearch").value;
    fetch(modified_urlVeh+idVehicle)
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        if(response.status===404){
            alert("The vehicle's id isn't existing");
        }else if(response.status===500){
            alert("Server error");
        }else {
            activeAnimationTable();
            tableCreatorById(response);
        }
    }).catch((error)=>{
        console.log(error.message);
    });
}

// GET VEHICLE'S DEPARTMENT ID
function vehicleDepartmentDet(id){
    fetch(modified_urlVeh+id)
    .then((response)=>{
        return response.json();
    }).then((vehicle) =>{
        if(vehicle.status===400 || vehicle.status===500){
            alert(`There was a problem, error: ${vehicle.status}`);
        }else {
            closeTableVeh();
            setTimeout(()=>{
                activeAnimationTable();
                tableVehDepCreator(vehicle);
            },300);
        }
    }).catch((err)=>{
        alert(err.message);
    });
}

// DELETE A VEHICLE BY ID
async function deleteVehicle(idVehicle){
    //let idEmployee = document.getElementById()
    fetch(modified_urlVeh+idVehicle,{
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => {
        switch (response.status){
            case 200: {
                alert("The vehicle has been successfully deleted");
                getVehicles(true);
                break;
            }
            case 500: {
                alert("It wasn't possible to delete the vehicle, try to delete the department or employee related first");
                break;
            }
        }
    });
}

// CREATE A VEHICLE
async function postVehicles(){
    let vehiclePlateCreate = document.getElementById('plateCreate').value;
    let vehicleBrandCreate = document.getElementById('brandCreate').value;
    let vehicleModelCreate = document.getElementById('modelCreate').value;
    let vehicleColorCreate = document.getElementById('colorCreate').value;
    let departmentIdCreate = document.getElementById('departmentIdCreate').value;

    fetch(basic_urlVeh,{
        //Method type
        method: 'POST',
        //Body content
        body: JSON.stringify({
            plate: vehiclePlateCreate,
            brand: vehicleBrandCreate,
            model: vehicleModelCreate,
            color: vehicleColorCreate,
            department:{
                idDep:departmentIdCreate
            }
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response)=>{
        switch (response.status){
            case 201:{
                alert("The vehicle has been created");
                getVehicles();
                break;
            }
            case 500:{
                alert("Server error 500");
                break;
            }
        }
    });
}

// UPDATE A VEHICLE TAKING VALUES FROM FORM UPDATE.
async function updateVehicle(){
    let idVehicleUpdate = document.getElementById('idVehicleUpdate').value;
    let plateVehicleUpdate = document.getElementById('plateUpdate').value;
    let brandVehicleUpdate = document.getElementById('brandUpdate').value;
    let modelVehicleUpdate = document.getElementById('modelUpdate').value;
    let colorVehicleUpdate = document.getElementById('colorUpdate').value;

    fetch(modified_urlVeh+idVehicleUpdate,{
        //Method type
        method: 'PUT',
        //Body content
        body: JSON.stringify({
            // model - local variables
            plate: plateVehicleUpdate,
            brand: brandVehicleUpdate,
            model: modelVehicleUpdate,
            color: colorVehicleUpdate
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response)=>{
        switch (response.status){
            case 500 : {
                alert("There was an error: status 500");
                return false;
            }
            case 200 : {
                return true;
            }
        }
    }).catch((err)=>{
        alert(`Error: ${err.message()}`);
    });
}

//////////////////////// PRINTING METHODS AND FORM VALIDATION ///////////////////////////////////////

// 1.0 CLOSE TABLE CONTAINER BY EXECUTING THE ANIMATION AND THEN REMOVING CONTENT ----------------
function closeTableVeh(){
    //select elements by id from document html.
    let headTable = document.querySelector('#headTableVeh');
    let bodyTable = document.querySelector('#bodyTableVeh');
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
// 1.1 PRINT TABLE (ALL VEHICLES)
function tableCreatorAll(vehicles){
    let tableHead = document.querySelector('#headTableVeh');
    let tableBody = document.querySelector('#bodyTableVeh');
    let cont =`
        <tr class="">
            <td>ID</td>
            <td>Plate</td>
            <td>Brand</td>
            <td>Model</td>
            <td>Color</td>  
            <td>Department</td>
            <td>Update</td>
            <td>Delete</td>
        </tr>`;
    tableHead.innerHTML = cont;
    cont = "";
    for (let vehicle of vehicles){
        cont +=`
            <tr>
                <td>${vehicle.idVehicle}</td>
                <td>${vehicle.plate}</td>
                <td>${vehicle.brand}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.color}</td>
                <td><button class="butInternal butInternal--alt" value="detVehDep" onclick="vehicleDepartmentDet(${vehicle.idVehicle})">${vehicle.department.departmentName}</button></td>                
                <td><button class="butInternal" value="updateVeh" onclick="fillOutFieldsVeh(${vehicle.idVehicle})">Update</button></td>
                <td><button class="butInternal" value="deletVeh" onclick="deleteVehicle(${vehicle.idVehicle})">Delete</button></td>
            </tr>`;
    }
    tableBody.innerHTML = cont;
}
// 1.2 PRINT TABLE (ONE VEHICLE ONLY)
function tableCreatorById(vehicle){
    let placeholderHead = document.querySelector('#headTableVeh');
    let placeholder = document.querySelector('#bodyTableVeh');
    let cont =`
        <tr class="backGroundCell">
            <td>ID</td>
            <td>Plate</td>
            <td>Brand</td>
            <td>Model</td>
            <td>Color</td>
            <td>Department</td>
            <td>Update</td>
            <td>Delete</td>
        </tr>`;
    placeholderHead.innerHTML = cont;
    cont = "";
    cont +=`
        <tr class="backGroundCell">
        <td>${vehicle.idVehicle}</td>
        <td>${vehicle.plate}</td>
        <td>${vehicle.brand}</td>
        <td>${vehicle.model}</td>
        <td>${vehicle.color}</td>
        <td><button class="butInternal butInternal--alt" value="detVehDep" onclick="vehicleDepartmentDet(${vehicle.idVehicle})">${vehicle.department.departmentName}</button></td>
        <td><button class="butInternal" value="updateVeh" onclick="fillOutFieldsVeh(${vehicle.idVehicle})">Update</button></td>
        <td><button class="butInternal" value="deletVeh" onclick="deleteVehicle(${vehicle.idVehicle})">Delete</button></td>
    </tr>`;
    placeholder.innerHTML = cont;
}
// 1.3 PRINTING VEHICLE'S DEPARTMENT
function tableVehDepCreator(vehicle){
    let placeholderHead = document.querySelector('#headTableVeh');
    let placeholder = document.querySelector('#bodyTableVeh');
    let cont =`
        <tr class="backGroundCell">
            <td>ID Department</td>
            <td>Department's name</td>
            <td>Salary</td>
            <td>Department level</td>
        </tr>`;
    placeholderHead.innerHTML = cont;
    cont = "";
    cont += `
        <td>${vehicle.department.idDep}</td>
        <td>${vehicle.department.departmentName}</td>
        <td>${vehicle.department.departmentSalary}</td>
        <td>${vehicle.department.departmentLevel}</td>`;
    placeholder.innerHTML = cont;
}

// 1.4 ACTIVATE ANIMATION FOR TABLE CONTAINER (FADE IN)
function activeAnimationTable(){
    let tableEmp= document.querySelector("#tableVeh");
    let classTable = tableEmp.classList.contains('tableCenter')
    if(classTable){
        tableEmp.classList.remove('tableCenter');
        tableEmp.classList.add('tableAnimation');
    }
}
// 1.5 DEACTIVATE ANIMATION FOR TABLE CONTAINER (FADE OUT)
function deactivateAnimationTable(){
    let tableEmp= document.querySelector("#tableVeh");
    let classTable = tableEmp.classList.contains('tableAnimation')
    if(classTable){
        console.log(classTable);
        tableEmp.classList.remove('tableAnimation');
        tableEmp.classList.add('tableCenter');
    }
}

// 2.0 VERY EMPTY INPUT FIELDS CREATE FORM --------------------------------------------------
function verifyEmptyFieldsVeh(){
    let vehiclePlateCreate = document.getElementById('plateCreate').value;
    let vehicleBrandCreate = document.getElementById('brandCreate').value;
    let vehicleModelCreate = document.getElementById('modelCreate').value;
    let vehicleColorCreate = document.getElementById('colorCreate').value;
    let departmentIdCreate = document.getElementById('departmentIdCreate').value;
    let generalVeh = [vehiclePlateCreate,vehicleBrandCreate,vehicleModelCreate,vehicleColorCreate, departmentIdCreate];
    let emptyVeh = " ";

    if(vehiclePlateCreate.length>0 && vehicleBrandCreate.length>0 && vehicleModelCreate.length>0 && vehicleColorCreate.length>0 && departmentIdCreate.length>0){
        for (let a=0;a<generalVeh.length;a++){
            let uniGenDep = [];
            uniGenDep+=generalVeh[a];
            for(let a2=0;a2<uniGenDep.length;a2++){
                if(emptyVeh !== uniGenDep[0]){
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
function cleanFieldsVeh(){
    let vehiclePlateCreate = document.getElementById('plateCreate');
    let vehicleBrandCreate = document.getElementById('brandCreate');
    let vehicleModelCreate = document.getElementById('modelCreate');
    let vehicleColorCreate = document.getElementById('colorCreate');
    let departmentIdCreate = document.getElementById('departmentIdCreate');

    let emptyField = "";
    /*The difference between innerHTML and value is, the last one insert a value of an attribute into a html element,
    when we want to add text into a field we have to use field.value = "text"*/
    vehiclePlateCreate.value = emptyField;
    vehicleBrandCreate.value = emptyField;
    vehicleModelCreate.value = emptyField;
    vehicleColorCreate.value = emptyField;
    departmentIdCreate.value = emptyField;
}
// 2.2 PRINT AND REMOVE CRATE FORM
function showCreateFieldsVeh(){
    //This command selects the div which contains the fields
    let formCrVeh = document.getElementById('fieldsCreateVeh');
    //This command selects a button of document
    let buttonShow = document.getElementById('btnShowVeh');
    //This command chooses attributes of a div: hidden = "hidden"
    // let property = divFields.getAttribute('hidden');
    // divFields.removeAttribute('hidden');

    let formContent = `
        <input type="text" id="plateCreate" placeholder="Plate"><br>
        <input type="text" id="brandCreate" placeholder="Brand"><br>
        <input type="text" id="modelCreate" placeholder="Model"><br>
        <input type="text" id="colorCreate" placeholder="Color"><br>
        <input type="text" id="departmentIdCreate" placeholder="Department id"><br>
        <input class="butIni" type="button" value="Confirm Register" id="btnCreate" onclick="rootCreateVeh()">`;

    if(buttonShow.getAttribute("value")==="Create register"){
        formCrVeh.classList.remove("formsStyle");
        formCrVeh.classList.add("formsStyle--active");
        buttonShow.setAttribute('value', 'Cancel register');
        formCrVeh.innerHTML += formContent;
    }else {
        formCrVeh.classList.remove("formsStyle--active");
        formCrVeh.classList.add("formsStyle");
        buttonShow.setAttribute('value','Create register');
        setTimeout(()=>{
            formCrVeh.innerHTML = '';
        }, 300);
    }
}

// 3.0 CHECK IF VEHICLE'S ID IS A NUMBER IN SEARCH FORM -----------------------------------------
function verifyNumberVeh(){
    let idVeh = parseInt(document.getElementById('idVehicleSearch').value);
    if (!isNaN(idVeh)){
        return true;
    }else {
        alert("Only numbers are allowed");
    }
}
// 3.1 VERIFY EMPTY INPUT FIELDS IN SEARCH FORM
function verifyEmptyIdFieldVeh(){
    let idVeh = document.getElementById('idVehicleSearch').value;
    let general = idVeh;
    let empty = " ";
    if(idVeh.length >0){
        for (let i=0;i<general.length;i++){
            let uniGen = [];
            uniGen+=general;
            for(let i2=0;i2<uniGen.length;i2++){
                if(empty!==uniGen[i2]){
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
function showSearchVeh(){
    let formFindId = document.getElementById('fieldIdVeh');
    let buttonSearch = document.getElementById('btnSearchVeh');
    let contForm = `
            <p class="footer">!Please! Insert a vehicle's id to search it in the system.</p>
            <input type="number" id="idVehicleSearch" placeholder="id">
            <input class="butIni" type="button" value="Confirm" id="btnConfirm" onclick="rootGetVehicleByID()">`;

    if(buttonSearch.getAttribute("value")==='Search'){
        formFindId.classList.remove("formsStyle");
        formFindId.classList.add("formsStyle--active");
        buttonSearch.setAttribute('value', 'Close search');
        formFindId.innerHTML = contForm;

    }else {
        formFindId.classList.remove("formsStyle--active");
        formFindId.classList.add("formsStyle");
        buttonSearch.setAttribute('value', 'Search');
        closeTableVeh();
        setTimeout(()=>{
            formFindId.innerHTML = '';
        }, 300);
    }
}

// 4.0 VERIFY EMPTY INPUT FIELDS IN UPDATE FORM ----------------------------------------------------
function verifyEmptyFieldsUpdateVeh(){
    let vehiclePlateUpdate = document.getElementById('plateUpdate').value;
    let vehicleBrandUpdate = document.getElementById('brandUpdate').value;
    let vehicleModelUpdate = document.getElementById('modelUpdate').value;
    let vehicleColorUpdate = document.getElementById('colorUpdate').value;
    let generalUpdate = [vehiclePlateUpdate,vehicleBrandUpdate,vehicleModelUpdate,vehicleColorUpdate];
    let empty = " ";

    if(vehiclePlateUpdate.length >0 && vehicleBrandUpdate.length >0 && vehicleColorUpdate.length >0){
        for (let i=0;i<generalUpdate.length;i++){
            let uniGen = [];
            uniGen+=generalUpdate[i];
            for(let i2=0;i2<uniGen.length;i2++){
                if(empty !== uniGen[0]){
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
// 4.1 CLOSE UPDATE FORM
function showFieldsUpdateVeh(direct) {
    //This command selects the div which contains the fields
    let formUpVeh = document.getElementById('fieldsUpdateVeh');
    //This command selects a button of document
    let btnCanUpd = document.getElementById('btnCancelUpdateVeh').getAttribute("value");
    // EXECUTING A FADE OUT AND THEN REMOVING CONTENT
    if (btnCanUpd==="Cancel Update" || direct){
        formUpVeh.classList.remove('formsStyle--active');
        formUpVeh.classList.add('formsStyle');
        setTimeout(()=>{
            formUpVeh.innerHTML = "";
        }, 300);
    }
}
// 4.2 PRINT UPDATE FORM
function fillOutFieldsVeh(id){
    fetch(modified_urlVeh+id)
    .then((response)=>{
        return response.json();
    })
    .then((vehicle)=> {
        let formUpVeh = document.getElementById('fieldsUpdateVeh');
        formUpVeh.classList.remove('formsStyle');
        formUpVeh.classList.add('formsStyle--active');
        formUpVeh.innerHTML = `
            <input type="text" id="idVehicleUpdate" placeholder="ID Vehicle" value="${vehicle.idVehicle}"><br>
            <input type="text" id="plateUpdate" placeholder="Plate" value="${vehicle.plate}"><br>
            <input type="text" id="brandUpdate" placeholder="Brand" value="${vehicle.brand}"><br>
            <input type="text" id="modelUpdate" placeholder="Model" value="${vehicle.model}"><br>
            <input type="text" id="colorUpdate" placeholder="Color" value="${vehicle.color}"><br>
            <input class="butIni" type="button" value="Confirm Update" id="btnUpdateVeh" onclick="rootUpdateVeh()">
            <input class="butIni" type="button" value="Cancel Update" id="btnCancelUpdateVeh" onclick="showFieldsUpdateVeh()">`;
    });
}
// 4.3 CLEAN INPUT FIELDS OF UPDATE FORM
function cleanFieldsUpdateVeh(){
    let vehicleIdUpdate = document.getElementById('idVehicleUpdate');
    let vehiclePlateUpdate = document.getElementById('plateUpdate');
    let vehicleBrandUpdate = document.getElementById('brandUpdate');
    let vehicleModelUpdate = document.getElementById('modelUpdate');
    let vehicleColorUpdate = document.getElementById('colorUpdate');
    let empty = "";
    /*The difference between innerHTML and value is, the last one insert a value of an attribute into a html element,
    when we want to add text into a field we have to use field.value = "text"*/
    vehicleIdUpdate.value = empty;
    vehiclePlateUpdate.value = empty;
    vehicleBrandUpdate.value = empty;
    vehicleModelUpdate.value = empty;
    vehicleColorUpdate.value = empty;
}

