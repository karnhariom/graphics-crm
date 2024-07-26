"use client"
import Dropdown from '@/components/Dropdown'
import DropdownC from '@/components/DropdownC'
import { convertToWebP } from '@/helpers/clientHelper'
import { useFormik } from 'formik'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"
import { addCategory } from '../_redux/adminApi'

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

export default function AddCategory() {
    const { categoryList } = useSelector((state: RootState) => state.admin, shallowEqual);
    const dispatch = useDispatch()
    const initialValues = {
        title: "",
        slug: "",
        parentCategory: "",
        categoryImage: null,
        description: ""
    }
    const validationSchema = Yup.object({
        title: Yup.string().required("Category Title is required"),
        slug: Yup.string().required("Category Slug is required"),
        parentCategory: Yup.string(),
        description: Yup.string()
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const data = {
                title: values.title,
                categoryImage: values.categoryImage,
                categorySlug: values.slug,
                parentCategory: values.parentCategory
            }
            const res = await dispatch(addCategory(data))
            
            if(res?.payload?.success){
                resetForm()
            }
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
                formik.setFieldValue("categoryImage", convertedFile)
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
            <form className="catg-form" onSubmit={formik.handleSubmit}>
                <div className="inp-box">
                    <label htmlFor="title">Title</label>
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
                    <label htmlFor="categoryImage">Category Image</label>
                    <input
                        className={formik.touched.categoryImage && formik.errors.categoryImage ? "err" : ""}
                        type="file"
                        name="categoryImage"
                        id="categoryImage"
                        accept=".png, .webp, .jpg, .jpeg"
                        // onChange={handleCatgImage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.categoryImage && formik.errors.categoryImage ?
                        <span className="err-msg">{formik.errors.categoryImage}</span> :
                        null
                    }
                </div>
                <div className="inp-box">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className={formik.touched.description && formik.errors.description ? "err" : ""}
                        name="description"
                        rows={5}
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
                <Dropdown
                    options={parentOpts}
                    giveValue={handleParentSelect}
                    placeholder={"Parent Category"}
                    label={"Parent Category"}
                    preSelected={formik.values.parentCategory}
                />
                <button type="submit" className='btn blu-btn'>Add Category</button>
            </form>
        </div>
    )
}
