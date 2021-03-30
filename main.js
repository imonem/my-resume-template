//Global Firebase init
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const fancyMenuToggle = document.querySelector('.toggle');
const heroContainer = document.querySelector('.hero-container');

const firebaseConfig = {
    apiKey: "AIzaSyAYVPf7DgKNXR2RMF8PIlj4mb6kmQTCpPY",
    authDomain: "contact-form-30ecd.firebaseapp.com",
    databaseURL: "https://contact-form-30ecd-default-rtdb.firebaseio.com",
    projectId: "contact-form-30ecd",
    storageBucket: "contact-form-30ecd.appspot.com",
    messagingSenderId: "864667746820",
    appId: "1:864667746820:web:4e3dc7345025ff6a6a6b51",
    measurementId: "G-2L72Y8GG7E"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//reference messages
let database = firebase.database();
let messagesReference = database.ref('messages');

// Listener for form submit
fancyMenuToggle.addEventListener('click', () => {
    fancyMenuToggle.classList.toggle('active');
    heroContainer.classList.toggle('active');
});
document.getElementById('contactForm').addEventListener('submit', submitForm);

//submit form to firebase
function submitForm(e) {
    e.preventDefault();
    // fetch value from form
    let name = getInputVal('name');
    let email = getInputVal('email');
    let tel = getInputVal('mobile');
    let notes = getInputVal('notes');

    saveContacts(name, email, tel, notes);
    //alert user of successful contact request submission
    document.querySelector('.alert').style.display = 'block';

    //hide alert after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
    },3000);

    //clear form
    document.getElementById('contactForm').reset();
}

//Get form values
const getInputVal = (id) => {
    return document.getElementById(id).value;
};

//function to save contact to firebase
const saveContacts = (name, email, tel, notes) => {
    let newMessageReference = messagesReference.push();
    newMessageReference.set({
        name: name,
        email: email,
        tel: tel,
        notes: notes
    });
};