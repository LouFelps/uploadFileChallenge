# 🌐 Frontend - Sistema de Upload de Arquivos

Este projeto representa o frontend do sistema de upload e gerenciamento de arquivos, desenvolvido com React + Vite + TypeScript.

---

## 🚀 Tecnologias Utilizadas

- React + TypeScript
- Vite
- Cypress (testes end-to-end)
- Axios para integração com backend
- Interface minimalista com componentes React

---

## 🛠️ Como rodar
Pré-requisitos:

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* [**Node.js**](https://nodejs.org/): Versão 18 ou superior (LTS é recomendado).
* [**npm**](https://www.npmjs.com/) (gerenciador de pacotes do Node.js) ou [**Yarn**](https://yarnpkg.com/).
* **Backend da API**: O backend deste sistema de upload de arquivos deve estar rodando e acessível. Consulte o [README do Backend](https://github.com/LouFelps/uploadDataBack) para instruções sobre como configurá-lo e iniciá-lo.

### 1. Instalar dependências

npm install

### 2. Configurar variaveis de ambiente

Crie o arquivo .env na raiz do projeto e insira a URI da api do backend

UPLOAD_API_BACK=http://localhost:8001/

Importante: Nunca adicione arquivos .env ao controle de versão (Git), pois eles podem conter informações sensíveis.

### 3. Rodar o projeto

Certifique-se de que o backend da API esteja rodando e acessível na porta configurada (ex: http://localhost:8001/api/).

Em seguida, na raiz do projeto, execute:

npm run dev

A aplicação fica acessível em:
📍 http://localhost:5173

## 🔍 Funcionalidades
- Upload de arquivos

- Renomear arquivos

- Download por token (usando window.open)
 
- Exclusão da lista
 
- Reset automático do campo de input após envio

### 4. 🧪 **Como Testar**

### Testes End-to-End (E2E) com Cypress

Para rodar os testes de ponta a ponta, certifique-se de que o servidor do backend e o servidor do frontend estejam rodando.

Em seguida, execute:

npm run test

Este comando chama npx cypress open para abrir a interface grafica e iniciar os testes.

Também ha a possibilidade de rodar npx cypress run direto no terminal, o que o levará a rodar os testes sem interface grafica.

## 📌 Decisões Técnicas

* A interface foi mantida propositalmente simples para focar nas funcionalidades principais.
* O input de arquivos é resetado com `useRef` após o upload para evitar bugs visuais e garantir uma nova seleção de arquivo.
* A URL da API do backend é gerenciada por variável de ambiente (`UPLOAD_API_BACK`), facilitando a configuração em diferentes ambientes (desenvolvimento, produção).
* A arquitetura do frontend foi criada com base na vivência com os sistemas desenvolvidos no InCor, fazendo uso da **Arquitetura Baseada em Componentes (Component-Based Architecture)**. Escolhi essa arquitetura pela experiência prévia e também para tornar o projeto muito mais organizado, modular e pronto para o crescimento.
* A aplicação foi modularizada com **React Router** para o gerenciamento de rotas e **páginas separadas** para diferentes seções da UI.
* A UI foi dividida em **componentes reutilizáveis**, cada um com uma responsabilidade específica:
    * `FileUploadSection`: Gerencia a lógica de input de arquivos e a interação com o botão de upload.
    * `FileTable`: Responsável por renderizar a lista de arquivos, incluindo o cabeçalho da tabela.
    * `FileRow`: Representa cada linha individual da tabela, contendo os detalhes de um arquivo e as ações (renomear, excluir, download).
* Essa estrutura em componentes e a modularização também melhoram a manutenibilidade do código e facilitam a escrita de testes unitários e de integração para unidades específicas.