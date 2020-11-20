const { Base } = require('./base');

function Role() {
  return {
    ...new Base('roles'),
  };
}

const role = new Role();
