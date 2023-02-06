/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { ActionSystem, ActionSystemInterface } from "../ActionSystem";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IWorld",
        name: "_world",
        type: "address",
      },
      {
        internalType: "address",
        name: "_components",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotTransitiveOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "arguments",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "useEntity",
            type: "uint256",
          },
          {
            internalType: "enum ActionEnum[2]",
            name: "actionTypes",
            type: "uint8[2]",
          },
        ],
        internalType: "struct ActionType[]",
        name: "actions",
        type: "tuple[]",
      },
    ],
    name: "executeTyped",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200120e3803806200120e8339810160408190526200003491620001a8565b81816200004133620000f7565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd9190620001e7565b600080546001600160a01b039283166001600160a01b0319918216179091556001805494909216931692909217909155506200020e915050565b60006200010e6200016b60201b620004b51760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b0381168114620001a557600080fd5b50565b60008060408385031215620001bc57600080fd5b8251620001c9816200018f565b6020840151909250620001dc816200018f565b809150509250929050565b600060208284031215620001fa57600080fd5b815162000207816200018f565b9392505050565b610ff0806200021e6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780631a9219b21461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004610a27565b6100cf565b6040516100719190610ada565b60405180910390f35b610064610088366004610b46565b6103bf565b6100956103f4565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c8366004610bbb565b610439565b005b60606000828060200190518101906100e79190610c29565b6000805491925033916101309073ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b18431066104d9565b9050600080546101559073ffffffffffffffffffffffffffffffffffffffff16610625565b600181111561016657610166610d2f565b146101d2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416374696f6e53797374656d3a20696e636f727265637420706861736500000060448201526064015b60405180910390fd5b600080546101f59073ffffffffffffffffffffffffffffffffffffffff16610631565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815233600482015290915063ffffffff82169073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561026a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061028e9190610d5e565b1061031b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416374696f6e53797374656d3a20616c7265616479206163746564207468697360448201527f20726f756e64000000000000000000000000000000000000000000000000000060648201526084016101c9565b6000546040517f8f37422400000000000000000000000000000000000000000000000000000000815273__$5070b677914a1c7873d62e9c7869a10915$__91638f374224916103869173ffffffffffffffffffffffffffffffffffffffff1690600190600401610db2565b60006040518083038186803b15801561039e57600080fd5b505af41580156103b2573d6000803e3d6000fd5b5050505050505050919050565b60606103eb83836040516020016103d7929190610ddc565b6040516020818303038152906040526100cf565b90505b92915050565b60006104347f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146104a9576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6104b28161063d565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610549573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261058f9190810190610e58565b905080516000036105fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016101c9565b61061d8160008151811061061257610612610ee9565b602002602001015190565b949350505050565b60006103ee8242610646565b60006103ee824261078f565b6104b2816108d4565b600080610673847f0f9dd24bbd2f19675b3fca355a567814eafa262312f033a2e289b40d70c055886104d9565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815261060d600482015273ffffffffffffffffffffffffffffffffffffffff9190911690630ff4c91690602401606060405180830381865afa1580156106e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107059190610f18565b8051909150831015610773576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f696e76616c696420617454696d6500000000000000000000000000000000000060448201526064016101c9565b80516000906107829085610f80565b50600092506103ee915050565b6000806107bc847f0f9dd24bbd2f19675b3fca355a567814eafa262312f033a2e289b40d70c055886104d9565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815261060d600482015273ffffffffffffffffffffffffffffffffffffffff9190911690630ff4c91690602401606060405180830381865afa15801561082a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061084e9190610f18565b80519091508310156108bc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f696e76616c696420626c6f636b2074696d65000000000000000000000000000060448201526064016101c9565b80516000906108cb9085610f80565b95945050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156109d2576109d2610980565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610a1f57610a1f610980565b604052919050565b60006020808385031215610a3a57600080fd5b823567ffffffffffffffff80821115610a5257600080fd5b818501915085601f830112610a6657600080fd5b813581811115610a7857610a78610980565b610aa8847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016109d8565b91508082528684828501011115610abe57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015610b0757858101830151858201604001528201610aeb565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b60008060208385031215610b5957600080fd5b823567ffffffffffffffff80821115610b7157600080fd5b818501915085601f830112610b8557600080fd5b813581811115610b9457600080fd5b866020606083028501011115610ba957600080fd5b60209290920196919550909350505050565b600060208284031215610bcd57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610bf157600080fd5b9392505050565b600067ffffffffffffffff821115610c1257610c12610980565b5060051b60200190565b600281106104b257600080fd5b60006020808385031215610c3c57600080fd5b825167ffffffffffffffff811115610c5357600080fd5b8301601f81018513610c6457600080fd5b8051610c77610c7282610bf8565b6109d8565b81815260609182028301840191848201919088841115610c9657600080fd5b938501935b83851015610d235780858a031215610cb35760008081fd5b610cbb6109af565b8551815289603f870112610ccf5760008081fd5b610cd76109af565b808388018c811115610ce95760008081fd5b8989015b81811015610d0d578051610d0081610c1c565b8452928a01928a01610ced565b5050828901525083529384019391850191610c9b565b50979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060208284031215610d7057600080fd5b5051919050565b60028110610dae577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b9052565b73ffffffffffffffffffffffffffffffffffffffff8316815260408101610bf16020830184610d77565b6020808252818101839052600090846040840183805b87811015610e4b5783358352848301858501835b6002811015610e35578135610e1a81610c1c565b610e248482610d77565b509187019190870190600101610e06565b5050506060938401939290920191600101610df2565b5090979650505050505050565b60006020808385031215610e6b57600080fd5b825167ffffffffffffffff811115610e8257600080fd5b8301601f81018513610e9357600080fd5b8051610ea1610c7282610bf8565b81815260059190911b82018301908381019087831115610ec057600080fd5b928401925b82841015610ede57835182529284019290840190610ec5565b979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060608284031215610f2a57600080fd5b6040516060810181811067ffffffffffffffff82111715610f4d57610f4d610980565b80604052508251815260208301516020820152604083015160ff81168114610f7457600080fd5b60408201529392505050565b818103818111156103ee577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212209cc181f96cf65616375f08cd2d95a66ec0603600886f8ca587d6a640a48f17a664736f6c63430008110033";

type ActionSystemConstructorParams =
  | [linkLibraryAddresses: ActionSystemLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ActionSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class ActionSystem__factory extends ContractFactory {
  constructor(...args: ActionSystemConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        ActionSystem__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: ActionSystemLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$5070b677914a1c7873d62e9c7869a10915\\$__", "g"),
      linkLibraryAddresses["src/libraries/LibAction.sol:LibAction"]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override deploy(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ActionSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<ActionSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): ActionSystem {
    return super.attach(address) as ActionSystem;
  }
  override connect(signer: Signer): ActionSystem__factory {
    return super.connect(signer) as ActionSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ActionSystemInterface {
    return new utils.Interface(_abi) as ActionSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ActionSystem {
    return new Contract(address, _abi, signerOrProvider) as ActionSystem;
  }
}

export interface ActionSystemLibraryAddresses {
  ["src/libraries/LibAction.sol:LibAction"]: string;
}
