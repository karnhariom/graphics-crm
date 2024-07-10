"use client"
import { login } from '@/app/(auth)/_redux/authApi'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from "yup"

export default function ClientLoginForm() {
    const dispatch = useDispatch()
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
            console.log("values =>", values)
            const data: any = {
                email: values.email,
                password: values.password
            }
            console.log("data => ", data)
            const res = await dispatch(login(data))
            console.log("res =>", res )
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
                    </div>
                    <div className="inp-box">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}
