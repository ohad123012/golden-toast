import styles from './action-icon-button.module.css';
interface Props {
  Icon: React.ElementType;
  onClick?: () => void;
}

export const ActionIconButton: React.FC<Props> = ({ Icon, onClick }) => {
  return (
    <button onClick={onClick}>
      <Icon styles={styles.icon} />
    </button>
  );
};
