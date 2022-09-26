// Declaramos un Objeto product donde guardaremos los datos del mismo
const product = {
    name: null,
    price: null,
    units: null
}

// La shopping list tendra un array de items, un total y el metodo de pago
const shoppingList = {
    products: [],
    total: null,
    paymentMethod: null
}

window.onload = () => {
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', () => addItem())
}

// comprobamos que el objeto product contiene los valores necesarios
const checkItemValidity = (item) => item.name && item.price && item.units;
// calculamos el total del precio de producto
const calculateTotalPrice = (units, price) => units * price;

// Aqui declaramos una funcion que sobreescribe los valores del item
const newItem = () => {
    product.name = document.getElementById('item').value;
    product.price = parseInt(document.getElementById('price').value, 10);
    product.units = document.getElementById('units').value;
}

// Esta funcion anhade el item al carrito de la compra
const addItem = () => {
    // primero lo registra
    newItem();
    // lo valida y anhade
    if (checkItemValidity(product)) {
        console.log(product);
        console.log(shoppingList);
        shoppingList.products.push(product);
        shoppingList.total += calculateTotalPrice(product.units, product.price);
    }

    const names = shoppingList.products.map((product) => product.name)
    document.getElementById('articlesDisplay').innerHTML = names;
}
