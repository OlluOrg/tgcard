const request = require('supertest');
const app = require('../index');
const User = require('../src/models/User');

describe('UserController', () => {
    it('should create a user', async () => {
        const res = await request(app)
            .post('/')
            .send({ action: 'user.create', data: { name: 'John Doe', email: 'john@example.com' } });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should read a user', async () => {
        const user = await User.create({ name: 'John Doe', email: 'john@example.com' });
        const res = await request(app)
            .get('/')
            .query({ action: 'user.read', id: user._id });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'John Doe');
    });

    it('should read all users', async () => {
        await User.create({ name: 'John Doe', email: 'john@example.com' });
        await User.create({ name: 'Jane Doe', email: 'jane@example.com' });

        const res = await request(app)
            .get('/')
            .query({ action: 'user.read' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
    });

    it('should update a user', async () => {
        const user = await User.create({ name: 'John Doe', email: 'john@example.com' });
        const res = await request(app)
            .put('/')
            .send({ action: 'user.update', id: user._id, data: { name: 'Updated Name' } });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('modifiedCount', 1);
    });

    it('should delete a user', async () => {
        const user = await User.create({ name: 'John Doe', email: 'john@example.com' });
        const res = await request(app)
            .delete('/')
            .query({ action: 'user.delete', id: user._id });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('deletedCount', 1);
    });
});