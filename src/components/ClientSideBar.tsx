import Link from 'next/link'
import React from 'react'

export default function ClientSideBar() {
    return (
        <div className="client-sidebar">
            <nav className='side-nav'>
                <div className='side-navlink'>
                    <Link href="/dashboard/profile" >Profile</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/dashboard/changepassword" >Change Password</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/dashboard/order-list" >Order List</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/dashboard/new-order" >New Order</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/dashboard/order-delivered" >Order Delivered</Link>
                </div>
                <div className='side-navlink'>
                    <Link href="/dashboard/invoice-list" >Invoice List</Link>
                </div>
            </nav>
        </div>
    )
}
