const request = require('supertest');
const app = require('../index');
const ViewHistory = require('../src/models/ViewHistory');

describe('ViewHistoryController', () => {
    it('should add a view history record', async () => {
        const res = await request(app)
            .post('/')
            .send({ action: 'viewHistory.addView', userId: 'user1', cardId: 'card1' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'success');
    });

    it('should get view history for a user', async () => {
        await ViewHistory.create({ userId: 'user1', cardId: 'card1', lastViewedAt: new Date() });
        await ViewHistory.create({ userId: 'user1', cardId: 'card2', lastViewedAt: new Date() });

        const res = await request(app)
            .get('/')
            .query({ action: 'viewHistory.getViews', userId: 'user1' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
    });

    it('should return 400 if userId is missing for addView', async () => {
        const res = await request(app)
            .post('/')
            .send({ action: 'viewHistory.addView', cardId: 'card1' });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'user_id and card_id are required');
    });

    it('should return 400 if userId is missing for getViews', async () => {
        const res = await request(app)
            .get('/')
            .query({ action: 'viewHistory.getViews' });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'user_id is required');
    });
});