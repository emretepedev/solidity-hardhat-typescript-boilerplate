// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Foo721 is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_SUPPLY = 100;
    uint256 public constant FREE_MINT_COUNT = 5;
    uint256 public constant MINT_PRICE = 0.001 ether;
    // solhint-disable-next-line var-name-mixedcase
    uint256 public immutable MINT_DATE;

    mapping(address => bool) public freeMinted;

    string public baseURI;

    error InsufficientFunds();
    error MaxSupplyExceeded();
    error AlreadyFreeMinted();
    error FreeMintExceeded();
    error TransferTxError();
    error InvalidDate();

    event FreeMinted(address minter);

    //solhint-disable-next-line
    constructor(uint256 mintDate) ERC721("Foo721", "F721") {
        MINT_DATE = mintDate;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint(address to, uint256 quantity) external payable {
        // solhint-disable-next-line not-rely-on-time
        if (block.timestamp < MINT_DATE) revert InvalidDate();

        if (totalSupply() + quantity > MAX_SUPPLY) revert MaxSupplyExceeded();

        if (msg.value < MINT_PRICE * quantity) revert InsufficientFunds();

        for (uint256 index = 0; index < quantity; ) {
            _tokenIdCounter.increment();

            _safeMint(to, _tokenIdCounter.current());

            unchecked {
                ++index;
            }
        }
    }

    function freeMint(address to) external {
        if (_tokenIdCounter.current() >= FREE_MINT_COUNT)
            revert FreeMintExceeded();
        if (freeMinted[to]) revert AlreadyFreeMinted();

        freeMinted[to] = true;
        _tokenIdCounter.increment();

        _safeMint(to, _tokenIdCounter.current());

        emit FreeMinted(to);
    }

    function withdraw() external {
        // solhint-disable-next-line avoid-low-level-calls
        (bool isSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");

        if (!isSuccess) revert TransferTxError();
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        ERC721Enumerable._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return ERC721Enumerable.supportsInterface(interfaceId);
    }
}
