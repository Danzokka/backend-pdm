<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 💊 MedControl API

![Badge versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0-blue)
![Badge NestJS](https://img.shields.io/badge/NestJS-11.0.1-red)
![Badge Prisma](https://img.shields.io/badge/Prisma-6.7.0-blue)
![Badge PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)
![Badge Status](https://img.shields.io/badge/status-em%20desenvolvimento-green)
![GitHub](https://img.shields.io/github/license/Danzokka/backend-pdm)

> Backend de gerenciamento de medicamentos com notificações automáticas para lembrete de horários de medicação. Suporta usuários dependentes e gerenciamento de doenças.

## 📑 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Como executar](#-como-executar)
  - [Pré-requisitos](#-pré-requisitos)
  - [Configuração](#-configuração)
  - [Execução local](#-execução-local)
  - [Docker](#-docker)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Rotas](#-rotas)
- [Testes](#-testes)
- [Contribuições](#-contribuições)
- [Licença](#-licença)

## 🔍 Sobre o projeto

O MedControl API é um backend desenvolvido para servir como base para um aplicativo mobile de controle e gerenciamento de medicamentos. O sistema permite o cadastro de medicamentos, definição de horários para tomá-los e notificações automáticas para lembrar o usuário no momento adequado.

Este projeto foi desenvolvido como parte do curso de Programação para Dispositivos Móveis, com o objetivo de proporcionar uma experiência completa de gerenciamento de medicações pessoais.

## 🚀 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

![Tools](https://go-skill-icons.vercel.app/api/icons?i=typescript,nestjs,prisma,postgresql,docker,jwt)

- [NestJS](https://nestjs.com/) - Framework para construção de aplicações server-side com Node.js
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Prisma](https://www.prisma.io/) - ORM (Object-Relational Mapping) para Node.js e TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Sistema de banco de dados relacional
- [Docker](https://www.docker.com/) - Plataforma de containerização para desenvolvimento e implantação
- [JWT](https://jwt.io/) - Autenticação baseada em tokens
- [NestJS Schedule](https://docs.nestjs.com/techniques/task-scheduling) - Módulo para agendamento de tarefas

## ✅ Funcionalidades

### 👤 Autenticação e Usuários

- Cadastro de usuários
- Login e autenticação com JWT
- Atualização de perfil
- Reset de senha

### 👨‍👩‍👧‍👦 Usuários Dependentes

- Cadastro de usuários dependentes vinculados ao usuário principal
- Gerenciamento de dependentes (adicionar, listar, visualizar, remover)
- Atribuição de medicamentos a dependentes
- Atribuição de doenças a dependentes

### 🩺 Gerenciamento de Doenças

- Cadastro de doenças
- Atribuição de doenças a usuários e dependentes
- Listagem de doenças cadastradas
- Atualização e exclusão de doenças

### 💊 Gerenciamento de Medicamentos

- Cadastro de medicamentos com descrição e imagem
- Definição de horários para administração
- Configuração de dias da semana para administração do medicamento
- Vinculação de medicamentos a usuários ou dependentes
- Listagem de todos os medicamentos (do usuário e seus dependentes)
- Visualização detalhada de medicamento específico
- Atualização de informações de medicamentos
- Exclusão de medicamentos

### ⏰ Sistema de Notificações

- Verificação automática de horários de medicação (a cada minuto)
- Suporte a notificações para medicamentos de dependentes
- Notificação quando é hora de tomar um medicamento
- Integração com serviços de notificação para dispositivos móveis

## 🏁 Como executar

### 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (v16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para execução com containers)

### ⚙ Configuração

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/backend-pdm.git
cd backend-pdm
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/medcontrol?schema=public"
JWT_SECRET="sua-chave-secreta-para-jwt"
```

### 🖥️ Execução local

1. Inicialize o banco de dados (sem Docker):

```bash
# Crie as tabelas no banco de dados
npx prisma migrate dev

# Gere o cliente Prisma
npx prisma generate
```

2. Inicie o servidor:

```bash
# Modo de desenvolvimento
npm run start:dev

# ou em produção
npm run build
npm run start:prod
```

### 🐳 Docker

Para executar o projeto com Docker:

```bash
# Construir e iniciar os containers
docker-compose up -d

# Para parar os serviços
docker-compose down
```

Este comando iniciará os seguintes serviços:

- **PostgreSQL**: Banco de dados relacional
- **Backend**: API NestJS rodando na porta 5000

## 📁 Estrutura do projeto

```
backend-pdm/
├── prisma/               # Configuração do Prisma e migrações
├── src/                  # Código-fonte da aplicação
│   ├── auth/             # Módulo de autenticação
│   ├── disease/          # Módulo de doenças
│   ├── dependent-user/   # Módulo de usuários dependentes
│   ├── medication/       # Módulo de medicamentos
│   ├── user/             # Módulo de usuários
│   ├── app.module.ts     # Módulo principal da aplicação
│   └── main.ts           # Ponto de entrada da aplicação
├── test/                 # Testes da aplicação
├── Dockerfile            # Configuração do Docker
├── docker-compose.yml    # Configuração do Docker Compose
├── api-tests.http        # Arquivo de testes de API principal
└── dependent-disease-tests.http # Testes para dependentes e doenças
```

## 🛣️ Rotas

### 👤 Usuários

- `POST /user` - Criar um novo usuário
- `GET /user` - Obter informações de um usuário
- `PUT /user` - Atualizar dados do usuário
- `POST /user/change-password` - Alterar senha

### 🔐 Autenticação

- `POST /auth` - Realizar login e obter token JWT

### 👨‍👩‍👧‍👦 Usuários Dependentes

- `POST /dependent-user` - Cadastrar um novo usuário dependente
- `GET /dependent-user` - Listar todos os usuários dependentes
- `GET /dependent-user/:id` - Obter detalhes de um dependente específico
- `DELETE /dependent-user/:id` - Remover um usuário dependente

### 🩺 Doenças

- `POST /disease` - Cadastrar uma nova doença
- `GET /disease` - Listar todas as doenças
- `GET /disease/:id` - Obter detalhes de uma doença específica
- `PATCH /disease/:id` - Atualizar informações de uma doença
- `DELETE /disease/:id` - Excluir uma doença

### 💊 Medicamentos

- `POST /medication` - Cadastrar um novo medicamento (para usuário ou dependente)
- `GET /medication` - Listar todos os medicamentos (do usuário e dependentes)
- `GET /medication/:id` - Obter detalhes de um medicamento específico
- `PATCH /medication/:id` - Atualizar informações de um medicamento
- `DELETE /medication/:id` - Excluir um medicamento

## 🧪 Testes

Para executar os testes do projeto:

```bash
# Testes unitários
npm run test

# Testes end-to-end
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

Além disso, o arquivo `api-tests.http` fornece uma maneira simples de testar todas as rotas da API utilizando a extensão REST Client no VS Code.
