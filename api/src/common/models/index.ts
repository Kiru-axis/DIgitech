export interface ICustomOrderItem {
  color: string;
  price: number;
  productId: string;
  quantity: number;
  title: string;
}

export interface IMailerOptions {
  subject: string;
  text: string;
  to: string;
  html: string;
}
