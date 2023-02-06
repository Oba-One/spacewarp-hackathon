// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/LeagueFactory.sol";
import "../src/Squad.sol";

contract DeployScript is Script {
    struct BuildSquad {
        string name;
        string description;
    }
    
    uint nonce;

    function random() internal returns (uint) {
        uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % 90;
        nonce++;
        return randomnumber;
    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("FVM_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        LeagueFactory leagueFactory = new LeagueFactory();
        address leagueAddress = leagueFactory.createLeague("wefa", "Water Earth Fire Air nothing can compare", 4);
        League WefaLeague = League(leagueAddress);

        address[2] memory waterSquadMembers = [
            0xcB70d72bD1190e39710994F89514A0c4E69CA225, // Oba Water
            0x6Bd018B28CE7016b65384e15faC102dbC4190E03 // Deployer
        ];
        address[2] memory earthSquadMembers = [
            0xF7C274CA349536CCb5B5522efE58F18d7eC7fD91, // Oba Earth
            0x01B2686Bd146bFc3F4B3DD6F7F86f26ac7c2f7Fd // Oba
        ];
        address[2] memory fireSquadMembers = [
            0x8920eD7151223bF3210F008d73cA606EB3937F7F, // Oba Fire    
            0xccD10CA66b99051fDb0cc25f02FC014006555d66 // Freeport Afo
        ];
        address[2] memory airSquadMembers = [
            0xb826d91278c64BEa2C1afb707aab41E86D978736, // Oba Air
            0xD9baE4D90eED460F0A5B1b22a589A987E7f54763 // Freeport Oba
        ];

        // TODO: Add deployment of Element league with 4 squads
        // TODO: Use whitelist of address to add members to suads and generate match results
        // TODO: Creata an initial proposal
        BuildSquad[4] memory squads = [
            BuildSquad("water", "Water is the coldest"),
            BuildSquad("earth", "Earth is the hardest"),
            BuildSquad("fire", "Fire is the hottest"),
            BuildSquad("air", "Air is the lightest")
        ];

        for (uint256 index = 0; index < squads.length; index++) {
            address squadAddress =  WefaLeague.createSquad(squads[index].name, squads[index].description, "", "");
            WefaLeague.enterLeague(squadAddress);


            if (index == 0) {
                for (uint256 i = 0; i < waterSquadMembers.length; i++) {
                    WefaLeague.addMemberToSquad(squadAddress, waterSquadMembers[i], random());
                    Squad squadContract = Squad(squadAddress);

                    Asset[12] memory waterAssets = [
                        Asset("QmV5FZ65pSq8f3wLuVxy6dyYeJXR7L3HJxujsV1ad5tuUb", 1, Rank.Diamond),
                        Asset("QmdXT7QQBrcvteebd7wEz2F9RJRbQBE6PzBDrkNq4dPfJC", 2, Rank.Platinum),
                        Asset("Qme4M7CiWn5ybxUxzvYCA851xshAE4u5rw4Pj7etsDBf7J", 3, Rank.Platinum),
                        Asset("QmVEsUnw1KHtNk81yN6aqWMSwtotz8rSZrwAu5z56rGddK", 4, Rank.Gold),
                        Asset("QmaDSdQTTQwxzYkATv1izh9FE3v2DEhVm4MqvJJLNJBi7u", 5, Rank.Gold),
                        Asset("QmSKtKpQssqUjG8ZdFQ5ZoybAFrUiof2boti6q5XD2MRF1", 6, Rank.Gold),
                        Asset("QmdwUZSVmRx6KeEoSkT7RSVkWtfRZAekHvNeaBVJJxkbW9", 7, Rank.Silver),
                        Asset("QmY9xUbEDtYLHcXRj1UQWw1hfS75bFZ1qdCntYjCGxii3g", 8, Rank.Silver),
                        Asset("Qme4M7CiWn5ybxUxzvYCA851xshAE4u5rw4Pj7etsDBf7J", 9, Rank.Silver),
                        Asset("QmP78diCD1qLAeNe6WScMGfESUqYQMDjN2CGGbD5csrQPG", 10, Rank.Bronze),
                        Asset("QmNUgcxjVwcmVCXzD39XuKk8j1RdJzeHg5ez1jLNTR7dFy", 11, Rank.Bronze),
                        Asset("QmVP1owy23PwJ67mgvh6Uy4JHnhBRwYEuC8FjuUXJnL7dj", 12, Rank.Bronze)
                    ];

                    for (uint256 j = 0; j < waterAssets.length; j++) {
                        squadContract.updateAsset(waterAssets[j].assetId, waterAssets[j].rank, waterAssets[j].uri);
                    }

                    squadContract.proposeUpdate(waterAssets[2].assetId, "Lets swap Namor for Tchalla", "QmQDdXVMUfsct3eDzw85mMcTq5rJ5TW3TRZzZ9bheE3HTq");
                }
            }
            if (index == 1) {
                Asset[12] memory earthAssets = [
                    Asset("QmPb271d6uuwBFA3j4tuTLt9KVtmV67vQVVuEyZf2BDBuU", 1, Rank.Diamond),
                    Asset("QmXxHggF5eTwAF1wP1qkJWvDpHiVREUjLF9iwdEd2ftuka", 2, Rank.Platinum),
                    Asset("QmQDdXVMUfsct3eDzw85mMcTq5rJ5TW3TRZzZ9bheE3HTq", 3, Rank.Platinum),
                    Asset("QmSrey9PwVDBAXL63VM3dG9DqX8yV4uxxQeh1sdCwE5nrd", 4, Rank.Gold),
                    Asset("QmPDsNehHPdb5SPWR3vRgukkWL5mJJdwSMaXA4LzB6jRUJ", 5, Rank.Gold),
                    Asset("QmeeiPNbG89Hk33By4L9hMm54aqfUn5FrA1kq3Q7zfj6Db", 6, Rank.Gold),
                    Asset("QmWY1ofTPTfxAdvHaMLwCgn4h6rLczfEVtdZU5zNCjPiUE", 7, Rank.Silver),
                    Asset("QmYbRVbXjdUF1AceDVCHCCY5HE7mDVM5gS8dL7jPjxx2AR", 8, Rank.Silver),
                    Asset("QmUH5N2NskvqU8Tmd486PbvvpVFY3FNtagC6YmahofHpZa", 9, Rank.Silver),
                    Asset("QmWFtozjHAuE7DAs58HrKd8rwvkwQvkrwkKVt93u6Ek7s4", 10, Rank.Bronze),
                    Asset("QmatK1JVhYkoFG4py5aJxHhwuFYVPWJpCC5gwwQmVRhNGs", 11, Rank.Bronze),
                    Asset("QmTA8bqkYFp2LneAxkSs36MKGCoCYsWQPWCSQpmEnGU2cZ", 12, Rank.Bronze)
                ];

                for (uint256 i = 0; i < earthSquadMembers.length; i++) {
                    WefaLeague.addMemberToSquad(squadAddress, earthSquadMembers[i], random());
                    Squad squadContract = Squad(squadAddress);

                    for (uint256 j = 0; j < earthAssets.length; j++) {
                        squadContract.updateAsset(earthAssets[j].assetId, earthAssets[j].rank, earthAssets[j].uri);
                    }
               
                    squadContract.proposeUpdate(earthAssets[8].assetId, "Lets swap Captain America for cyclops", "QmVEsUnw1KHtNk81yN6aqWMSwtotz8rSZrwAu5z56rGddK");
                }
            }
            if (index == 2) {
                Asset[12] memory fireAssets = [
                    Asset("QmfCUo7wkTFvhcq7nQWez1hWGwshjrDmeMmcA3MM8BPh3T", 1, Rank.Diamond),
                    Asset("QmQ7YQtv9aV8xhk1TAUmhDycwkVx4Kzm9jZn8xNvTCsxkN", 2, Rank.Platinum),
                    Asset("QmVhNgfcM7ejUHztKHqAgJpezmM6aJQ364R8mmHAbbxezY", 3, Rank.Platinum),
                    Asset("QmPKqQRSKUSsw7CSDVk9mVrtksdeK5mzyvgMLfmzKNh6ZQ", 4, Rank.Gold),
                    Asset("QmPaHN9HdeW3EtRCMQw7NZYQYoCCvLDoc7sZMQFQZT2bER", 5, Rank.Gold),
                    Asset("QmWZUX2XkYTt3GcQmrY3pcR5UzxLFWKUAoyTPwoyCCm1eQ", 6, Rank.Gold),
                    Asset("QmZTmZ573EPN4Nsfgi24WN5YsEnDojz63UHNmdG8jvpb8c", 7, Rank.Silver),
                    Asset("QmUwfKkMsSHkjGRy73u4UJJgvKFTc8Zcp9RPmFDuMfzAuD", 8, Rank.Silver),
                    Asset("QmdMQGqr6bUmfrVNnPPtHjwNb8SBxZa4xWqGzkfweNxMKG", 9, Rank.Silver),
                    Asset("QmcAipoMGQxUrkjvgyxB3sV7Y2etbs23uxfNWDkQFjkQHq", 10, Rank.Bronze),
                    Asset("QmRbqeqtTiNVhr71eV637r7SWEAugUqma5M6EHqWFTPaGd", 11, Rank.Bronze),
                    Asset("QmX4AByqQktcrvc4RzM4cpQA9np8cP8RMFubcLty6d9YBL", 12, Rank.Bronze)
                ];

                for (uint256 i = 0; i < fireSquadMembers.length; i++) {
                    WefaLeague.addMemberToSquad(squadAddress, fireSquadMembers[i], random());
                    Squad squadContract = Squad(squadAddress);
                    
                    for (uint256 j = 0; j < fireAssets.length; j++) {
                        squadContract.updateAsset(fireAssets[j].assetId, fireAssets[j].rank, fireAssets[j].uri);
                    }
               
                     squadContract.proposeUpdate(fireAssets[10].assetId, "Lets swap punisher for Magneto", "QmPeftXiRhwSBmmSqw4wujm4KXD7o7BswsWt8LQgXTrfou");
                }
            }
            if (index == 3) {
                Asset[12] memory airAssets = [
                    Asset("QmPeftXiRhwSBmmSqw4wujm4KXD7o7BswsWt8LQgXTrfou", 1, Rank.Diamond),
                    Asset("QmbcKJvZbgnUWuE28wZ89fiPHad7FhXTuGM39L2HDBkxpE", 2, Rank.Platinum),
                    Asset("QmaeCTXfr21TQsEF4wcsUkPnhWFBx9FUKm1yQadxquJGcE", 3, Rank.Platinum),
                    Asset("QmQSsuVKUpuwedxK3fxFBsQVM3DgQCTJwk8L57kA6P9YVj", 4, Rank.Gold),
                    Asset("QmNyDMsrup9CZqF3HUQqfciBJqxBXeMKLaRdMdByS5UpCs", 5, Rank.Gold),
                    Asset("QmZmSEeP8FquHR7tcTr1c476vcGjFieCoSZRpg4YzM9JAg", 6, Rank.Gold),
                    Asset("QmaSkJpBWLtZfNCYyxBv4AVnaEybwQSre3xbQi7LiuPtV1", 7, Rank.Silver),
                    Asset("QmPVTatRYvcY4JJyioJNYdrWZQS48RUkobhUdNVmyqmybX", 8, Rank.Silver),
                    Asset("QmUhevMgF18eFx5cf1erQVYCjnxZ3wJ23wT86qtWnMyDdS", 9, Rank.Silver),
                    Asset("QmYqGdi2okEf8BCWejF1n8roeHTt7wHWA6iKK3EYwotvGH", 10, Rank.Bronze),
                    Asset("QmZwNTcJUqghctvngV3NSc4izgaUwfzK4qhwKqk9wpDG5H", 11, Rank.Bronze),
                    Asset("QmUbdQA5dg9ZwAb1VGoSmVQ3z3AsCoq6FSmcqDFic3e9fZ", 12, Rank.Bronze)
                ];

                for (uint256 i = 0; i < airSquadMembers.length; i++) {
                    WefaLeague.addMemberToSquad(squadAddress, airSquadMembers[i], random());
                    Squad squadContract = Squad(squadAddress);
                    
                    for (uint256 j = 0; j < airAssets.length; j++) {
                        squadContract.updateAsset(airAssets[j].assetId, airAssets[j].rank, airAssets[j].uri);
                    }

                    squadContract.proposeUpdate(airAssets[3].assetId, "Lets swap Scarlett Witch for Agatha Harkness", "agatha harkness");
                }
            }            
        }




        vm.stopBroadcast();
        vm.broadcast();

    }

}
