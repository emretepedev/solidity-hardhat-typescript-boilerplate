// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FooToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Foo Token", "FOO") {
        _mint(_msgSender(), initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 1;
    }
}
