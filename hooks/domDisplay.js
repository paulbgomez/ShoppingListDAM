// mapeamos el [] de productos de la shoppinglist y los mostramos en el DOM
const displayProductNames = (shoppingList) => {
    const names = shoppingList.products.map((product) => product.name)
    document.getElementById('articlesDisplay').innerHTML = names;
    return names;
}

const cashTag = document.getElementsByClassName('cash');
const cardTag = document.getElementsByClassName('credit-card');

// Esconde los elementos con la clase 'credit-card'
const hideCard = () => {
    cashTag[0].classList.remove('hide');
    cardTag[0].classList.add('hide');
}

// Esconde los elementos con la clase 'cash'
const hideCash = () => {
    cardTag[0].classList.remove('hide');
    cashTag[0].classList.add('hide');
}

// Esconde todos los elementos de cash y card
const hideAll = () => {
    cardTag[0].classList.add('hide');
    cashTag[0].classList.add('hide');
}

// dependiendo del meotod de pago esconde o muestra partes del HTML
const displayPayment = (paymentValue) => {
    switch(paymentValue){
        case 'card':
            hideCash();
            break;
        case 'cash':
            hideCard();
            break;
        default:
            hideAll();
            break;
    }
}

// activa y desactiva el boton dependiendo del booleano isChecked
const activatePrintBtn = (isChecked) => {
    if(isChecked) document.getElementById('print').disabled = false;
    else document.getElementById('print').disabled = true;
}

export { displayProductNames, displayPayment, activatePrintBtn }