# Imagem oficial do Node.js otimizada para produção
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todo o código para o container
COPY . .