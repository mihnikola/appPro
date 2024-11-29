import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username, password });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-md mx-auto p-6 bg-gray-200 rounded-lg shadow-neumorphism">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Prijavite se</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="username"
                        placeholder="Unesite korisničko ime"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-4 border-0 bg-gray-300 rounded-lg shadow-inner mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Unesite lozinku"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-4 border-0 bg-gray-300 rounded-lg shadow-inner mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-lg shadow-inner hover:bg-gray-400 transition"
                    >
                        Prijava
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
