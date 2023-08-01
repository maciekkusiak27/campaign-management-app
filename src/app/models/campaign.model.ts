export interface Campaign {
  uuid: string;
  name: string;
  productId: string;
  keywords: string;
  bidAmount: number;
  campaignFund: number;
  status: 'on' | 'off';
  town?: string;
  radius: number;
}

export interface Product {
  uuid: string;
  name: string;
  description: string;
  campaignFund: number;
}
