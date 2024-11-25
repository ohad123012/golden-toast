import { getModelToken } from '@nestjs/sequelize';
import { Toast } from './entities/toast.entities';
import { ToastService } from './toast.service';
import { ToastController } from './toast.controller';
import { Test } from '@nestjs/testing';

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
              findAll: jest.fn().mockImplementation(() => {
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
