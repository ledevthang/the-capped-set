// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CappedSet {
    // Variable zone
    uint256 public numElements;
    address[] private addrTracking;
    mapping(address => uint256) private cappedSet;
    mapping(address => bool) private addrExists;

    // Event zone
    event AddressInserted(
        address indexed addr,
        uint256 value,
        address indexed newLowestAddress,
        uint256 newLowestValue
    );
    event AddressUpdated(
        address indexed addr,
        uint256 newValue,
        address indexed newLowestAddress,
        uint256 newLowestValue
    );
    event AddressRemoved(
        address indexed addr,
        address indexed newLowestAddress,
        uint256 newLowestValue
    );

    constructor(uint256 _numElements) {
        numElements = _numElements;
    }

    // Modifier zone
    modifier addressExists(address addr) {
        require(addrExists[addr], "Address doesn't exist");
        _;
    }

    // Function zone
    function insert(
        address addr,
        uint256 value
    ) external returns (address, uint256) {
        require(addr != address(0), "Invalid address");
        require(!addrExists[addr], "Address already exists");

        uint256 addrCount = addrTracking.length;

        // Max numElements
        if (addrCount == numElements) {
            (address lowestAddress, ) = getLowest();
            delete cappedSet[lowestAddress];
            delete addrExists[lowestAddress];
            removeAddr(lowestAddress);
            emit AddressRemoved(lowestAddress, addr, value);
        }

        // Insert element
        addrTracking.push(addr);
        cappedSet[addr] = value;
        addrExists[addr] = true;

        // Return the lowest element
        (address newLowestAddress, uint256 newLowestValue) = getLowest();
        emit AddressInserted(addr, value, newLowestAddress, newLowestValue);

        return (newLowestAddress, newLowestValue);
    }

    function update(
        address addr,
        uint256 newVal
    ) external addressExists(addr) returns (address, uint256) {
        // Update element
        cappedSet[addr] = newVal;

        // Return the lowest element
        (address newLowestAddress, uint256 newLowestValue) = getLowest();
        emit AddressUpdated(addr, newVal, newLowestAddress, newLowestValue);

        return (newLowestAddress, newLowestValue);
    }

    function remove(
        address addr
    ) external addressExists(addr) returns (address, uint256) {
        // Remove element
        delete cappedSet[addr];
        delete addrExists[addr];
        removeAddr(addr);

        // Return the lowest element
        (address newLowestAddress, uint256 newLowestValue) = getLowest();
        emit AddressRemoved(addr, newLowestAddress, newLowestValue);

        return (newLowestAddress, newLowestValue);
    }

    function removeAddr(address _addr) public {
        uint256 len = addrTracking.length;

        for (uint256 i = 0; i < len; i++) {
            if (addrTracking[i] == _addr) {
                addrTracking[i] = addrTracking[len - 1];
                addrTracking.pop();
                break;
            }
        }
    }

    function getValue(
        address addr
    ) external view addressExists(addr) returns (uint256) {
        return cappedSet[addr];
    }

    function getLowest() private view returns (address, uint256) {
        uint256 len = addrTracking.length;

        if (len == 1) {
            return (address(0), 0);
        }

        address lowestAddr = addrTracking[0];
        uint256 lowestValue = cappedSet[lowestAddr];

        for (uint256 i = 1; i < len; i++) {
            address addr = addrTracking[i];
            uint256 value = cappedSet[addr];

            if (value <= lowestValue) {
                lowestAddr = addr;
                lowestValue = value;
            }
        }

        return (lowestAddr, lowestValue);
    }
}
