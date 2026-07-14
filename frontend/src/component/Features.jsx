import React from 'react'
import {
    Truck,
    ShieldCheck,
    RefreshCcw,
    Headphones
} from "lucide-react";


const Features = () => {
    return (
        <section className="py-16 bg-white">
            <h1 className='text-3xl font-semibold text-center bg-gray-400 p-3 text-white hover:bg-blue-400 mb-5'>Our Feature</h1>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Feature 1 */}
                    <div className="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center text-blue-600 mb-4">
                            <Truck size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                        <p className="text-gray-600">
                            Free shipping on all orders over $50.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center text-blue-600 mb-4">
                            <ShieldCheck size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                        <p className="text-gray-600">
                            100% secure and trusted payment methods.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center text-blue-600 mb-4">
                            <RefreshCcw size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                        <p className="text-gray-600">
                            Hassle-free returns within 7 days.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center text-blue-600 mb-4">
                            <Headphones size={40} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-600">
                            Our support team is always available.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};



export default Features
