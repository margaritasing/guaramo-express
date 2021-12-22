//descripcion de la variable db
const db = firebase.firestore();

var usersCollectionRef = db.collection('users')

//Obtener formulario de envío
let submitButton = document.getElementById('submit')

//Creacion del evento Listener
submitButton.addEventListener("click", (e) => {
    //Evitar el comportamiento de envío de formularios predeterminado
    e.preventDefault()
        //traer los campos
    let nombre = document.getElementById('name').value
    let apellido = document.getElementById('surname').value
    let correo = document.getElementById('email').value
    let mensaje = document.getElementById('message').value
        //agregar los campos a la DB
    db.collection("users").doc().set({
            name: nombre,
            surname: apellido,
            email: correo,
            message: mensaje
        }).then(() => {
            console.log("Data saved")
        }).catch((error) => {
            console.log(error)
        })
        //alert
    alert("Su Mensaje fue enviado")
})


