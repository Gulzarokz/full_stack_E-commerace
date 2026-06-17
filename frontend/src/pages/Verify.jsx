import React from 'react'

const Verify = () => {
    return (
        <div className='relative w-full h-190 overflow-hidden'>
            <div className='min-h-screen flex items-center justify-center bg-pink-300 px-4'>
                <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-green-500 text-center'>
                    <h2>✔Check Your Email</h2>
                    <p className='text-gray-400 text-sm'> We've sent an Email to your account please check your inbox to verify your account </p>
                </div>
            </div>
        </div>
    )
}

export default Verify
