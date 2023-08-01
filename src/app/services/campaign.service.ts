import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign.model';
import { mockInitialCampaignData } from '../mock/mock.data';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private readonly storageKey = 'campaigns';

  constructor() {
    const initialData: Campaign[] = mockInitialCampaignData;

    const campaignsJson = localStorage.getItem(this.storageKey);
    if (!campaignsJson) {
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
  }

  getCampaigns(): Campaign[] {
    const campaignsJson = localStorage.getItem(this.storageKey);
    return campaignsJson ? JSON.parse(campaignsJson) : [];
  }

  getCampaignsForProduct(productId: string): Campaign[] {
    const campaigns = this.getCampaigns();
    return campaigns.filter((campaign) => campaign.productId === productId);
  }

  saveCampaigns(campaigns: Campaign[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(campaigns));
  }

  createCampaignForProduct(campaign: Campaign, productId: string): void {
    campaign.id = Date.now();
    const campaigns = this.getCampaigns();
    campaign.productId = productId;
    campaigns.push(campaign);
    this.saveCampaigns(campaigns);
  }

  updateCampaignForProduct(campaign: Campaign, productId: string): void {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex(
      (c) => c.id === campaign.id && c.productId === productId
    );
    if (index !== -1) {
      campaign.productId = productId;
      campaigns[index] = campaign;
      this.saveCampaigns(campaigns);
    }
  }

  deleteCampaign(id: number): void {
    const campaigns = this.getCampaigns().filter(
      (campaign) => campaign.id !== id
    );
    this.saveCampaigns(campaigns);
  }
}
