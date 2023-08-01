import { Component, OnInit, Input } from '@angular/core';
import { Campaign, Product } from '../models/campaign.model';
import { CampaignService } from '../services/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignCreateComponent } from '../campaign-create/campaign-create.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  @Input()
  selectedProduct!: Product;

  @Input() selectedProductSubject!: Subject<Product>;

  campaigns: Campaign[] = [];

  tableHeaders: string[] = [
    'name',
    'keywords',
    'bid amount',
    'campaign Fund',
    'status',
    'town',
    'radius[km]',
  ];

  totalCampaignFund: number = 0;

  constructor(
    private campaignService: CampaignService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reloadList();
    this.selectedProductSubject.subscribe((selectedProduct: Product) => {
      this.campaigns = this.campaignService.getCampaignsForProduct(
        selectedProduct.id
      );
    });
    this.totalCampaignFund = this.campaigns.reduce(
      (sum, campaign) => sum + campaign.campaignFund,
      0
    );
  }

  createCampaign(): void {
    const dialogRef = this.dialog.open(CampaignCreateComponent, {
      data: { action: 'create', product: this.selectedProduct },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reloadList();
    });
  }

  editCampaign(campaign: Campaign): void {
    const dialogRef = this.dialog.open(CampaignCreateComponent, {
      data: { action: 'edit', campaign, product: this.selectedProduct },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reloadList();
    });
  }

  deleteCampaign(id: number): void {
    this.campaignService.deleteCampaign(id);
    this.campaigns = this.campaignService.getCampaigns();
    this.reloadList();
  }

  reloadList(): void {
    this.campaigns = this.campaignService.getCampaignsForProduct(
      this.selectedProduct.id
    );
  }
}
