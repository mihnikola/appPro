import React, { useState } from 'react';

const Register = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        onRegister({ email, password });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-md mx-auto p-6 bg-gray-200 rounded-lg shadow-neumorphism mt-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-4 border-0 bg-gray-300 rounded-lg shadow-inner mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-4 border-0 bg-gray-300 rounded-lg shadow-inner mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-4 border-0 bg-gray-300 rounded-lg shadow-inner mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-lg shadow-inner hover:bg-gray-400 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
