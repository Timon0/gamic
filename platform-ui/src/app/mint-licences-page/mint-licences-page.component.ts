import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmartContractService } from '../core/services/smart-contract.service';

@Component({
    selector: 'app-mint-licences-page',
    templateUrl: './mint-licences-page.component.html',
    styleUrls: ['./mint-licences-page.component.scss'],
})
export class MintLicencesPageComponent {

    form: FormGroup;

    constructor(private smartContract: SmartContractService, private formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            company: this.formBuilder.control('', Validators.required),
            game: this.formBuilder.control('', Validators.required),
            price: this.formBuilder.control(null, Validators.required)
        });
    }

    async mintLicence() {
        if(!this.form.valid) {
            return;
        }

        const game = this.form.controls['game'].value;
        const company = this.form.controls['company'].value;
        const price = this.form.controls['price'].value;
        await this.smartContract.mintLicence(game, company, price);
        this.form.reset();
    }
}
