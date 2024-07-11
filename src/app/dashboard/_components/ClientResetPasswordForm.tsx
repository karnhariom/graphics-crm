"use client"
import { resetPassword } from '@/app/(auth)/_redux/authApi'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"

export default function ClientResetPasswordForm() {
    const {isLoading} = useSelector((state: any) => state.auth, shallowEqual)

    const { id } = useParams()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)

    const dispatch = useDispatch()
    const initialValues = {
        password: "",
        c_password: ""
    }
    const validationSchema = Yup.object({
        password: Yup.string().required("Password is required"),
        c_password: Yup.string()
            .oneOf([Yup.ref("password")], "Confirm Passwords do not match")
            .required("Confirm Password is required"),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const data = {
                verifyToken: id,
                password: values.password
            }
            const res = await dispatch(resetPassword(data))
            console.log('res: ', res);
        }
    })
    return (
        <div className='cred-page'>
            <form className='cred-form' onSubmit={formik.handleSubmit}>
                <h3 className="t-center form-title">Reset Password</h3>
                <div className="form-body">
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
                    <button type="submit" disabled={isLoading}>Reset Password</button>
                    <p className="note">Go to <Link href="/client-login"> Login page</Link></p>
                </div>
            </form>
        </div>
    )
}
