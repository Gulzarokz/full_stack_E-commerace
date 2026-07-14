import React, { useState } from 'react'
import { IoEyeOffOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import axios from 'axios'



import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        email: "",
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    const submitHandle = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/users/login",
                formData
            );

            if (res.data.success) {
                navigate("/");
                dispatch(setUser(res.data.user));
                localStorage.setItem("accessToken", res.data.accessToken);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message || error.message
            );
        }
    };
    return (
        <div className='flex items-center justify-center min-h-screen bg-pink-100'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your details below to login your account
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* <div className='grid gap-2'>
                                <Label htmlFor="firstName">FirstName</Label>
                                <Input
                                    id='firstname'
                                    name='firstname'
                                    type="text"
                                    placeholder="firstName"
                                    value={formData.firstname}
                                    onChange={handleChange}

                                    required

                                />

                            </div> */}


                            {/* <div className='grid gap-2'>
                                <Label htmlFor="lastName">lastName</Label>
                                <Input
                                    id='lsstname'
                                    name='lastname'
                                    type="text"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="lastName"
                                    required

                                />

                            </div> */}

                        </div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Gul@example.com"
                            required
                        />

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>

                            </div>

                            <div className='relative'>
                                <Input
                                    id="password"
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='create password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required />
                                {
                                    showPassword ? <IoEyeOffOutline onClick={() => setShowPassword(false)} className='h-5 w-5 absolute text-gray-700 right-5 bottom-2' /> : <FaEye onClick={() => setShowPassword(true)} className='h-5 w-5 absolute text-gray-700 right-5 bottom-2' />
                                }


                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={submitHandle} type="submit" className="w-full cursor-pointer">
                        Login
                    </Button>
                    <p className='text-gray-700 text-sm'>
                        don't have an account?
                        <Link to="/signUp" className='hover:underline cursor-pointer text-gray-700'>signUp</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login
