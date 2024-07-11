"use client"
import { getUserDetail, updateUserProfile } from '@/app/dashboard/_redux/userApi'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"

export default function ClientProfileForm() {
    const { userDetail } = useSelector((state: any) => state.user, shallowEqual)
    const dispatch = useDispatch()
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
        name: Yup.string().required("Name is required"),
        phone: Yup.string().required("Phone is required"),
        company: Yup.string(),
        email: Yup.string().email("Invalid email format").required("Email is required"),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log('values: ', values);   
            const data = {
                name: values.name,
                email: values.email,
                company: values.company,
                phone: values.phone,
                state: values.state,
                city: values.city,
                address: values.address,
                pincode: values.pincode
            }
            await dispatch(updateUserProfile(data))
        }
    })

    useEffect(() => {
        dispatch(getUserDetail())
    }, [dispatch])

    useEffect(() => {
        if (userDetail) {
            formik.setValues({
                name: userDetail?.name ? userDetail?.name : "",
                company: userDetail?.company ? userDetail?.company : "",
                phone: userDetail?.phone ? userDetail?.phone : "",
                email: userDetail?.email ? userDetail?.email : "",
                address: userDetail?.address ? userDetail?.address : "",
                state: userDetail?.state ? userDetail?.state : "",
                city: userDetail?.city ? userDetail?.city : "",
                pincode: userDetail?.pincode ? userDetail?.pincode : ""
            })
        }
    }, [userDetail])


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
