
let cartId = sessionStorage.getItem('cartId')
if (!cartId){
    cartId = generateUUID()
    sessionStorage.setItem('cartId', cartId)
}

const cartButton = document.getElementById('cartButton')

const socketClient = io("/cart", {query:{cartId: cartId}})

socketClient.on('connect', (socket) => {
    console.log('CONECTO')
    socketClient.on(`${cartId}/updated`,(obj)=>{
        updateProductList(obj)
    })
})
// socketClient.on("enviodeproducts",(obj)=>{
//     updateProductList(obj)
// })

function generateUUID() {
    // Generar un UUID (versión 4) basado en Math.random()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;  // Generar un número aleatorio entre 0 y 15
        const v = c === 'x' ? r : (r & 0x3 | 0x8);  // Asegurar que el cuarto dígito sea 4 y el séptimo dígito sea uno de 8, 9, A, o B
        return v.toString(16);  // Convertir el valor a hexadecimal
    });
}


function addToCart(id){
    console.log('adas')
    socketClient.emit(`addToCart`, {productId: id, cartId: cartId});
}


socketClient.on(`${cartId}/update`,(obj)=>{
    console.log(obj)
    const sum = obj.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
    }, 0);

    cartButton.innerText = `CART (${sum})`
})
