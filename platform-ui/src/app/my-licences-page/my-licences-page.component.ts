import { Component, OnInit } from '@angular/core';
import { Licence } from '../core/models/licence.model';
import { SmartContractService } from '../core/services/smart-contract.service';

@Component({
    selector: 'app-my-licences-page',
    templateUrl: './my-licences-page.component.html',
    styleUrls: ['./my-licences-page.component.scss'],
})
export class MyLicencesPageComponent implements OnInit {
    licences!: Licence[];

    constructor(private smartContractService: SmartContractService) {}

    async ngOnInit() {
        this.licences = await this.smartContractService.getLicesncesOfAddress();
    }
}
