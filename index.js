class cartera {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = parseInt(precio);
  }
  comprar() {
    if (this.stock != 0) {
        this.stock -= 1
        carritoCompras.push(this.nombre)
        valorCompra.push(this.precio)
    }
  }
}

let carteras = []
carteras.push(new cartera("Date", 1500));
carteras.push(new cartera("Casual", 2500));
carteras.push(new cartera("Travel", 3500));

let carritoCompras = []
let valorCompra = []

const carritoenSS = JSON.parse(sessionStorage.getItem("carritoCompras"))
const valorCompraenSS = JSON.parse(sessionStorage.getItem("valorCompra"))


if (carritoenSS !== null) {
  valorCompra = valorCompraenSS
  carritoCompras = carritoenSS
      for (let index = 0; index < carritoCompras.length; index++) {
        const carroCompras = document.getElementById("lista-productos");
        const item = document.createElement("li");
        item.innerHTML = `${carritoCompras[index]}, $${valorCompra[index]}`;
        carroCompras.appendChild(item);
        total()
      }
}


function agregarALista(cartera) {
  if (cartera.stock !==0){
    const listaProductos = document.getElementById("lista-productos");
    const item = document.createElement("li");
    item.innerHTML = `Cartera ${cartera.nombre}, $${cartera.precio}`;
    listaProductos.appendChild(item);
  }
}

function total() {
  let total = valorCompra.reduce((acumulado, item) => {
      return acumulado = acumulado + item;
  });
  document.getElementById("total").innerHTML = `TOTAL: $${total}`;
}

const botones = document.getElementsByClassName("producto-btn");
for (let index = 0; index < botones.length; index++) {
  const boton = botones[index];

  boton.addEventListener("click", () => {
    const cartera = carteras[index];
    agregarALista(cartera);
    carteras[index].comprar()
    total()
    sessionStorage.setItem("carritoCompras", JSON.stringify(carritoCompras) )
    sessionStorage.setItem("valorCompra", JSON.stringify(valorCompra) )
  });
}