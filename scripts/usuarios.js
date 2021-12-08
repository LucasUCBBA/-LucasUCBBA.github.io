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
var database = firebase.database();
//U S U A R I O S
var uid = firebase.database().ref('Users');
var key = uid.parent;

firebase.database().ref('Users').on('value',(data)=>{
    
    let Users = data.val();
    document.getElementById('tablaUsers').innerHTML='';
    for (const user in Users){
        document.getElementById('tablaUsers').innerHTML+=`
        <tr>
            <td class="mdl-data-table__cell--non-numeric">${Users[user].idUser}</td>
            <td class="mdl-data-table__cell--non-numeric">${Users[user].email}</td>
            <td class="mdl-data-table__cell--non-numeric">${Users[user].name}</td>
        </tr>
        `;
    }
    
    
    
});
