import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const Profile = () => {
    const user = true
    return (
        <div className="pt-20 min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md p-6">

                    <Tabs defaultValue="profile" className="w-full">

                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Profile</CardTitle>
                                    <CardDescription>
                                        Update your personal information and profile picture.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex flex-col lg:flex-row gap-8">

                                        {/* Profile Picture */}
                                        <div className="flex flex-col items-center">
                                            <img
                                                src="/Gulzar.jpg"
                                                alt="Profile"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-pink-300"
                                            />


                                        </div>

                                        {/* Profile Form */}
                                        <form className="flex-1 space-y-4">

                                            <div>
                                                <label className="block mb-1 font-medium">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your first name"
                                                    defaultValue={user?.firstname}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-1 font-medium">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your last name"
                                                    defaultValue={user?.lastname}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-1 font-medium">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    defaultValue={user?.email}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-1 font-medium">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your phone number"
                                                    defaultValue={user?.phone}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 font-medium">
                                                    Zip Code
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your zip code"
                                                    defaultValue={user?.zipCode}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                            </div>


                                            <div>
                                                <label className="block mb-1 font-medium">
                                                    Address
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    placeholder="Enter your address"
                                                    defaultValue={user?.address}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
                                            >
                                                Update Profile
                                            </button>
                                        </form>

                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Orders Tab */}
                        <TabsContent value="orders">
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Orders</CardTitle>
                                    <CardDescription>
                                        View your order history and track deliveries.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <p>No orders found.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Profile
