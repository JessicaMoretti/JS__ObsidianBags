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
  
  const carritoenLS = JSON.parse(localStorage.getItem("carritoCompras"))
  const valorCompraenLS = JSON.parse(localStorage.getItem("valorCompra"))
  
  
  if (carritoenLS !== null) {
    valorCompra = valorCompraenLS
    carritoCompras = carritoenLS
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
  
  function mensajeCompra(){
    Swal.fire({
      text: "Agregaste el producto a tu carrito!",
      icon: "success",
    });
  }

  const botones = document.getElementsByClassName("producto-btn");
  for (let index = 0; index < botones.length; index++) {
    const boton = botones[index];
  
    boton.addEventListener("click", () => {

      const cartera = carteras[index];
      agregarALista(cartera);
      carteras[index].comprar()
      localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras) )
      localStorage.setItem("valorCompra", JSON.stringify(valorCompra) )
      mensajeCompra()
      total() 
    });
  }

  
  