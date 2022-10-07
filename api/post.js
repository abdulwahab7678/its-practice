const { faker } = require('@faker-js/faker');

function createRandomUser() {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    sex: faker.name.sexType(),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  };
}

function generateFakeUsers() {
  const users = []
  for (let id = 0; id < 50; id++) {
    users.push(createRandomUser)
  }
  return { "users": users }
}

module.exports = generateFakeUsers
