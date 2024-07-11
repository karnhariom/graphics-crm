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
            </nav>
        </div>
    )
}
