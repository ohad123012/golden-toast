export interface ToastType {
  id: string;
  userId: string;
  toastDate: Date;
  reason: string;
  drinks: string;
  foods: string;
  description: string;
  hasDone?: boolean;
}

export interface ToastHasDone {
  id: string;
  hasDone: boolean;
}
