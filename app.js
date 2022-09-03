//creo las variables globales para las funciones
//variable global para el valor del dolar
const valorDll = 300

//variable global para la validacion del formulario
let pverdadero = false

let hayUnArticulo = 0;

//creo las variables para los eventos
let btnNotebook = document.getElementById("btnNotebook");
let btnOculus = document.getElementById("btnOculus");
let btnKindle = document.getElementById("btnKindle");
let btnIphone = document.getElementById("btnIphone");
let addBtn = document.getElementById("addBtn");
let form = document.getElementById("form");
let verBtn = document.getElementById("verBtn");
let formulario = document.getElementById("formulario");
let articulos = document.getElementById("articulos");
let btnEliminar = document.getElementById("btnEliminar");
let productoN = document.createElement("div");
let productoO = document.createElement("div");
let productoK = document.createElement("div");
let productoI = document.createElement("div");
let productoU = document.createElement("div");






// let producto = form.children[0].value;
// let precio = form.children[1].value;
// let detalle = form.children[2].value;


//creo el constructor para los objetos
class Articulo{
    constructor (id, nombre, precioDol, detalle, img){
        this.id = Number(id);
        this.nombre = nombre;
        this.precioDol = Number(precioDol);
        this.detalle = detalle;
        this.img = img;
    }
}


//creo el array que va a contener los productos seleccionados/agregados
const carrito=[
    {id: 1, nombre: "Notebook ASUS TUF F17", precioDol: 1500, detalle: "17 pulgadas, i7-12700H, 16GB RAM, 1TB SSD, RTX 3060.", img: "./img/Asus TUF F17.png"},
    {id: 2, nombre: "Oculus Quest 2", precioDol: 430, detalle: "256GB, Controles Touch, Audio 3D.", img: "./img/oculus-quest-2.png"},
    {id: 3, nombre: "Kindle Oasis", precioDol: 290, detalle: "8gb, incluye cargador, funda de cuero y soporte", img: "./img/kindle_oasis.png"},
    {id: 4, nombre: "Iphone 13", precioDol: 800, detalle: "128gb, 5.4 pulgadas, resolucion 2340 x 1080, dos camaras de 12MP  incluye cable USB-C.", img: "./img/iphone13.png"}
];



//FUNCIONES!!



//creo una funcion para el boton comprar del articulo Notebook

function agregarNotebook (){
    productoN = document.createElement("div");
    productoN.innerHTML = `<div class="cuerpoModal">
    <img src="./img/Asus TUF F17.png" alt="Notebook Asus TUF F17">
    <span class="detallesModal">
    <h2 id="nombre">Notebook ASUS TUF F17</h2>
    <h3 id="precio">U$D 1500 </h3>
    <p><strong id="detalle">Detalles: 17 pulgadas, i7-12700H, 16GB RAM, 1TB SSD, RTX 3060.</strong></p></span>
    <button onclick="eliminarDelCarrito(productoN)" class="btnEliminar"><img src="./img/borrar-plugins-wordpress.png" alt="imagen de tacho de basura"></button>
    </div>`
    articulos.appendChild(productoN);
}



//creo una funcion para el boton comprar del articulo Oculus
function agregarOculus(){
    productoO = document.createElement("div");
    productoO.innerHTML = `<div class="cuerpoModal">
    <img src="./img/oculus-quest-2.png" alt="Oculus Quest 2">
    <span class="detallesModal">
    <h2 id="nombre">Oculus Quest 2</h2>
    <h3 id="precio"> U$D 430 </h3>
    <p><strong id="detalle">Detalles: 256GB, Controles Touch, Audio 3D.</strong></p></span>
    <button onclick="eliminarDelCarrito(productoO)" class="btnEliminar"><img src="./img/borrar-plugins-wordpress.png" alt="imagen de tacho de basura"></button>
   </div>`
    articulos.appendChild(productoO);
}

//creo una funcion para el boton comprar del articulo Kindle
function agregarKindle(){
    productoK = document.createElement("div");
    productoK.innerHTML = `<div class="cuerpoModal">
    <img src="./img/kindle_oasis.png" alt="Kindle Oasis">
    <span class="detallesModal">
    <h2 id="nombre">Kindle Oasis</h2>
    <h3 id="precio">U$D 290 </h3>
    <p><strong id="detalle">Detalles: 8gb, incluye cargador, funda de cuero y soporte</strong></p></span>
    <button onclick="eliminarDelCarrito(productoK)" class="btnEliminar"><img src="./img/borrar-plugins-wordpress.png" alt="imagen de tacho de basura"></button>
   </div>`
    articulos.appendChild(productoK);
}

//creo una funcion para el boton comprar del articulo Iphone
function agregarIphone(){
    productoI = document.createElement("div");
    productoI.innerHTML = `<div class="cuerpoModal">
    <img src="./img/iphone13.png" alt="Iphone 13">
    <span class="detallesModal">
    <h2 id="nombre">Iphone 13</h2>
    <h3 id="precio">U$D 800 </h3>
    <p><strong id="detalle">Detalles: 8gb, incluye cargador, funda de cuero y soporte</strong></p></span>
    <button onclick="eliminarDelCarrito(productoI)" class="btnEliminar"><img src="./img/borrar-plugins-wordpress.png" alt="imagen de tacho de basura"></button>
   </div>`
    articulos.appendChild(productoI);
}


function validarDatos(nombre, precio, detalle){
    if(nombre === "" || precio === "" || detalle === ""){
        pverdadero = true
    }else{
        pverdadero = false
    }
}

function agregarX(e){
    let idP = 5 
    e.preventDefault();
    const producto = form.children[0].value;
    const precio = form.children[1].value;
    const detalle = form.children[2].value;
    let completeLosCampos = document.createElement("div");
    completeLosCampos.innerHTML = `<div class="completar" id="resultado"></div>`
    form.append(completeLosCampos);
    let p = document.getElementById("resultado");
    validarDatos(producto, precio, detalle);
    while(pverdadero == true){
        p.innerText = `Complete todos los campos!`
        validarDatos(producto, precio, detalle);
        break
    }
    if(pverdadero == false){
        p.remove();
        const convertirEnString = JSON.stringify(new Articulo(idP,producto, precio, detalle, "./img/unknown.png" ));
        carrito.push(new Articulo(idP, producto, precio, detalle, "./img/unknown.png"));
        localStorage.setItem(`producto ${idP}`, convertirEnString);
        productoU = document.createElement("div");
        productoU.innerHTML = `<div class="cuerpoModal">
        <img src="./img/unknown.png" alt="producto desconocido">
        <span class="detallesModal">
        <h2 id="nombre">${producto}</h2>
        <h3 id="precio"> U$D ${precio} </h3>
        <p><strong id="detalle">Detalles: ${detalle}</strong></p></span>
        <button onclick="eliminarDelCarrito(productoU)"  class="btnBorrar"><img src="./img/borrar-plugins-wordpress.png" alt="imagen de tacho de basura"></button>
        </div>`
        articulos.appendChild(productoU);
        idP++
        

    }
}

const eliminarDelCarrito = (prod) =>{
    prod.remove();
}


function valorDolares(){
    const valorSubtotalDol = carrito.reduce((acc, element) => acc + element.precioDol, 0);
    let totalDol = document.createElement("p");
    totalDol.innerHTML = `<p>Precio a pagar en dolares ${valorSubtotalDol} <br> Precio a pagar en pesos: ${arsConImpuestos(valorSubtotalDol)}</p>`
    todosLosProd.append(totalDol);
}



const arsConImpuestos = (subtotalDol) => {return ((subtotalDol *= valorDll) * 1.75).toFixed(2)};





//EVENTOS
btnNotebook.onclick = agregarNotebook;
btnOculus.onclick = agregarOculus;
btnKindle.onclick = agregarKindle;
btnIphone.onclick = agregarIphone;
addBtn.onclick = agregarX;


