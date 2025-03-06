describe("Carregamento inicial da página", () => {
    it("Deve exibir o título e o botão de busca", () => {
        cy.visit("http://localhost:5173");
        cy.contains("Nossas Soluções").should("be.visible");
        cy.get(".btn__get__started").should("be.visible").and("contain", "Encontrar fornecedor");
    });
});
  
describe("Interação com botão 'Encontrar fornecedor'", () => {
    it("Deve exibir o campo de entrada ao clicar no botão", () => {
        cy.visit("http://localhost:5173");
        cy.get(".btn__get__started").click();
        cy.get(".input-wrapper").should("be.visible");
    });
});

describe("Validação do campo de entrada", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.get(".btn__get__started").click();
    });

    it("Deve permitir apenas números", () => {
        cy.get(".input").type("abc");
        cy.get(".Search-btn").should("not.exist");
    });

    it("Não deve aceitar o número 0 como primeiro digito", () => {
        cy.get(".input").type("0");
        cy.get(".Search-btn").should("not.exist");
    });

    it("Deve ativar o botão ao inserir um número válido", () => {
        cy.get(".input").clear().type("30000");
        cy.get(".Search-btn").should("be.visible");
    });
});

describe("Busca de fornecedores", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.get(".btn__get__started").click();
    });

    it("Deve exibir carregamento e mostrar fornecedores compatíveis com o valor digitado", () => {
        cy.get(".input").type("30000");
        cy.get(".Search-btn").click();

        cy.contains("Buscando fornecedores...").should("be.visible");

        // Interceptar a requisição GraphQL e fornecer a resposta do fixture
        cy.intercept("POST", "**/graphql", { fixture: "fornecedores.json" });

        cy.wait(2000); // Aguarda a resposta simulada

        cy.get(".fornecedor__card").should("have.length.greaterThan", 0); // Verifica se os fornecedores aparecem
    });
});

describe("Busca sem fornecedores", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.get(".btn__get__started").click();
    });

    it("Deve exibir mensagem quando nenhum fornecedor for encontrado", () => {
        cy.intercept("POST", "**/graphql", {
            body: { data: { fornecedores: [] } },
        });

        cy.get(".input").type("50000");
        cy.get(".Search-btn").click();

        cy.contains("Nenhum fornecedor encontrado.").should("be.visible");
    });
});

describe("Erro na API", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.get(".btn__get__started").click();
    });

    it("Deve exibir mensagem de erro se a API falhar", () => {
        cy.intercept("POST", "**/graphql", {
            statusCode: 500,
        body: {
            errors: [{ message: "Erro interno no servidor" }],
        },
        }).as("apiErro");

        cy.get(".input").type("40000");
        cy.get(".Search-btn").click();

        // Aguarda a resposta da API
        cy.wait("@apiErro");

        // **Verifica a presença da mensagem de erro**
        cy.get(".message__erro__request").should("be.visible");
        cy.contains("Hummhumm...").should("be.visible");
        cy.contains("Parece que houve um problema ao realizar a busca. Tente novamente mais tarde.").should("be.visible");
    });
});
  
  
  
  