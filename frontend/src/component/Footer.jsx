import { Button } from "@/components/ui/button";
import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4">

                {/* Top Section */}
                <div className="grid md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">ShopEase</h2>
                        <p className="text-gray-400">
                            Your one-stop destination for quality products at great prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 text-gray-400">
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/Signup"><li>Sign Up</li></Link>
                            <Link to="/login"><li>Login</li></Link>
                            <Link to="/products"><li>Products</li></Link>
                            <Link to="/cart"><li>Cart</li></Link>
                            <Link to="/logout"><li>Logout</li></Link>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Customer Service
                        </h3>

                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/">Help Center</a></li>
                            <li><a href="/">Returns</a></li>
                            <li><a href="/">Privacy Policy</a></li>
                            <li><a href="/">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Search & Social */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Stay Connected
                        </h3>

                        <div className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 rounded-full text-black bg-yellow-100"
                            />
                            <Button className=" bg-blue-600 px-4 rounded-full hover:bg-green-600 ">
                                Go
                            </Button>
                        </div>

                        <div className="flex gap-4 text-2xl">
                            <a href="#" className="hover:text-blue-500">
                                <FaFacebookF />
                            </a>

                            <a href="#" className="hover:text-pink-500">
                                <FaInstagram />
                            </a>

                            <a href="#" className="hover:text-sky-500">
                                <FaTwitter />
                            </a>

                            <a href="#" className="hover:text-blue-400">
                                <FaLinkedinIn />
                            </a>
                            <a href="#" className="hover:text-blue-400">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 mt-10 pt-6 text-center text-white text-sm">
                    © 2026 ShopEase. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;