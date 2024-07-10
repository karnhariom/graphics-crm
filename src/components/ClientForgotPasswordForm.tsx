"use client"
import { forgotPassword } from '@/app/(auth)/_redux/authApi'
import { useFormik } from 'formik'
import Link from 'next/link'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"

export default function ClientForgotPasswordForm() {
    const {isLoading} = useSelector((state: any) => state.auth, shallowEqual)
    const dispatch = useDispatch()
    const initialValues = {
        email: "",
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required")
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log("values =>", values)
            const data = {
                email: values.email
            }
            const res = await dispatch(forgotPassword(data))
            console.log('res: ', res);
        }
    })
    return (
        <div className='cred-page'>
            <form className='cred-form' onSubmit={formik.handleSubmit}>
                <h3 className="t-center form-title">Forgot Password</h3>
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
                    <button type="submit" disabled={isLoading}>Reset Password</button>
                </div>
                <p className='t-center note'><Link href="/client-login">Back to sign in</Link></p>
            </form>
        </div>
    )
}
