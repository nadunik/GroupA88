import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assests/pngwing.com.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { PasswordValidate } from '../help/validate';

import style from '../style/UserName.module.css';

const Password = () =>{

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
            <h4 className='text-5xl font-bold'>Welcome Back!!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Be a Happy Learner With US!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} className={style.profile_image} alt='avatar' />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('password')} className={style.textbox} type='password' placeholder='Password' />
              <button className={style.btn} type='submit'>Login</button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>Forgot Password? <Link className='text-red-600' to='/Recovery'>Recover Password.</Link></span>
            </div>

          </form>


        </div>
      </div>
    </div>
  );
  };

  export default Password;
