var firebaseConfig = {
    apiKey: "AIzaSyCR_zePE7SrjGIUQ5j0JydQeIZwE4kx-8E",
    authDomain: "apolo-5ecef.firebaseapp.com",
    databaseURL: "https://apolo-5ecef.firebaseio.com",
    projectId: "apolo-5ecef",
    storageBucket: "apolo-5ecef.appspot.com",
    messagingSenderId: "41362654866",
    appId: "1:41362654866:web:dd576c75985455fb5d484b",
    measurementId: "G-DJWB5L6T2F"
  };
  firebase.initializeApp(firebaseConfig);


var datab = firebase.firestore();
//D O C U M E N T O S




function guardar(){
    var numDocA = document.getElementById('numDoc').value;
    var tipoA = document.getElementById('tipoDoc').value;
    var fechaA = document.getElementById('fechaDoc').value;
    var estadoA = document.getElementById('estadoDoc').value;
    var idOWnerA = document.getElementById('idOwner').value;

    datab.collection("documento").add({
        numDoc: numDocA,
        tipoDoc: tipoA,
        fecha: fechaA,
        estadoDoc: estadoA,
        idOwner: idOWnerA
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//leer 'documentos' de la base
var tabla = document.getElementById('tabladoc1');
datab.collection("documento").where("estadoDoc", "==", "En proceso").onSnapshot((querySnapshot) => {
    tabladoc1.innerHTML = '',
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().numDoc}`);
        tabla.innerHTML +=`
        <tr>
            
            <td class="mdl-data-table__cell--non-numeric">${doc.data().numDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().tipoDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().fecha}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().estadoDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().idOwner}</td>

            
            
        </tr>
        `

    });
});

var tabla2 = document.getElementById('tabladoc2');
datab.collection("documento").where("estadoDoc", "==", "Listo").onSnapshot((querySnapshot) => {
    tabladoc2.innerHTML = '',
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().numDoc}`);
        tabla2.innerHTML +=`
        <tr>
            
            <td class="mdl-data-table__cell--non-numeric">${doc.data().numDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().tipoDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().fecha}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().estadoDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().idOwner}</td>

            
            
        </tr>
        `

    });
});


var tabla3 = document.getElementById('tabladoc3');
datab.collection("documento").where("estadoDoc", "==", "Observado").onSnapshot((querySnapshot) => {
    tabladoc3.innerHTML = '',
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().numDoc}`);
        tabla3.innerHTML +=`
        <tr>
            
            <td class="mdl-data-table__cell--non-numeric">${doc.data().numDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().tipoDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().fecha}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().estadoDoc}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().idOwner}</td>

            
            
        </tr>
        `

    });
});


//eliminar 'documentos' de la base de datos
/*function eliminardoc(id){
    datab.collection("documento").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}*/


//editar 'documentos' de la base de datos
/*function editardoc(id,numDoc,tipoDoc,fecha,estadoDoc, idOwner){
    document.getElementById('numDoc').value = numDoc;
    document.getElementById('tipoDoc').value = tipoDoc;
    document.getElementById('fechaDoc').value = fecha;
    document.getElementById('estadoDoc').value = estadoDoc;
    document.getElementById('idOwner').value = idOwner;

    var boton = document.getElementById('botondoc');

    boton.innerHTML = `Editar`;

    boton.onclick = function(){
        var washingtonRef = datab.collection("documento").doc(id);

        // Set the "capital" field of the city 'DC'

        var numDocEdoc = document.getElementById('numDoc').value;
        var tipoEdoc = document.getElementById('tipoDoc').value;
        var fechaEdoc = document.getElementById('fechaDoc').value;
        var estadoEdoc = document.getElementById('estadoDoc').value;
        var idOwnerEdoc = document.getElementById('idOwner').value;

        return washingtonRef.update({
                numDoc: numDocEdoc,
                tipoDoc: tipoEdoc,
                fecha: fechaEdoc,
                estadoDoc: estadoEdoc,
                idOwner: idOwnerEdoc
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = `Ingresar`;
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }   
}*/
