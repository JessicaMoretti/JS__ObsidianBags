// ejercicio- complementario//

//ternario con &&//

const cartera={
  nombre: "date",
  stock: 3
}

const comprar = cartera.stock >=1 && cartera.stock <=3 ? true : false

comprar ? alert("seleccionaste el articulo articulo") : alert("el articulo se agotó")


//destructuración//

const mochilas={
  articulo: "travel",
  precio: 1500,
  stock: 2
}

const {articulo,precio,stock} =mochilas

//spread//

const articulos=["date","casual","travel"] //array de articulos//

console.log(...articulos)//spread//