FROM node:latest AS development

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de configuração do projeto
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci

# Copiar o código fonte
COPY . .

# Gerar prisma client
RUN npx prisma generate

# Compilar a aplicação
RUN npm run build

FROM node:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de configuração do projeto
COPY package*.json ./
COPY --from=development /usr/src/app/prisma ./prisma/

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar o código compilado
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Expor a porta
EXPOSE 5000

# Iniciar a aplicação
CMD ["npm", "run", "start:prod"]