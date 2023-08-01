import { Campaign, Product } from '../models/campaign.model';

export const mockInitialCampaignData: Campaign[] = [
  {
    uuid: '1',
    name: 'Campaign 1',
    keywords: 'camp 1',
    productId: '1',
    bidAmount: 1000,
    campaignFund: 1200,
    status: 'on',
    town: 'krakow',
    radius: 1,
  },
  {
    uuid: '2',
    name: 'Campaign 2',
    keywords: 'camp 2',
    productId: '2',
    bidAmount: 2000,
    campaignFund: 2200,
    status: 'off',
    town: 'wroclaw',
    radius: 30,
  },
  {
    uuid: '3',
    name: 'Campaign 3',
    keywords: 'camp 3',
    productId: '1',
    bidAmount: 2000,
    campaignFund: 1200,
    status: 'off',
    town: 'wroclaw',
    radius: 30,
  },
  {
    uuid: '4',
    name: 'Campaign 4',
    keywords: 'camp 4',
    productId: '3',
    bidAmount: 2000,
    campaignFund: 2200,
    status: 'off',
    town: 'krakow',
    radius: 30,
  },
];

export const mockInitialProductData: Product[] = [
  {
    uuid: '1',
    name: 'Product 1',
    campaignFund: 5000,
    description: 'super nice product',
  },
  {
    uuid: '2',
    name: 'Product 2',
    campaignFund: 3000,
    description: 'nice product',
  },
  {
    uuid: '3',
    name: 'Product 3',
    campaignFund: 10000,
    description: 'the best product',
  },
];
