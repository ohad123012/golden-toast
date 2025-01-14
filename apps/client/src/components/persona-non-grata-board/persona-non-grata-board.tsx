import { useGetAllPersonaNonGrataQuery } from '../../store';
import { Board } from '../board';
import { PersonaNonGrata } from '../persona-non-grata';

import styles from './persona-non-grata-board.module.css';
export const PersonaNonGrataBoard = () => {
  const { data: allPersonaNonGrata } = useGetAllPersonaNonGrataQuery();
  if (!allPersonaNonGrata) {
    return;
  }
  const areThereNoPersona = allPersonaNonGrata.length !== 0;

  return (
    <Board gridArea="personaNonGrata" title="Persona non grata">
      <div className={styles.personaNonGrataContainer}>
        {areThereNoPersona ? (
          allPersonaNonGrata.map((personaNonGrata) => {
            return <PersonaNonGrata persona={personaNonGrata} />;
          })
        ) : (
          <div className={styles.noPersonNonGrataMessage}>
            There are no persona non grata!!
          </div>
        )}
      </div>
    </Board>
  );
};
