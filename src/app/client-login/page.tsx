import { useFormik } from 'formik'
import * as Yup from "yup"

export default function ClientLogin() {
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
            console.log("values: ", values)

        }
    })
    return (
        <div className='cred-page'>
            <form className='cred-form' onSubmit={formik.handleSubmit}>

            </form>
        </div>
    )
}
