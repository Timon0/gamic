import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SmartContractService } from './core/services/smart-contract.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    greeting = '';

    constructor(private smartContractService: SmartContractService) {}

    ngOnInit(): void {
        this.getGreeting();
    }

    async getGreeting() {
        this.greeting = await this.smartContractService.getGreeting();
    }

    async setGreeting(value: string) {
        await this.smartContractService.setGreeting(value);
        this.getGreeting();
    }
}
