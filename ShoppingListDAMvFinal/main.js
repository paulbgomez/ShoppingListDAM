import { calculateAndDisplayPrice } from "./hooks/priceCalculators.js";
import { itemChecker, itemCheckerCard } from "./hooks/inputCheckers.js";
import { displayProductNames, displayPayment, activatePrintBtn } from "./hooks/domDisplay.js";

 // La shopping list tendra un array de items, un total y el metodo de pago
const shoppingList = {
    products: [],
    total: null,
    paymentMethod: null
}

// Aqui declaramos una funcion que devuelve un objeto con los valores del 'producto'
// con parseFloat.tofixed(2) vamos a aceptar valores enteros y redondearlos a 2 decimales
const newItem = () => {
    return {
        name: document.getElementById('item').value,
        price: parseFloat(document.getElementById('price').value).toFixed(2),
        units: document.getElementById('units').value,
    
    }
 };

const newItemCard = () => {
    return {
        owner: document.getElementById('owner').value,
        cardNumber: parseFloat(document.getElementById('cardNumber').value),
        cvv: document.getElementById('cvv').value
    }
};

window.addEventListener('load', () => {
    /**
     * ELEMENTOS DEL DOM
     */
    // Localizamos los elementos que necesitamos en el DOM y los guardamos en variables
    const name = document.getElementById('item');
    const price = document.getElementById('price');    
    const units = document.getElementById('units');
    const totalPrice = document.getElementById('total-price');
    const totalCash = document.getElementById('total-cash');
    const owner = document.getElementById('owner');
    const cardNumber = document.getElementById('cardNumber');
    const cvv = document.getElementById('cvv');

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

    // Localizamos el trashBtn en el DOM y le anhadimos un evento
    const trashBtn = document.getElementById('clean-fields');
    trashBtn.addEventListener('click', () => resetFields(true))

    // localizamos los nombres de los productos
    const namesProducts = document.getElementById('articlesDisplay');

    //maximo 12 caracteres tarjeta
    cardNumber.addEventListener('input', function(){
    if (this.value.length > 12) 
       this.value = this.value.slice(0,12);
    });
    //máximo 3 caraceteres en el cvv
    cvv.addEventListener('input', function(){
    if (this.value.length > 3) 
       this.value = this.value.slice(0,3); 
    });
    /**
     * FUNCIONES Y LOGICA
     */
    // Esta funcion resetea los input fields y pone autofocus en el name
    const resetFields = (resetShoppingList = false) => {
        name.focus();
        name.value = '';
        price.value = '';
        units.value = 1;
        owner.value='';
        cardNumber.value='';
        cvv.value='';

        // si queremos que resetee tambien el carrito de la compra, pasaremos true a la funcion
        if (resetShoppingList) {
            shoppingList.products = [];
            shoppingList.total = 0;
            totalCash.innerHTML = 0;
            totalPrice.innerHTML = 0;
            namesProducts.innerHTML = '';
        }
    };     

    // Esta funcion anhade el item al carrito de la compra
    const addItem = () => {
        // primero lo registra
        const item = newItem();

        // luego hacemos las comprobaciones, si no las pasa nos salimos de la funcion
        if (!itemChecker(item, name, price)) return;

        // Si los inputs son correctos a�adimos el producto y calculamos el precio total
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
        
        const itemCard = newItemCard();

        // luego hacemos las comprobaciones, si no las pasa nos salimos de la funcion
        debugger;
        if (!itemCheckerCard(itemCard, owner, cardNumber, cvv)) return;
        
      
        else return alert(
            `Los artículos de mi carrito son: ${displayProductNames(shoppingList)}\n
            y el precio total es:  ${shoppingList.total + "€"}\n 
            Metodo de pago: ${paymentMethod.value}`
            )
    }
});

