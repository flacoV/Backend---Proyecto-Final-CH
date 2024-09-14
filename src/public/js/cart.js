
let cartId = sessionStorage.getItem('cartId')


const socketClient = io("/cart", {query:{cartId: cartId}})

socketClient.on(`${cartId}/update`,(obj)=>{
    updateProductList(obj)
})


function updateProductList(cart) {
 
    const productsDiv  = document.getElementById('list-products')

    let productosHTML = "";
  
    cart.items.forEach((item) => {
        const product = item.product
        productosHTML += `<div class="card bg-secondary mb-3 mx-4 my-4" style="max-width: 20rem;">
        <div class="card-header bg-primary text-white">code: ${product.code}</div>
        <div class="card-body">
            <h4 class="card-title text-white">${product.title}</h4>
            <p class="card-text">
            <ul class="card-text">
            <li>id: ${product._id.toString()}</li>
            <li>description: ${product.description}</li>
            <li>price: $${product.price}</li>
            <li>category: ${product.category}</li>
            <li>status: ${product.status}</li>
            <li>stock: ${product.stock}</li>
            thumbnail: <img src="${product.thumbnail}" alt="img" class="img-thumbnail img-fluid">        </ul>
            </p>
            <li>Cantidad: ${item.quantity}</li>
        </div>
        <div class="d-flex justify-content-center mb-4">
        <button type="button" class="btn btn-danger delete-btn" onclick="deleteProduct('${product._id.toString()}')">Eliminar</button>
        </div>
        
    </div>
</div>`;
    });
  
    productsDiv .innerHTML = productosHTML;
}




function deleteProduct(productId) {
  socketClient.emit("removeToCart", {productId: productId, cartId: cartId});
}