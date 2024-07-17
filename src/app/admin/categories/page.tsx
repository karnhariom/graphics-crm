import React from 'react'
import AddCategory from '../_components/AddCategory'
import AllCategory from '../_components/AllCategory'

export default function CategoryPage() {
    return (
        <div>
            <div className="section">
                <h3>Categories</h3>
            </div>
            <div className="catg-grig">
                <div className="section">
                    <AddCategory />
                </div>
                <div className="section">
                    <h4>All categories</h4>
                    <AllCategory />
                </div>
            </div>
        </div>
    )
}
