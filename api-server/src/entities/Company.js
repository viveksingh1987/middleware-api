class Company {
  constructor({id, name, description}) {
    this.id = parseInt(id);
    this.name = name;
    this.description = description;
  }
}

module.exports = Company;