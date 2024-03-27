import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assests/pngwing.com.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { ProfileValidate } from '../help/validate';
import ConverttoBase64 from '../help/convert';

import style from '../style/UserName.module.css';
import extend from '../style/Profile.module.css';

const Profile = () =>{

  const [ file, setFile] = useState()

  const formik = useFormik({
    initialValues : {
      firstname : '',
      lastname : '',
      email : '',
      mobile : '',
      address : ''
    },
    validate : ProfileValidate,
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
        <div className={`${style.page} ${extend.page}`} style={{width: "45%"}}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Your Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Update your details.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img src={file || avatar} className={`${style.profile_image} ${extend.profile_image}`} alt='avatar' />
              </label>
              
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>

              <div className='name flex w-3/4 gap-10'>
                <input {...formik.getFieldProps('firstname')} className={`${style.textbox} ${extend.textbox}`} type='text' placeholder='FirstName' /> 
                <input {...formik.getFieldProps('lastname')} className={`${style.textbox} ${extend.textbox}`} type='text' placeholder='LastName' />
              </div>

              <div className='name flex w-3/4 gap-10'>
                <input {...formik.getFieldProps('mobile')} className={`${style.textbox} ${extend.textbox}`} type='text' placeholder='Mobile no.' /> 
                <input {...formik.getFieldProps('email')} className={`${style.textbox} ${extend.textbox}`} type='text' placeholder='Email*' />
              </div>

              <div className='name flex w-3/4 gap-10'>
                <input {...formik.getFieldProps('address')} className={`${style.textbox} ${extend.textbox}`} type='text' placeholder='Address' />
              </div>

              <div className='name flex w-3/4 gap-10'>  
                <button className={style.btn} type='submit'>Update</button>
              </div>

            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>come back later? <Link className='text-red-600' to='/'>Logout.</Link></span>
            </div>

          </form>


        </div>
      </div>
    </div>
  );
  };

  export default Profile;
