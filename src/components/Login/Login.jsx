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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto p-6 bg-[#7f7a7a] rounded-lg shadow-neumorphism ">
                <h2 className="text-5xl font-bold mb-4 text-gray-100">Prijavite se</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="username"
                        placeholder="Unesite korisničko ime"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className=" text-xl w-full p-4 border-0 bg-gray-300 rounded-lg shadow-inner mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Unesite lozinku"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="text-xl w-full p-4 border-0 bg-gray-300 rounded-lg shadow-inner mb-4"
                    />
                    <button
                        type="submit"
                        className="text-3xl w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-lg shadow-inner transition  hover:bg-gray-100 "
                    >
                        Prijava
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
