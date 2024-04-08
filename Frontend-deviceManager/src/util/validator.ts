// let fullNameRegex=/^(?=.*[a-z])(?=.*[A-Z])[^A-Za-z0-9\s]*$/
// let dobRegex=/[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/;
// let idRegex=/[0-9]{10,20}$/;
// let addressRegex=/^[a-zA-Z0-9,\/]{10,255}$/;
// let usernameRegex=/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/

// let fullNameRegex=/^[a-zA-Z]{3,30}$/
const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&?])[A-Za-z\d@#$!%&?]{8,}$/;
const fullNameRegex=/^[a-zA-Z0-9,\s-|_]{2,225}$/;
const locationRegex=/^[a-zA-Z0-9,\s-|_]{2,225}$/;
const contactRegex=/^[0-9]{10}$/;
const usernameRegex=/^[a-zA-Z][a-zA-Z0-9_\-@]{2,19}$/;

export const fullNameValidator = (name:string):boolean => {
    return fullNameRegex.test(name);
}

export const locationValidator = (location:string):boolean => {
    return locationRegex.test(location);
}

export const passwordValidator = (password:string):boolean => {
    return passwordRegex.test(password);
}

export const contactValidator = (contact:string):boolean => {
    return contactRegex.test(contact)
}

export const usernameValidator = (username:string) :boolean => {
    console.log(usernameRegex.test(username))
    return usernameRegex.test(username);
}