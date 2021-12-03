const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Gamic", function () {
    it("Should return the licence once a licence has been minted", async function () {
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        const Gamic = await ethers.getContractFactory("Gamic");
        const gamic = await Gamic.deploy();
        await gamic.deployed();

        // mint 3 Tokens
        const createLicenceTx1 = await gamic.mintLicence("MyGame_0", "Company", 10);
        await createLicenceTx1.wait();
        const createLicenceTx2 = await gamic.mintLicence("MyGame_1", "Company", 10);
        await createLicenceTx2.wait();
        const createLicenceTx3 = await gamic.mintLicence("MyGame_2", "Company", 10);
        await createLicenceTx3.wait();

        // Transfer Token 1 from owner to address 1
        const buyLicenceTx4 = await gamic.connect(addr1).buy(1, { value: 10 });
        await buyLicenceTx4.wait();
        const licencesOfAddr1 = await gamic.getLicesncesOfAddress(addr1.address);
        expect(licencesOfAddr1.length).to.equal(1);
        expect(licencesOfAddr1[0].tokenId).to.equal(1);

        // Transfer Token 2 from owner to address 2
        const buyLicenceTx5 = await gamic.connect(addr2).buy(2, { value: 10 });
        await buyLicenceTx5.wait();
        const licencesOfAddr2 = await gamic.getLicesncesOfAddress(addr2.address);
        expect(licencesOfAddr2.length).to.equal(1);
        expect(licencesOfAddr2[0].tokenId).to.equal(2);
    });
});
