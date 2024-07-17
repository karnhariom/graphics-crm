"use client"
import Dropdown from '@/components/Dropdown'
import DropdownC from '@/components/DropdownC'
import { convertToWebP } from '@/helpers/clientHelper'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"
import { addCategory, addProduct, getCategories } from '../_redux/adminApi'

interface CategoryProps {
    _id: string;
    title: string;
    categorySlug: string;
    description: string;
    children: CategoryProps[];
}

interface RootState {
    admin: {
        categoryList: CategoryProps[];
    };
}

export default function AddProduct() {
    const { categoryList } = useSelector((state: RootState) => state.admin, shallowEqual);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    const initialValues = {
        title: "",
        slug: "",
        description: "",
        category: "",
        productImage: null,
        price: ""
    }
    const validationSchema = Yup.object({
        title: Yup.string().required("Category Title is required"),
        slug: Yup.string().required("Category Slug is required"),
        price: Yup.string().required("Price is required"),
        category: Yup.string(),
        description: Yup.string(),
        productImage: Yup.mixed().required("Image is required")
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const data = {
                title: values.title,
                description: values.description,
                price: values.price,
                productImage: values.productImage,
                slug: values.slug,
                category: values.category
            }
            dispatch(addProduct(data))
        }
    })

    const handleTitleChange = (e: any) => {
        const val = e.target.value
        const slug = val.replaceAll(" ", "-").toLowerCase()
        formik.setFieldValue("slug", slug)
    }

    const handleCatgImage = async (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const convertedFile = await convertToWebP(event)
            if (convertedFile) {
                formik.setFieldValue("productImage", convertedFile)
            }
        }
    }
    const handleParentSelect = (value: any) => {
        formik.setFieldValue("parentCategory", value);
    }
    const buildParentOptions = (categories: CategoryProps[], level = 0, options: { value: string, label: string }[] = []): { value: string, label: string }[] => {
        categories.forEach(category => {
            const prefix = Array(level).fill(`&nbsp`).join('');
            options.push({ value: category._id, label: `${prefix} ${category.title}` });
            if (category.children.length > 0) {
                buildParentOptions(category.children, level + 1, options);
            }
        });
        return options;
    }
    const parentOpts = [{ label: "None", value: "" }, ...buildParentOptions(categoryList)];

    return (
        <div>
            <h4>Add New Category</h4>
            <form className="prod-form" onSubmit={formik.handleSubmit}>
                <div className="form-left section">
                    <div className="inp-box">
                        <label htmlFor="title">Product Title</label>
                        <input
                            className={formik.touched.title && formik.errors.title ? "err" : ""}
                            type="text"
                            name="title"
                            id="title"
                            onChange={(e) => {
                                formik.handleChange(e);
                                handleTitleChange(e)
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title ?
                            <span className="err-msg">{formik.errors.title}</span> :
                            null
                        }
                    </div>
                    <div className="inp-box">
                        <label htmlFor="slug">Slug</label>
                        <input
                            className={formik.touched.slug && formik.errors.slug ? "err" : ""}
                            type="text"
                            name="slug"
                            id="slug"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={(e) => {
                                if (e.key === " ") return e.preventDefault()
                            }}
                            value={formik.values.slug}
                        />
                        {formik.touched.slug && formik.errors.slug ?
                            <span className="err-msg">{formik.errors.slug}</span> :
                            null
                        }
                    </div>
                    <div className="inp-box">
                        <label htmlFor="price">Product Price</label>
                        <input
                            className={formik.touched.price && formik.errors.price ? "err" : ""}
                            type="text"
                            name="price"
                            id="price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                        />
                        {formik.touched.price && formik.errors.price ?
                            <span className="err-msg">{formik.errors.price}</span> :
                            null
                        }
                    </div>
                    <div className="inp-box">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className={formik.touched.description && formik.errors.description ? "err" : ""}
                            name="description"
                            rows={15}
                            id="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                        {formik.touched.description && formik.errors.description ?
                            <span className="err-msg">{formik.errors.description}</span> :
                            null
                        }
                    </div>
                </div>
                <div className="form-right section">
                    <div className="inp-box">
                        <label htmlFor="productImage">Product Image</label>
                        <input
                            className={formik.touched.productImage && formik.errors.productImage ? "err" : ""}
                            type="file"
                            name="productImage"
                            id="productImage"
                            accept=".png, .webp, .jpg, .jpeg"
                            onChange={handleCatgImage}
                        />
                        {formik.touched.productImage && formik.errors.productImage ?
                            <span className="err-msg">{formik.errors.productImage}</span> :
                            null
                        }
                    </div>
                    <Dropdown
                        options={parentOpts}
                        giveValue={handleParentSelect}
                        placeholder={"Category"}
                        label={"Category"}
                        preSelected={formik.values.category}
                    />
                </div>
                <button type="submit" className='btn blu-btn'>Add Category</button>
            </form>
        </div>
    )
}
