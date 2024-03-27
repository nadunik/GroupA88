import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assests/pngwing.com.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { PasswordValidate } from '../help/validate';

import style from '../style/UserName.module.css';

const Recovery = () =>{

  const formik = useFormik({
    initialValues : {
      password : ''
    },
    validate : PasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      console.log(values)
    }
  });
  
  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={style.page}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Recover Password</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recover password!
            </span>
          </div>

          <form className='pt-20'>
            
            <div className='textbox flex flex-col items-center gap-6'>

              <div className='input text-center'>
              <span className='py-4 text-sm text-left text-gray-500'>
                Enter the 6 digit OTP number sent to your email address.
              </span>
              <input className={style.textbox} type='password' placeholder='OTP' />

              <button className={style.btn} type='submit'>Submit</button>
            </div>
              </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>Can't get OTP? <button className='text-red-600'>Resend.</button></span>
            </div>

          </form>


        </div>
      </div>
    </div>
  );
  };

  export default Recovery;
