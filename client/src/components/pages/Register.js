import React from 'react'
import { Link } from 'react-router-dom'
function Register({changeHandler,registerHandler}) {
  return (
    <div>
         <h4>Ro'yxatdan o'tish</h4>
            <form className='form form-login' onSubmit={e => e.preventDefault()}>
               <div className='row'>
                <div className='input-field col s12 m12'>
                   <input
                    type="email"
                    name='email'
                    className='validate'
                    onChange={changeHandler}
                    />
                    <label htmlFor='email'>Email</label>
                </div>
                <div className='input-field col s12 m12'>
                   <input
                    type="password"
                    name='password'
                    className='validate'
                    onChange={changeHandler}
                    />
                    <label htmlFor='password'>Password</label>
                </div>
               </div>
               <div className='row'>
                 <button
                  className='waves-effect waves-light btn blue'
                  onClick={registerHandler}
                 >
                    Ro'yxatdan o'tish
                 </button>
                 <Link to="/login"
                 className='btn-outline btn-reg'
                 >Hisobingiz bormi?</Link>
               </div>
            </form>
    </div>
  )
}

export default Register