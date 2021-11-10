let myForm = document.getElementById('palindromeForm');
let textInput = document.getElementById('check');
let errorDiv = document.getElementById('error');
let myOl = document.getElementById('list');

function type_checker(item, type, errString, objType){
    if(item == undefined || typeof(item) != type || item.length == 0) throw errString;
    if(type == "string"){
        //got this if statement from stack overflow here: https://stackoverflow.com/questions/2031085/how-can-i-check-if-string-contains-characters-whitespace-not-just-whitespace
        if (!/\S/.test(item)) throw errString;
    }
    if(objType == "array"){
        if(!Array.isArray(item) || item.length == 0) throw errString;
    }
}

function palindromeChecker(str){
    type_checker(str, "string", "Input cannot be empty.")

    let lower = str.toLowerCase();
    let stripped = lower.replace(/[^\w]/gi, '');
    type_checker(stripped, "string", "Input cannot be only special characters.")
    let reverse = stripped.split("").reverse().join("")

    return (stripped == reverse);
}

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        try{
            if (palindromeChecker(textInput.value)) {
                errorDiv.hidden = true;
                let li = document.createElement('li');
                li.innerHTML = textInput.value;
                li.classList.add("is-palindrome")
                myOl.appendChild(li);
                myForm.reset();
                textInput.focus();
            } else {
                errorDiv.hidden = true;
                let li = document.createElement('li');
                li.innerHTML = textInput.value;
                li.classList.add("not-palindrome")
                myOl.appendChild(li);
                myForm.reset();
                textInput.focus();
            }
        }
        catch(e){
            textInput.value = '';
            errorDiv.hidden = false;
            errorDiv.innerHTML = e.toString();
            textInput.focus();
        }
    });
  }