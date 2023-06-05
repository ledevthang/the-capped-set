import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { CappedSet } from "../../src/types/CappedSet";
import { CappedSet__factory } from "../../src/types/factories/CappedSet__factory";

task("deploy:CappedSet")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const cappedSetFactory: CappedSet__factory = <CappedSet__factory>(
      await ethers.getContractFactory("CappedSet")
    );
    const gasPrice = await cappedSetFactory.signer.getGasPrice();
    console.log(`Current gas price: ${gasPrice}`);

    const estimatedGas = await cappedSetFactory.signer.estimateGas(
      cappedSetFactory.getDeployTransaction(3),
    );
    console.log(`Estimated gas: ${estimatedGas}`);
    const deploymentPrice = gasPrice.mul(estimatedGas);
    const deployerBalance = await cappedSetFactory.signer.getBalance();
    console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
    console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);


    const mintedGemPayment: CappedSet = <CappedSet>(
      await cappedSetFactory.deploy(3)
    );
    await mintedGemPayment.deployed();
    console.log("CappedSet deployed to: ", mintedGemPayment.address);
  });
