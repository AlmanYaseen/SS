import { Story } from './story';

export interface Ssuser {
  id: number;
  userName: string,
  email: string;
  password: string;
  confirmPassword: string;
  dob: Date;

  stories: Story[];
}
