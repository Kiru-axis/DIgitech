export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile?: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
}
