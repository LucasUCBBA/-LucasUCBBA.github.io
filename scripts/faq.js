// Your web app's Firebase configuration
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

//I N F O - F A Q

//add a la base de datos 
function guardar(){
    var tituloi = document.getElementById('tituloInfo').value;
    var cuerpoi = document.getElementById('cuerpoInfo').value;
    var reqi = document.getElementById('reqInfo').value;

    db.collection("informacion").add({
        tituloInfo: tituloi,
        cuerpoInfo: cuerpoi,
        reqInfo: reqi
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//leer 'documentos' de la base
var tabla = document.getElementById('tablaInfo');
db.collection("informacion").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '',
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().tituloInfo}`);
        tabla.innerHTML +=`
        <tr>
            <td class="mdl-data-table__cell--non-numeric">${doc.id}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().tituloInfo}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().reqInfo}</td>
            <td><button class="mdl-button mdl-js-button mdl-button--raised mdl-color--yellow-500" onclick="editar('${doc.id}','${doc.data().tituloInfo}','${doc.data().cuerpoInfo}','${doc.data().reqInfo}')">Editar</button></td>
            <td><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-color--red" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>
        `

    });
});


//eliminar 'documentos' de la base de datos
function eliminar(id){
    db.collection("informacion").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


//editar 'documentos' de la base de datos
function editar(id,tituloi,cuerpoi,reqi){
    document.getElementById('tituloInfo').value = tituloi;
    document.getElementById('cuerpoInfo').value = cuerpoi;
    document.getElementById('reqInfo').value = reqi;
    var boton = document.getElementById('boton');

    boton.innerHTML = `Editar`;

    boton.onclick = function(){
        var locusRef = db.collection("informacion").doc(id);

        // Set the "capital" field of the city 'DC'

        var tituloEd = document.getElementById('tituloInfo').value;
        var cuerpoEd = document.getElementById('cuerpoInfo').value;
        var reqEd = document.getElementById('reqInfo').value;

        return locusRef.update({
                tituloInfo: tituloEd,
                cuerpoInfo: cuerpoEd,
                reqInfo: reqEd
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = `Ingresar`;
            boton.onclick=function(){
                guardar();
            }
            document.getElementById('tituloInfo').value = '';
            document.getElementById('cuerpoInfo').value = '';
            document.getElementById('reqInfo').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }   
}