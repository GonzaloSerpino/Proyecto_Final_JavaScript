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
let addBtn = document.getElementById("addBtn");
let form = document.getElementById("form");
let verBtn = document.getElementById("verBtn");
let todosLosProd = document.getElementById("todosLosProd");
let abonar = document.getElementById("abonar");
let arsBtn = document.getElementById("arsBtn");
let dolBtn = document.getElementById("dolBtn");
let formulario = document.getElementById("formulario")



let producto = form.children[0].value;
let precio = form.children[1].value;
let detalle = form.children[2].value;


//creo el constructor para los objetos
class Articulo{
    constructor (nombre, precioDol, detalle){
        this.nombre = nombre;
        this.precioDol = Number(precioDol);
        this.detalle = detalle;
    }
}

//FUNCIONES!!

//creo una funcion para el boton comprar del articulo Notebook
function agregarNotebook(){
    let cantidadN = document.getElementById("cantidadN").value;
    for(i = 1; i <= cantidadN; i++){
        carrito.push(notebook)
    }
    console.log(carrito);
}

//creo una funcion para el boton comprar del articulo Oculus
function agregarOculus(){
    let cantidadO = document.getElementById("cantidadO").value;
    for(i = 1; i <= cantidadO; i++){
        carrito.push(oculus)
    }
    console.log(carrito);
}

//creo una funcion para el boton comprar del articulo Kindle
function agregarKindle(){
    let cantidadK = document.getElementById("cantidadK").value;
    for(i = 1; i <= cantidadK; i++){
        carrito.push(kindle)
    }
    console.log(carrito);
}

//creo una funcion para el boton comprar del articulo Iphone
function agregarIphone(){
    let cantidadI = document.getElementById("cantidadI").value;
    for(i = 1; i <= cantidadI; i++){
        carrito.push(iphone)
    }
    console.log(carrito);
}

function validarDatos(nombre, precio, detalle){
    if(nombre === "" || precio === "" || detalle === ""){
        pverdadero = true
    }else{
        pverdadero = false
    }
}

function agregarX(e){
    e.preventDefault();
    producto = form.children[0].value;
    precio = form.children[1].value;
    detalle = form.children[2].value;
    let completeLosCampos = document.createElement("div");
    completeLosCampos.innerHTML = `<div class="completar" id="resultado"></div>`
    form.append(completeLosCampos);
    let p = document.getElementById("resultado");
    validarDatos(producto, precio, detalle);
    console.log(precio,producto,detalle);
    while(pverdadero == true){
        p.innerText = `Complete todos los campos!`
        validarDatos(producto, precio, detalle);
        break
    }
    if(pverdadero == false){
        p.remove();
        const convertirEnString = JSON.stringify(new Articulo(producto, precio, detalle));
        let cantidadX = document.getElementById("cantidadX").value;
        for(let i = 1; i <= cantidadX; i++){
            carrito.push(new Articulo(producto, precio, detalle));
            localStorage.setItem(`producto ${i}`, convertirEnString);
            }
    }
}

function verProductos(){
    let elegiUnProd = document.createElement("div");
    elegiUnProd.innerHTML = `<div class="elegi" id="elegi"></div>`
    todosLosProd.append(elegiUnProd);
    let elegi = document.getElementById("elegi");
    if(carrito.length > 0){
        elegi.remove();
        carrito.forEach(element =>{
            let li = document.createElement("li");
            li.innerHTML = `Articulo: ${element.nombre}. Precio en dolares: ${element.precioDol}. Detalle: ${element.detalle}`;
            todosLosProd.appendChild(li);
        })
        valorDolares();
    }else{
        elegi.innerText = `Elegi/Ingresa un producto primero!`
    }
}

function valorDolares(){
    const valorSubtotalDol = carrito.reduce((acc, element) => acc + element.precioDol, 0);
    let totalDol = document.createElement("p");
    totalDol.innerHTML = `<p>Precio a pagar en dolares ${valorSubtotalDol} <br> Precio a pagar en pesos: ${arsConImpuestos(valorSubtotalDol)}</p>`
    todosLosProd.append(totalDol);
}

function botones(){
    let seleccioneUnProducto = document.createElement("div");
    seleccioneUnProducto.innerHTML = `<div class="seleccionar" id="seleccionProd"></div>`;
    abonar.append(seleccioneUnProducto);
    let aviso = document.getElementById("seleccionProd");
    let prodAbonado = document.getElementById("prodAbonado")
    console.log(carrito.length);
    while(carrito.length == 0){
        aviso.innerText = `Seleccione un producto primero!`
        break
    }
    if(carrito.length > 0){
        aviso.remove();
        prodAbonado.innerText = `¡Producto abonado!`
    }
}


const arsConImpuestos = (subtotalDol) => {return ((subtotalDol *= valorDll) * 1.75).toFixed(2)};


//creo los objetos ya existentes
const notebook = new Articulo("Notebook ASUS TUF F17", 1500, "17 pulgadas, i7-12700H, 16GB RAM, 1TB SSD, RTX 3060.");

const oculus = new Articulo("Oculus Quest 2", 430, "256GB, Controles Touch, Audio 3D.");

const kindle = new Articulo("Kindle Oasis", 290, "8gb, incluye cargador, funda de cuero y soporte");

const iphone = new Articulo("Iphone 13", 800, "128gb, 5.4 pulgadas, resolucion 2340 x 1080, dos camaras de 12MP  incluye cable USB-C.");


//creo el array que va a contener los productos seleccionados/agregados
const carrito = [];



//EVENTOS
btnNotebook.onclick =  agregarNotebook;
btnOculus.onclick = agregarOculus;
btnKindle.onclick = agregarKindle;
btnIphone.onclick = agregarIphone;
addBtn.onclick = agregarX;
verBtn.onclick = verProductos;
arsBtn.onclick = botones;
dolBtn.onclick = botones;
