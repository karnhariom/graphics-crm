"use client"
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup"

export default function ClientLoginForm() {
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
            await axios("/api/user/login-user",
                {
                    method: "POST",
                    data: {
                        email: values.email,
                        password: values.password
                    }
                }
            ).then((data)=>{
                console.log("login<response",data)
            }).catch((err)=>{
              console.log(err)
            })
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
