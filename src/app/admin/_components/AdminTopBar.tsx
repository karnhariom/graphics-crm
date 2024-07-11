import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import userImg from "@/assets/images/user.jpg"

export default function AdminTopBar() {
    return (
        <div className="admin-topbar">
            <div className="btn-row-grp">
                <Link href="/" className='btn'>Add Order</Link>
                <Link href="/" className='btn'>Payment</Link>
                <Link href="/" className='btn'>Invoice</Link>
            </div>
            <div className="profile-box">
                <Image
                    src={userImg}
                    alt=''
                    width={40}
                    height={40}
                />
            </div>
        </div>
    )
}
