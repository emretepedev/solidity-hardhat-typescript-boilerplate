// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// TODO: console.log() remove that before deployment
// import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Workshop Contract
 * @author <AUTHOR>
 * @notice The token which is one ERC20 standard.
 * @dev This is an example workshop for a quick start.
 * @custom:note The main goal is to provide diversity. There is no logic.
 */
contract Workshop is Context {
    // libraries
    using Address for address;
    using Counters for Counters.Counter;

    // enums
    enum Status {
        BeforeAll,
        StepOne,
        StepTwo,
        StepThree
    }

    // structs
    struct Bar {
        uint256 barId;
        Foo[] foos;
    }

    struct Foo {
        string name;
        bool telemetry;
        uint256[4] luckyNumbers;
        Status status;
    }

    // mappings
    mapping(address => Bar) private _userBar;

    // variables
    uint8 public constant MAX_FOO_NAME_LEN = 255;
    uint8 public constant MIN_FOO_NAME_LEN = 1;

    IERC20 public immutable token;

    Counters.Counter private _barId;
    Bar[] private _bars;

    // events
    /**
     * @notice This event is triggered when the bar added.
     * @dev Just emit only when the bar added.
     * @param name The name value of the Foo
     * @param telemetry Indicates whether it is accepted or not
     * @param luckyNumbers The lucky numbers of the Foo
     */
    event BarCreated(string name, bool telemetry, uint256[4] luckyNumbers, address indexed owner);

    // errors
    /**
     * @notice This error is triggered when the bar name is in an invalid range.
     * @dev minLength equals to MIN_FOO_NAME_LEN and maxLength equals to MAX_FOO_NAME_LEN.
     * @param reason The reason for the error
     * @param minLength Minimum accepted length
     * @param maxLength Maximum accepted length
     */
    error NameLengthError(string reason, uint8 minLength, uint8 maxLength);

    // modifiers
    modifier onlyFooNameLenInRange(uint256 nameLength) {
        if (MIN_FOO_NAME_LEN > nameLength || MAX_FOO_NAME_LEN < nameLength)
            revert NameLengthError({
                reason: "The name length must be in the range",
                minLength: MIN_FOO_NAME_LEN,
                maxLength: MAX_FOO_NAME_LEN
            });
        _;
    }

    // constructor
    constructor(address tokenAddress) {
        // solhint-disable-next-line reason-string
        require(tokenAddress.isContract(), "Address must be a Contract Address");

        token = IERC20(tokenAddress);
    }

    // write functions
    /**
     * @notice Add the new Bar.
     * @param name The name value of the Bar
     * @param telemetry Indicates whether it is accepted or not
     * @param luckyNumbers The lucky numbers of the Bar
     */
    function addBar(
        string memory name,
        bool telemetry,
        uint256[4] memory luckyNumbers
    ) external onlyFooNameLenInRange(bytes(name).length) {
        Bar storage bar = _userBar[_msgSender()];
        bar.barId = _barId.current();
        _barId.increment();

        bar.foos.push(Foo({ name: name, telemetry: telemetry, luckyNumbers: luckyNumbers, status: Status.StepOne }));

        _bars.push(bar);

        emit BarCreated({ name: name, telemetry: telemetry, luckyNumbers: luckyNumbers, owner: _msgSender() });
    }

    // read functions
    /**
     * @notice Get the Bars.
     * @return Gives all Bars
     */
    function getBars() external view returns (Bar[] memory) {
        return _bars;
    }

    /**
     * @notice Get the Foos of Bar.
     * @param barId ID of the Bar
     * @return Gives all Foos of the given Bar
     */
    function getBarFoos(uint256 barId) external view returns (Foo[] memory) {
        return _bars[barId].foos;
    }

    /**
     * @notice Get the Foo of Bar.
     * @param barId ID of the Bar
     * @param fooId ID of the Foo
     * @return Gives Foo of the given Bar
     */
    function getBarFoo(uint256 barId, uint256 fooId) external view returns (Foo memory) {
        return _bars[barId].foos[fooId];
    }
}
