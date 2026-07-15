
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user = useSelector((store) => store.user.user)
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const loggoutHandler = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/users/logout', {}, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(null))
                localStorage.removeItem('accessToken')
                navigate('/login')




            }

        } catch (error) {
            console.log(error);

        }
    }



    return (
        <header className='bg-pink-100 fix w-full border-b border-pink-200'>
            <div className='max-w-7xl mx-auto flex items-center justify-between py-3'>
                {/* logo section */}
                <div className=''>
                    <img src="/eKart.png" alt="" className='w-25 ml-20' />
                </div>
                {/* Nav section */}
                <nav className='flex justify-between items-center gap-10 text-xl'>
                    <ul className='flex justify-between items-center font-semibold gap-5'>
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/product'><li>Products</li></Link>
                        {
                            user && <Link to='/profile'><li>Hello, {user.firstname}</li></Link>
                        }

                        <Link to='/cart' className='relative'><li>
                            <IoCartOutline className='w-7 h-7' />
                            <span className='bg-pink-500 rounded-full absolute text-black -top-5 -right-1'>0</span>

                        </li></Link>

                    </ul>
                    {
                        user ? <Button className='bg-pink-500 hover:bg-amber-400 text-white cursor-pointer' onClick={() => {
                            loggoutHandler,
                                navigate('/login')
                        }}>Logout</Button> : <Button className='bg-pink-500 hover:bg-amber-400 text-white cursor-pointer' onClick={() => navigate('/login')}>Login</Button>
                    }

                </nav>
            </div>
        </header>
    )
}

export default Navbar
