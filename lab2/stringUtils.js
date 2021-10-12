//positive if x>y
//negative if x<y
function compare(x, y){
    if(x == y) return 0;

    //whitespace cases
    if(x == ' ') return 1;
    if(y == ' ') return -1;

    //both lowercase
    if(x >= 'a' && x <= 'z' && y >= 'a' && y <= 'z') {
        if(x<y) return -1;
        return 1;
    }
    //x lower, y not lower
    if(x >= 'a' && x <= 'z') return -1;
    //y lower, x not lower
    if(y >= 'a' && y <= 'z') return 1;

    //both upper
    if(x >= 'A' && x <= 'Z' && y >= 'A' && y <= 'Z') {
        if(x<y) return -1;
        return 1;
    }
    //x upper, y not upper
    if(x >= 'A' && x <= 'Z') return -1;
    //y upper, x not upper
    if(y >= 'A' && y <= 'Z') return 1;

    //both numbers 
    if(x >= '0' && x <= '9' && y >= '0' && y <= '9') {
        if(x<y) return -1;
        return 1;
    }
    //x number, y not number
    if(x >= '0' && x <= '9') return -1;
    //y number, x not number
    if(y >= '0' && y <= '9') return 1;

    //both must be special characters
    if(x<y) return -1;
        return 1;
}

function string_checker(str, errString){
    if(str == undefined || typeof(str) != "string" || str.length == 0) throw errString;
    //got this if statement from stack overflow here: https://stackoverflow.com/questions/2031085/how-can-i-check-if-string-contains-characters-whitespace-not-just-whitespace
    if (!/\S/.test(str)) throw errString;
}

function sortString(string){
    string_checker(string, "Argument must be a non-empty string including at least 1 non-whitespace character")
    return string.split('').sort(compare).join('');
}

function replaceChar(string, idx){
    let errString = "The second argument must be a number greater than 0 and less than (string length) - 2" ;
    string_checker(string, "The first argument must be a non-empty string including at least 1 non-whitespace character");
    if(typeof(idx) != "number") throw errString;
    if(idx == 0 || idx > (string.length -2)) throw errString;

    let before = string.charAt(idx-1);
    let after = string.charAt(idx+1);
    let replace = string.charAt(idx);
    let curInd = 0;
    let odd = false;

    let ret = string.split('')
    ret.forEach(function(char){
        if(char == replace && curInd != idx){
            if(odd){
                ret[curInd] = after;
                odd = false;
            } else{
                ret[curInd] = before;
                odd = true;
            }
        }
        curInd++;
    });

    return ret.join('');
}

function mashUp(string1, string2, char){
    string_checker(string1, "First 2 arguments must be a non-empty string including at least 1 non-whitespace character");
    string_checker(string2, "First 2 arguments must be a non-empty string including at least 1 non-whitespace character");
    string_checker(char, "Third argument must be a single character string");

    let len1 = string1.length;
    let len2 = string2.length;

    if(len1 > len2){
        for(let i=0; i < len1 - len2; i++) string2 = string2.concat(char);
    }
    if(len1 < len2){
        for(let i=0; i < len2 - len1; i++) string1 = string1.concat(char);
    }

    let arr1 = string1.split('');
    let arr2 = string2.split('');
    let arrFinal = []

    for(let i=0; i < string1.length; i++) {
        arrFinal.push(arr1[i]);
        arrFinal.push(arr2[i]);
    }

    return arrFinal.join('');
}

module.exports = {
    sortString,
    replaceChar,
    mashUp
};