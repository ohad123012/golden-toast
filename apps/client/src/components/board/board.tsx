import styles from './board.module.css';

interface Props {
  title?: string;
  gridArea: string;
}

export const Board: React.FC<Props> = ({ gridArea, title }) => {
  return (
    <div className={styles.board} style={{ gridArea }}>
      {title}
    </div>
  );
};
