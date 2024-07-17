import Link from 'next/link'
import React from 'react'

export default function AdminSideBar() {
    return (
        <div className="admin-sidebar">
            <nav className='side-nav'>
                <div className='side-navlink'>
                    <Link href="/admin/profile" >Profile</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/admin/user-list" >User List</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/admin/categories" >Categories</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/admin/products" >All Products</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/admin/products/add-product" >Add Products</Link>
                </div>
            </nav>
        </div>
    )
}
