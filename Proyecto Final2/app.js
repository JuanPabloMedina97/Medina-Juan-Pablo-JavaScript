const cards = document.getElementById('cards'); //seleccionamos el elemento cards que está en el html
const items = document.getElementById('items'); //seleccionamos el elemento items que está en el html
const footer = document.getElementById('footer'); //seleccionamos el elemento footer que está en el html
const templateCard = document.getElementById('template-card').content; //seleccionamos el contenido del template-card que está en el html
const templateFooter = document.getElementById('template-footer').content; //seleccionamos el contenido del template-footer que está en el html
const templateCarrito = document.getElementById('template-carrito').content; //seleccionamos el contenido del template-card que está en el html
const fragment = document.createDocumentFragment(); //creamos un fragmento
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();

     localStorage.getItem('carrito') ? (carrito = JSON.parse(localStorage.getItem('carrito')), renderCarrito()) : null; //si el localStorage tiene un carrito, lo renderizamos

});


cards.addEventListener('click', e => { //evento click en el elemento items para capturar el elemento que queremos modificar
    addCarrito(e);
});

items.addEventListener('click', e =>{ //evento click para modificar el carrito
    btnAction(e);
});


//Creamos una funcion en la cual recibe los datos de los productos
const fetchData = async () => { // async function
    try{
        const res = await fetch('https://run.mocky.io/v3/41494886-ad2e-4617-98d8-4c51a9186b26'); //espera a que la promesa se resuelva
        const data = await res.json(); //se guarda la respuesta tipo json en data
        render(data);//mandamos a llamar la funcion render que recibe como parametro data
    } catch(err){
        console.log(err);
    }
}



//Creamos una funcion en la cual me renderiza los productos
const render = data =>{


    data.forEach( product => {

        templateCard.querySelector('h5').textContent = product.name; //seleccionamos el elemento h5 y le asignamos el nombre del producto
        templateCard.querySelector('h6').textContent = product.model; //seleccionamos el elemento h6 y le asignamos el modelo del producto
        templateCard.querySelector('p').textContent = product.price;//seleccionamos el elemento p y le asignamos el precio del producto
        templateCard.querySelector('img').src = product.image; //seleccionamos el elemento img y le asignamos la imagen del producto
        templateCard.querySelector('.btn-dark').dataset.id = product.id; //seleccionamos el elemento btn-dark y le asignamos el id del producto


        const clone = templateCard.cloneNode(true); //clonamos el template-card
        fragment.appendChild(clone); //agregamos el clone al fragmento
    });
    

    cards.appendChild(fragment); //agregamos el fragmento al elemento items
}



//Creamos una funcion en donde se agregan los productos al carrito
const addCarrito = e => { //funcion para agregar al carrito
    
    e.target.classList.contains('btn-dark') ? setCarro(e.target.parentElement) : null; //si el elemento clickeado es un btn-dark
 
    e.stopPropagation(); //para que no se ejecute el evento click en el padre
}



//Creamos una funcion en donde se agregan los productos al carrito
const setCarro = objeto =>{ //captura el elemento que se le pasa como parametro
     
     const producto ={
        id: objeto.querySelector('.btn-dark').dataset.id,
        name: objeto.querySelector('h5').textContent,
        model: objeto.querySelector('h6').textContent,
        price: objeto.querySelector('p').textContent,
        cantidad:1
     }

     carrito.hasOwnProperty(producto.id) ? producto.cantidad = carrito[producto.id].cantidad + 1 : null; //si el carrito tiene una propiedad con el id del producto se aumenta en 1 la cantidad del producto

    carrito[producto.id] = {...producto};

    renderCarrito();

}




//Creamos una funcion en donde renderizamos el carrito y guardamos los datos en el localStorage
const renderCarrito = () =>{
    items.innerHTML= ''; //limpiamos el elemento items
    
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id; //seleccionamos el elemento th y le asignamos el id del producto
        templateCarrito.querySelectorAll('td')[0].textContent = producto.name;//seleccionamos el elemento td y le asignamos el nombre del producto
        templateCarrito.querySelectorAll('td')[1].textContent = producto.model;//seleccionamos el elemento td y le asignamos el modelo del producto
        templateCarrito.querySelectorAll('td')[2].textContent = producto.cantidad;//seleccionamos el elemento td y le asignamos la cantidad del producto
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price; //multiplicamos la cantidad del producto por el precio
        
        //botones de mermar y aumentar
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;//seleccionamos el elemento btn-info y le asignamos el id del producto
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;//seleccionamos el elemento btn-danger y le asignamos el id del producto

        const clone = templateCarrito.cloneNode(true); //clonamos el template-carrito
        fragment.appendChild(clone); //agregamos el clone al fragmento
    });

    items.appendChild(fragment); //agregamos el fragmento al elemento items

    renderFooter();

    localStorage.setItem('carrito', JSON.stringify(carrito)); //guardamos el carrito en el localStorage
}



//Creamos una funcion en donde renderizamos el footer
const renderFooter = () =>{
    footer.innerHTML = ''; //limpiamos el elemento footer
    
    if(Object.keys(carrito).length === 0){ //si el carrito esta vacio
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío</th>';
        return;
    }

    //Sacamos la cantidad de objetos del carrito y sus precios
    const total = Object.values(carrito).reduce((total, {cantidad}) => total + cantidad, 0);
    const totalPrice = Object.values(carrito).reduce((total, {cantidad, price}) => total + cantidad * price, 0);

    //Mostramos el total de productos y el total de precios
    templateFooter.querySelectorAll('td')[1].textContent = total;
    templateFooter.querySelectorAll('td')[0].textContent = "";
    templateFooter.querySelector('span').textContent = `$ ${totalPrice}`;

    const clone = templateFooter.cloneNode(true); //clonamos el template-carrito
    fragment.appendChild(clone); //agregamos el clone al fragmento
    footer.appendChild(fragment); //agregamos el fragmento al elemento footer


    //Creamos un evento en donde vaciamos el carrito
    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        carrito = {};
        renderCarrito();
    });
}



//Creamos una funcion en donde aumentamos o mermamos la cantidad de productos
const btnAction = e => { 

    //Si el elemento clickeado es un btn-info aumentamos la cantidad del producto
    if(e.target.classList.contains('btn-info')){ 
        
        const producto = carrito[e.target.dataset.id]; //capturamos el producto
        producto.cantidad++; //aumentamos la cantidad del producto
        carrito[e.target.dataset.id] = {...producto}; //actualizamos el carrito
        renderCarrito(); //renderizamos el carrito
    }

    //Si el elemento clickeado es un btn-danger disminuimos la cantidad del producto
    if(e.target.classList.contains('btn-danger')){ 
        
        const producto = carrito[e.target.dataset.id]; //capturamos el producto
        producto.cantidad--; //mermamos la cantidad del producto
        if(producto.cantidad === 0){ //si la cantidad es 0 eliminamos el producto con el id seleccionado
            delete carrito[e.target.dataset.id];
        }
        renderCarrito();
    }

    e.stopPropagation(); //para que no se ejecute el evento click en el padre
 }