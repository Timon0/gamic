//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Licence {
    uint256 tokenId;
    string game;
    string company;
    uint256 price;
    address creator;
}

contract Gamic is ERC721, Ownable {
    uint256 private tokenCounter;

    mapping(uint256 => string) private games;
    mapping(uint256 => string) private companies;
    mapping(uint256 => uint256) private prices;
    mapping(uint256 => address) private creator;

    constructor() ERC721("GAMIC", "GNFT") {
        tokenCounter = 0;
    }

    function buy(uint256 tokenId) public payable {
        uint price = prices[tokenId];
        require(price > 0, 'This token is not for sale');
        require(msg.value == price, 'Incorrect value');

        address seller = ownerOf(tokenId);
        _safeTransfer(seller, msg.sender, tokenId, "");
        prices[tokenId] = 0; // not for sale anymore
        payable(seller).transfer(msg.value - (msg.value/50)); // transfer 98% to seller
        payable(owner()).transfer(msg.value/50); // transfer 2% to owner of the smart contract
    }

    function mintLicence(string memory game, string memory company, uint256 price) public payable returns (uint256) {
        require(msg.value == price/1000, 'Incorrect value');

        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        payable(owner()).transfer(msg.value); // transfer 1 ‰ to owner of the smart contract

        games[newTokenId] = game;
        companies[newTokenId] = company;
        prices[newTokenId] = price;
        creator[newTokenId] = msg.sender;
        tokenCounter = tokenCounter + 1;

        return newTokenId;
    }

    function getLicesncesOfAddress(address userAddress) public view returns (Licence[] memory) {
        uint256 balanceOfAddress = balanceOf(userAddress);
        Licence[] memory userLicences = new Licence[](balanceOfAddress);
        uint256 counter = 0;
        for(uint256 i = 0; i < tokenCounter; i++) {
            if (ownerOf(i) == userAddress) {
                userLicences[counter] = Licence(i, games[i], companies[i], prices[i], creator[i]);
                counter++;
            }
        }
        return userLicences;
    }

    function getLicencesForSale() public view returns (Licence[] memory) {
        Licence[] memory licencesForSale = new Licence[](getLicenceForSaleCount());
        uint256 counter = 0;
        for(uint256 i = 0; i < tokenCounter; i++) {
            if (prices[i] > 0) {
                licencesForSale[counter] = Licence(i, games[i], companies[i], prices[i], creator[i]);
                counter++;
            }
        }
        return licencesForSale;
    }

    function getLicenceForSaleCount() private view returns (uint256) {
        uint256 counter = 0;
        for(uint256 i = 0; i < tokenCounter; i++) {
            if(prices[i] > 0) {
                counter++;
            }
        }
        return counter;
    }
}
