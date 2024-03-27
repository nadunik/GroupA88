import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assests/pngwing.com.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { RegisterValidate } from '../help/validate';
import ConverttoBase64 from '../help/convert';

import style from '../style/UserName.module.css';

const Register = () =>{

  const [ file, setFile] = useState()

  const formik = useFormik({
    initialValues : {
      email : '',
      username : '',
      password : ''
    },
    validate : RegisterValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      console.log(values)
    }
  });

  const onUpload = async e => {
    const base64 = await ConverttoBase64(e.target.files[0]) ;
    setFile(base64);
  }
  
  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={style.page} style={{width: "45%"}}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Join with Us Today!!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img src={file || avatar} className={style.profile_image} alt='avatar' />
              </label>
              
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('email')} className={style.textbox} type='text' placeholder='Email*' />
              <input {...formik.getFieldProps('username')} className={style.textbox} type='text' placeholder='Username*' />
              <input {...formik.getFieldProps('password')} className={style.textbox} type='password' placeholder='Password*' />
              <button className={style.btn} type='submit'>Register</button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>Already have an account? <Link className='text-red-600' to='/'>Login now.</Link></span>
            </div>

          </form>


        </div>
      </div>
    </div>
  );
  };

  export default Register;
