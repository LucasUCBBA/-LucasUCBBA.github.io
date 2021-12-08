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
  
  /*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById('login').innerHTML="Logueado "+user.email;
      console.log(user);
    } else {
      document.getElementById('login').innerHTML="No Logueado ";
    }
    });
*/


function login() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;

    if (email != "" && pass != "") {
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(user => {
            window.location='home.html';
        }).catch(error => {
            console.error(error);
            window.alert('Usuario o contraseña incorrectos');
        })



    }

    else {
        window.alert("Llenar campos. ");
    }
};

function registrar(){
    var emailR = document.getElementById('emailReg').value;
    var passR = document.getElementById('passReg').value;
    if (emailR!="" && passR!="") {
        var resultReg = firebase.auth().createUserWithEmailAndPassword(emailR, passR);
        window.alert('Usuario registrado');

        resultReg.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Mensaje : "  + errorMessage)
        });
    }
    else {
        window.alert("Llenar campos");
    }
    
}


//FIRESTORE
var db = firebase.firestore();


//N O T I C I A S

//add a la base de datos 
function guardar(){
    var titulow = document.getElementById('titulo').value;
    var cuerpow = document.getElementById('cuerpo').value;
    var fechaw = document.getElementById('fecha').value;

    db.collection("noticias").add({
        titulo: titulow,
        cuerpo: cuerpow,
        fecha: fechaw
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//leer 'documentos' de la base
var tabla = document.getElementById('tabla');
db.collection("noticias").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '',
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().titulo}`);
        tabla.innerHTML +=`
        <tr>
            <td class="mdl-data-table__cell--non-numeric">${doc.id}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().titulo}</td>
            <td class="mdl-data-table__cell--non-numeric">${doc.data().fecha}</td>
            <td><button class="mdl-button mdl-js-button mdl-button--raised mdl-color--yellow-500" onclick="editar('${doc.id}','${doc.data().titulo}','${doc.data().cuerpo}','${doc.data().fecha}')">Editar</button></td>
            <td><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-color--red" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>
        `

    });
});


//eliminar 'documentos' de la base de datos
function eliminar(id){
    db.collection("noticias").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


//editar 'documentos' de la base de datos
function editar(id,titulo,cuerpo,fecha){
    document.getElementById('titulo').value = titulo;
    document.getElementById('cuerpo').value = cuerpo;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton');

    boton.innerHTML = `Editar`;

    boton.onclick = function(){
        var locusRef = db.collection("noticias").doc(id);

        // Set the "capital" field of the city 'DC'

        var tituloEd = document.getElementById('titulo').value;
        var cuerpoEd = document.getElementById('cuerpo').value;
        var fechaEd = document.getElementById('fecha').value;

        return locusRef.update({
                titulo: tituloEd,
                cuerpo: cuerpoEd,
                fecha: fechaEd
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Ingresar';
            boton.onclick=function(){
                guardar();
            }
            document.getElementById('titulo').value = '';
            document.getElementById('cuerpo').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }   
}




