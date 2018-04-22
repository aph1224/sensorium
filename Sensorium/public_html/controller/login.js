
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAvbL0rY4qEe1lYwu7HG0Y8JARtjgChAcM",
    authDomain: "psicproject.firebaseapp.com",
    databaseURL: "https://psicproject.firebaseio.com",
    projectId: "psicproject",
    storageBucket: "psicproject.appspot.com",
    messagingSenderId: "409925314100"
};
firebase.initializeApp(config);




// LOGIN WITH EMAIL
function logIn() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(user, pass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}



// LOGIN WITH GOOGLE ACCOUNT
var provider = new firebase.auth.GoogleAuthProvider();

function logInGoogle() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}



// SESSION AUTHENTICATION
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // Código si está entrando a la sesión
        window.location = "home.html";
    } else {
        // Código si no entró a la sesión
    }
});