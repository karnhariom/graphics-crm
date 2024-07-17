"use client"
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories } from '../_redux/adminApi';
import Link from 'next/link';
import { toast } from 'react-toastify';

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

export default function AllCategory() {
  const { categoryList } = useSelector((state: RootState) => state.admin, shallowEqual);
  const dispatch = useDispatch();

  const handelDelete = (e: any) => {
    const data = {
      is_delete: true,
      id: e._id
    }
    dispatch(deleteCategory(data))

  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className='catg-table'>
      <table className='ctg-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 ? (
            categoryList.map((category: CategoryProps) => (
              <CategoryRow key={category._id} category={category} level={0} handelDelete={handelDelete} />
            ))

          ) : (
            ""
          )}
        </tbody>
      </table>
    </div>
  );
}

function CategoryRow({ category, level, handelDelete }: { category: CategoryProps, level: number, handelDelete: any }) {
  const prefix = Array(level).fill('-').join('');

  return (
    <>
      <tr>
        <td>
          <p> {prefix} {category.title}</p>
          <p className='catact-links'>
            <div className="clinks">
              <Link href="">Edit</Link>
            </div>
            <div className="clinks">
              <Link href="">View</Link>
            </div>
            <div className="clinks">
              <div onClick={() => handelDelete(category)}>Delete</div>
            </div>
          </p>
        </td>
        <td>{category.categorySlug}</td>
        <td>{category.description}</td>
      </tr>
      {category.children.length > 0 && category.children.map((child) => (
        <CategoryRow key={child._id} category={child} level={level + 1} handelDelete={handelDelete} />
      ))}
    </>
  );
}
