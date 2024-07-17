import React from 'react';

const RecursiveCheckbox = ({ category }: any) => {
  return (
    <div
      className={`${!category?.parentCategory ? "parent-catg" : "child-catg"}`}
      style={{ marginLeft: category?.parentCategory ? '20px' : '0px' }}
    >
      <div className="catg-inp">
        <input type="checkbox" id={category._id} name={category.title} />
        <label htmlFor={category._id}>
          <div className="cust-cbox"><i className="fa-solid fa-check"></i></div>
          <p>{category.title}</p>
        </label>
      </div>
      {category.children && category.children.length > 0 && (
        category.children.map((child: any) => (
          <RecursiveCheckbox key={child._id} category={child} />
        ))
      )}
    </div>
  );
};

export default RecursiveCheckbox;
