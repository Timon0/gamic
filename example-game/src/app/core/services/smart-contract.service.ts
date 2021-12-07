import { Inject, Injectable } from '@angular/core';
import { Licence } from '../models/licence.model';
import Web3 from 'web3';
import { WEB3 } from '../web3.injection-token';

const ContractABI = require('../../../../../blockchain/artifacts/contracts/Gamic.sol/Gamic.json');

@Injectable({
    providedIn: 'root',
})
export class SmartContractService {
    private static readonly CONTRACT_ADDRESS =
        '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    private static readonly CREATOR_OF_TOKEN =
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

    private contract: any;

    constructor(@Inject(WEB3) private web3: Web3) {
        this.contract = new this.web3.eth.Contract(
            ContractABI.abi,
            SmartContractService.CONTRACT_ADDRESS
        );
    }

    async hasNecessaryToken() {
        await (window as any).ethereum.enable();
        const accounts = await this.web3.eth.getAccounts();
        const licences: Licence[] = await this.contract.methods
            .getLicesncesOfAddress(accounts[0])
            .call();
        return !!licences.find(
            (licence) =>
                licence.creator === SmartContractService.CREATOR_OF_TOKEN
        );
    }
}
