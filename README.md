# DCE STATUS - Em desenvolvimento

## Sobre o Projeto  
Este projeto é uma **Single Page Application (SPA)** que permite aos usuários informarem seu consumo mensal de energia e encontrarem o fornecedor mais adequado para suas necessidades.
### **Link da aplicação em produção:** https://desafio-clarke-energia.netlify.app

## Requisitos Técnicos implementados
### **Frontend**
 - **Tecnologias:** React, Vite, CSS
 - **Descrição:** Para o desenvolvimento do frontend da solução, ultilizei o react + vite, com css puro para a estilização. E por fim, ultilizei o netlify como serviço de hospedagem
### **Backend**
 - **Tecnologias:** API em GraphQL com Node.js e Typescript.
 - **Descrição:** Para a implementação do backend, desenvolvi a API em GraphQL com typescript conforme recomenda a documentação do Graphql. Além disso, use o Node.js para como framework de desenvolvimento. E por fim, ultilizei o serviço do Railway como serviço de hospedagem.
### **Banco de Dados**
 - **Tecnologias:** MySQL e Prisma
 - **Descrição:**  Como opção de db usei o mysql também hospedado no railway e o prisma como ORM (SIGNIFICADO ORM)

### **SOBRE O DOCKER**
- **Tecnologias:** Docker e Docker-Composer
- **Descrição:** Implementei as dockerização do projeto, para que seja possivel rodar a aplicação em quanlquer ambiente/máquina, permitindo rodar toda a aplicação com um único comando.

## Como Rodar o Projeto Localmente?

Antes de começar, verifique se sua máquina possui os seguintes pré-requisitos instalados:  

 - **[Docker](https://www.docker.com/get-started/)**  
 - **[Docker Compose](https://docs.docker.com/compose/install/)**   

Com a etapa anterior concluída, siga os seguintes passos: 

**1️. Clonar o Repositório**

Abra um terminal e execute:  
  ```sh
  git clone https://github.com/seu-usuario/dce-clarke.git
  ````
Em seguida, acesse o diretório que contém o projeto  
  ````sh
  cd DCE
  ````
Agora, dentro da pasta do projeto, execute:
  ````sh
  docker-compose up --build
  ````
Isso irá basicamente:
  1. Criar e iniciar o banco de dados MySQL no Docker
  2. Rodar as migrations do Prisma para criar as tabelas
  3. Popular o banco de dados com informações de teste
  4. Iniciar o backend (API GraphQL)
  5. Iniciar o frontend (React + Vite)

Depois, para acessar a aplicação, use:
  ````sh
   http://localhost:5173
  ````
Caso queira acessar apenas a API GraphQL, use:
  ````sh
   http://localhost:4000
  ````
## Comandos Úteis parar gerenciar os containers:
Parar os containers:
  ````sh
   docker-compose down
  ````
Remover containers, imagens e volumes:
  ````sh
   docker-compose down --rmi all -v
  ````
