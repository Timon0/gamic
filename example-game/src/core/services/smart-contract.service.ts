import { Inject, Injectable } from '@angular/core';
import Web3 from 'web3';
import { Licence } from '../models/licence.model';
import { WEB3 } from '../web3.injection-token';

const ContractABI = require("../../../../../blockchain/artifacts/contracts/Gamic.sol/Gamic.json");

@Injectable({
    providedIn: 'root',
})
export class SmartContractService {

    private static readonly ADRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    private contract: any;

    constructor(@Inject(WEB3) private web3: Web3) {
        this.contract = new this.web3.eth.Contract(ContractABI.abi, SmartContractService.ADRESS);
    }

    async getLicenceCount(): Promise<number> {
        return await this.contract.methods.getLicenceCount().call();
    }

    async getLicesncesOfAddress(): Promise<Licence[]> {
        await (window as any).ethereum.enable();
        const accounts = await this.web3.eth.getAccounts();
        return this.contract.methods.getLicesncesOfAddress(accounts[0]).call();
    }

    async getLicencesForSale(): Promise<Licence[]> {
        return await this.contract.methods.getLicencesForSale().call();
    }

    async mintLicence(game: string, company: string, price: number): Promise<number> {
        await (window as any).ethereum.enable();
        const accounts = await this.web3.eth.getAccounts();
        return this.contract.methods.mintLicence(company, game, price).send({from: accounts[0]});
    }

    async buyLicence(tokenId: number, price: number): Promise<number> {
        await (window as any).ethereum.enable();
        const accounts = await this.web3.eth.getAccounts();
        return this.contract.methods.buy(tokenId).send({from: accounts[0], value: price});
    }
}
