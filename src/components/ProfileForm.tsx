"use client"
import { useFormik } from 'formik'
import * as Yup from "yup"

export default function ProfileForm() {
    const initialValues = {
        name: "",
        company: "",
        phone: "",
        email: "",
        address: "",
        state: "",
        city: "",
        pincode: ""
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
        <form className='profile-form' onSubmit={formik.handleSubmit}>
            <h3 className="form-title">My Profile</h3>
            <div>
                <div className="form-body grid-two">
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
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            name="state"
                            id="state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.state}
                        />
                    </div>
                    <div className="inp-box">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                        />
                    </div>
                    <div className="inp-box">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                        />
                    </div>
                    <div className="inp-box">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            id="pincode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pincode}
                        />
                    </div>
                </div>
                <div className="upd-btn">
                    <button type="submit">Update</button>
                </div>
            </div>
        </form>
    )
}
