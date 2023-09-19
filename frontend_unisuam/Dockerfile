# Imagem base
FROM node:14

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todos os arquivos do diretório atual para o container
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "npm", "start" ]