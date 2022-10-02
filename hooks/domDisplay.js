// mapeamos el [] de productos de la shoppinglist y los mostramos en el DOM
const displayProductNames = (shoppingList) => {
    const names = shoppingList.products.map((product) => product.name)
    document.getElementById('articlesDisplay').innerHTML = names;
}

export { displayProductNames }