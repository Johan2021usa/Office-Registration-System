function ayaxGetSimpleSalon(){
	$.ajax({
	url:'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
	data:'{}',
	type:'GET',
	dataType: 'json',
	contentType: "application/json; charset=utf-8",
	success:function(valoresGet){ //el succes es necesario para crear y almacenar una variable con los datos que recibe ajax en este caso
		//console.log(valoresGet); //sirve para mostrar valoresGet en consola del navegador
		graficarValores(valoresGet) //aqui se esta enviando una variable con datos a una funcion
	},
	error : function(xhr, status) {
		alert('ha sucedido un problema ayax simple:'+ status);	
	}
});
}
function graficarValores(valoresGetRecibidos){
	//console.log(valoresGetRecibidos);
	let miTabla='<table class="edicionCelda" style="width: 100%">'
	$("#contenedor").empty(); //aqui se limpia el contenedor al inicializar la funcion
	for (i=0; i<2; i++){
		miTabla += '<tr>'; //tr significa un piso y cada td es una division del piso
		miTabla += '<td>'+ 'Id'+ '</td>'; 					//td es cada espacio de un piso dos apartamentos en un piso
		miTabla += '<td>'+ 'DUEÑO' + '</td>'; 		
		miTabla += '<td>'+ 'CAPACIDAD' + '</td>'; 		
		miTabla += '<td>'+ 'CATEGORIA_ID'+ '</td>'; 		
		miTabla += '<td>'+ 'NOMBRE' + '</td>';
		miTabla += '<td>'+ 'DETALLE' + '</td>';  		
		miTabla += '<td>'+ 'ELIMINAR' + '</td>';
		miTabla += '</tr>';
		miTabla += '<tr>';
		for (i = 0; i < valoresGetRecibidos.items.length; i++) {
			miTabla += '<td>' + valoresGetRecibidos.items[i].id + '</td>';
			miTabla += '<td>' + valoresGetRecibidos.items[i].owner + '</td>';
			miTabla += '<td>' + valoresGetRecibidos.items[i].capacity + '</td>';
			miTabla += '<td>' + valoresGetRecibidos.items[i].category_id + '</td>';
			miTabla += '<td>' + valoresGetRecibidos.items[i].name + '</td>';
			miTabla += '<td>' + '<input type="button" value="detalle" onclick="detalle(' + valoresGetRecibidos.items[i].id + ')">' + '</td>';
			miTabla += '<td>' + '<input type="button" value="eliminar" onclick="eliminar(' + valoresGetRecibidos.items[i].id + ')">' + '</td>';
			miTabla += '</tr>';
		}
	}
	miTabla += '</table>';
	console.log(miTabla)
	$("#contenedor").append(miTabla); //aquí se esta almacendando los valores de mi tabla en contenedor para ser mostrados en el navegador
}
function crearDatos() {
	let datos = {   //esta variable toma los valores ingresados que se encuentres en los imput y los alacena en una variable (datos)
		id: $("#id").val(),
		owner: $("#owner").val(),
		capacity: $("#capacity").val(),
		category_id: $("#category_id").val(),
		name: $("#name").val()
	};
	if (vacios() == false) {
		let datosJson = JSON.stringify(datos);  //como datos era de tipo string, hay que transformarlo en JSON para poder enviarlos por ajax
		$.ajax({
			url: 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
			data: datosJson, //los valores convertidos se guardan en data para ser enviados 
			type: 'POST', //con el metodo post se envia directo a Oracle Cloud
			dataType: 'json', //Aqui está el tipo de dato que se enviará
			contentType: "application/json; charset=utf-8", //aqui está la codificacion de los datos; estandar
			statusCode: { //esta señal se activa si lo anterior se ha realizao satisfactoriamente y ejecuta mas finciones
				201: function () {
					alert("Se han creado los datos");
					limpiarCampos()
					//consultarDatos()
					ayaxGetSimpleSalon()
				},
				555: function(){
					validarexistenciaSalon(datos.id)
				}
			}
		});
	}
};
function detalle(idR){
	$.ajax({
	url:'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/partyroom/'+idR, //aqui se reciben datos segun la id enviada
	data:{},
	type:'GET',
	dataType: 'json',
	contentType: "application/json; charset=utf-8",
	success:function(valoresRecibidos){
		console.log(valoresRecibidos);
		$("#id").val(valoresRecibidos.items[0].id);
		$("#owner").val(valoresRecibidos.items[0].owner);
		$("#capacity").val(valoresRecibidos.items[0].capacity);
		$("#category_id").val(valoresRecibidos.items[0].category_id);
		$("#name").val(valoresRecibidos.items[0].name);
		desabilitarId();
	},
    	error : function(xhr, status) {
        	alert('ha sucedido un problema: detalle'+ status);
    	}
	});
};
function actualizarDatos() {
	habibilitarId();
	let datos2 = {
		id: $("#id").val(),
		owner: $("#owner").val(),
		capacity: $("#capacity").val(),
		category_id: $("#category_id").val(),
		name: $("#name").val()
	};
	if (vacios() == false) {
		let datosJson = JSON.stringify(datos2);
		$.ajax({
			url: 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
			data: datosJson,
			type: 'PUT',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("Se ha actualizado");
					limpiarCampos()
					//consultarDatos()
					ayaxGetSimpleSalon()
				}
			}
		});
	}
};
function eliminar(idE){
    $.ajax({
		url: 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
        data: JSON.stringify({id: idE}),
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        statusCode: {
            204: function () {
                alert("Elimnado!");
				//consultarDatos();
				ayaxGetSimpleSalon()
            }
        }
	});
};
function limpiarCampos(){
    $('#id').val(''),
    $('#owner').val(''),
    $('#capacity').val(''),
    $('#category_id').val(''),
    $('#name').val('')
}
function vacios(){
	let datos2 = {
			id: $("#id").val(),
			owner: $("#owner").val(),
			capacity: $("#capacity").val(),
			category_id: $("#category_id").val(),
			name: $("#name").val()
		};
	if(datos2.id == '' || datos2.owner == '' || datos2.capacity == '' || datos2.category_id =='' || datos2.name == ''){
		alert("los campos están vacios");
	}else{
		return false
	}
}
function desabilitarId(){
	$("#id").attr('disabled','disable');
}
function habibilitarId(){
	$("#id").removeAttr('disabled','disable');
}
//funciones mensaje-----------------------------------------------------------------------------
function ayaxGetSimpleMessage(){
	$.ajax({
	url:'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message',
	data:'{}',
	type:'GET',
	dataType: 'json',
	contentType: "application/json; charset=utf-8",
	success:function(valoresGetMensaje){ //el succes es necesario para crear y almacenar una variable con los datos que recibe ajax en este caso
		//console.log(valoresGet); //sirve para mostrar valoresGet en consola del navegador
		graficarValoresMessage(valoresGetMensaje) //aqui se esta enviando una variable con datos a una funcion
	},
	error : function(xhr, status) {
		alert('ha sucedido un problema ayax simple:'+ status);
	}
});
}
function graficarValoresMessage(valoresGetRecibidos){
	//console.log(valoresGetRecibidos);
	let miTabla='<table class="edicionCelda">'
	$("#contenedor2").empty(); //aqui se limpia el contenedor al inicializar la funcion
	for (i=0; i<2; i++){
		miTabla += '<tr class="tituloCelda edicionCelda">'; //tr significa un piso y cada td es una division del piso
		miTabla += '<td>'+ 'ID'+ '</td>'; 					//td es cada espacio de un piso dos apartamentos en un piso
		miTabla += '<td>'+ 'MENSAJE' + '</td>';
		miTabla += '<td>'+ 'DETALLE' + '</td>'
		miTabla += '<td>'+ 'ELIMINAR' + '</td>'
		miTabla += '</tr>';
		miTabla += '<tr class="textoCelda edicionCelda">';
		for (i = 0; i < valoresGetRecibidos.items.length; i++) {
			miTabla += '<td>' + valoresGetRecibidos.items[i].id + '</td>';
			miTabla += '<td>' + valoresGetRecibidos.items[i].messagetext + '</td>';
			miTabla += '<td>' + '<input type="button" value="detalle" onclick="detalleMessage(' + valoresGetRecibidos.items[i].id + ')">' + '</td>';
			miTabla += '<td>' + '<input type="button" value="eliminar" onclick="eliminarMessage(' + valoresGetRecibidos.items[i].id + ')">' + '</td>';
			miTabla += '</tr>';
		}
	}
	miTabla += '</table>';
	console.log(miTabla)
	$("#contenedor2").append(miTabla); //aquí se esta almacendando los valores de mi tabla en contenedor para ser mostrados en el navegador
}
function crearDatosMessage() {
	let datosMessage = {   //esta variable toma los valores ingresados que se encuentres en los imput y los alacena en una variable (datos)
		id: $("#id").val(),
		messagetext: $("#messagetext").val()
	}
	if (vacios() == false) {
		let datosJson = JSON.stringify(datosMessage);  //como datos era de tipo string, hay que transformarlo en JSON para poder enviarlos por ajax
		$.ajax({
			url: 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message',
			data: datosJson, //los valores convertidos se guardan en data para ser enviados 
			type: 'POST', //con el metodo post se envia directo a Oracle Cloud
			dataType: 'json', //Aqui está el tipo de dato que se enviará
			contentType: "application/json; charset=utf-8", //aqui está la codificacion de los datos; estandar
			statusCode: { //esta señal se activa si lo anterior se ha realizao satisfactoriamente y ejecuta mas finciones
				201: function () {
					alert("Se han creado los datos");
					limpiarCamposMessage()
					//consultarDatos()
					ayaxGetSimpleMessage()
				},
				555: function(){
					validarexistenciaMessage(datosMessage.id)
				}
			}
		});
	}
};
function detalleMessage(idR2){
	desabilitarMessage()
	$.ajax({
	url:'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/'+idR2, //aqui se reciben datos segun la id enviada
	data:{},
	type:'GET',
	dataType: 'json',
	contentType: "application/json; charset=utf-8",
	success:function(valoresRecibidos){
		console.log(valoresRecibidos);
		$("#id").val(valoresRecibidos.items[0].id);
		$("#messagetext").val(valoresRecibidos.items[0].messagetext);
		desabilitarMessage();
	},
    	error : function(xhr, status) {
        	alert('ha sucedido un problema: detalle'+ status);
    	}
	});
}
function actualizarDatosMessage(){
	let datos2 = {
		id: $("#id").val(),
		messagetext: $("#messagetext").val(),	
	};
	if (vacios() == false) {
		let datosJson = JSON.stringify(datos2);
		$.ajax({
			url: 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message',
			data: datosJson,
			type: 'PUT',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("Se ha actualizado");
					limpiarCamposMessage()
					//consultarDatos()
					ayaxGetSimpleMessage()
				}
			}
		});
	}
}
function eliminarMessage(idE){
    $.ajax({
		url: 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message',
        data: JSON.stringify({id: idE}),
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        statusCode: {
            204: function () {
                alert("Elimnado!");
				//consultarDatos();
				ayaxGetSimpleMessage()
				limpiarCamposMessage()
            }
        }
	});
}
function limpiarCamposMessage(){
    $('#id').val(''),
    $('#messagetext').val('')
}
function vaciosMessage(){
	let datos3 = {
			id: $("#id").val(),
			message: $("#messagetext").val(),
		};
	if(datos3.id == '' || datos3.message == ''){
		alert("los campos están vacios");
	}else{
		return false
	}
}
function desabilitarMessage(){
	$("#id, #messagetext").attr('disabled','disable');
}
function habilitarMessage(){
	$("#id, #messagetext").removeAttr('disabled','disable'),
	limpiarCamposMessage()
}
//--------------------------------------------------------------------------------------------------------------------------
//Funciones employess
// function getEmployee(){
// 	$.ajax({
// 	url:'http://localhost:8080/api/employees',
// 	data:'{}',
// 	type:'GET',
// 	dataType: 'json',
// 	contentType: "application/json; charset=utf-8",
// 		//el succes es necesario para crear y almacenar una variable con los datos que recibe ajax en este caso
//
// 		success : function (dataEmployees){
//
// 			console.log(dataEmployees); //sirve para mostrar valoresGet en consola del navegador
// 			//const stringEmployees = JSON.stringify(dataEmployees);
// 			//console.log(stringEmployees);
// 			graficarValoresClient(dataEmployees) //aqui se esta enviando una variable con datos a una funcion
// 		},
// 			error : function(xhr, status) {
// 			alert('ha sucedido un problema ayax simple:'+ status);
// 		}
// 	});
// }
function graficarEmployee(data){
	console.log(data[])
	let miTabla='<table class="edicionCelda">'
	$("#contenedorEmp").empty(); //aqui se limpia el contenedor al inicializar la funcion
	miTabla += '<tr>'; //tr significa un piso y cada td es una division del piso
		miTabla += '<th>'+ 'ID'+ '</th>'; 					//td es cada espacio de un piso dos apartamentos en un piso
		miTabla += '<th>'+ 'First name' + '</th>';
		miTabla += '<th>'+ 'Last name' + '</th>';
		miTabla += '<th>'+ 'Email'+ '</th>';
		miTabla += '<th>'+ 'DETALLES' + '</th>';
		miTabla += '<th>'+ 'ELIMINAR' + '</th>';
	miTabla += '</tr>';
	for (let i=0;i<data.length;i++) {
		let data1 = [];
		data1 += data[i];
		console.log(data)
		console.log(data1);
		for (let i = 0; i < data1.items.length; i++) {
			miTabla += '<tr>';
			miTabla += '<td>' + data.items[i].id + '</td>';
			miTabla += '<td>' + data.items[i].firstName + '</td>';
			miTabla += '<td>' + data.items[i].lastName + '</td>';
			miTabla += '<td>' + data.items[i].email + '</td>';
			miTabla += '<td>' + '<input type="button" value="detalle" onclick="detalleClient(' + data.items[i].id + ')">' + '</td>';
			miTabla += '<td>' + '<input type="button" value="eliminar" onclick="eliminarClient(' + data.items[i].id + ')">' + '</td>';
			miTabla += '</tr>';
		}
	}
	miTabla += '</table>';
	console.log(miTabla)
	$("#contenedorEmp").append(miTabla); //aquí se esta almacendando los valores de mi tabla en contenedor para ser mostrados en el navegador
}

function crearDatosClient() {
	let datosClient = {   //esta variable toma los valores ingresados que se encuentres en los imput y los alacena en una variable (datos)
		id: $("#id").val(),
		name: $("#first_name").val(),
		email: $("#last_name").val(),
		age: $("#email").val(),
	};
	//if (vaciosClient() == false) {
		let datosJson = JSON.stringify(datosClient);  //como datos era de tipo string, hay que transformarlo en JSON para poder enviarlos por ajax
		$.ajax({
			url: 'http://localhost:8080/api/employees',
			data: datosJson, //los valores convertidos se guardan en data para ser enviados
			type: 'POST', //con el metodo post se envia directo a Oracle Cloud
			dataType: 'json', //Aqui está el tipo de dato que se enviará
			contentType: "application/json; charset=utf-8", //aqui está la codificacion de los datos; estandar
			statusCode: { //esta señal se activa si lo anterior se ha realizao satisfactoriamente y ejecuta mas finciones
				201: function () {
					alert("Se han creado los datos");
					limpiarCamposClient()
					//consultarDatos()
					ayaxGetSimpleClient()
				},
				555: function(){
					validarexistenciaClient(datosClient.id)
				}
			}
		});
	//}
};

function detalleClient(idR3){
	$.ajax({
	url:'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/'+idR3, //aqui se reciben datos segun la id enviada
	data:{},
	type:'GET',
	dataType: 'json',
	contentType: "application/json; charset=utf-8",
	success:function(valoresRecibidosClient){
		console.log(valoresRecibidosClient);
		$("#id").val(valoresRecibidosClient.items[0].id);
		$("#name").val(valoresRecibidosClient.items[0].name);
		$("#email").val(valoresRecibidosClient.items[0].email);
		$("#age").val(valoresRecibidosClient.items[0].age);
		desabilitarId();
		$('#btnactualiza').fadeIn(1000)
	},
    	error : function(xhr, status) {
        	alert('ha sucedido un problema: detalle'+ status);
    	}
	});
}
function actualizarDatosClient(){
	habibilitarId();
	let datos3 = {
		id: $("#id").val(),
		name: $("#name").val(),
		email: $("#email").val(),
		age: $("#age").val(),
	};
	if (vaciosClient() == false) {
		let datosJson = JSON.stringify(datos3);
		$.ajax({
			url: 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/client',
			data: datosJson,
			type: 'PUT',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			statusCode: {
				201: function () {
					alert("Se ha actualizado");
					limpiarCamposClient()
					//consultarDatos()
					ayaxGetSimpleClient()
				}
			}
		});
	}
}
function eliminarClient(idE3){
    $.ajax({
		url: 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/client',
        data: JSON.stringify({id: idE3}),
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        statusCode: {
            204: function () {
                alert("Elimnado!");
				//consultarDatos();
				ayaxGetSimpleClient()
            }
        }
	});
}
function limpiarCamposClient(){
    $('#id').val(''),
    $('#name').val(''),
    $('#email').val(''),
    $('#age').val('')
}
function vaciosClient(){
	let datos3 = {
			id: $("#id").val(),
			name: $("#name").val(),
			email: $("#email").val(),
			age: $("#age").val()
		};
	if(datos3.id == '' || datos3.name == '' || datos3.email == '' || datos3.age ==''){
		alert("los campos están vacios");
	}else{
		return false
	}
}
//-------------------------------------------------------------------------------------------------------------------------------
function validarexistenciaSalon(id){
    $.ajax({    
        url : 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/partyroom/'+id,
        data: "{}",
        type : 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        success : function(respuesta) {
            console.log(respuesta); 
            if(respuesta.items[0].id==id)
                alert("La llave ya existe")
        },
    });
}
function validarexistenciaClient(id2){
    $.ajax({    
        url : 'http://localhost:8080/api/employees'+id2,
        data: "{}",
        type : 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        success : function(respuesta2) {
            console.log(respuesta2); 
            if(respuesta2.items[0].id==id2)
                alert("La llave ya existe")
        },
    });
}
function validarexistenciaMessage(id3){
    $.ajax({    
        url : 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/'+id3,
        data: "{}",
        type : 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        success : function(respuesta) {
            console.log(respuesta); 
            if(respuesta.items[0].id==id3)
                alert("La llave ya existe")
        }
    });
}


// EJEMPLO VALIDACION ID

function validar(){
	$.ajax({    
        url : 'https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/'+$("#id").val(),
        data: "{}",
        type : 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        success : function(r) {
			if(r.items.length == 0){
				console.log('no existe este id')
				$('#btnactualiza').fadeOut(1000)
				$('#btncrear').fadeIn(1000)
			}else{
				console.log('SI existe este id')
				$('#btnactualiza').fadeIn(1000)
				$('#btncrear').fadeOut(1000)
			}
		}
	});
}





/*
	$.get('https://g26540496168d53-reto1basedatos.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/'+$("#id").val(),(r)=>{
		//console.log(r.items.length)
		if(r.items.length == 0){
			console.log('no existe este id')
			$('#btnactualiza').fadeOut(1000)
			$('#btncrear').fadeIn(1000)
		}else{
			console.log('SI existe este id')
			$('#btnactualiza').fadeIn(1000)
			$('#btncrear').fadeOut(1000)
		}
	});
}
*/


