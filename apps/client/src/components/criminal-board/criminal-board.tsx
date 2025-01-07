import { useGetAllCriminalsQuery } from '../../store';
import { Board } from '../board';
import { Criminal } from '../criminal';
import styles from './criminal-board.module.css';
export const CriminalBoard = () => {
  const { data: allCriminals } = useGetAllCriminalsQuery();

  return (
    <Board gridArea="criminals" title="Criminals">
      <div className={styles.criminalContainer}>
        {allCriminals ? (
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
