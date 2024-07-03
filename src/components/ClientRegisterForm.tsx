"use client"
import { useFormik } from 'formik'
import * as Yup from "yup"

export default function ClientRegisterForm() {
    const initialValues = {
        name: "",
        company: "",
        phone: "",
        email: "",
        password: "",
        c_password: "",
        address: "",
        accept: false
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required")
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log("values: ", values)
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
                    <div className="inp-box">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            name="c_password"
                            id="c_password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.c_password}
                        />
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
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}
