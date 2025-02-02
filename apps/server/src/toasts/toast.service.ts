import { Injectable } from '@nestjs/common';
import { Toast } from './entities/toast.entities';
import { InjectModel } from '@nestjs/sequelize';
import { CreateToastDto } from './dto/create-toast.dto';
import { Op, Sequelize } from 'sequelize';
import { ToastParticipants } from '../toast-participants/entities/toast-participants.entity';
import { User } from '../users/entites/user.entities';
@Injectable()
export class ToastService {
  constructor(
    @InjectModel(Toast)
    public toastModel: typeof Toast
  ) {}

  findAll() {
    return this.toastModel.findAll();
  }

  getToastByToastId(id: string) {
    return this.toastModel.findOne({ where: { id } });
  }
  getPastToastForUser(userIdToCheck: string) {
    const currentDate = new Date();
    return this.toastModel.findAll({
      include: {
        model: ToastParticipants,
        attributes: [],
        where: {
          userId: userIdToCheck,
        },
      },
      where: {
        toastDate: { [Op.lt]: currentDate },
      },
      order: ['toastDate'],
    });
  }

  getAllPastToasts() {
    const currentDate = new Date();

    const allPast = this.toastModel.findAll({
      where: { toastDate: { [Op.lt]: currentDate } },
      order: ['toastDate'],
    });

    return allPast;
  }

  getAllFutureToasts() {
    const currentDate = new Date();
    return this.toastModel.findAll({
      where: { toastDate: { [Op.gt]: currentDate } },
      order: ['toastDate'],
    });
  }

  getAllFutureToastsForUser(userIdToCheck: string) {
    const currentDate = new Date();
    return this.toastModel.findAll({
      include: {
        model: ToastParticipants,
        attributes: [],
        where: {
          userId: userIdToCheck,
        },
      },
      where: {
        toastDate: { [Op.gt]: currentDate },
      },
      order: ['toastDate'],
    });
  }

  getAmountToastsForCurrentPeriod() {
    const currentDate = new Date();
    const beginningDateJanuary = new Date(currentDate.getFullYear(), 0, 2);
    const endingDateJuly = new Date(currentDate.getFullYear(), 6, 2);
    const endingDateJanuary = new Date(currentDate.getFullYear() + 1, 0, 1);
    console.log(beginningDateJanuary, endingDateJuly, endingDateJanuary);
    if (currentDate.getMonth() + 1 < 7) {
      return this.toastModel.count({
        where: {
          hasDone: true,

          toastDate: {
            [Op.gte]: beginningDateJanuary,
            [Op.lte]: endingDateJuly,
          },
        },
      });
    } else {
      return this.toastModel.count({
        where: {
          hasDone: true,
          toastDate: {
            [Op.gt]: endingDateJuly,
            [Op.lte]: endingDateJanuary,
          },
        },
      });
    }
  }

  getAllTimeRecord() {
    const juneMonthNumber = 6;
    const currentYear = new Date().getFullYear();
    const firstHalfRecord = this.toastModel.findAll({
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
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('date_part', 'month', Sequelize.col('toastDate')),
            { [Op.lte]: juneMonthNumber }
          ),
          Sequelize.where(
            Sequelize.fn('date_part', 'year', Sequelize.col('toastDate')),
            { [Op.ne]: currentYear }
          ),
          { hasDone: true },
        ],
      },
      limit: 1,
    });
    const secondHalfRecord = this.toastModel.findAll({
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
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('date_part', 'month', Sequelize.col('toastDate')),
            { [Op.gt]: juneMonthNumber }
          ),

          Sequelize.where(
            Sequelize.fn('date_part', 'year', Sequelize.col('toastDate')),
            { [Op.ne]: currentYear }
          ),

          { hasDone: true },
        ],
      },

      limit: 1,
    });

    const record = Promise.all([firstHalfRecord, secondHalfRecord]).then(
      (records) => {
        if (!records[0][0]) {
          return records[1][0].dataValues['amountOfToasts'];
        }
        if (!records[1][0]) {
          return records[0][0].dataValues['amountOfToasts'];
        }

        if (
          !records[1][0].dataValues['amountOfToasts'] &&
          records[0][0].dataValues['amountOfToasts']
        ) {
          return 0;
        }
        return Math.max(
          records[0][0].dataValues['amountOfToasts'],
          records[1][0].dataValues['amountOfToasts']
        );
      }
    );

    return record;
  }

  getAmountToastsForCurrentPeriodPerUser() {
    const currentDate = new Date();
    const beginningDateJanuary = new Date(currentDate.getFullYear(), 0, 2);
    const endingDateJuly = new Date(currentDate.getFullYear(), 6, 2);
    const endingDateJanuary = new Date(currentDate.getFullYear() + 1, 0, 1);
    const currentMonth = currentDate.getMonth() + 1;
    const juneNumber = 7;
    if (currentMonth < juneNumber) {
      return this.toastModel.findAll({
        attributes: [
          'userId',
          [Sequelize.fn('COUNT', Sequelize.col('userId')), 'count'],
        ],

        include: {
          model: User,
          attributes: ['username'],
        },
        where: {
          hasDone: true,
          toastDate: {
            [Op.gte]: beginningDateJanuary,
            [Op.lte]: endingDateJuly,
          },
        },
        order: [['count', 'DESC']],
        group: ['user.id', 'userId'],
      });
    } else {
      return this.toastModel.findAll({
        attributes: [
          'userId',
          [Sequelize.fn('COUNT', Sequelize.col('userId')), 'count'],
        ],

        include: {
          model: User,
          attributes: ['username'],
        },
        where: {
          hasDone: true,
          toastDate: {
            [Op.gt]: endingDateJuly,
            [Op.lte]: endingDateJanuary,
          },
        },
        order: [['count', 'DESC']],
        group: ['user.id', 'userId'],
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
