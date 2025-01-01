// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/Timers.sol";

contract $Timers {
    bytes32 public constant __hh_exposed_bytecode_marker = "hardhat-exposed";

    mapping(uint256 => Timers.BlockNumber) internal $v_Timers_BlockNumber;

    constructor() payable {
    }

    function $get(Timers.BlockNumber calldata timer) external pure returns (uint256 ret0) {
        (ret0) = Timers.get(timer);
    }

    function $set(uint256 timer,uint256 timestamp) external payable {
        Timers.set($v_Timers_BlockNumber[timer],timestamp);
    }

    function $reset(uint256 timer) external payable {
        Timers.reset($v_Timers_BlockNumber[timer]);
    }

    function $isUnset(Timers.BlockNumber calldata timer) external pure returns (bool ret0) {
        (ret0) = Timers.isUnset(timer);
    }

    function $isStarted(Timers.BlockNumber calldata timer) external pure returns (bool ret0) {
        (ret0) = Timers.isStarted(timer);
    }

    function $isPending(Timers.BlockNumber calldata timer) external view returns (bool ret0) {
        (ret0) = Timers.isPending(timer);
    }

    function $isExpired(Timers.BlockNumber calldata timer) external view returns (bool ret0) {
        (ret0) = Timers.isExpired(timer);
    }

    receive() external payable {}
}
