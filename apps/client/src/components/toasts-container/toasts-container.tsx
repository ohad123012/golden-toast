import { FC } from 'react';
import { Board } from '../board';
import styles from './toasts-container.module.css';
import { Toast, ToastType } from '../toast';

export const ToastsContainer: FC = (PropsWithChildren) => {
  //every toast has an info button
  const mockToast: ToastType = {
    id: '11',
    userId: '22',
    toastDate: new Date('2024-12-31T22:00:00.000Z'),
    reason: 'hapoel got relegated',
    drinks: 'a lot',
    foods: 'everything',
    description: 'cool toast for us all',
    hasDone: true,
  };

  return (
    <Board gridArea="toasts" title="Toasts">
      <Toast toast={mockToast} />
      <Toast toast={mockToast} />
    </Board>
  );
};
