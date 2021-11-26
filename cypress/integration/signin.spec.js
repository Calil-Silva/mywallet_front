/// <reference types="cypress" />
import { credentials } from "./factories/userFactory";
import faker from "faker";

before(() => {
  cy.request({
    method: "POST",
    url: "http://localhost:4000/signup",
    body: {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      confirmedPassword: credentials.password,
    },
    failOnStatusCode: false,
  }).then((res) => expect(res.status).to.equal(201));
});

describe("SignIn", () => {
  it("Should return user authentication if credentials are valid", () => {
    cy.visit("http://localhost:3000");

    cy.get("input[placeholder=E-mail").type(credentials.email);
    cy.get("input[placeholder=Senha").type(credentials.password);
    cy.get("input[value=Entrar]").click();
    cy.intercept("POST", "/").as("logged-user");
    cy.wait("@logged-user").should("have.property", "response");
    cy.get("@logged-user").its("response.statusCode").should("deep.equal", 202);
    cy.get("@logged-user")
      .its("response.body")
      .should("have.property", "name")
      .and("deep.equal", credentials.name);
    cy.get("@logged-user")
      .its("response.body")
      .should("have.property", "token");

    cy.url().should("equal", "http://localhost:3000/balances");
  });

  it("Should alert user if he is not registered", () => {
    cy.visit("http://localhost:3000");

    cy.get("input[placeholder=E-mail").type(faker.internet.email());
    cy.get("input[placeholder=Senha").type(credentials.password);
    cy.on("window:alert", cy.stub().as("alerted"));
    cy.get("input[value=Entrar]").click();
    cy.intercept("POST", "/").as("logged-user");
    cy.wait("@logged-user").should("have.property", "response");
    cy.get("@logged-user").its("response.statusCode").should("deep.equal", 404);
    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "Usuário não encontrado");

    cy.url().should("equal", "http://localhost:3000/");
  });

  it("Should alert user if password do not match", () => {
    cy.visit("http://localhost:3000");

    cy.get("input[placeholder=E-mail").type(credentials.email);
    cy.get("input[placeholder=Senha").type(credentials.wrongPassword());
    cy.on("window:alert", cy.stub().as("alerted"));
    cy.get("input[value=Entrar]").click();
    cy.intercept("POST", "/").as("logged-user");
    cy.wait("@logged-user").should("have.property", "response");
    cy.get("@logged-user").its("response.statusCode").should("deep.equal", 403);
    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "E-mail/senha incorretos");

    cy.url().should("equal", "http://localhost:3000/");
  });
});
