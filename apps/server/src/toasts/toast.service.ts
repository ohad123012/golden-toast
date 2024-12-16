import { Injectable } from '@nestjs/common';
import { Toast } from './entities/toast.entities';
import { InjectModel } from '@nestjs/sequelize';
import { CreateToastDto } from './dto/create-toast.dto';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class ToastService {
  constructor(@InjectModel(Toast) public toastModel: typeof Toast) {}

  findAll() {
    return this.toastModel.findAll();
  }

  getToastByToastId(toastId: string) {
    return this.toastModel.findOne({ where: { id: toastId } });
  }
  getPastToastForUser(userId: string) {
    const currentDate = new Date();
    return this.toastModel.findAll({
      where: { userId, toastDate: { [Op.lt]: currentDate } },
    });
  }

  getAllPastToasts() {
    const currentDate = new Date();

    const allPast = this.toastModel.findAll({
      where: { toastDate: { [Op.lt]: currentDate } },
    });
    return allPast;
  }

  getAllFutureToasts() {
    const currentDate = new Date();
    return this.toastModel.findAll({
      where: { toastDate: { [Op.gt]: currentDate } },
    });
  }

  getAmountToastsForCurrentPeriod() {
    const currentDate = new Date();
    const beginningDateJanuary = new Date(currentDate.getFullYear(), 0, 1);
    const endingDateJuly = new Date(currentDate.getFullYear(), 6, 1);
    const endingDateJanuary = new Date(currentDate.getFullYear() + 1, 0, 1);

    if (currentDate.getMonth() + 1 < 7) {
      return this.toastModel.count({
        where: {
          toastDate: {
            [Op.gt]: beginningDateJanuary,
            [Op.lt]: endingDateJuly,
          },
        },
      });
    } else {
      return this.toastModel.count({
        where: {
          toastDate: {
            [Op.gt]: endingDateJuly,
            [Op.lt]: endingDateJanuary,
          },
        },
      });
    }
  }

  getAllTimeRecord() {
    const juneMonthNumber = 6;
    const firstHalfPromise = this.toastModel.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('toastDate')), 'amountOfToasts'],
        [
          Sequelize.fn('DATE_TRUNC', 'year', Sequelize.col('toastDate')),
          'date',
        ],
      ],

      group: [
        Sequelize.fn('DATE_TRUNC', 'year', Sequelize.col('toastDate')),
        'date',
      ],
      order: [[Sequelize.fn('COUNT', Sequelize.col('toastDate')), 'DESC']],
      where: Sequelize.where(
        Sequelize.fn('date_part', 'month', Sequelize.col('toastDate')),
        {
          [Op.lte]: juneMonthNumber,
        }
      ),
      limit: 1,
    });
    const secondHalfPromise = this.toastModel.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('toastDate')), 'amountOfToasts'],
        [
          Sequelize.fn('DATE_TRUNC', 'year', Sequelize.col('toastDate')),
          'date',
        ],
      ],

      group: ['toastDate'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('toastDate')), 'DESC']],
      where: Sequelize.where(
        Sequelize.fn('date_part', 'month', Sequelize.col('toastDate')),
        {
          [Op.gt]: juneMonthNumber,
        }
      ),
      limit: 1,
    });
    const record = Promise.all([firstHalfPromise, secondHalfPromise]).then(
      (values) => {
        return Math.max(
          values[0][0].dataValues['amountOfToasts'],
          values[1][0].dataValues['amountOfToasts']
        );
      }
    );

    return record;
  }

  getAmountToastsForCurrentPeriodPerUser() {
    const currentDate = new Date();
    const beginningDateJanuary = new Date(currentDate.getFullYear(), 0, 1);
    const endingDateJuly = new Date(currentDate.getFullYear(), 6, 1);
    const endingDateJanuary = new Date(currentDate.getFullYear() + 1, 0, 1);
    const currentMonth = currentDate.getMonth() + 1;
    const juneNumber = 7;
    if (currentMonth < juneNumber) {
      return this.toastModel.count({
        attributes: ['userId'],
        where: {
          toastDate: {
            [Op.gt]: beginningDateJanuary,
            [Op.lt]: endingDateJuly,
          },
        },
        group: ['userId'],
      });
    } else {
      return this.toastModel.count({
        attributes: ['userId'],
        where: {
          toastDate: {
            [Op.gt]: endingDateJuly,
            [Op.lt]: endingDateJanuary,
          },
        },
        group: ['userId'],
      });
    }
  }
  createToast(newToastDto: CreateToastDto) {
    return this.toastModel.create(newToastDto);
  }

  updateToast(toastToUpdate: CreateToastDto, id: string) {
    return this.toastModel.update(toastToUpdate, {
      where: { id },
    });
  }

  deleteToast(id: string) {
    return this.toastModel.destroy({ where: { id } });
  }
}
