import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/usuario.css';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState(
        JSON.parse(localStorage.getItem('usuarios')) || []
    );

    const [form, setForm] = useState({
        nome: '',
        email: '',
        tipoUsuario: 'comum',
        index: '',
    });

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const cadastrarUsuario = async () => {
        const { nome, email, tipoUsuario } = form;

        try {
            const response = await fetch('http://localhost:8000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    email,
                    tipoUsuario,
                }),
            });

            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
                limparFormulario();
            } else {
                const errorData = await response.json();

                if (errorData.error === 'CAMPO_FALTANDO') {
                    alert('Preencha todos os campos de cadastro de usuário!');
                } else {
                    alert(
                        `Erro ao cadastrar usuário: ${
                            errorData.message || 'Erro desconhecido'
                        }`
                    );
                }
            }
        } catch (error) {
            alert(`Erro ao conectar ao servidor: ${error.message}`);
        }
    };

    const consultarUsuario = () => {
        const { nome, email, tipoUsuario } = form;

        const resultados = usuarios.filter((usuario) => {
            return (
                (nome === '' || usuario.nome.includes(nome)) &&
                (email === '' || usuario.email.includes(email)) &&
                (tipoUsuario === '' || usuario.tipoUsuario === tipoUsuario)
            );
        });

        carregarUsuarios(resultados);
    };

    const carregarUsuarios = (lista = usuarios) => {
        setUsuarios(lista);
    };

    const editarUsuario = (index) => {
        const usuario = usuarios[index];
        setForm({ ...usuario, index });
    };

    const excluirUsuario = (index) => {
        const novaLista = usuarios.filter((_, i) => i !== index);
        setUsuarios(novaLista);
        localStorage.setItem('usuarios', JSON.stringify(novaLista));
    };

    const limparFormulario = () => {
        setForm({
            nome: '',
            email: '',
            tipoUsuario: 'comum',
            index: '',
        });
    };

    return (
        <div>
            <header>
                <div className="logo">
                    <h1>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            SistemaGE
                        </Link>
                    </h1>
                </div>
            </header>

            <nav>
                <ul>
                    <li><Link to="/usuario">Usuários</Link></li>
                    <li><Link to="/produto">Produtos</Link></li>
                    <li><Link to="/fornecedor">Fornecedores</Link></li>
                    <li><Link to="/alerta">Alertas (6)</Link></li>
                    <li><Link to="/login">Sair</Link></li>
                </ul>

                <ul className="voltar">
                    <li><Link to="/">Voltar</Link></li>
                </ul>
            </nav>

            <main>
                <div className="cadastro-usuario">
                    <h2>Manter Usuário</h2>

                    <form>
                        <label>Nome:</label><br />
                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleInputChange}
                        /><br /><br />

                        <label>Email:</label><br />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                        /><br /><br />

                        <label>Tipo de Usuário:</label><br />
                        <select
                            name="tipoUsuario"
                            value={form.tipoUsuario}
                            onChange={handleInputChange}
                        >
                            <option value="comum">Comum</option>
                            <option value="admin">Administrador</option>
                        </select><br /><br />

                        <button type="button" onClick={cadastrarUsuario}>
                            Cadastrar Usuário
                        </button>

                        <button type="button" onClick={consultarUsuario}>
                            Consultar Usuário
                        </button>

                        <button type="button" onClick={limparFormulario}>
                            Limpar
                        </button>
                    </form>
                </div>

                <div className="lista-usuarios">
                    <h3>Lista de Usuários</h3>

                    <table id="tabela-usuarios">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                        </thead>

                        <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.tipoUsuario}</td>
                                <td>
                                    <button onClick={() => editarUsuario(index)}>Alterar</button>
                                    <button onClick={() => excluirUsuario(index)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Usuario;
