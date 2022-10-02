import { calculateAndDisplayPrice } from "./hooks/priceCalculators.js";
import { itemChecker } from "./hooks/inputCheckers.js";
import { displayProductNames, displayPayment, activatePrintBtn } from "./hooks/domDisplay.js";

// La shopping list tendra un array de items, un total y el metodo de pago
const shoppingList = {
    products: [],
    total: null,
    paymentMethod: null
}

// Aqui declaramos una funcion que devuelve un objeto con los valores del 'producto'
const newItem = () => {
    return {
        name: document.getElementById('item').value,
        price: parseInt(document.getElementById('price').value, 10),
        units: document.getElementById('units').value,
    }
};

window.onload = () => {
    /**
     * ELEMENTOS DEL DOM
     */
    // Localizamos los elementos que necesitamos en el DOM y los guardamos en variables
    const name = document.getElementById('item');
    const price = document.getElementById('price');    
    const units = document.getElementById('units');
    const totalPrice = document.getElementById('total-price');
    const totalCash = document.getElementById('total-cash');

    // Anhadimos un evento 'change' al input de seleccion de metodo de pago
    const paymentMethod = document.getElementById('payment');
    paymentMethod.addEventListener('change', () => displayPaymentTags());
    
    // Anhadimos un evento 'change' al input del checkbox
    const conditionsButton = document.getElementById('conditions');
    conditionsButton.addEventListener('change', () => checkButtonsConditions());

    // Localizamos el submitBtn en el DOM y le anhadimos un evento
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', () => addItem())

    // Localizamos el printBtn en el DOM y le anhadimos un evento
    const printBtn = document.getElementById('print');
    printBtn.addEventListener('click', () => modalInfo())

    // Localizamos el resetBtn en el DOM y le anhadimos un evento
    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', () => resetFields(true))

    /**
     * FUNCIONES Y LOGICA
     */
    // Esta funcion resetea los input fields y pone autofocus en el name
    const resetFields = (resetShoppingList = false) => {
        name.focus();
        name.value = '';
        price.value = '';
        units.value = 1;

        // si queremos que resetee tambien el carrito de la compra, pasaremos true a la funcion
        if (resetShoppingList) {
            shoppingList.products = [];
            shoppingList.total = 0;
            totalCash.innerHTML = 0;
            totalPrice.innerHTML = 0;
        }
    };     

    // Esta funcion anhade el item al carrito de la compra
    const addItem = () => {
        // primero lo registra
        const item = newItem();

        // luego hacemos las comprobaciones, si no las pasa nos salimos de la funcion
        if (!itemChecker(item, name, price)) return;

        // Si los inputs son correctos añadimos el producto y calculamos el precio total
        calculateAndDisplayPrice(item, shoppingList, totalPrice, totalCash);
        displayProductNames(shoppingList);

        // reseteamos los campos
        resetFields();
    }

    // Mostrara diferentes partes del HTML dependiendo del tipo de metodo de pago seleccionado
    const displayPaymentTags = () => displayPayment(paymentMethod.value);

    // It disables and enables print button depending on the checkbox value
    const checkButtonsConditions = () => activatePrintBtn(conditionsButton.checked);

    // Muestra el cuadro con la informacion del carrito de compra
    const modalInfo = () => {
        if (paymentMethod.value === 'select') return alert('Selecciona un metodo de pago');
        else return alert(
            `Productos de la lista de la compra: ${displayProductNames(shoppingList)}\n
            Total: ${shoppingList.total}\n
            Metodo de pago:${paymentMethod.value}`
            )
    }
}
