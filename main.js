import { calculateAndDisplayPrice } from "./hooks/priceCalculators.js";
import { itemChecker } from "./hooks/inputCheckers.js";
import { displayProductNames } from "./hooks/domDisplay.js";

// La shopping list tendra un array de items, un total y el metodo de pago
const shoppingList = {
    products: [],
    total: null,
    paymentMethod: null
}

window.onload = () => {
    // Localizamos los elementos que necesitamos en el DOM y los guardamos en variables
    const name = document.getElementById('item');
    const price = document.getElementById('price');    
    const units = document.getElementById('units');
    const totalPrice = document.getElementById('total-price');

    // Localizamos el submitBtn en el DOM y le anhadimos un evento
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', () => addItem())

    // Aqui declaramos una funcion que devuelve un objeto con los valores del 'producto'
    const newItem = () => {
        return {
            name: document.getElementById('item').value,
            price: parseInt(document.getElementById('price').value, 10),
            units: document.getElementById('units').value,
        }
    };

    // Esta funcion resetea los input fields y pone autofocus en el name
    const resetFields = () => {
        name.focus();
        name.value = '';
        price.value = '';
        units.value = 1;
    };              

    // Esta funcion anhade el item al carrito de la compra
    const addItem = () => {
        // primero lo registra
        const item = newItem();

        // luego hacemos las comprobaciones
        itemChecker(item, name, price);

        // Si los inputs son correctos añadimos el producto y calculamos el precio total
        calculateAndDisplayPrice(item, shoppingList, totalPrice);
        displayProductNames(shoppingList);

        // reseteamos los campos
        resetFields();
    }
}
