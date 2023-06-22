/*


// Create object with an existing object as prototype
Object.create()

// Adding or changing an object property
Object.defineProperty(object, property, descriptor)

// Adding or changing object properties
Object.defineProperties(object, descriptors)

// Accessing Properties
Object.getOwnPropertyDescriptor(object, property)

// Returns all properties as an array
Object.getOwnPropertyNames(object)

// Accessing the prototype
Object.getPrototypeOf(object)

// Returns enumerable properties as an array
Object.keys(object)


// Prevents adding properties to an object
Object.preventExtensions(object)

// Returns true if properties can be added to an object
Object.isExtensible(object)

// Prevents changes of object properties (not values)
Object.seal(object)


// Returns true if object is sealed
Object.isSealed(object)

// Prevents any changes to an object
Object.freeze(object)

// Returns true if object has been frozen
Object.isFrozen(object)

// Removes a property from an object
delete object.property

*/




// const fs = require('fs');

// const saved = (data, filePath) => {
//     try {
//         const jsonData = JSON.stringify(data, null, 2);
//         fs.writeFileSync(filePath, jsonData);
//         console.log(`Data saved to ${filePath}`);
//     } catch (error) {
//         console.log(`Error saving data to ${filePath}: ${error}`);
//     }
// };


// // export load and saved
// module.exports = {
//     load: (filePath) => {
//         let fileContents;
//         try {
//             fileContents = fs.readFileSync(filePath, 'utf8');
//         }
//         catch (error) {
//             console.log(`Error reading file from disk: ${error}`);
//         }
//         try {
//             const data = JSON.parse(fileContents);
//             return data;
//         }
//         catch (error) {
//             console.log(`Error parsing JSON string: ${error}`);
//         }
//     },
//     saved
// }


const bcrypt = require('bcrypt');
const fs = require('fs');

class UserService {
    constructor(filePath) {
        this.filePath = filePath;
        this.users = [];
        this.loadData();
    }





    // const fs = require('fs');

    async createJsonFileIfNotExists(filePath) {
        try {
            // Check if the file exists
            if (!fs.existsSync(filePath)) {
                // Create an empty JSON array
                const jsonData = [];
                // Write the empty array to the file
                fs.writeFileSync(filePath, JSON.stringify(jsonData));
                console.log(`JSON file created: ${filePath}`);
            } else {
                console.log(`JSON file already exists: ${filePath}`);
            }
        } catch (error) {
            console.error(`Error creating JSON file: ${error}`);
        }
    }





    async loadData() {
        try {
            const jsonData = fs.readFileSync(this.filePath, 'utf8');
            this.users = JSON.parse(jsonData);
        } catch (error) {
            console.log(`Error loading data from file: ${error}`);
            this.users = [];
        }
    }


    async saveData() {
        try {
            const jsonData = JSON.stringify(this.users, null, 2);
            fs.writeFileSync(this.filePath, jsonData);
            console.log(`Data saved to ${this.filePath}`);
        } catch (error) {
            console.log(`Error saving data to file: ${error}`);
        }
    }

    saved = (data, filePath) => {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync(filePath, jsonData);
            console.log(`Data saved to ${filePath}`);
        } catch (error) {
            console.log(`Error saving data to ${filePath}: ${error}`);
        }
    };

    async createUser(firstName, lastName, username, email, password, roleId) {
        const existingUser = this.users.find(user => user.username === username);
        if (existingUser) {
            throw new Error('User with the given username already exists');
        }


        const emailCount = this.users.filter(user => user.email === email).length;
        if (emailCount > 4) {
            throw new Error('Email cannot be used by more than 4 users');
        }


        const saltRounds = 10;
        const encryptedPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = { id: this.generateId(), firstName, lastName, username, email, encryptedPassword, roleId };

        this.users.push(newUser);
        this.saveData();

        return newUser;
    }



    async checkUserByEmail(email) {
        const foundUser = this.users.find(user => user.email === email);
        return foundUser ? { email: foundUser.email } : null;
    }



    async getUserByEmail(email) {
        const foundUser = this.users.find(user => user.email === email);
        return foundUser ? foundUser.encryptedPassword : null;
    }



    async findUser(username) {
        return this.users.filter(user => user.username === username);
    }



    async getUserRoleId(roleId) {
        return this.users.filter(user => user.roleId === roleId);
    }


    async getAllUsers() {
        return this.users.map(user => {
            const { id, username, email } = user;
            return { id, username, email };
        });
    }


    async getUserById(userId) {
        const foundUser = this.users.find(user => user.id === userId);
        return foundUser
            ? { userid: foundUser.id, username: foundUser.username, email: foundUser.email }
            : null;
    }


    async updateUser(userId, username, email, encryptedPassword) {
        const foundUser = this.users.find(user => user.id === userId);
        if (foundUser) {
            foundUser.username = username;
            foundUser.email = email;
            foundUser.encryptedPassword = encryptedPassword;
            this.saveData();
            return foundUser;
        }
        return null;
    }


    async addRole(userId, roleId) {
        const foundUser = this.users.find(user => user.id === userId);
        if (foundUser) {
            foundUser.roleId = roleId;
            this.saveData();
            return true;
        }
        return false;
    }


    async generateId() {
        return Date.now().toString();
    }

}

module.exports = UserService;
