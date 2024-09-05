# Meu Pet - Backend
Este é o repositório do backend da aplicação Meu Pet, um sistema que permite a gestão colaborativa de informações sobre os cuidados e rotinas de pets, facilitando o compartilhamento de dados entre membros da família e profissionais, como veterinários.

### Funcionalidades

### Tecnologias Utilizadas
- Fastify: Framework para criação da API.
- MongoDB: Banco de dados NoSQL para armazenar dados dos usuários, pets e atividades.

### Pré-requisitos
- Node.js (v16.x ou superior)
- MongoDB (Local ou em nuvem)
- NPM ou Yarn

## Instalação
1. Clone o repositório:
```yaml I'm A tab
git clone https://github.com/meupetapp/backend.git
```
2. Instale as dependências:
```yaml 
npm install
# ou
yarn install
```
3. Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
```yaml 
PORT=3000
MONGODB_URI=mongodb://localhost:27017/carteira-de-pets
JWT_SECRET=sua-chave-secreta-jwt
```
4. Inicie o servidor:
```yaml 
npm run dev
# ou
yarn dev
```

## Estrutura de pastas
```
📦 meu-pet-backend
 ┣ 📂src
 ┃ ┣ 📂controllers      # Lógica dos endpoints da API
 ┃ ┣ 📂models           # Modelos Mongoose para o MongoDB
 ┃ ┣ 📂routes           # Definição das rotas da API
 ┃ ┣ 📂middlewares      # Middlewares (autenticação, validações, etc.)
 ┃ ┗ 📂services         # Serviços de regras de negócio
 ┣ 📜.env.example       # Exemplo do arquivo .env
 ┣ 📜package.json       # Configurações do projeto e dependências
 ┗ 📜README.md          # Informações do projeto
```