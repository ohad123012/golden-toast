import { useGetAllCriminalsQuery } from '../../store';
import { Board } from '../board';
import { Criminal } from '../criminal';
import styles from './criminal-board.module.css';
export const CriminalBoard = () => {
  const { data: allCriminals } = useGetAllCriminalsQuery();
  if (!allCriminals) {
    return;
  }
  const areThereNoCriminals = allCriminals.length !== 0;
  return (
    <Board gridArea="criminals" title="Criminals">
      <div className={styles.criminalContainer}>
        {areThereNoCriminals ? (
          allCriminals.map((criminal) => {
            return <Criminal criminal={criminal} />;
          })
        ) : (
          <div className={styles.noCriminalsMessage}>
            there are no criminals!!
          </div>
        )}
      </div>
    </Board>
  );
};
