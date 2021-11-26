import faker from "faker";

const credentials = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  wrongPassword() {
    return this.password.slice(0, 7);
  },
};

describe("SignUp", () => {
  it("Should sign up user successfully if credentials are valid", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get("input[placeholder=Nome]").type(credentials.name);
    cy.get("input[placeholder=E-mail]").type(credentials.email);
    cy.get("input[placeholder=Senha]").type(credentials.password);
    cy.get("input[placeholder='Confirme a senha']").type(credentials.password);
  });
});
