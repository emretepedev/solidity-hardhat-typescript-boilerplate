// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// @TODO: console.log() remove in production
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FooToken is ERC20 {
    event ContractDeployed(address deployer, uint256 timestamp);

    error ValueNotPositive(string reason, uint256 value);

    modifier onlyPositive(uint256 value) {
        if (!(value > 0)) revert ValueNotPositive("Value must be greater than 0", value);
        _;
    }

    constructor(uint256 initialSupply) onlyPositive(initialSupply) ERC20("Foo Token", "FOO") {
        _mint(_msgSender(), initialSupply);

        /* solhint-disable-next-line not-rely-on-time */
        emit ContractDeployed(_msgSender(), block.timestamp);
    }

    function decimals() public pure override returns (uint8) {
        return 8;
    }
}
