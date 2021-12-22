const card = document.getElementById('card');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const searchBar = document.getElementById('searchBar'); //el buscador 
const inputBuscador = document.getElementById('buscador');  //boton del buscador
const fragment = document.createDocumentFragment();
const url = 'https://my-json-server.typicode.com/margaritasing/productosJson/response'
let carrito = {};
let data;
let filterProductos;





document.addEventListener('DOMContentLoaded', () => { //pinta los items del carrito
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
            
    }

   
})
card.addEventListener('click', e => { //agrega los items al carrito
    addCarrito(e)
})

items.addEventListener('click', e => { // elimina todos los items del carrito
    btnAccion(e)
})




const fetchData = async() => { //consume el json por medio de async-await (Promesa)
    try {
        var res = await fetch(url)
        data = await res.json()
        pintarCards(data)
        
    } catch (error) {
        console.log(error)
    }
}

console.log(searchBar)

var produCard;

//Accion de pintar todos los atributos que tienen las tarjetas que muestran los productos
const pintarCards = (filterProductos) => {
    console.log(filterProductos)
    filterProductos.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('p').textContent = producto.descripcion
        templateCard.querySelector('img').setAttribute("src", producto.imagen)
        templateCard.querySelector('h4').textContent = producto.tipo
        templateCard.querySelector('h6').textContent = producto.precio
        templateCard.querySelector('.boton').dataset.id = producto._id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })

    card.appendChild(fragment)

}

//accion de agregar  los productos y setCArrito se encarga de que estos no se repitan
const addCarrito = e => {
    if (e.target.classList.contains('boton')) {
        setCarrito(e.target.parentElement)

    }
    e.stopPropagation()

    alertasMensajes()
}

//modifica el contenido del carrito para que los productos no se repitan,
//utilizando el id para este proceso
const setCarrito = objeto => {

    const producto = {
        id: objeto.querySelector('.boton').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('h6').textContent,
        cantidad: 1

    }

    if (carrito.hasOwnProperty(producto.id)) { //verifica que el producto no exista, pero si existe
        producto.cantidad = carrito[producto.id].cantidad + 1 //sino existe por defecto es 1 la cantidad
    }

    carrito[producto.id] = {...producto } //con esto se hace una copia del producto
    pintarCarrito()

    /* let arrayIgual = JSON.parse(localStorage.getItem('productos'));

    arrayIgual.filter(item => {
        arrayIgual.id != '5f205432bf2ede0017e48508'
    })

    console.log(arrayIgual) */


}

//todos los atributos del carrito se pintan por medio de esta funcion 

const pintarCarrito = () => {
    console.log(carrito)
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id.substr(1,2)
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.boton-uno').dataset.id = producto.id
        templateCarrito.querySelector('.boton-dos').dataset.id = producto.id
        console.log(templateCarrito.querySelector('.boton-dos').dataset.id = producto.id)
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio


        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}


//Accion de establecer el total y cambiar el estado del carrito cuando este vacio
const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito() //Se pinta nuevamente el carrito para recuperar los elementos que estan dentro de las card
    })
    
}

const btnAccion = e => {
    //Accion de aumentar el numero de productos en el carrito
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
            carrito[e.target.dataset.id] = {...producto }
        pintarCarrito()
    }

    //disminuir el numero de productos en el carrito
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[e.target.dataset.id]
            }
        pintarCarrito()


    }

    e.stopPropagation()
}

/* const addLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }
  
  window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      pintarCarrito()
    }
  } */

  //Mensaje de confirmacion de producto agregado

  const alertasMensajes = () =>{
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto Agregado al carrito',
        showConfirmButton: false,
        timer: 1500
      })
  }






  searchBar.addEventListener('keyup', event => {
    let searchString = event.target.value.toLowerCase()
     filterProductos = data.filter(producto => 

        producto.nombre.toLowerCase().includes(searchString) ||  producto.tipo.toLowerCase().includes(searchString)        
    )
     // ELIMINO EL CONTENIDO DE CARD
     while (card.firstChild) {
        card.removeChild(card.firstChild);
      }
    // LE CARGO NUEVO CONTENIDO FILTRADO
    pintarCards(filterProductos)

    console.log(filterProductos)
})
    
   
  




 
  /* console.log(searchBar)
  searchBar.addEventListener('keyup', (e) =>{
      console.log(e.target.value);
  }) */
  
    

/*
 inputBuscador.addEventListener('click', filtrar) 
  searchBar.addEventListener('id', (e) => {
    console.log(searchBar)
     const searchString = e.target.value.toLowerCase();
     console.log(searchString)
     const filterProductos = carrito.filter((producto) => {
            producto.nombre.toLowerCase().includes(searchString) ||
            producto.tipo.toLowerCase().includes(searchString)
        
     })
     
     pintarCards(filterProductos); 
 }); 
   */