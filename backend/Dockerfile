# Usa a imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos package.json e package-lock.json para instalar as dependências
COPY package.json package-lock.json ./

# Instala TODAS as dependências, incluindo as de desenvolvimento
RUN npm install --include=dev

# Copia o restante do código para o container
COPY . .

EXPOSE 4000

CMD [ "node", "./dist/src/index.js" ]