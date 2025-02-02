import {
  useGetAllTimeRecordQuery,
  useGetAmountToastsForCurrentPeriodPerUserQuery,
  useGetAmountToastsForCurrentPeriodQuery,
} from '../../store';
import { MilitaryTech } from '@mui/icons-material';

import { Board } from '../board';
import styles from './leaderboard.module.css';
import { useState } from 'react';
export const Leaderboard = () => {
  const firstPersonGold = '#ffd700';
  const secondPersonSilver = '#c0c0c0';
  const thirdPersonBronze = '#cd7f32';
  const MedalStyles = {
    paddingTop: '0.2rem',
  };
  const { data: allTimeRecord, isError: allTimeRecordUndefinedError } =
    useGetAllTimeRecordQuery();
  const { data: AmountToastsForCurrentPeriodcurrentRecord } =
    useGetAmountToastsForCurrentPeriodQuery();
  const { data: allUsersToasts } =
    useGetAmountToastsForCurrentPeriodPerUserQuery();

  const getAllUsernames = allUsersToasts?.map((usersToastsRecords) => {
    const countForUser = usersToastsRecords.count;
    const usernameForUser = usersToastsRecords.user.username;
    return { usernameForUser, countForUser };
  });

  if (!getAllUsernames) {
    return;
  }

  const getSilverPosition = getAllUsernames.findIndex((user, i) => {
    const maxCountForUser = getAllUsernames[0].countForUser;
    if (maxCountForUser !== user.countForUser) {
      return i;
    }
  });
  const getBronzePosition = getAllUsernames.findIndex((user, i) => {
    const amountForSilver = getAllUsernames[getSilverPosition].countForUser;

    if (amountForSilver > user.countForUser) {
      return i;
    }
  }); // could make better implementation without making it 2*n , make it only n!

  const displayUsersAndRecords = getAllUsernames?.map((userToDisplay, i) => {
    if (
      userToDisplay.countForUser &&
      userToDisplay.countForUser === getAllUsernames[0].countForUser
    ) {
      return (
        <div className={styles.userResult} style={{ color: firstPersonGold }}>
          <div className={styles.usernameStyle}>
            {userToDisplay.usernameForUser}
          </div>
          <div> {userToDisplay.countForUser} </div>
          <MilitaryTech sx={MedalStyles} />
        </div>
      );
    }

    if (
      userToDisplay.countForUser &&
      userToDisplay.countForUser ===
        getAllUsernames[getSilverPosition].countForUser
    ) {
      return (
        <div
          className={styles.userResult}
          style={{ color: secondPersonSilver }}
        >
          <div className={styles.usernameStyle}>
            {userToDisplay.usernameForUser}
          </div>
          <div> {userToDisplay.countForUser} </div>
          <MilitaryTech sx={MedalStyles} />
        </div>
      );
    }

    if (
      userToDisplay.countForUser &&
      userToDisplay.countForUser ===
        getAllUsernames[getBronzePosition].countForUser
    ) {
      return (
        <div className={styles.userResult} style={{ color: thirdPersonBronze }}>
          <div className={styles.usernameStyle}>
            {userToDisplay.usernameForUser}
          </div>
          <div> {userToDisplay.countForUser} </div>
          <MilitaryTech sx={MedalStyles} />
        </div>
      );
    } else if (userToDisplay.countForUser) {
      return (
        <div className={styles.userResult}>
          <div className={styles.usernameStyle}>
            {userToDisplay.usernameForUser}
          </div>
          <div> {userToDisplay.countForUser} </div>
          <MilitaryTech sx={MedalStyles} />
        </div>
      );
    }
  });

  if (allTimeRecord && allTimeRecord > 0 && !allTimeRecordUndefinedError) {
    return (
      <Board gridArea="results" title="Leaderboard">
        <div className={styles.leaderboardResults}>
          <div
            style={{
              color: `rgba(${
                255 -
                255 /
                  (allTimeRecord /
                    (AmountToastsForCurrentPeriodcurrentRecord ?? 1))
              },${
                255 /
                (allTimeRecord /
                  (AmountToastsForCurrentPeriodcurrentRecord ?? 1))
              },0)`,
            }}
          >
            {AmountToastsForCurrentPeriodcurrentRecord}
          </div>
          <div>{'/'} </div>
          <div className={styles.allTimeRecord}> {allTimeRecord} </div>
        </div>
        <div className={styles.userResultContainer}>
          {displayUsersAndRecords}
        </div>
      </Board>
    );
  } else {
    return (
      <Board gridArea="results" title="Leaderboard">
        <div className={styles.noContentMessage}>
          There are no toasts made!!
        </div>
      </Board>
    );
  }
};
