import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign.model';
import { mockInitialCampaignData } from '../mock/mock.data';
import * as uuid from 'uuid';

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

  getCampaignsForProduct(productUuid: string): Campaign[] {
    const campaigns = this.getCampaigns();
    return campaigns.filter((campaign) => campaign.productId === productUuid);
  }

  saveCampaigns(campaigns: Campaign[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(campaigns));
  }

  createCampaignForProduct(campaign: Campaign, productId: string): void {
    campaign.uuid = uuid.v4();
    const campaigns = this.getCampaigns();
    campaign.productId = productId;
    campaigns.push(campaign);
    this.saveCampaigns(campaigns);
  }

  updateCampaignForProduct(campaign: Campaign, productUuid: string): void {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex(
      (c) => c.uuid === campaign.uuid && c.productId === productUuid
    );
    if (index !== -1) {
      campaign.productId = productUuid;
      campaigns[index] = campaign;
      this.saveCampaigns(campaigns);
    }
  }

  deleteCampaign(uuid: string): void {
    const campaigns = this.getCampaigns().filter(
      (campaign) => campaign.uuid !== uuid
    );
    this.saveCampaigns(campaigns);
  }
}
