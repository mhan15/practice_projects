// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// =========================== UTILITY FUNCTIONS BEGINS =====================================

// function to create a deep copy of an obj/array
const deepCopyFunction = (inObject) => {
    let outObject, value, key
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}
  
    for (key in inObject) {
      value = inObject[key]
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value)
    }
  
    return outObject
}

// a .filter() CALLBACK function to find unique value of an array
const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

// random card number generator
const randomCardNumberGenerator = () => {
    // get random number of digits of the card number between 15 and 16
    let numberOfDigits = Math.floor(Math.random() * (16 - 15 + 1) + 15);

    // get random first digit of the card number between 3 and 6
    let firstDigits = Math.floor(Math.random() * (6 - 3 + 1) + 3);

    // generate card number
    let cardNumber = [];
    cardNumber[0] = firstDigits;
    for(i = 1; i < numberOfDigits; i++){
        cardNumber[i] = Math.floor(Math.random() * 10);
    }

    return cardNumber
}

// =========================== UTILITY FUNCTIONS ENDS =====================================

const validateCred = (array) => {

    // store para to a new variable
    let convertedArray = deepCopyFunction(array);

    // check with Luhn algorithm
    for(let i = convertedArray.length - 2; i >= 0; i-=2 ){
        if(convertedArray[i] * 2 > 9){
            convertedArray[i] = convertedArray[i] * 2 - 9;
        } else {
            convertedArray[i] = convertedArray[i] * 2;
        }
    }

    let sumValue = convertedArray.reduce((a,b) => a + b, 0);
    return sumValue % 10 === 0
}

// get array of all invalid cards
const findInvalidCards = (arrayOfCards) => {
    let invalidCards = [];
    for(let arrayOfCard of arrayOfCards){
        let validation = validateCred(arrayOfCard);
        if(validation === false){
            invalidCards.push(arrayOfCard);
        }
    }

    return invalidCards
}

// get array of companies' names that issued an invalid card
const idInvalidCardCompanies = (invalidCardsArray) => {

    // get array of first digit of all invalid cards
    let firstDigitsArray = [];
    for(let i = 0; i < invalidCardsArray.length; i ++){
        firstDigitsArray.push(invalidCardsArray[i][0]);
    }

    // get array of unique first digit
    let firstDigitsArrayUnique = firstDigitsArray.filter(onlyUnique);

    // iterate through the array of unique
    let invalidCardCompaniesArray = [];
    for(let i = 0; i < firstDigitsArrayUnique.length; i++){
        switch(firstDigitsArrayUnique[i]){
            case 3 : invalidCardCompaniesArray.push('Amex (American Express)');
            break;
            case 4 : invalidCardCompaniesArray.push('Visa');
            break;
            case 5 : invalidCardCompaniesArray.push('Mastercard');
            break;
            case 6 : invalidCardCompaniesArray.push('Discover');
            break;
            default : console.log('Company not found');
        }
    }
    return invalidCardCompaniesArray
}







