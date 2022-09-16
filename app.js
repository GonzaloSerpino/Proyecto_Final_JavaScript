//creo las variables globales para las funciones
//variable global para el valor del dolar
const valorDll = 300

//variable global para la validacion del formulario
let pverdadero = false



//creo las variables para los eventos
let btnNotebook = document.getElementById("btnNotebook");
let btnOculus = document.getElementById("btnOculus");
let btnKindle = document.getElementById("btnKindle");
let btnIphone = document.getElementById("btnIphone");
let btnVolante = document.getElementById("btnVolante");
let btnPlay = document.getElementById("btnPlay");
let addBtn = document.getElementById("addBtn");
let form = document.getElementById("form");
let verBtn = document.getElementById("verBtn");
let formulario = document.getElementById("formulario");
let articulos = document.getElementById("articulos");
let contadorCarrito = document.getElementById("contadorCarrito");
let btnVaciar = document.getElementById("btnVaciar")
let btnComprar = document.getElementById("btnComprar");



//creo el array que va a contener los productos seleccionados
const articulosExistentes =[
    {id: 1, nombre: "Notebook ASUS TUF F17", precioDol: 1500, detalle: "17 pulgadas, i7-12700H, 16GB RAM, 1TB SSD, RTX 3060.", img: "./img/Asus TUF F17.png", alt: "Notebook ASUS TUF F17", cantidad: 1},
    {id: 2, nombre: "Oculus Quest 2", precioDol: 430, detalle: "256GB, Controles Touch, Audio 3D.", img: "./img/oculus-quest-2.png", alt:"Oculus Quest 2", cantidad: 1},
    {id: 3, nombre: "Kindle Oasis", precioDol: 290, detalle: "8gb, incluye cargador, funda de cuero y soporte", img: "./img/kindle_oasis.png", alt: "Kindle Oasis", cantidad: 1},
    {id: 4, nombre: "Iphone 13", precioDol: 800, detalle: "128gb, 5.4 pulgadas, resolucion 2340 x 1080, dos camaras de 12MP  incluye cable USB-C.", img: "./img/iphone13.png", alt: "Iphone 13", cantidad: 1},
    {id: 5, nombre: "Volante Logitech G923", precioDol: 300, detalle: "Compatibilidad con PC y XBOX ONE, nuevo sistema TRUEFORCE, pedales incluidos.", img: "./img/logitech.png", alt: "Volante Logitech G923", cantidad: 1},
    {id: 6, nombre: "Playstation 5", precioDol: 500, detalle: "852GB SSD, incluye joystick dualsense.", img: "./img/ps5-product-thumbnail-01-en-14sep21.png", alt: "Playstation 5", cantidad: 1},
];

//creo el array vacio con los productos que se agregaron al carrito
let carrito = [];



//FUNCIONES!!

//creo la funcion que pushea los articulos al array carrito
const sumarAlCarrito = (itemId) => {
    //creo una variable utilizando el metodo .some para saber si ya esta agregado al carrito el producto que se selecciono
    const existe = carrito.some(articulo => articulo.id === itemId);
    //creo el condicional
    if(existe){
        //uso el metodo .map para que encuentre cual es el producto que ya esta agregado y asi, sumarle la cantidad al hacer click devuelta
        carrito.map(prod => {
            if(prod.id === itemId){
                prod.cantidad++
            }
        })
    }else{
        const item = articulosExistentes.find((item)=> item.id === itemId);
        carrito.push(item);
    }
    //llamo a la funcion que le avisa al usuario que se agrego un producto
    alertaCarrito();
    //llamo devuelta a la funcion actualizar carrito
    actualizarCarrito();
}

//creo la funcion actualizar carrito que modifica el DOM dentro del modal
const actualizarCarrito = () =>{
    //inicializo el DOM del modal vacio
    articulos.innerHTML = "";
    for (const dato of carrito) {
        let producto = document.createElement("div");
        producto.innerHTML = `<div class="cuerpoModal">
        <img src="${dato.img}" alt="${dato.alt}">
        <span class="detallesModal">
        <h2 id="nombre">${dato.nombre}</h2>
        <p>Cantidad: ${dato.cantidad}</p>
        <h3 id="precio">U$D ${dato.precioDol * dato.cantidad}</h3>
        <p><strong id="detalle">Detalles: ${dato.detalle}</strong></p></span>
        <button onclick="eliminarDelCarrito(${dato.id})" class="btnEliminar"><img src="./img/borrar-plugins-wordpress.png" alt="imagen de tacho de basura"></button>`;
        articulos.appendChild(producto);
        //Me almaceno en el localStorage los articulos
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    //uso el .innerText para que cada vez que se agrega un articulo, se sume el numero que aparece en el icono del carrito
    contadorCarrito.innerText = carrito.reduce((acc, element) => acc + element.cantidad, 0);
    //llamo a que se ejecute la funcion que agrega el valor en dolares y en pesos de los totales
    valorDolares();
}

//creo una funcion usando la libreria Toastify para que le avise al usuario que se agrego un producto al carrito
const alertaCarrito = () => {
    Toastify({
        text: "Producto agregado al carrito",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

//creo la funcion para eliminar un producto individual del carrito
const eliminarDelCarrito = (prodId) => {
    //utilizo el metodo .find para que encuentre el articulo que se quiere eliminar mediante el id
    const itemDelCarrito = carrito.find((prod) => prod.id === prodId);
    //busco el indice de ese articulo y lo almaceno en una variable
    const indice = carrito.indexOf(itemDelCarrito);
    //uso el metodo .splice para que elimine del carrito el articulo 
    carrito.splice(indice, 1);
    //Vuelvo a poner la cantidad del articulo en 1
    itemDelCarrito.cantidad = 1;
    //remuevo el item del local storage para que no quede almacenado al actualizarse
    localStorage.removeItem("carrito");
    //actualizo el DOM del modal
    actualizarCarrito();

}


//creo una funcion para que el usuario me confirme si quiere vaciar el carrito utilizando la libreria sweetalert 
const confirmacionVaciar = (carrito) =>{
    swal({
        title: "¿Estas seguro?",
        text: "Desea eliminar los productos?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((aceptar) => {
        if (aceptar) {
          swal("Se vacio el carrito!", {
            icon: "success",
          }
          )
            carrito.length = 0;
            localStorage.removeItem("carrito");
            actualizarCarrito();
            ;
        } else {
          swal({
            text: "No se vacio el carrito",
            icon: "error",
        });
        }
      });
}

const pagarCompra = (carrito) =>{
    swal({
        title: "Compra Exitosa",
        text: "¡Gracias por confiar en nosotros!",
        icon: "success",
        button: "Cerrar",
      })
}


//creo la funcion que valida los datos del formulario
const validarDatos = (nombre, precio, detalle) => {
    (nombre === "") || (precio === "") || (detalle === "") ? pverdadero = true : pverdadero = false;
}


const consultaArticulos = (e) => {
    e.preventDefault();
    let producto = form.children[0].value;
    let detalle = form.children[1].value;
    let email = form.children[2].value;
    let completeLosCampos = document.createElement("div");
    completeLosCampos.innerHTML = `<div class="completar" id="resultado"></div>`
    form.append(completeLosCampos);
    let p = document.getElementById("resultado");
    validarDatos(producto, detalle, email);
    (pverdadero == false) ? camposCompletados(p, producto, detalle, email) : camposIncompletos(p);

}

//creo una funcion que almacena en el local storage los datos ingresados en el form
const camposCompletados = (resultado, producto, detalle, email) =>{
    resultado.remove();
    localStorage.setItem("nombreProducto", producto);
    localStorage.setItem("detalle", detalle);
    localStorage.setItem("email", email);
    datosEnviados();

}

//creo una funcion que agrega en el DOM un aviso al usuario para que complete todos los campos
const camposIncompletos = (resultado) =>{
    while(pverdadero == true){
        resultado.innerText = `Complete todos los campos!`
        validarDatos(producto, detalle, email);
        break
    }
}

//creo un aviso con sweetalert para indicarle al usuario que se lo va a contactar
const datosEnviados = () =>{
    swal({
        title: "Datos enviados!",
        text: `Se enviara un mail a tu correo ${localStorage.getItem("email").toUpperCase()} con los datos de tu producto ${localStorage.getItem("nombreProducto").toUpperCase()}`,
        icon: "success",
        button: "Cerrar",
      });
}

//creo la funcion que me suma el precio total de los productos utilizando el metodo .reduce
function valorDolares(){
    let monedaDePago = document.createElement("p");
    monedaDePago.innerHTML = `<div class="precioProducto"><select  id="monedaDePago" onchange="pesosODol()">
        <option value="">Seleccione un metodo de pago</option>
        <option value="1">Dolares</option>
        <option value="2">Pesos</option>
    </select>
    <p id="resultado"></p></div>`
    articulos.appendChild(monedaDePago);
}

const pesosODol = () =>{
    let valorSelect = document.getElementById("monedaDePago").value
    const valorSubtotalDol = carrito.reduce((acc, element) => acc + element.precioDol, 0);
    let resultado = document.getElementById("resultado");
    console.log(valorSelect)
    switch (valorSelect) {
        case 1:
            let pDol = document.createElement("p");
            pDol.innerHTML = `<p>Precio en dolares:$${valorSubtotalDol}</p>`
            resultado.appendChild(pDol);

        case 2:
            let pArs = document.getElementById("resultado")
            pArs.innerHTML = `<p>Precio en dolares:$${valorSubtotalDol}</p>`
            resultado.appendChild(pArs);
        default:
            break;
    }
}

//creo una funcion que me convierte el precio de dolares a pesos
const arsConImpuestos = (subtotalDol) => {return ((subtotalDol *= valorDll) * 1.75).toFixed(2)};





//EVENTOS
btnNotebook.addEventListener("click", () =>{
    sumarAlCarrito(1);
});
btnOculus.addEventListener("click", () =>{
    sumarAlCarrito(2);
});
btnKindle.addEventListener("click", () =>{
    sumarAlCarrito(3);
});
btnIphone.addEventListener("click", () =>{
    sumarAlCarrito(4);
});
btnVolante.addEventListener("click", () =>{
    sumarAlCarrito(5);
});
btnPlay.addEventListener("click", () =>{
    sumarAlCarrito(6);
});
addBtn.onclick = consultaArticulos;
btnVaciar.addEventListener("click", () =>{
    confirmacionVaciar(carrito);
});
btnComprar.onclick = pagarCompra;
//uso el local storage para que me almacene los articulos ingresados al carrito aunque el usuario haga un refresh a la pagina
document.addEventListener("DOMContentLoaded", () =>{
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        actualizarCarrito();
    }
});



