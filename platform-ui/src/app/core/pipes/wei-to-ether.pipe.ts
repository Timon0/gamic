import { Inject, Pipe, PipeTransform } from '@angular/core';
import Web3 from 'web3';
import { WEB3 } from '../web3.injection-token';

@Pipe({
    name: 'weiToEther',
})
export class WeiToEtherPipe implements PipeTransform {
    constructor(@Inject(WEB3) private web3: Web3) {}

    transform(value: number | undefined): string | undefined {
        if (value == undefined) {
            return undefined;
        }

        return this.web3.utils.fromWei(String(value));
    }
}
