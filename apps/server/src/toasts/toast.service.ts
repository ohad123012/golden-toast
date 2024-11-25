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
    console.log(currentDate);
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
    const firstDateForPeriod = new Date(currentDate.getFullYear(), 0, 1);
    const secondDateForPeriod = new Date(currentDate.getFullYear(), 6, 1);
    const secondEndDateForPeriod = new Date(
      currentDate.getFullYear() + 1,
      0,
      1
    );

    if (currentDate.getMonth() + 1 < 7) {
      return this.toastModel.count({
        where: {
          toastDate: {
            [Op.gt]: firstDateForPeriod,
            [Op.lt]: secondDateForPeriod,
          },
        },
      });
    } else {
      return this.toastModel.count({
        where: {
          toastDate: {
            [Op.gt]: secondDateForPeriod,
            [Op.lt]: secondEndDateForPeriod,
          },
        },
      });
    }
  }

  getAllTimeRecord() {
    // return this.toastModel.count({attributes:["toastDate" , [Sequelize.fn('CASE' ) , sequelize.  ]]})}

    //Sequelize.when(Sequelize.fn('MONTH', Sequelize.col('toastDate')) , {$lte: 6})

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
          [Op.lte]: 6,
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
          [Op.gt]: 6,
        }
      ),
      limit: 1,
    });
    const biggerOne = Promise.all([firstHalfPromise, secondHalfPromise]).then(
      (values) => {
        return values[0][0].dataValues['amountOfToasts'] >
          values[1][0].dataValues['amountOfToasts']
          ? values[0][0].dataValues['amountOfToasts']
          : values[1][0].dataValues['amountOfToasts'];
      }
    );

    return biggerOne;
  }

  getAmountToastsForCurrentPeriodPerUser() {
    const currentDate = new Date();
    const firstDateForPeriod = new Date(currentDate.getFullYear(), 0, 1);
    const secondDateForPeriod = new Date(currentDate.getFullYear(), 6, 1);
    const secondEndDateForPeriod = new Date(
      currentDate.getFullYear() + 1,
      0,
      1
    );

    if (currentDate.getMonth() + 1 < 7) {
      return this.toastModel.count({
        attributes: ['userId'],
        where: {
          toastDate: {
            [Op.gt]: firstDateForPeriod,
            [Op.lt]: secondDateForPeriod,
          },
        },
        group: ['userId'],
      });
    } else {
      return this.toastModel.count({
        attributes: ['userId'],
        where: {
          toastDate: {
            [Op.gt]: secondDateForPeriod,
            [Op.lt]: secondEndDateForPeriod,
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
