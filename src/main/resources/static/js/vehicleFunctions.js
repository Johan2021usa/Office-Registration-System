//End points for VM ip
const basic_urlVeh = 'http://134.65.16.219:8080/api/vehicles';
const modified_urlVeh = 'http://134.65.16.219:8080/api/vehicles/';

//End points for local host
// const basic_urlVeh = 'http://localhost:8080/api/vehicles';
// const modified_urlVeh = 'http://localhost:8080/api/vehicles/';


////////////////////// Root Methods for vehicles ///////////////////////////////////////

//Root create vehicles
function rootCreateVeh(){
    if(verifyEmptyFieldsVeh()!==false){
        postVehicles();
        cleanFieldsVeh();
    }
}

// Root get Vehicles
async function rootGetVehicleByID() {
    switch (verifyEmptyIdFieldVeh()) {
        case !false:
                switch (verifyNumberVeh()) {
                    case true: getVehicleById();
                        break;
                }
            break;
    }
}

//Root update vehicles
async function rootUpdateVeh(){
    if (verifyEmptyFieldsUpdateVeh()!=false){
        updateVehicle();
        cleanFieldsUpdateVeh();
        showFieldsUpdateVeh();
    }
}

/////////////////////Internal methods for departments////////////////////////////////////

//get employee method
async function getVehicles(){
    activeAnimationTable();
    //This line sends and promise to that url, by defect the method is get, if you wan
    fetch(basic_urlVeh)
        //this line gets a response and put those values into a resp variable
    .then(
        //here we are going to create a method or functions that receives a response and converts it into a Json format, this is an clear way to show how promises works.
        function (resp){
            /** Theory: FETCH GET METHOD
             * each time we carry out a request using fetch and this one is a GET METHOD,
             * we are forced to return the response to work with it in the next promise,
             * in this case we return an JSON object based on the response.
             * resp.json = vehicles
             * */
            return resp.json();
        }
    ).then(
        function (vehicles){
            let placeholderHead = document.querySelector('#headTableVeh');
            let placeholder = document.querySelector('#bodyTableVeh');
            let out = "";
            out +=`<input class="butIni" type="button" value="close registers" id="btnUpdateVeh" onclick="closeTableVeh()">`;

            out +=`
                    <tr class="backGroundCell">
                        <td>Id vehicle</td>
                        <td>Plate</td>
                        <td>Brand</td>
                        <td>Model</td>
                        <td>Color</td>
                        <td>Department</td>
                        <td>Delete</td>
                        <td>Update</td>
                    </tr>
                `;

            placeholderHead.innerHTML = out;
            out = "";

            for (let vehicle of vehicles){
                out +=`
                    <tr class="backGroundCell">
                        <td>${vehicle.idVehicle}</td>
                        <td>${vehicle.plate}</td>
                        <td>${vehicle.brand}</td>
                        <td>${vehicle.model}</td>
                        <td>${vehicle.color}</td>
                        <td><button class="butInternal" value="details" onclick="vehicleDepartmentDet(${vehicle.idVehicle})">${vehicle.department.departmentName}</button></td>
                        <td><button class="butInternal" value="details" onclick="deleteVehicle(${vehicle.idVehicle})">Delete</button></td>
                        <td><button class="butInternal" value="details" onclick="fillOutFieldsVeh(${vehicle.idVehicle})">Update</button></td>
                    </tr>
                `;
            }
            placeholder.innerHTML = out;
        }
    )
}

//Get vehicle's department
function vehicleDepartmentDet(id){
    fetch(modified_urlVeh+id)
    .then(
        function (response){
            return response.json();
        }
    ).then(
        function (vehicle) {
            console.log(vehicle);
            let placeholderHead = document.querySelector('#headTableVeh');
            let placeholder = document.querySelector('#bodyTableVeh');
            let out = "";
            out +=`<input class="butIni" type="button" value="close registers" id="btnUpdate" onclick="closeTableVeh()">`;

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
                    <td>${vehicle.department.idDep}</td>
                    <td>${vehicle.department.departmentName}</td>
                    <td>${vehicle.department.departmentSalary}</td>
                    <td>${vehicle.department.departmentLevel}</td>
                `;
            /*innerHTML is a better way to insert information in the html document, in this case the code is adding
            the variable called out, which contains the table looped.
            * */
            placeholder.innerHTML = out;
        }
    )
}

//Delete method with fetch
async function deleteVehicle(idVehicle){
    //let idEmployee = document.getElementById()
    fetch(modified_urlVeh+idVehicle,{
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => {
        switch (response.status){
            case 200:
                alert("The vehicle has been deleted");
                getVehicles();
                break;
            case 500:
                alert("It wasn't possible to delete the vehicle, try to delete the department or employee related first");
                break;
        }
    })
}

//Post method with fetch
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
    }).then(
        function (response){
            switch (response.status){
                case 201:
                    alert("The vehicle has been created");
                    getVehicles();
                    break;
            }
        }
    )
}

//Get department by id (search by id)
async function getVehicleById(){
    activeAnimationTable();
    let idVehicle = document.getElementById("idVehicleSearch").value;
    fetch(modified_urlVeh+idVehicle)
        .then(
            function (response){
                return response.json();
            }
        ).then(
        function (vehicle){
            //it's other way to compare the status 200/201 etc.
            if(typeof vehicle.idVehicle === "number"){
                tableCreatorById(vehicle);
            }else{
                alert("The vehicle's id doesn't exist");
                stop();
            }
        }
    )
}

// Update department (update form)
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
    }).then(
        function (response){
            switch (response.status){
                case 500 :
                    alert("There was an error: status 500");
                    break;
                case 200 :
                    alert("The vehicle has been updated");
                    getVehicles();
                    break;
            }
        }
    )
}

//////////////////////// Functional methods for HTML documents ///////////////////////////////////////

//close table
function closeTableVeh(){
    //select elements by id from document html.
    let close = document.querySelector('#headTableVeh');
    let closeTwo = document.querySelector('#bodyTableVeh');
    //variable to be set
    let empty = "";
    //insert empty into document through an variable.
    close.innerHTML = empty;
    closeTwo.innerHTML = empty;
    deactivateAnimationTable();
}

//Verify if value is a number (search by id)
function verifyNumberVeh(){
    let fieldValue = document.getElementById('idVehicleSearch').value;
    let intValue = parseInt(fieldValue);
    if (!isNaN(intValue)){
        return true;
    }else {
        alert("Only numbers are allowed");
    }
}

//Verify empty values inside fields (create vehicle form)
function verifyEmptyFieldsVeh(){
    let vehiclePlateCreate = document.getElementById('plateCreate').value;
    let vehicleBrandCreate = document.getElementById('brandCreate').value;
    let vehicleModelCreate = document.getElementById('modelCreate').value;
    let vehicleColorCreate = document.getElementById('colorCreate').value;
    let departmentIdCreate = document.getElementById('departmentIdCreate').value;
    let generalVeh = [vehiclePlateCreate,vehicleBrandCreate,vehicleModelCreate,vehicleColorCreate, departmentIdCreate];
    let emptyVeh = " ";

    if(vehiclePlateCreate.length>0 && vehicleBrandCreate.length>0 && vehicleModelCreate.length>0 && vehicleColorCreate.length>0 && departmentIdCreate.length>0){
        for (a=0;a<generalVeh.length;a++){
            let uniGenDep = [];
            uniGenDep+=generalVeh[a];
            for(a2=0;a2<uniGenDep.length;a2++){
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

//Verify empty fields (search by id)
function verifyEmptyIdFieldVeh(){
    let idVeh = document.getElementById('idVehicleSearch').value;
    let general = idVeh;
    let empty = " ";

    if(idVeh.length >0){
        for (i=0;i<general.length;i++){
            let uniGen = [];
            uniGen+=general;
            for(i2=0;i2<uniGen.length;i2++){
                if(empty!= uniGen[i2]){
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

//Verify empty values inside fields (update form)
function verifyEmptyFieldsUpdateVeh(){
    let vehiclePlateUpdate = document.getElementById('plateUpdate').value;
    let vehicleBrandUpdate = document.getElementById('brandUpdate').value;
    let vehicleModelUpdate = document.getElementById('modelUpdate').value;
    let vehicleColorUpdate = document.getElementById('colorUpdate').value;
    let generalUpdate = [vehiclePlateUpdate,vehicleBrandUpdate,vehicleModelUpdate,vehicleColorUpdate];
    let empty = " ";

    if(vehiclePlateUpdate.length >0 && vehicleBrandUpdate.length >0 && vehicleColorUpdate.length >0){
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

// Clean fields (Create forms)
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

//Show forms (create forms)
function showCreateFieldsVeh(){
    //This command selects the div which contains the fields
    let divFields = document.getElementById('fieldsCreateVeh');
    //This command selects a button of document
    let buttonShow = document.getElementById('btnShowVeh');
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

//Show forms (search by id)
function showSearchVeh(){
    let divFieldId = document.getElementById('fieldIdVeh');
    let buttonSearch = document.getElementById('btnSearchVeh');
    let property = divFieldId.getAttribute('hidden');

    if (property){
        divFieldId.removeAttribute('hidden');
        buttonSearch.setAttribute('value', 'Cancel search');
    }else {
        divFieldId.setAttribute('hidden','hidden');
        buttonSearch.setAttribute('value', 'Search');
    }
}

// table creator vehicle by id
function tableCreatorById(vehicle){
    let placeholderHead = document.querySelector('#headTableVeh');
    let placeholder = document.querySelector('#bodyTableVeh');
    let out = "";
    out +=`<input class="butIni" type="button" value="close registers" id="btnUpdateDep" onclick="closeTableVeh()">`;

    out +=`
            <tr class="backGroundCell">
                <td>Id vehicle</td>
                <td>Plate</td>
                <td>Brand</td>
                <td>Model</td>
                <td>Color</td>
                <td>Department</td>
                <td>Update</td>
                <td>Delete</td>
            </tr>
        `;
    placeholderHead.innerHTML = out;

    out = "";
    out +=`
            <tr class="backGroundCell">
                <td>${vehicle.idVehicle}</td>
                <td>${vehicle.plate}</td>
                <td>${vehicle.brand}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.color}</td>
                <td><button class="butInternal" value="details" onclick="deleteVehicle(${vehicle.idVehicle})">${vehicle.department.departmentName}</button></td>
                <td><button class="butInternal" value="details" onclick="fillOutFieldsVeh(${vehicle.idVehicle})">Update</button></td>
                <td><button class="butInternal" value="details" onclick="deleteVehicle(${vehicle.idVehicle})">Delete</button></td>
            </tr>
        `;
    placeholder.innerHTML = out;
}
// Show Forms (Update vehicle)
function showFieldsUpdateVeh(){
    //This command selects the div which contains the fields
    let divFieldsUpdate = document.getElementById('fieldsUpdateVeh');
    //This command selects a button of document
    let buttonCancelUpdate = document.getElementById('btnCancelUpdateVeh');
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

// Fill out Fields (Update form)
function fillOutFieldsVeh(id){
    fetch(modified_urlVeh+id)
    .then(
        function (response){
            return response.json();
        }
    ).then(
        function (vehicle) {
            let vehicleIdUpdate = document.getElementById('idVehicleUpdate');
            let vehiclePlateUpdate = document.getElementById('plateUpdate');
            let vehicleBrandUpdate = document.getElementById('brandUpdate');
            let vehicleModelUpdate = document.getElementById('modelUpdate');
            let vehicleColorUpdate = document.getElementById('colorUpdate');

            vehicleIdUpdate.value = vehicle.idVehicle;
            vehiclePlateUpdate.value = vehicle.plate;
            vehicleBrandUpdate.value = vehicle.brand;
            vehicleModelUpdate.value = vehicle.model;
            vehicleColorUpdate.value = vehicle.color;
        }
    ).then(
        function (vehicle){
            showFieldsUpdateVeh();
        }
    )
}

//Clean fields (update form)
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


function activeAnimationTable(){
    let tableEmp= document.querySelector("#tableVeh");
    let classTable = tableEmp.classList.contains('tableCenter')
    if(classTable){
        tableEmp.classList.remove('tableCenter');
        tableEmp.classList.add('tableAnimation');
    }
}

function deactivateAnimationTable(){
    let tableEmp= document.querySelector("#tableVeh");
    let classTable = tableEmp.classList.contains('tableAnimation')
    if(classTable){
        tableEmp.classList.remove('tableAnimation');
        tableEmp.classList.add('tableCenter');
    }
}