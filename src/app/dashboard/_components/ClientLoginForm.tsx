"use client"
import { login } from '@/app/(auth)/_redux/authApi'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"

export default function ClientLoginForm() {

    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const {isLoading} = useSelector((state: any) => state.auth, shallowEqual)

    const initialValues = {
        email: "",
        password: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const data: any = {
                email: values.email,
                password: values.password
            }
            const res = await dispatch(login(data))
        }
    })
    return (
        <div className='cred-page'>
            <form className='cred-form' onSubmit={formik.handleSubmit}>
                <h3 className="t-center form-title">Client Login</h3>
                <div className="form-body">
                    <div className="inp-box">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <span className="err-msg">{formik.errors.email}</span> :
                            null
                        }
                    </div>
                    <div className="inp-box">
                        <label htmlFor="password">Password</label>
                        <div className="pwd-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <div className="pwd-eye" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </div>
                        </div>
                        {formik.touched.password && formik.errors.password ?
                            <span className="err-msg">{formik.errors.password}</span> :
                            null
                        }
                    </div>
                    <p className='t-right'> <Link href="/forgot-password">Forgot Password?</Link></p>
                    <button type="submit" disabled={isLoading}>Login</button>
                </div>
                <p className='t-center note'>Don't have an account? <Link href="/client-register">Register</Link></p>
            </form>
        </div>
    )
}
