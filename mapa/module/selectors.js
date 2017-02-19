const mapVisibleViveros = productores => (acc, id) => { acc[id] = productores[id]; return acc }

const loc = (key, array) => array.map(v => v.key).indexOf(key)

function mergeTipos (tipos = {}, cantidad) {
  tipos[cantidad.tipo] = (tipos[cantidad.tipo] || 0) + cantidad.cantidad

  return tipos
}

export function mergeViverosStock(productores){
  return function(stock, productorId) {
    return productores[productorId].properties.stock
      .reduce((mStk, productorStock) => {
        mStk[productorStock.producto] = productorStock.cantidades
          .reduce(mergeTipos, mStk[productorStock.producto])
        return mStk
      }, stock)
  }
}

export function addTotal (stock) {
  for(var producto in stock) {
    stock[producto].total = Object.keys(stock[producto]).reduce((total, v) => total + stock[producto][v], 0)
  }
  return stock
}

export function getTotales (stock) {
  return {
    ...stock
      .reduce((productosAcc, subStock) => {
        const hasEspecie = ~Object.keys(productosAcc).indexOf(subStock.producto)
        const subTotal = subStock.cantidades.reduce((total, tamagno) => total + tamagno.cantidad, 0)
        productosAcc[subStock.producto] = hasEspecie ? productosAcc[subStock.producto] + subTotal : subTotal
        return productosAcc
      },{}),
    ...{
      ALL: stock.reduce((acc, subStock) => {
        const total = subStock.cantidades.reduce((acc, item) => item.cantidad + acc, 0)

        return total + acc
      }, 0)
    }
  }
}
