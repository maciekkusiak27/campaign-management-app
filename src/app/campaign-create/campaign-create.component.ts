import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss'],
})
export class CampaignCreateComponent {
  isEdition: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CampaignCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, //any
    public formService: FormService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data.action === 'edit') {
      this.isEdition = true;
      this.formService.campaignForm.patchValue({ ...this.data.campaign });
    } else {
      this.formService.campaignForm.reset();
      this.formService.campaignForm.patchValue({
        keywords: this.data.product.name,
      });
    }
  }

  onSubmit(): void {
    this.dialogRef.close();
    if (this.isEdition) this.formService.onEdit(this.data.product.uuid);
    else this.formService.onCreate(this.data.product.uuid);
  }
}
