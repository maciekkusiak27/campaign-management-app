export interface Campaign {
  id: number;
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
  id: string;
  name: string;
  description: string;
  campaignFund: number;
}
