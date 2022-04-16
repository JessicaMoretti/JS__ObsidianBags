document.addEventListener('DOMContentLoaded', () => {

            
    let carrito = [];
    
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DomTotalCanvas = document.querySelector('.totalMoney')
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
    

    const URLJSON = "datos.json"
    $.getJSON(URLJSON, function (respuesta, estado) {
        if(estado === "success"){
        let misDatos = respuesta;


     function renderizarProductos() {
        
        for(const info of misDatos){
           
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            
            const miNodoDescripcion = document.createElement('p');
            miNodoDescripcion.textContent = `${info.descripcion}`
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `$${info.precio}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-dark');
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
    
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoDescripcion);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        }
    }

    
    
    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }


    
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
            carritoSinDuplicados.forEach((item) => {
           
        const miItem = misDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
           
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
               return itemId === item ? total += 1 : total;
            }, 0);
           
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
            
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-dark', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            
            
            
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        
        DOMtotal.textContent = calcularTotal();
        Canvass()
        
        
    }
    function Canvass (){
        let canvasText = document.querySelector('#money')
        
        canvasText.innerHTML = `<img src="./images/OBSIDIANLOGO.png">`
        DomTotalCanvas.innerHTML = calcularTotal() 
    }

   
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
       
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }

     
    function calcularTotal() {
        
        return carrito.reduce((total, item) => {
                const miItem = misDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            
            return total +  miItem[0].precio;
        }, 0).toFixed(2);
        
    }

    
    
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }
    
    

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }
     DOMbotonVaciar.addEventListener('click', vaciarCarrito);
     
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
}
});
});

let footer = document.createElement("footer");
footer.innerHTML = `<hr>
                    <p>
                    <h3>OBSIDIAN BAGS</h3>
                    <p>`; 
footer.style.background = "white";
footer.style.color = "black";
footer.style.textAlign = "center";
footer.style.padding-top ; "window ";
footer.style.position ="offcanvas";

document.body.appendChild(footer)

document.body.style.background = "white  no-repeat right top";


