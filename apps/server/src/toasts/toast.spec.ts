// import { getModelToken } from '@nestjs/sequelize';
// import { Toast } from './entities/toast.entities';
// import { ToastService } from './toast.service';
// import { ToastController } from './toast.controller';
// import { Test } from '@nestjs/testing';
// describe('ToastService', () => {
//   const mockToasts = {
//     id: 'c87ec66d-4c75-49f3-b424-da15ecb0cf6d',
//     userId: '28f0b0ba-07f4-4099-9576-adfa1e901b77',
//     toastDate: '2017-02-16T22:00:00.000Z',
//     reason: 'barak going to the kirya',
//     drinks: 'a lot',
//     foods: 'everything',
//     description: 'cool toast for us all',
//     hasDone: true,
//   };

//   describe('toast', () => {
//     let toastController: ToastController;
//     let toastModel: typeof Toast;
//     let toastService: ToastService;
//     let toastServiceWithModel: ToastService;
//     beforeEach(async () => {
//       const moduleRef = await Test.createTestingModule({
//         controllers: [ToastController],
//         providers: [
//           ToastService,
//           {
//             provide: getModelToken(Toast),
//             useValue: {},
//           },
//         ],
//       }).compile();

//       toastService = moduleRef.get(ToastService);
//       toastController = moduleRef.get(ToastController);
//     });
//     describe('getAllTimeRecord', () => {
//       test('should give the all time record ', async () => {
//         //   jest.spyOn(toastService, 'getAllTimeRecord').mockImplementation(() =>result );
//         expect(
//           toastService.getAllTimeRecord().then((res) => {
//             return res;
//           })
//         ).toBe(4);
//       });
//     });
//   });
// });

import { getModelToken } from '@nestjs/sequelize';
import { Toast } from './entities/toast.entities';
import { ToastService } from './toast.service';
import { ToastController } from './toast.controller';
import { Test } from '@nestjs/testing';
import { Op } from 'sequelize';

describe('ToastService', () => {
  const mockFirstHalf = [
    {
      dataValues: {
        amountOfToasts: '7',
        date: '2017-01-01T00:00:00.000Z',
      },
    },
  ];

  const mockSecondHalf = [
    {
      dataValues: {
        amountOfToasts: '4',
        date: '2017-01-01T00:00:00.000Z',
      },
    },
  ];

  describe('toast', () => {
    let toastController: ToastController;
    let toastService: ToastService;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        controllers: [ToastController],
        providers: [
          ToastService,
          {
            provide: getModelToken(Toast),
            useValue: {
              findAll: jest.fn().mockImplementation((options) => {
                const checkMonth =
                  mockFirstHalf[0].dataValues.amountOfToasts >
                  mockSecondHalf[0].dataValues.amountOfToasts
                    ? 'firstHalf'
                    : 'secondHalf';
                if (checkMonth === 'firstHalf') {
                  return Promise.resolve(mockFirstHalf);
                }
                return Promise.resolve(mockSecondHalf);
              }),

              // Mock implementation
            },
          },
        ],
      }).compile();

      toastService = moduleRef.get(ToastService);
      toastController = moduleRef.get(ToastController);
    });

    describe('getAllTimeRecord', () => {
      test('should give the all-time record', async () => {
        const result = await toastService.getAllTimeRecord();
        expect(result).toEqual('7'); // Match the mocked data
      });
    });
  });
});
