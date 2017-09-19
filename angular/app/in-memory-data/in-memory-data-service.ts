import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let gpio = [
            {
                id: 1,
                pin: 1,
                scheduleName: '',
                createdAt: '2017-08-24T20:44:44.933Z',
                updatedAt: '2017-08-24T20:44:44.933Z'
            },
            {
                id: 2,
                pin: 8,
                scheduleName: '',
                createdAt: '2017-08-24T20:44:44.948Z',
                updatedAt: '2017-08-24T20:44:44.948Z'
            },
            {
                id: 3,
                pin: 9,
                scheduleName: '',
                createdAt: '2017-08-24T20:44:44.949Z',
                updatedAt: '2017-08-24T20:44:44.949Z'
            },
            {
                id: 4,
                pin: 4,
                scheduleName: 'calendar notifications',
                createdAt: '2017-08-24T20:44:44.950Z',
                updatedAt: '2017-08-24T20:44:44.950Z'
            },
            {
                id: 5,
                pin: 11,
                scheduleName: 'mister',
                createdAt: '2017-08-24T20:44:44.950Z',
                updatedAt: '2017-08-24T20:44:44.950Z'
            }
        ];

        return { gpio };
    }
}
