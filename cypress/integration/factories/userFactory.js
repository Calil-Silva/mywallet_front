import faker from "faker";

export const credentials = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  wrongPassword() {
    return this.password.slice(0, 7);
  },
};
