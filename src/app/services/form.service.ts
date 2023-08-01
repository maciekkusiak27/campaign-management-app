import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Campaign } from '../models/campaign.model';
import { CampaignService } from './campaign.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  newCampaign: Campaign = {
    uuid: '0',
    name: '',
    keywords: '',
    productId: '1',
    bidAmount: 0,
    campaignFund: 0,
    status: 'off',
    radius: 0,
  };

  campaignForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService
  ) {
    this.initForm();
  }

  initForm(): void {
    this.campaignForm = this.formBuilder.group({
      uuid: [''],
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: [0, [Validators.required, Validators.min(0)]],
      campaignFund: [0, [Validators.required, Validators.min(0)]],
      status: ['off', Validators.required],
      town: [''],
      radius: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onEdit(productUuid: string): void {
    if (this.campaignForm.valid) {
      const formData: Campaign = this.campaignForm.value;
      this.campaignService.updateCampaignForProduct(formData, productUuid);
    }
  }

  onCreate(productUuid: string): void {
    if (this.campaignForm.valid) {
      const formData: Campaign = this.campaignForm.value;
      this.campaignService.createCampaignForProduct(formData, productUuid);
    }
  }
}
