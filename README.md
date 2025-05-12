# Sistema de Upload de Arquivos

Este projeto tem como objetivo fornecer uma aplicação web simples e funcional para upload, listagem, download, renomeação e exclusão de arquivos. Ele é dividido em duas partes: uma API backend desenvolvida em Node.js com Typescript + Fastify e MongoDB, e uma interface frontend em React com TypeScript.

## 🌐 Visão Geral do Projeto

A proposta principal foi criar uma interface mais limpa para que usuários possam gerenciar arquivos diretamente em um navegador. O backend lida com o armazenamento e persistência das informações dos arquivos, enquanto o frontend oferece uma experiência de usuário clara e interativa.

Entre os principais recursos implementados estão:

- Upload de arquivos com persistência em disco
- Geração de token único para acesso ao download
- Listagem de arquivos com dados relevantes
- Renomeação e exclusão de arquivos existentes
- Testes automatizados
- Separação clara de responsabilidades entre as camadas do sistema

## 🔐 Decisões de Arquitetura

- O documento em Docx disponibilizado junto com o projeto contém algumas decisões de arquitetura tomadas durante o desenvolvimento da aplicação e cada projeto independente (BackEnd e FrontEnd) possui um README para auxiliar na instalação de bibliotecas e instruções de uso do projeto.

## 🔮 Próximos Passos (ideias para evolução)

- Implementar autenticação e controle de usuários
- Permitir upload de múltiplos arquivos simultaneamente
- Adicionar paginação e filtros na listagem de arquivos
- Melhorar UX com feedback visual (loaders, notificações etc)
- Deploy automatizado (CI/CD)
