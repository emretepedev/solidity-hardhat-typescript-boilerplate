// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// @TODO: console.log() remove that before deployment
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ERC20 FooToken Contract
 * @author @emretepedev
 * @notice The token which is one ERC20 standard
 * @custom:note This is an example workshop for a quick start
 */
contract FooToken is ERC20 {
    /**
     * @notice This event is triggered when the contract is deployed
     * @dev This event will trigger only once
     * @param deployer The address of the contract deployer
     * @param timestamp The timestamp when the contract was deployed
     */
    event ContractDeployed(address deployer, uint256 timestamp);

    error ValueNotPositive(string reason);

    modifier onlyPositive(uint256 value) {
        if (!(value > 0)) revert ValueNotPositive("Value must be greater than 0");
        _;
    }

    constructor(uint256 initialSupply) onlyPositive(initialSupply) ERC20("Foo Token", "FOO") {
        _mint(_msgSender(), initialSupply);

        /* solhint-disable-next-line not-rely-on-time */
        emit ContractDeployed(_msgSender(), block.timestamp);
    }

    /**
     * @return The decimals of the token
     * @inheritdoc ERC20
     */
    function decimals() public pure override returns (uint8) {
        return 8;
    }
}
