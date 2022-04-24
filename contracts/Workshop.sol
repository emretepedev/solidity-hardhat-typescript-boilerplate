// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// @TODO: console.log() remove that before deployment
// import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ERC20 FooToken Contract
 * @author emretepedev
 * @notice The token which is one ERC20 standard
 * @custom:note This is an example workshop for a quick start
 * The goal is to provide diversity
 */
contract Workshop is Context {
    // usings
    using Counters for Counters.Counter;

    // enums
    enum Status {
        BeforeAll,
        StepOne,
        StepTwo,
        StepThree
    }

    // structs
    struct Foo {
        uint256 barId;
        string bar0;
        bool bar1;
        Status status;
    }

    struct Bar {
        Foo[] foos;
    }

    // mappings
    mapping(address => Bar) internal bars;

    // variables
    Counters.Counter private _barId;
    Bar[] internal bars_;

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

    constructor(uint256 initialSupply) onlyPositive(initialSupply) {
        /* solhint-disable-next-line not-rely-on-time */
        emit ContractDeployed(_msgSender(), block.timestamp);
    }

    /**
     * @notice Add the new Bar
     * @param bar0 String value to Bar
     * @param bar1 Boolean value to Bar
     */
    function addBar(string memory bar0, bool bar1) external {
        Bar storage bar = bars[_msgSender()];

        bar.foos.push(
            Foo({ barId: _barId.current(), bar0: bar0, bar1: bar1, status: Status.StepOne })
        );

        bars_.push(bar);

        _barId.increment();
    }

    /**
     * @notice Get the Bars
     */
    function getBars() external view returns (Bar[] memory) {
        return bars_;
    }

    /**
     * @notice Get the Foos of Bar
     * @param barId ID of the Bar
     */
    function getBarFoos(uint256 barId) external view returns (Foo[] memory) {
        return bars_[barId].foos;
    }

    /**
     * @notice Get the Foo of Bar
     * @param barId ID of the Bar
     * @param fooId ID of the Foo
     */
    function getBarFoo(uint256 barId, uint256 fooId) external view returns (Foo memory) {
        return bars_[barId].foos[fooId];
    }
}
