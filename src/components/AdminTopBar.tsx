import Link from 'next/link'
import React from 'react'

export default function AdminTopBar() {
    return (
        <div className="admin-topbar">
            <div className="btn-row-grp">
                <Link href="/">Add Order</Link>
                <Link href="/">Payment</Link>
                <Link href="/">Invoice</Link>
            </div>
        </div>
    )
}
