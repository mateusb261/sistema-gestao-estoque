import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/usuario.css';

const Fornecedor = () => {
    const [fornecedores, setFornecedores] = useState(
        JSON.parse(localStorage.getItem('fornecedores')) || []
    );

    const [form, setForm] = useState({
        cnpj: '',
        nomeFornecedor: '',
        tipoFornecedor: 'varejo',
        telefone: '',
        index: '',
    });

    useEffect(() => {
        carregarFornecedores();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const cadastrarFornecedor = () => {
        const { cnpj, nomeFornecedor, tipoFornecedor, telefone } = form;

        if (!cnpj || !nomeFornecedor || !tipoFornecedor || !telefone) {
            alert("Preencha todos os campos de cadastro de fornecedor!");
            return;
        }

        const novaLista = [...fornecedores, { cnpj, nomeFornecedor, tipoFornecedor, telefone }];
        setFornecedores(novaLista);
        localStorage.setItem('fornecedores', JSON.stringify(novaLista));
        limparFormulario();
        alert("Fornecedor cadastrado com sucesso!");
    };

    const consultarFornecedor = () => {
        const { cnpj, nomeFornecedor, tipoFornecedor, telefone } = form;

        const resultados = fornecedores.filter((fornecedor) => {
            return (
                (cnpj === '' || fornecedor.cnpj.includes(cnpj)) &&
                (nomeFornecedor === '' || fornecedor.nomeFornecedor.includes(nomeFornecedor)) &&
                (tipoFornecedor === '' || fornecedor.tipoFornecedor === tipoFornecedor) &&
                (telefone === '' || fornecedor.telefone.includes(telefone))
            );
        });

        carregarFornecedores(resultados);
    };

    const carregarFornecedores = (lista = fornecedores) => {
        setFornecedores(lista);
    };

    const editarFornecedor = (index) => {
        const fornecedor = fornecedores[index];
        setForm({ ...fornecedor, index });
    };

    const excluirFornecedor = (index) => {
        const novaLista = fornecedores.filter((_, i) => i !== index);
        setFornecedores(novaLista);
        localStorage.setItem('fornecedores', JSON.stringify(novaLista));
    };

    const limparFormulario = () => {
        setForm({
            cnpj: '',
            nomeFornecedor: '',
            tipoFornecedor: 'varejo',
            telefone: '',
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
                    <h2>Manter Fornecedor</h2>

                    <form>
                        <label>CNPJ:</label><br />
                        <input
                            type="text"
                            name="cnpj"
                            value={form.cnpj}
                            onChange={handleInputChange}
                        /><br /><br />

                        <label>Nome do Fornecedor:</label><br />
                        <input
                            type="text"
                            name="nomeFornecedor"
                            value={form.nomeFornecedor}
                            onChange={handleInputChange}
                        /><br /><br />

                        <label>Tipo do Fornecedor:</label><br />
                        <select
                            name="tipoFornecedor"
                            value={form.tipoFornecedor}
                            onChange={handleInputChange}
                        >
                            <option value="varejo">Varejo</option>
                            <option value="atacado">Atacado</option>
                            <option value="importador">Importador</option>
                        </select><br /><br />

                        <label>Telefone:</label><br />
                        <input
                            type="text"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleInputChange}
                        /><br /><br />

                        <button type="button" onClick={cadastrarFornecedor}>
                            Cadastrar Fornecedor
                        </button>
                        <button type="button" onClick={consultarFornecedor}>
                            Consultar Fornecedor
                        </button>
                        <button type="button" onClick={limparFormulario}>
                            Limpar
                        </button>
                    </form>
                </div>

                <div className="lista-usuarios">
                    <h3>Lista de Fornecedores</h3>
                    <table id="tabela-fornecedores">
                        <thead>
                        <tr>
                            <th>CNPJ</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fornecedores.map((fornecedor, index) => (
                            <tr key={index}>
                                <td>{fornecedor.cnpj}</td>
                                <td>{fornecedor.nomeFornecedor}</td>
                                <td>{fornecedor.tipoFornecedor}</td>
                                <td>{fornecedor.telefone}</td>
                                <td>
                                    <button onClick={() => editarFornecedor(index)}>Alterar</button>
                                    <button onClick={() => excluirFornecedor(index)}>Excluir</button>
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

export default Fornecedor;
