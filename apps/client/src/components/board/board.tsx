import { PropsWithChildren } from 'react';
import styles from './board.module.css';
interface Props {
  title?: string;
  gridArea?: string;
}
export const Board: React.FC<Props & PropsWithChildren> = ({
  gridArea,
  title,
  children,
}) => {
  return (
    <div className={styles.board} style={{ gridArea }}>
      <div className={styles.title}>{title}</div>

      {children}
    </div>
  );
};
