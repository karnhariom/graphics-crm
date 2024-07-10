"use client"
import { changeUserPassword } from '@/app/dashboard/_redux/userApi'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from "yup"

export default function ChangeUserPassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)
    const [focusedField, setFocusedField] = useState("");
    const dispatch = useDispatch()

    const initialValues = {
        curr_password: "",
        new_password: "",
        conf_password: ""
    }
    const validationSchema = Yup.object({
        curr_password: Yup.string().required("Current Password is required"),
        new_password: Yup.string().required("New Password is required"),
        conf_password: Yup.string()
            .oneOf([Yup.ref("new_password")], "Confirm Passwords do not match")
            .required("Confirm Password is required"),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log("values: ", values)
            const data = {
                old_password: values.curr_password,
                new_password: values.new_password
            }
            await dispatch(changeUserPassword(data))
        }
    })

    const handleFocus = (fieldName: any) => {
        setFocusedField(fieldName);
    };

    return (
        <form className='profile-form' onSubmit={formik.handleSubmit}>
            <h3 className="form-title">Change Password</h3>
            <div>
                <div className="form-body flex-col">
                    <div>
                        <div className={`inp-box fl-label ${formik.values.curr_password !== "" ||
                            focusedField === "curr_password"
                            ? "active "
                            : " "
                            }`}>
                            <label htmlFor="curr_password">Current Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="curr_password"
                                id="curr_password"
                                onChange={formik.handleChange}
                                value={formik.values.curr_password}
                                onFocus={() => handleFocus("curr_password")}
                                onBlur={(e) => {
                                    setFocusedField("");
                                    formik.handleBlur(e);
                                }}
                            />
                            <div className='eye-icon' onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ?
                                        <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
                                }
                            </div>

                        </div>
                        {formik.touched.curr_password && formik.errors.curr_password ?
                            <span className="err-msg">{formik.errors.curr_password}</span> :
                            null
                        }
                    </div>
                    <div>
                        <div className={`inp-box fl-label ${formik.values.new_password !== "" ||
                            focusedField === "new_password"
                            ? "active "
                            : " "
                            }`}>
                            <label htmlFor="new_password">New Password</label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="new_password"
                                id="new_password"
                                onChange={formik.handleChange}
                                value={formik.values.new_password}
                                onFocus={() => handleFocus("new_password")}
                                onBlur={(e) => {
                                    setFocusedField("");
                                    formik.handleBlur(e);
                                }}
                            />
                            <div className='eye-icon' onClick={() => setShowNewPassword(!showNewPassword)}>
                                {
                                    showNewPassword ?
                                        <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
                                }
                            </div>
                        </div>
                        {formik.touched.new_password && formik.errors.new_password ?
                            <span className="err-msg">{formik.errors.new_password}</span> :
                            null
                        }
                    </div>
                    <div>
                        <div className={`inp-box fl-label ${formik.values.conf_password !== "" ||
                            focusedField === "conf_password"
                            ? "active "
                            : " "
                            }`}>
                            <label htmlFor="conf_password">Confirm Password</label>
                            <input
                                type={showConfPassword ? "text" : "password"}
                                name="conf_password"
                                id="conf_password"
                                onChange={formik.handleChange}
                                value={formik.values.conf_password}
                                onFocus={() => handleFocus("conf_password")}
                                onBlur={(e) => {
                                    setFocusedField("");
                                    formik.handleBlur(e);
                                }}
                            />
                            <div className='eye-icon' onClick={() => setShowConfPassword(!showConfPassword)}>
                                {
                                    showConfPassword ?
                                        <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
                                }
                            </div>
                        </div>
                        {formik.touched.conf_password && formik.errors.conf_password ?
                            <span className="err-msg">{formik.errors.conf_password}</span> :
                            null
                        }
                    </div>
                </div>
                <div className="upd-btn">
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    )
}
