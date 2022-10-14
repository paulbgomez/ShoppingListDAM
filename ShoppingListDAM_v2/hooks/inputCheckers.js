// Comprueba que se haya introducido un valor
const checkNamePrice = (valueCheck, idValue) => {
    if (!valueCheck) {
        document.getElementById(idValue).classList.remove('hide');
        return false;
    }
    else  {
        document.getElementById(idValue).classList.add('hide');
        return true;
    }
}

// Comprueba que el dato introducido sea un numero y mayor que 0
const isNumber = (value, idValue) => {
    if (isNaN(value) || value < 0) {
        document.getElementById(idValue).innerHTML = 'tipo de dato incorrecto';
        document.getElementById(idValue).classList.remove('hide');
        return false;
    }
    else {
        document.getElementById(idValue).classList.add('hide');
        return true;
    }
}

// En esta funcion hacemos todas las comprobaciones
const itemChecker = (item, elementName, elementPrice) => {
    // Si el item no es correcto, alertamos y nos salimos de la funcion
    if (!checkNamePrice(item.name, 'hide-name')) {
        elementName.focus();
        return false;
    }

    if (!isNumber(item.price, 'hide-price') || !checkNamePrice(item.price, 'hide-price')) {
        elementPrice.focus();
        return false;
    }
    if(!checkItemValidity(item)) return false;
    else return true;
}

// comprobamos que el objeto product contiene los valores necesarios
const checkItemValidity = (item) => item.name && item.price && item.units;


export { checkNamePrice ,isNumber, itemChecker, checkItemValidity }