import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import { login } from '../Services/Authentication';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    const Swal = require('sweetalert2')

    const navigate = useNavigate()
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("miftaahadmin"))) {
            navigate("/speakers")
        }
    }, [])


    // loder
    const [loder, setLoder] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (fdata) => {
        setLoder(true);
        const resp = await login(fdata)

        if (resp.data.code === 1) {
            localStorage.setItem("miftaahadmin", JSON.stringify(resp.data.data))
            setTimeout(() => {
                navigate("/speakers");
            }, 0);
        }
        else if (resp.data.code === 0) {
            Swal.fire({
                title: 'Email or Password is wrong!',
                timer: 1000,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoder(false)
        }
    }

    return (
        <div className="login">
            <div className="login-content">
                <div className="login-img">
                    <img src="/assets/images/Logo.png" alt="" />
                </div>
                <div className="login-header">
                    <h3>Admin Login</h3>
                    <p>Sign In to continue to Miftaah Admin Portal</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-login">
                    <div className="login-name mb-20">
                        <div className="login-l">
                            <label htmlFor="uname">Email</label>
                        </div>
                        <input {...register("Email", { required: true })} className='inputField' type="email" />
                        {errors.Email && <span className='eror'>Email is required</span>}
                    </div>

                    <div className="login-name">
                        <div className="login-l">
                            <label htmlFor="upass">Password</label>
                        </div>
                        <input {...register("Password", { required: true })} className='inputField' type="password" />
                        {errors.Password && <span className='eror'>Password is required</span>}
                    </div>
                    {
                        (loder >= true) ?
                            <div className="relative">
                                <div className="loader alignLoader loginLoder"></div>
                                <input className="login-button" type="submit" value='SIGN IN' disabled />
                            </div>
                            :
                            <input className="login-button" type="submit" value='SIGN IN' />
                    }
                    <div className="login-forgot">
                        <Link to="/forget-pass" >Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login