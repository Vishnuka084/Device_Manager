// let fullNameRegex=/^(?=.*[a-z])(?=.*[A-Z])[^A-Za-z0-9\s]*$/
// let dobRegex=/[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/;
// let idRegex=/[0-9]{10,20}$/;
// let addressRegex=/^[a-zA-Z0-9,\/]{10,255}$/;
// let usernameRegex=/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/

// let fullNameRegex=/^[a-zA-Z]{3,30}$/
let passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&?])[A-Za-z\d@#$!%&?]{8,}$/;
let emailRegex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

let fullNameRegex=/^[a-zA-Z0-9,\s-|_]{2,225}$/;

export const emailValidator =  (email:string):boolean => {
    console.log(emailRegex.test(email))
    return emailRegex.test(email);
}

