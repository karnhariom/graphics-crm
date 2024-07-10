"use client"
import { register } from '@/app/(auth)/_redux/authApi'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"

export default function ClientRegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)

    const dispatch = useDispatch()
    const { token, isLoading } = useSelector((state: any) => state.auth, shallowEqual)
    console.log('token: ', token);
    const initialValues = {
        name: "",
        company: "",
        phone: "",
        email: "",
        password: "",
        c_password: "",
        accept: false
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required"),
        name: Yup.string().required("Name is required"),
        company: Yup.string().required("company name is required"),
        phone: Yup.string().required("Phone number is required"),
        c_password: Yup.string()
            .oneOf([Yup.ref("password")], "Confirm Passwords do not match")
            .required("Confirm Password is required"),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const data = {
                name: values.name,
                company: values.company,
                phone: values.phone,
                email: values.email,
                password: values.password
            }
            const res = await dispatch(register(data))
            console.log('res: ', res);
        }
    })

    return (
        <div className='cred-page'>
            <form className='cred-form' onSubmit={formik.handleSubmit}>
                <h3 className="t-center form-title">Client Register</h3>
                <div className="form-body">
                    <div className="inp-box">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ?
                            <span className="err-msg">{formik.errors.name}</span> :
                            null
                        }
                    </div>
                    <div className="inp-box">
                        <label htmlFor="company">Company/Firm Name</label>
                        <input
                            type="text"
                            name="company"
                            id="company"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.company}
                        />
                        {formik.touched.company && formik.errors.company ?
                            <span className="err-msg">{formik.errors.company}</span> :
                            null
                        }
                    </div>
                    <div className="inp-box">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone ?
                            <span className="err-msg">{formik.errors.phone}</span> :
                            null
                        }
                    </div>
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
                    <div className="inp-box">
                        <label htmlFor="password">Confirm Password</label>
                        <div className="pwd-field">
                            <input
                                type={showConfPassword ? "text" : "password"}
                                name="c_password"
                                id="c_password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.c_password}
                            />
                            <div className="pwd-eye" onClick={() => setShowConfPassword(!showConfPassword)}>
                                <i className={`fa-regular ${showConfPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </div>
                        </div>
                        {formik.touched.c_password && formik.errors.c_password ?
                            <span className="err-msg">{formik.errors.c_password}</span> :
                            null
                        }
                    </div>
                    <div className="accept-div">
                        <input
                            type="checkbox"
                            name="accept"
                            id="accept"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.accept}
                        />
                        <label htmlFor="accept">I agree terms and condition</label>
                    </div>
                    <button type="submit" disabled={isLoading}>Register</button>
                    <p className='t-center note'>Already have an account? <Link href="/client-login">Login</Link></p>
                </div>
            </form>
        </div>
    )
}
