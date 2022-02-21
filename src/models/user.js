// Create Admin Class extend User

export default class User {
  constructor({username, password, id, role}) {
    this.username = username;
    this.id = id;
    this.password = password;
    this.role = role;
  }
}
