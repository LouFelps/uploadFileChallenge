# 🌐 Backend - Sistema de Upload de Arquivos

Este projeto representa o backend do sistema de upload e gerenciamento de arquivos, desenvolvido com Node.js, TypeScript e Fastify.

---

## 🚀 Tecnologias Utilizadas

- Node.js + TypeScript
- Fastify
- MongoDB + Mongoose
- JSON Schema
- Arquitetura em camadas (Controller, Service, Repository)
- Upload com streams (`pipeline`)
- Testes com Vitest + Supertest
- Variáveis de ambiente com `.env.development`

---

## 🛠️ Como rodar

Pré-requisitos:

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* [**Node.js**](https://nodejs.org/): Versão 18 ou superior (LTS é recomendado).
* [**npm**](https://www.npmjs.com/) (gerenciador de pacotes do Node.js) ou [**Yarn**](https://yarnpkg.com/).
* **MongoDB**: Um servidor MongoDB rodando localmente ou acesso a uma instância remota (ex: MongoDB Atlas).

### 1. Instalar dependências

Na raiz do projeto insira o comando no terminal:

npm install

### 2. Configurar variaveis de ambiente

Crie o arquivo .env.development na raiz do projeto e insira os seguintes dados:

PORT=Porta para rodar a API

DATABASE_URI=Caminho para acesso ao banco de dados

Ex:

PORT=8001

DATABASE_URI=mongodb://localhost:27017/uploaderAPI

**Importante:** Nunca adicione arquivos `.env` (ou `.env.development`) ao controle de versão (Git), pois eles contêm informações sensíveis.

### 3. Rodar o servidor

Certifique-se de que seu servidor MongoDB esteja em execução antes de iniciar o backend.

Em seguida, na raiz do projeto, execute:

```bash
npm run dev
``` 

Servidor fica disponível em:
📍 http://localhost:8001/api

## 🌐 Endpoints da API

Aqui estão os principais endpoints da API:

| Método HTTP | Endpoint                     | Descrição                                     | Corpo da Requisição (Exemplo)               |
| :----------| :--------------------------- | :-------------------------------------------- | :--------------------------- |
| `POST`      | `/api/files/upload`          | Faz upload de um novo arquivo.                | `multipart/form-data` com o arquivo (campo `file`) |
| `GET`       | `/api/files`                 | Lista os metadados de todos os arquivos.      | -                                           |
| `GET`       | `/api/files/:token/download` | Faz download de um arquivo pelo token.        | -                                           |
| `PATCH`     | `/api/files/:id`             | Renomeia um arquivo pelo ID.                  | `{ "filename": "novo_nome.extensao" }`      |
| `DELETE`    | `/api/files/:id`             | Exclui um arquivo pelo ID.                    | -                                           |

## 🧪 Como Testar

Para executar os testes do backend, primeiro crie uma env chamada .env.test na raiz do projeto com o seguinte conteudo:

MONGO_TEST_URI=mongodb://localhost:27017/nome-da-colecao-de-testes,

Depois utilize os seguintes comandos:

npm run test

Este comando executará todos os testes definidos com Vitest e Supertest, exibindo os resultados no terminal.

## 📌 Decisões Técnicas

- Para o upload de arquivos foi utilizado fastify-multipart, que utiliza de Streams com pipeline() o que divide o arquivo em varias partes evitando o uso excessivo de memória, mesmo com arquivos de +1GB.
**Com essa estrutura foi realizado um teste no sistema com um arquivo de 1.9GB em que o upload levou apenas 2.2 segundos para ser realizado.**

- A extensão do arquivo original foi preservada mesmo após renomeação, garantindo que o download funcione corretamente e evitando bugs.

- Arquivos são salvos localmente, e apenas seus metadados são armazenados no banco para poder realizar consultas como a do token de Download, por exemplo.

- Foi utilizado um token para poder baixar os arquivos evitando exposição de estrutura interna, pois tokens UUID são mais seguros. Esse token também possibilita futuras implementações, como validade temporária de links ou download público controlado.
O token também substitui o uso direto do _id do banco, evitando exposição de estrutura interna e reduzindo riscos de ataques por enumeração.

- Estrutura modular com camadas bem definidas para facilitar manutenções futuras (controller, service, repository). Essa estrutura foi escolhida baseada na experiência previa e qualidade de software, auxiliando para o crescimento da API com baixo acoplamento.

- Testes Robustos: A combinação de **Vitest** com **Supertest** para testar os endpoints da API (simulando requisições HTTP reais) garante uma cobertura abrangente e confiável do código.

- Variáveis de ambiente usadas para URLs, portas e Mongo, facilitando deploy ou troca de ambiente (produção/teste).