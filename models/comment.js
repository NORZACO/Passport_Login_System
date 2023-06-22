class TableModel {
    constructor(db) {
        this.db = db;
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    findById(id) {
        return this.data.find(item => item.id === id) || null;
    }

    create(item) {
        item.id = this.generateId();
        this.data.push(item);
        return item;
    }

    update(id, updatedData) {
        const item = this.findById(id);
        if (item) {
            Object.assign(item, updatedData);
            return item;
        }
        return null;
    }

    delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedItem = this.data.splice(index, 1);
            return deletedItem[0];
        }
        return null;
    }

    generateId() {
        return Date.now();
    }

    findAll() {
        return this.data;
    }

    findByPk(id) {
        return this.findById(id);
    }

    findOne(criteria) {
        const keys = Object.keys(criteria);
        return this.data.find(item => {
            for (const key of keys) {
                if (item[key] !== criteria[key]) {
                    return false;
                }
            }
            return true;
        }) || null;
    }

    findOrCreate(criteria, defaults) {
        const existingItem = this.findOne(criteria);
        if (existingItem) {
            return [existingItem, false];
        } else {
            const newItem = Object.assign({}, criteria, defaults);
            return [this.create(newItem), true];
        }
    }

    findAndCountAll() {
        return {
            count: this.data.length,
            rows: this.data,
        };
    }
}
