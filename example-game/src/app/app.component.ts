import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SmartContractService } from './core/services/smart-contract.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    isAuthorized: boolean | null = null;

    constructor(private smartContract: SmartContractService) {}

    async ngAfterViewInit() {
        this.isAuthorized = await this.smartContract.hasNecessaryToken();
        this.loadScript();
    }

    public loadScript() {
        let node = document.createElement('script');
        node.src = '/assets/mini-memory.min.js';
        node.type = 'text/javascript';
        node.async = true;
        document.getElementsByTagName('head')[0].appendChild(node);
    }
}
