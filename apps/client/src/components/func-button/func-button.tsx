import styles from './func-button.module.css';

interface Props {
  Icon: React.ElementType;
  onClick?: () => void;
}

export const FuncButton: React.FC<Props> = ({ Icon, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>
        <Icon styles={styles.icon} />
      </button>
    </div>
  );
};
