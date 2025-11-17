import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/saida.css';

const Saida = () => {
    const [saidas, setSaidas] = useState(
        JSON.parse(localStorage.getItem('saidas')) || []
    );

    const [form, setForm] = useState({
        codigoDocumento: '',
        dataSaida: '',
        tipoSaida: '',
        cnpjCliente: '',
        nomeCliente: '',
        telefoneCliente: '',
        emailCliente: '',
        codigoGtin: '',
        nomeProduto: '',
        tipoProduto: '',
        estoqueMinimo: '',
        valorUnitario: '',
        quantidade: '',
        index: ''
    });

    const produtosFake = {
        '1': { nome: 'Produto A', tipo: 'Móveis', estoqueMinimo: 10 },
        '2': { nome: 'Produto B', tipo: 'Eletrônicos', estoqueMinimo: 5 },
        '3': { nome: 'Produto C', tipo: 'Alimentação', estoqueMinimo: 20 }
    };

    useEffect(() => {
        localStorage.setItem('saidas', JSON.stringify(saidas));
    }, [saidas]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        const updated = { ...form, [name]: value };

        if (name === 'codigoGtin') {
            const p = produtosFake[value];
            if (p) {
                updated.nomeProduto = p.nome;
                updated.tipoProduto = p.tipo;
                updated.estoqueMinimo = p.estoqueMinimo;
            } else {
                updated.nomeProduto = '';
                updated.tipoProduto = '';
                updated.estoqueMinimo = '';
            }
        }

        if (name === 'tipoSaida' && value !== 'venda') {
            updated.valorUnitario = '';
        }

        setForm(updated);
    };

    const camposClienteHabilitados = () =>
        form.codigoDocumento.trim() !== '' && form.dataSaida.trim() !== '';

    const camposProdutoHabilitados = () =>
        form.tipoSaida.trim() !== '';

    const salvarSaida = () => {
        const obrigatorios = ['codigoDocumento', 'dataSaida', 'codigoGtin', 'quantidade'];
        for (const campo of obrigatorios) {
            if (form[campo].trim() === '') return;
        }

        const novaSaida = { ...form };

        if (form.index === '') {
            setSaidas([...saidas, novaSaida]);
        } else {
            const copia = [...saidas];
            copia[form.index] = novaSaida;
            setSaidas(copia);
        }

        limparFormulario();
    };

    const editarSaida = index => {
        setForm({ ...saidas[index], index });
    };

    const excluirSaida = index => {
        const novaLista = saidas.filter((_, i) => i !== index);
        setSaidas(novaLista);
    };

    const limparFormulario = () => {
        setForm({
            codigoDocumento: '',
            dataSaida: '',
            tipoSaida: '',
            cnpjCliente: '',
            nomeCliente: '',
            telefoneCliente: '',
            emailCliente: '',
            codigoGtin: '',
            nomeProduto: '',
            tipoProduto: '',
            estoqueMinimo: '',
            valorUnitario: '',
            quantidade: '',
            index: ''
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
                <div className="cadastro-saida">
                    <h2>Registro de Saída de Produto</h2>

                    <form>

                        {/* Documento + data + tipo */}
                        <label>Código do Documento:</label><br />
                        <input
                            type="text"
                            name="codigoDocumento"
                            value={form.codigoDocumento}
                            onChange={handleInputChange}
                        /><br /><br />

                        <label>Data de Saída:</label><br />
                        <input
                            type="date"
                            name="dataSaida"
                            value={form.dataSaida}
                            onChange={handleInputChange}
                        /><br /><br />

                        <label>Tipo de Saída:</label><br />
                        <select
                            name="tipoSaida"
                            value={form.tipoSaida}
                            onChange={handleInputChange}
                        >
                            <option value=""> </option>
                            <option value="venda">Venda</option>
                            <option value="consignacao">Consignação</option>
                            <option value="doacao">Doação</option>
                            <option value="amostra">Amostra</option>
                        </select><br /><br />

                        {/* Cliente */}
                        <fieldset disabled={!camposClienteHabilitados()}>
                            <label>CNPJ do Cliente:</label><br />
                            <input
                                type="text"
                                name="cnpjCliente"
                                value={form.cnpjCliente}
                                onChange={handleInputChange}
                            /><br /><br />

                            <label>Nome do Cliente:</label><br />
                            <input
                                type="text"
                                name="nomeCliente"
                                value={form.nomeCliente}
                                onChange={handleInputChange}
                            /><br /><br />

                            <label>Telefone do Cliente:</label><br />
                            <input
                                type="text"
                                name="telefoneCliente"
                                value={form.telefoneCliente}
                                onChange={handleInputChange}
                            /><br /><br />

                            <label>E-mail do Cliente:</label><br />
                            <input
                                type="email"
                                name="emailCliente"
                                value={form.emailCliente}
                                onChange={handleInputChange}
                            /><br /><br />
                        </fieldset>

                        {/* Produto */}
                        <fieldset disabled={!camposProdutoHabilitados()}>
                            <label>Código GTIN:</label><br/>
                            <input
                                type="text"
                                name="codigoGtin"
                                value={form.codigoGtin}
                                onChange={handleInputChange}
                            /><br/><br/>

                            <label>Nome do Produto:</label><br/>
                            <input
                                type="text"
                                name="nomeProduto"
                                value={form.nomeProduto}
                                onChange={handleInputChange}
                            /><br/><br/>

                            <label>Tipo do Produto:</label><br/>
                            <input
                                type="text"
                                name="tipoProduto"
                                value={form.tipoProduto}
                                onChange={handleInputChange}
                            /><br/><br/>

                            <label>Estoque Mínimo:</label><br/>
                            <input
                                type="number"
                                name="estoqueMinimo"
                                value={form.estoqueMinimo}
                                onChange={handleInputChange}
                            /><br/><br/>


                            <label>Valor Unitário:</label><br/>
                            <input
                                type="number"
                                name="valorUnitario"
                                step="0.01"
                                disabled={form.tipoSaida !== 'venda'}
                                value={form.valorUnitario}
                                onChange={handleInputChange}
                            /><br/><br/>

                            <label>Quantidade:</label><br/>
                            <input
                                type="number"
                                name="quantidade"
                                min="1"
                                value={form.quantidade}
                                onChange={handleInputChange}
                            /><br/><br/>
                        </fieldset>

                        <button type="button" onClick={salvarSaida}>Armazenar Saída</button>
                        <button type="button" onClick={limparFormulario}>Limpar</button>

                    </form>
                </div>

                <div className="lista-saidas">
                    <h3>Lista de Saídas de Produtos</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Cód. Documento</th>
                            <th>Data</th>
                            <th>CNPJ</th>
                            <th>Tipo</th>
                            <th>GTIN</th>
                            <th>Qtd</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {saidas.map((s, index) => (
                            <tr key={index}>
                                <td>{s.codigoDocumento}</td>
                                <td>{s.dataSaida}</td>
                                <td>{s.cnpjCliente}</td>
                                <td>{s.tipoSaida}</td>
                                <td>{s.codigoGtin}</td>
                                <td>{s.quantidade}</td>
                                <td>
                                    <button onClick={() => editarSaida(index)}>Editar</button>
                                    <button onClick={() => excluirSaida(index)}>Excluir</button>
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

export default Saida;
