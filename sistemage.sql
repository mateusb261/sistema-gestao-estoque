CREATE SCHEMA IF NOT EXISTS sistemage DEFAULT CHARACTER SET utf8mb3 ;
USE sistemage ;

CREATE TABLE CLIENTE (
    idcliente       INTEGER NOT NULL,
    cnpj            VARCHAR(14),
    nomecliente     VARCHAR(100),
    telefonecliente VARCHAR(15),
    emailcliente    VARCHAR(100)
);

ALTER TABLE CLIENTE ADD CONSTRAINT cliente_pk PRIMARY KEY (idcliente);

CREATE TABLE DOC_ENTRADA (
    nrodocentrada   VARCHAR(50) NOT NULL,
    ativo           BLOB NOT NULL,
    dataentrada     DATE NOT NULL,
    dtulttransacao  DATE NOT NULL,
    attribute_5     VARCHAR(100) NOT NULL,
    fornecedor_cnpj VARCHAR(14) NOT NULL
);

ALTER TABLE DOC_ENTRADA ADD CONSTRAINT doc_entrada_pk PRIMARY KEY (nrodocentrada);

CREATE TABLE DOC_ENTRADA_PRODUTO (
    iddocentradaproduto       INTEGER NOT NULL,
    ativo                     BLOB NOT NULL,
    dtulttransacao            DATE NOT NULL,
    doc_entrada_nrodocentrada VARCHAR(50) NOT NULL,
    produto_codigogtin        VARCHAR(14) NOT NULL
);

ALTER TABLE DOC_ENTRADA_PRODUTO ADD CONSTRAINT doc_entrada_produto_pk PRIMARY KEY (iddocentradaproduto);

CREATE TABLE DOC_SAIDA (
    nrodocsaida       VARCHAR(50) NOT NULL,
    ativo             BLOB NOT NULL,
    datasaida         DATE NOT NULL,
    dtulttransacao    DATE NOT NULL,
    cliente_idcliente INTEGER NOT NULL
);

ALTER TABLE DOC_SAIDA ADD CONSTRAINT doc_saida_pk PRIMARY KEY (nrodocsaida);

CREATE TABLE DOC_SAIDA_PRODUTO (
    iddocsaidaproduto     INTEGER NOT NULL,
    ativo                 BLOB NOT NULL,
    dtulttransacao        DATE NOT NULL,
    doc_saida_nrodocsaida VARCHAR(50) NOT NULL
);

ALTER TABLE DOC_SAIDA_PRODUTO ADD CONSTRAINT doc_saida_produto_pk PRIMARY KEY (iddocsaidaproduto);

CREATE TABLE ENTRADA (
    nrodocentrada   VARCHAR(50) NOT NULL,
    dataentrada     DATE NOT NULL,
    attribute_5     VARCHAR(100) NOT NULL,
    dtulttransacao  DATE NOT NULL,
    ativo           BLOB NOT NULL,
    fornecedor_cnpj VARCHAR(14) NOT NULL
);

ALTER TABLE ENTRADA ADD CONSTRAINT entrada_pk PRIMARY KEY (nrodocentrada);

CREATE TABLE ENTRADA_PRODUTO (
    identradaproduto      INTEGER NOT NULL,
    valorunitario         NUMERIC NOT NULL,
    quantidade            INTEGER NOT NULL,
    ativo                 BLOB NOT NULL,
    dtulttransacao        DATE NOT NULL,
    entrada_nrodocentrada VARCHAR(50) NOT NULL,
    produto_codigogtin    VARCHAR(14) NOT NULL
);

ALTER TABLE ENTRADA_PRODUTO ADD CONSTRAINT entrada_produto_pk PRIMARY KEY (identradaproduto);

CREATE TABLE ESTOQUE_ENTRADA (
    identradaestoque                        INTEGER NOT NULL,
    qtdentradaestoque                       INTEGER NOT NULL,
    valorentradaestoque                     NUMERIC NOT NULL,
    ativo                                   BLOB NOT NULL,
    dtulttransacao                          DATE NOT NULL,
    produto_codigogtin                      VARCHAR(14) NOT NULL,
    doc_entrada_produto_iddocentradaproduto INTEGER NOT NULL
);

ALTER TABLE ESTOQUE_ENTRADA ADD CONSTRAINT estoque_entrada_pk PRIMARY KEY (identradaestoque);

CREATE TABLE ESTOQUE_SAIDA (
    idsaidaestoque                      INTEGER NOT NULL,
    qtdsaidaestoque                     INTEGER NOT NULL,
    valorsaidaestoque                   NUMERIC NOT NULL,
    ativo                               BLOB NOT NULL,
    dtulttransacao                      DATE NOT NULL,
    produto_codigogtin                  VARCHAR(14) NOT NULL,
    doc_saida_produto_iddocsaidaproduto INTEGER NOT NULL
);

ALTER TABLE ESTOQUE_SAIDA ADD CONSTRAINT estoque_saida_pk PRIMARY KEY (idsaidaestoque);

CREATE TABLE FORNECEDOR (
    cnpj               VARCHAR(14) NOT NULL,
    nomefornecedor     VARCHAR(100) NOT NULL,
    telefonefornecedor VARCHAR(15) NOT NULL,
    emailfornecedor    VARCHAR(100) NOT NULL,
    ativo              BLOB NOT NULL,
    dtulttransacao     DATE NOT NULL
);

ALTER TABLE FORNECEDOR ADD CONSTRAINT fornecedor_pk PRIMARY KEY (cnpj);

CREATE TABLE LOGIN (
    idlogin           INTEGER NOT NULL,
    ativo             BLOB NOT NULL,
    dtulttransacao    DATE NOT NULL,
    usuario_idusuario INTEGER NOT NULL
);

ALTER TABLE LOGIN ADD CONSTRAINT login_pk PRIMARY KEY (idlogin);

CREATE TABLE PRODUTO (
    codigogtin                 VARCHAR(14) NOT NULL,
    nomeproduto                VARCHAR(100) NOT NULL,
    estoqueminimo              INTEGER,
    estoqueatual               INTEGER,
    ativo                      BLOB NOT NULL,
    dtulttransacao             DATE NOT NULL,
    tipo_produto_idtipoproduto INTEGER NOT NULL
);

ALTER TABLE PRODUTO ADD CONSTRAINT produto_pk PRIMARY KEY (codigogtin);

CREATE TABLE SAIDA (
    nrodocsaida       VARCHAR(50) NOT NULL,
    ativo             BLOB NOT NULL,
    datasaida         DATE NOT NULL,
    tiposaida         VARCHAR(20) NOT NULL,
    dtulttransacao    DATE NOT NULL,
    cliente_idcliente INTEGER NOT NULL
);

ALTER TABLE SAIDA ADD CONSTRAINT saida_pk PRIMARY KEY (nrodocsaida);

CREATE TABLE SAIDA_PRODUTO (
    idsaidaproduto     INTEGER NOT NULL,
    valorunitario      NUMERIC NOT NULL,
    quantidade         INTEGER NOT NULL,
    ativo              BLOB NOT NULL,
    dtulttransacao     DATE NOT NULL,
    saida_nrodocsaida  VARCHAR(50) NOT NULL,
    produto_codigogtin VARCHAR(14) NOT NULL
);

ALTER TABLE SAIDA_PRODUTO ADD CONSTRAINT saida_produto_pk PRIMARY KEY (idsaidaproduto);

CREATE TABLE TIPO_PRODUTO (
    idtipoproduto   INTEGER NOT NULL,
    nometipoproduto VARCHAR(50) NOT NULL
);

ALTER TABLE TIPO_PRODUTO ADD CONSTRAINT tipo_produto_pk PRIMARY KEY (idtipoproduto);

CREATE TABLE USUARIO (
    idusuario      INTEGER NOT NULL,
    nomeusuario    VARCHAR(100) NOT NULL,
    emailusuario   VARCHAR(100) NOT NULL,
    senhausuario   VARCHAR(100) NOT NULL,
    ativo          BLOB NOT NULL,
    dtulttransacao DATE NOT NULL
);

ALTER TABLE USUARIO ADD CONSTRAINT usuario_pk PRIMARY KEY (idusuario);

-- Definição de constraints de chave estrangeira corrigidas
ALTER TABLE PRODUTO ADD CONSTRAINT produto_tipo_produto_fk FOREIGN KEY (tipo_produto_idtipoproduto) REFERENCES TIPO_PRODUTO (idtipoproduto);
ALTER TABLE DOC_ENTRADA ADD CONSTRAINT doc_entrada_fornecedor_fk FOREIGN KEY (fornecedor_cnpj) REFERENCES FORNECEDOR (cnpj);
ALTER TABLE DOC_ENTRADA_PRODUTO ADD CONSTRAINT doc_entrada_produto_fk FOREIGN KEY (doc_entrada_nrodocentrada) REFERENCES DOC_ENTRADA (nrodocentrada);
ALTER TABLE DOC_SAIDA ADD CONSTRAINT doc_saida_cliente_fk FOREIGN KEY (cliente_idcliente) REFERENCES CLIENTE (idcliente);
ALTER TABLE ENTRADA_PRODUTO ADD CONSTRAINT entrada_produto_produto_fk FOREIGN KEY (produto_codigogtin) REFERENCES PRODUTO (codigogtin);
ALTER TABLE ESTOQUE_ENTRADA ADD CONSTRAINT estoque_entrada_produto_fk FOREIGN KEY (produto_codigogtin) REFERENCES PRODUTO (codigogtin);
ALTER TABLE ESTOQUE_SAIDA ADD CONSTRAINT estoque_saida_produto_fk FOREIGN KEY (produto_codigogtin) REFERENCES PRODUTO (codigogtin);
ALTER TABLE SAIDA ADD CONSTRAINT saida_cliente_fk FOREIGN KEY (cliente_idcliente) REFERENCES CLIENTE (idcliente);
ALTER TABLE SAIDA_PRODUTO ADD CONSTRAINT saida_produto_produto_fk FOREIGN KEY (produto_codigogtin) REFERENCES PRODUTO (codigogtin);


INSERT INTO TIPO_PRODUTO (idtipoproduto, nometipoproduto)
VALUES (1, 'Móveis');

INSERT INTO TIPO_PRODUTO (idtipoproduto, nometipoproduto)
VALUES (2, 'Eletrônicos');

INSERT INTO TIPO_PRODUTO (idtipoproduto, nometipoproduto)
VALUES (3, 'Alimentação');

select * from tipo_produto;

select * from produto;

SELECT tp.nometipoproduto 
FROM PRODUTO p
JOIN TIPO_PRODUTO tp ON p.tipo_produto_idtipoproduto = tp.idtipoproduto
WHERE p.codigogtin = 789;
