import { Component, OnInit } from '@angular/core';
import { Licence } from '../core/models/licence.model';
import { SmartContractService } from '../core/services/smart-contract.service';

@Component({
    selector: 'app-overview-page',
    templateUrl: './overview-page.component.html',
    styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
    licences!: Licence[];

    constructor(private smartContractService: SmartContractService) {}

    ngOnInit() {
        this.loadLicencesForSale();
    }

    async buy(licence: Licence) {
        await this.smartContractService.buyLicence(
            licence.tokenId,
            licence.price
        );
        this.loadLicencesForSale();
    }

    private async loadLicencesForSale() {
        this.licences = await this.smartContractService.getLicencesForSale();
    }
}
