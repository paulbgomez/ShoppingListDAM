// Calcula el total con ayuda de calculateTotalPrice() y lo muestra en el DOM
// el segundo parametro sera el HTMLElement que queremos actualizar
const calculateAndDisplayPrice = (item, shoppingList, domElement, cashDomElement) => {
    shoppingList.products.push(item);
    shoppingList.total += calculateTotalPrice(item.units, item.price);
    domElement.innerHTML = shoppingList.total;
    cashDomElement.innerHTML = shoppingList.total;
}


// calculamos el total del precio de producto
const calculateTotalPrice = (units, price) => units * price;

export { calculateAndDisplayPrice, calculateTotalPrice }