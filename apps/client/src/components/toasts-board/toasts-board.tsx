import { FC } from 'react';
import { Board } from '../board';
import { Toast } from '../toast';
import { ToastType } from '../../store';

export const ToastsBoard: FC = (PropsWithChildren) => {
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
      <Toast toast={mockToast} />
      <Toast toast={mockToast} />
      <Toast toast={mockToast} />
      <Toast toast={mockToast} />
      <Toast toast={mockToast} />
    </Board>
  );
};
