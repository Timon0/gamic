import { Component, OnInit } from '@angular/core';
import { SmartContractService } from './core/services/smart-contract.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isAuthorized = false;

    constructor(private smartContract: SmartContractService) {}

    async ngOnInit() {
        this.isAuthorized = await this.smartContract.hasNecessaryToken();
    }
}
