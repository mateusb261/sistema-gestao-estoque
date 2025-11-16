import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "exemploemail@gmail.com" && password === "1234") {
            navigate("/inicio");
        } else {
            setError("Credenciais inválidas. Por favor, tente novamente.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Nome de Usuário ou E-mail</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    {/* Mantendo o botão */}
                    <button type="submit">Continuar</button>
                    <div className="forgot-password">
                        <a href="/recuperar-senha">Esqueci minha senha</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
