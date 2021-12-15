// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Gamic = await hre.ethers.getContractFactory("Gamic");
  const gamic = await Gamic.deploy();

  await gamic.deployed();

  console.log("Gamic deployed to:", gamic.address);


  const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();

  // create Testdata
  const createLicenceTx1 = await gamic.mintLicence("Memory", "Memory AG", 1000000000000000, {value: 1000000000000});
  await createLicenceTx1.wait();
  const createLicenceTx2 = await gamic.connect(addr3).mintLicence("Call of Duty", "Activision", 3000000000000000, {value: 3000000000000});
  await createLicenceTx2.wait();
  const createLicenceTx3 = await gamic.mintLicence("Grand Theft Auto V", "Rockstar Games", 9000000000000000, {value: 9000000000000});
  await createLicenceTx3.wait();
  const createLicenceTx4 = await gamic.mintLicence("Tetris", "Alexei Paschitnow", 4000000000000000, {value: 4000000000000});
  await createLicenceTx4.wait();
  const createLicenceTx5 = await gamic.mintLicence("Pac-Man", "Namco", 7000000000000000, {value: 7000000000000});
  await createLicenceTx5.wait();
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
