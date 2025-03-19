const request = require('supertest');
const app = require('../index');
const BusinessCard = require('../src/models/BusinessCard');

describe('BusinessCardController', () => {
    it('should create a business card', async () => {
        const res = await request(app)
            .post('/')
            .send({ action: 'businessCard.create', data: { title: 'Business Card 1', content: 'Sample content' } });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should read a business card', async () => {
        const businessCard = await BusinessCard.create({ title: 'Business Card 1', content: 'Sample content' });
        const res = await request(app)
            .get('/')
            .query({ action: 'businessCard.read', id: businessCard._id });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Business Card 1');
    });

    it('should update a business card', async () => {
        const businessCard = await BusinessCard.create({ title: 'Business Card 1', content: 'Sample content' });
        const res = await request(app)
            .put('/')
            .send({ action: 'businessCard.update', id: businessCard._id, data: { title: 'Updated Business Card' } });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('modifiedCount', 1);
    });

    it('should delete a business card', async () => {
        const businessCard = await BusinessCard.create({ title: 'Business Card 1', content: 'Sample content' });
        const res = await request(app)
            .delete('/')
            .query({ action: 'businessCard.delete', id: businessCard._id });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('deletedCount', 1);
    });
});