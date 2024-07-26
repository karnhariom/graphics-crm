"use client"
import { userLogout } from '@/app/(auth)/_redux/authApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function ClientSideBar() {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        const res = await dispatch(userLogout())
        if(res?.payload?.status === 200){
            router.push("/")
        }
    }
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
            <button type="button" className='logOut-btn' onClick={handleLogout}>Logout</button>
        </div>
    )
}
