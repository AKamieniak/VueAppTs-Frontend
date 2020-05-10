import { IErrorResponse } from '@/interfaces/error-response.interface';

export interface IGlobalsState {
  loading: boolean;
  language: string;
  errors: IErrorResponse[];
}
