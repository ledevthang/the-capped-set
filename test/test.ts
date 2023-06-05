import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
describe('CappedSet', () => {
  let cappedSet: any;
  let accounts: Signer[];

  beforeEach(async () => {
    const CappedSet = await ethers.getContractFactory('CappedSet');
    cappedSet = await CappedSet.deploy(3);
    await cappedSet.deployed();

    accounts = await ethers.getSigners();
  });

  it('Should add a new element and return the new lowest element', async () => {
    const addr1 = await accounts[0].getAddress();
    const addr2 = await accounts[1].getAddress();

    // Insert the first element
    await cappedSet.insert(addr1, 5);

    // Insert the second element
    const insertTx = await cappedSet.insert(addr2, 10);
    const insertTxReceipt = await insertTx.wait();

    // Return the lowest element
    const { newLowestAddress, newLowestValue } = insertTxReceipt.events[0].args;
    expect(newLowestAddress).to.equal(addr1);
    expect(newLowestValue).to.equal(5);
  });

  it('Should remove an existing element and return the new lowest element', async () => {
    const addr1 = await accounts[0].getAddress();
    const addr2 = await accounts[1].getAddress();
    const addr3 = await accounts[2].getAddress();

    // Insert three elements
    await cappedSet.insert(addr1, 10);
    await cappedSet.insert(addr2, 5);
    await cappedSet.insert(addr3, 8);

    // Remove the second element
    const removeTx = await cappedSet.remove(addr2);
    const removeTxReceipt = await removeTx.wait();
    const { newLowestAddress, newLowestValue } =
      removeTxReceipt.events[0].args;

    // Return the lowest element
    expect(newLowestAddress).to.equal(addr3);
    expect(newLowestValue).to.equal(8);
  });

  it('Should update an existing element and return the new lowest element', async () => {
    const addr1 = await accounts[0].getAddress();
    const addr2 = await accounts[1].getAddress();

    // Insert two elements
    await cappedSet.insert(addr1, 10);
    await cappedSet.insert(addr2, 5);

    // Update the first element's value (10 -> 3)
    const updateTx = await cappedSet.update(addr1, 3);
    const updateTxReceipt = await updateTx.wait();
    const { newValue, newLowestAddress, newLowestValue } =
      updateTxReceipt.events[0].args;

    // Check the new value and return the lowest element
    expect(newValue).to.equal(3);
    expect(newLowestAddress).to.equal(addr1);
    expect(newLowestValue).to.equal(3);
  });

  it("should boot out the element with the lowest value when the set reaches its max", async function () {
    const addr1 = await accounts[0].getAddress();
    const addr2 = await accounts[1].getAddress();
    const addr3 = await accounts[2].getAddress();
    const addr4 = await accounts[3].getAddress();

    // Insert three elements
    await cappedSet.insert(addr1, 10);
    await cappedSet.insert(addr2, 20);
    await cappedSet.insert(addr3, 15);

    // The set is full with addresses [addr1, addr2, addr3]
    const insertTx = await cappedSet.insert(addr4, 5);
    const insertTxReceipt = await insertTx.wait();
    const { newLowestAddress, newLowestValue } =
      insertTxReceipt.events[0].args;

    // After inserting addr4, the element with the lowest value (addr1 with value 10) should be removed
    await expect(cappedSet.getValue(addr1)).to.be.revertedWith("Address doesn't exist");
    
    // Now the lowest element is the addr4 with the value 5
    expect(newLowestAddress).to.equal(addr4);
    expect(newLowestValue).to.equal(5);
  });

  it('Should return (0, 0) when inserting the first element', async () => {
    const addr = await accounts[0].getAddress();

    // Insert element
    const firstInsertTx = await cappedSet.insert(addr, 5);
    const firstInsertTxReceipt = await firstInsertTx.wait();
    const { newLowestAddress, newLowestValue } =
      firstInsertTxReceipt.events[0].args;

    // Return (0,0)
    expect(newLowestAddress).to.equal(ethers.constants.AddressZero);
    expect(newLowestValue).to.equal(0);
  });

  it('Should revert when retrieving the value for a non-existing element', async () => {
    const nonExistingAddr = '0x0000000000000000000000000000000000000001';
    await expect(cappedSet.getValue(nonExistingAddr)).to.be.revertedWith("Address doesn't exist");
  });
});
