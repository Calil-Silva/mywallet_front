import { credentials } from "./factories/userFactory";

describe("SignUp", () => {
  it("Should sign up user successfully if credentials are valid", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get("input[placeholder=Nome]").type(credentials.name);
    cy.get("input[placeholder=E-mail]").type(credentials.email);
    cy.get("input[placeholder=Senha]").type(credentials.password);
    cy.get("input[placeholder='Confirme a senha']").type(credentials.password);
    cy.on("window:alert", cy.stub().as("alerted"));
    cy.get("input[value=Cadastrar]").click();
    cy.intercept("POST", "/signup").as("new-user");
    cy.wait("@new-user").should("have.property", "response");
    cy.get("@new-user").its("response.statusCode").should("deep.equal", 201);
    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "Registro efetuado com sucesso!");

    cy.url().should("equal", "http://localhost:3000/");
  });

  it("Should return alert user if email is already registered", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get("input[placeholder=Nome]").type(credentials.name);
    cy.get("input[placeholder=E-mail]").type(credentials.email);
    cy.get("input[placeholder=Senha]").type(credentials.password);
    cy.get("input[placeholder='Confirme a senha']").type(credentials.password);
    cy.on("window:alert", cy.stub().as("alerted"));
    cy.get("input[value=Cadastrar]").click();
    cy.intercept("POST", "/signup").as("new-user");
    cy.wait("@new-user").should("have.property", "response");
    cy.get("@new-user").its("response.statusCode").should("deep.equal", 409);
    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "Email já registrado!");
  });

  it("Should alert user if passwords did not match", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get("input[placeholder=Nome]").type(credentials.name);
    cy.get("input[placeholder=E-mail]").type(credentials.email);
    cy.get("input[placeholder=Senha]").type(credentials.password);
    cy.get("input[placeholder='Confirme a senha']").type(
      credentials.wrongPassword()
    );
    cy.on("window:alert", cy.stub().as("alerted"));
    cy.get("input[value=Cadastrar]").click();
    cy.intercept("POST", "/signup").as("new-user");
    cy.wait("@new-user").should("have.property", "response");
    cy.get("@new-user").its("response.statusCode").should("deep.equal", 406);
    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "Senha incorreta!");
  });
});
