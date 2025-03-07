# Sobre o Projeto  
Este projeto é uma **Single Page Application (SPA)** desenvolvida para facilitar a escolha do melhor fornecedor de energia com base no consumo mensal informado pelo usuário. Desse modo, ao inserir a quantidade de energia consumida (em kWh), **a aplicação retorna uma lista de fornecedores que possuem um limite mínimo de kWh menor que o valor informado pelo usuário**. Além disso, cada fornecedor dispõe das seguintes informações: **nome, logo, estado de origem, custo por kWh, limite mínimo de kWh, número total de clientes e avaliação média dos clientes**.

## Requisitos Técnicos e Diferencias implementados

### **Frontend**
- **Tecnologias Utilizadas:** React + Vite, CSS e Cypress.
- **Descrição:** O frontend da solução está hospedado no **Netlify**, e para o seu desenvolvimento utilizei **React** e **Vite**, garantindo alta performance e modularidade. Já para a estilização, optei por usar o **CSS puro**, sem dependências externas. Ademais, para validação da interface e experiência do usuário, foram implementados **testes automatizados end-to-end (E2E) com Cypress**, garantindo que a navegação e as interações funcionem corretamente. Portanto, o código fonte dos testes pode ser encontrado em **frontend/cypress/e2e/searchSupplie.cy.js**.
  
### **Backend**
 - **Tecnologias:** API GraphQL com Node.js, Typescript, Jest e Supertest.
 - **Descrição:** Para a implementação do backend, desenvolvi com Node.js uma API em GraphQL utilizando TypeScript, seguindo as recomendações oficiais da documentação do GraphQL. Ademais, para garantir a **qualidade, confiabilidade e integridade da API**, implementei **testes automatizados** utilizando **Jest e Supertest**. Sendo assim, esses testes validam o correto funcionamento das queries GraphQL e ajudam a evitar regressões. Portanto, o código fonte dos testes pode se encontrado em **backend/tests/fornecedorResolver.test.ts**. E, por fim, ultilizei o **Railway** como serviço de hospedagem para a API.

### **Banco de Dados**
- **Tecnologias:** MySQL e Prisma ORM.
- **Descrição:** O banco de dados foi modelado com **MySQL**, utilizando **Prisma ORM** e está atualmente hospedado no **Railway**. Além disso, o modelo foi estruturado aplicando **princípios de normalização**, visando eficiência e escalabilidade. Portanto, foram criadas três tabelas:
  - **Fornecedores**:
      - **Descrição**: Armazena informações dos fornecedores de energia.
      - **Relacionamento**: Um fornecedor pode ter várias avaliações e um total de clientes atendidos.
  - **Avaliações**:
      - **Descrição**: Armazena avaliações feitas pelos clientes sobre os fornecedores.
      - **Relacionamento:** Cada avaliação está associada a um único fornecedor (1:N).
  - **Clientes Atendidos**:
      - **Descrição**: Armazena o número total de clientes atendidos por cada fornecedor.
      - **Relacionamento:** Cada fornecedor possui um único registro de clientes atendidos (1:1).

  Dessa forma, para facilitar os testes, foi implementado um **script de seed** localizado em **backend/prisma/seed.ts**, responsável por popular automaticamente o banco de dados com fornecedores, avaliações e informações de clientes atendidos.

  Outrossim, vale resaltar que para cada fornecedor, foi gerada uma **logo fictícia**, cujo nome do arquivo está armazenado no banco de dados MySQL. No entanto, as imagens em si não são salvas diretamente no banco, mas sim em um **bucket S3 da AWS**, permitindo um carregamento otimizado via **CloudFront**, garantindo maior performance e disponibilidade na exibição dos recursos visuais da aplicação.  

### **Dokerização do projeto**
- **Tecnologias:** Docker e Docker Compose.
- **Descrição:** Para tornar a aplicação **portável e fácil de rodar em qualquer ambiente**, utilizei o **Docker** para containerizar os serviços. Isso permite que a aplicação seja executada sem necessidade de instalações manuais ou configurações específicas de cada máquina.

- **Orquestração com Docker Compose:**  
  Para evitar que cada serviço precise ser iniciado individualmente, implementei um **Docker Compose** que gerencia **backend, frontend e banco de dados** de forma automática. Assim, ao rodar um único comando, todos os containers sobem juntos e já conectados corretamente.

#### **Acesse a aplicação em produção:** https://desafio-clarke-energia.netlify.app

## Como Rodar o Projeto Localmente?

Antes de começar, verifique se sua máquina possui os seguintes pré-requisitos instalados:  

 - **[Docker](https://www.docker.com/get-started/)**  
 - **[Docker Compose](https://docs.docker.com/compose/install/)**   

Com a etapa anterior concluída, siga os seguintes passos: 

**1️. Clonar o Repositório**

Abra um terminal e execute:  
  ```sh
  git clone https://github.com/jpdicarvalho/Desafio-Clarke-Energia.git
  ````
Em seguida, acesse o diretório que contém o projeto  
  ````sh
  cd Desafio-Clarke-Energia
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
   http://localhost:4000/graphql
  ````
## Comandos úteis parar gerenciar os containers:
Parar os containers:
  ````sh
   docker-compose down
  ````
Remover containers, imagens e volumes:
  ````sh
   docker-compose down --rmi all -v
  ````
Reconstruir e subir os containers
  ````sh
  docker-compose up --build
  ````
## Como rodar os testes?
**1. Backend**
 
Fora do container, acesse o seguinte diretório:
  ````sh
  cd backend
  ````
Instale as dependências
  ````sh
  npm install
  ````
No arquivo .env, troque o banco de dados para:
  ````sh
  DATABASE_URL="mysql://root:qafFdOrkKUYwofilfHSkIUcIIHElmFqI@nozomi.proxy.rlwy.net:22845/railway"
  ````
Agora, ainda no diretório backend, execulte:
  ````sh
  npm run test
  ````

**1. Frontend**

Fora do container, acesse o seguinte diretório:
  ````sh
  cd frontend
  ````
Instale as dependências e em seguida o cypress (caso não possua):
  ````sh
  npm install
  npm install cypress --save-dev
  ````
Execulte o frontend:
  ````sh
  npm run dev
  ````
Agora, em um terminal paralelo, execulte o seguinte comando **dentro do diretório frontend**
  ````sh
  npx cypress open
  ````
Isso deve abrir a tela do cypress com duas opções de testes, portanto, selecione E2E 'Testing'. Em seguida, selecione um navegador de sua preferencia e clique em 'Start E2E Testing in Chrome'. Por último, selecione o arquivo 'searchSupplie.cy.js' e aguarde os testes serem execultados.

---
### Desde já, agradeço a oportunidade de participar do processo seletivo. Fico à disposição para quaisquer dúvidas e/ou esclarecimentos, obrigado!
