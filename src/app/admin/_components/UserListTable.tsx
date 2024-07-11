"use client"
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getUserList } from '../_redux/adminApi'

export default function UserListTable() {

    const { userList } = useSelector((state: any) => state.admin, shallowEqual)
    console.log("userList => ", userList)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserList())
    }, [dispatch])

    return (
        <div className='listPage'>
            <div className="search section">
                <div className="ser-inp">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="" id="" />
                </div>
                <button>Add User</button>
            </div>
            <div className='user-table section'>
                <table>
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList && userList.length > 0 ? (
                                userList.map((user: any, index: number) =>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <div className="oprts">
                                                <div className="act-icon"><i className="fa-solid fa-eye"></i></div>
                                                <div className="act-icon"><i className="fa-solid fa-trash"></i></div>
                                            </div>

                                        </td>
                                    </tr>
                                )
                            ) : ""
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
