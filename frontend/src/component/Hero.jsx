import { Button } from '@/components/ui/button';
import React from 'react';
const Hero = () => {
    return (
        <section className="relative bg-linear-to-r from-indigo-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            New Collection 2026
                        </span>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            Latest Electronics with Best
                            <span className="block text-yellow-300">
                                Prices
                            </span>
                        </h1>

                        <p className="text-lg text-gray-100 mb-8 max-w-lg">
                            Shop the latest fashion trends, premium accessories, and
                            exclusive deals. Quality products delivered right to your door.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                                Shop Now
                            </Button>

                            <Button className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
                                View Details
                            </Button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center">
                        <img
                            src="./phone.jpg"
                            alt="Fashion Collection"
                            className="h-125  rounded-2xl shadow-2xl w-full max-w-md object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero

