const fs = require('fs');

class ItemServices {
  constructor(jsonFilePath) {
    this.filePath = jsonFilePath;
  }


  async createUser(firstName, lastName, username, email, password) {
    const user = await JSON.parse(await readFileAsync(this.filePath));

    const existingUser = user.find(user => user.username === username);
    if (existingUser) {
      throw new Error('User with the given username already exists');
    }
    else {

      const id = 1 + Math.max(...user.map(function ({ id }) { return id; }));
      const newUser = { id, firstName, lastName, username, email, password };
      user.push(newUser);
      await fs.writeFileSync(this.filePath, JSON.stringify(user, null, 2));
      return newUser;
    }
  }






}
