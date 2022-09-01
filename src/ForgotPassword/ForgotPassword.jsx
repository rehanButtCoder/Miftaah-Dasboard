import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import { login } from '../Services/Authentication';
import { useEffect } from "react";
import { forgotPass } from '../Services/ForgotPassword';

function ForgotPassword() {
    
    const Swal = require('sweetalert2')

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (fdata) => {
        debugger
        const resp = await forgotPass(fdata)

        console.log(resp)
    
        if(resp.data.code === 1){
            Swal.fire({
                title: resp.data.data.message,
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })

            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    return (
        <div className="login">
            <div className="login-content">
                <div className="login-img">
                    <img src="/assets/images/Logo.png" alt="" />
                </div>
                <div className="login-header">
                    <h3>Forgot Password</h3>
                    <p>You can reset your password</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-login">
                    <div className="login-name">
                        <div className="login-l">
                            <label htmlFor="uname">Email</label>
                        </div>
                        <input {...register("email", { required: true })} placeholder="example@example.com" className='inputField' type="email" />
                        {errors.email && <span className='eror'>Email is required</span>}
                    </div>

                    {/* <div className="login-name">
                        <div className="login-l">
                            <label htmlFor="upass">Password</label>
                        </div>
                        <input {...register("Password", { required: true })} className='inputField' type="password" />
                        {errors.Password && <span className='eror'>Password is required</span>}
                    </div> */}
                    <input className="login-button mt35" type="submit" value='SIGN IN' />

                    {/* <div className="login-forgot">
                        <a href="#">Forgot Password?</a>
                    </div> */}
                </form>
            </div>
        </div>

    )
}

export default ForgotPassword