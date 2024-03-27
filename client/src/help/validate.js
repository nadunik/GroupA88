 import toast from "react-hot-toast"

 export async function UsernameValidate(values){
    const errors = UsernameVertify({}, values);

    return errors;
 }

 export async function PasswordValidate(values){
    const errors = PasswordVertify({}, values);

    return errors;
 }

 export async function ResetpasswordValidate(values){
    const errors = PasswordVertify({}, values);

    if(values.password !== values.confirm_password){
        errors.exit = toast.error("Password does not match!")
    }

    return errors;
 }

 export async function RegisterValidate(values){
    const errors = UsernameVertify( {}, values);
    PasswordVertify(errors, values);
    EmailVerify(errors, values);

    return errors;
 }

 export async function ProfileValidate(values){
    const errors = EmailVerify({}, values);
    return errors;
 }

 /** **************************** */

function UsernameVertify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required.!')
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username.!')
    }

    return error;

}

function PasswordVertify(errors = {}, values){

    const specialChars = /['!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required!");
    }else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must contain more than 4 characters!");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have a special character!")
    }

    return errors;
}

function EmailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email Required");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email");
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address")
    }

    return error;
}

