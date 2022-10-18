// Comprueba que se haya introducido un valor
const checkName = (valueCheck, idValue) => {
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
    if (!checkName(item.name, 'hide-name')) {
        elementName.focus();
        return false;
    }

    if (!checkName(item.price, 'hide-price') || !isNumber(item.price, 'hide-price') ) {
        elementPrice.focus();
        return false;
    }
    if(!checkItemValidity(item)) return false;
    else return true;
}

const itemCheckerCard = (itemCard, elementOwner, elementCardNumber, elementCvv) => {
    // Si el item no es correcto, alertamos y nos salimos de la funcion
    if (!checkName(itemCard.owner, 'hide-owner')) {
        elementOwner.focus();
        return false;
    }
    
     if (!isNumber(itemCard.cardNumber, 'hide-cardNumber') ){
        elementCardNumber.focus();
        return false;
    } 
    
    if (!checkName(itemCard.cvv, 'hide-cvv')) {
        elementCvv.focus();
        return false;
    }

  
    
    if(!checkItemValidityCard(itemCard)) return false;
    else return true;
}

// comprobamos que el objeto product contiene los valores necesarios
const checkItemValidity = (item) => item.name && item.price && item.units;
const checkItemValidityCard = (itemCard) => itemCard.owner && itemCard.cardNumber && itemCard.cvv;

export { checkName ,isNumber, itemChecker, checkItemValidity, itemCheckerCard, checkItemValidityCard  }