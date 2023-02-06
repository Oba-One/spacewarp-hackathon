/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { MoveSystem, MoveSystemInterface } from "../MoveSystem";

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
  "0x60806040523480156200001157600080fd5b5060405162000f4b38038062000f4b8339810160408190526200003491620001a8565b81816200004133620000f7565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd9190620001e7565b600080546001600160a01b039283166001600160a01b0319918216179091556001805494909216931692909217909155506200020e915050565b60006200010e6200016b60201b620004911760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b0381168114620001a557600080fd5b50565b60008060408385031215620001bc57600080fd5b8251620001c9816200018f565b6020840151909250620001dc816200018f565b809150509250929050565b600060208284031215620001fa57600080fd5b815162000207816200018f565b9392505050565b610d2d806200021e6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806309c5eabe146100465780638da5cb5b1461006f578063f2fde38b1461009c575b600080fd5b6100596100543660046109dc565b6100b1565b6040516100669190610a8f565b60405180910390f35b6100776103d0565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610066565b6100af6100aa366004610afb565b610415565b005b60005460609033906100f99073ffffffffffffffffffffffffffffffffffffffff167fb9bfb8acf34ca7217b5ac1c6a793f9e4861021d2abfc433087745a7c96f53d186104b5565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916826040518263ffffffff1660e01b815260040161013391815260200190565b602060405180830381865afa158015610150573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101749190610b38565b835160208501201461020d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603460248201527f436f6d6d69746d656e7420646f65736e2774206d6174636820746865206d6f7660448201527f65203a2070757368206e65787420726f756e642000000000000000000000000060648201526084015b60405180910390fd5b600080546102309073ffffffffffffffffffffffffffffffffffffffff16610603565b600181111561024157610241610b51565b036102ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603460248201527f4d6f766553797374656d3a2063616e6e6f7420636f6d706c657465206d6f766560448201527f20647572696e6720416374696f6e2054696d65640000000000000000000000006064820152608401610204565b600080546102f19073ffffffffffffffffffffffffffffffffffffffff1661060f565b60008054919250906103399073ffffffffffffffffffffffffffffffffffffffff167f2ae19d30110361513e7cc9a897749270168e7ed33bc82ef38ecbd0d3d2d5b0836104b5565b6040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810185905263ffffffff8416602482015290915073ffffffffffffffffffffffffffffffffffffffff821690631ab06ee590604401600060405180830381600087803b1580156103b057600080fd5b505af11580156103c4573d6000803e3d6000fd5b50505050505050919050565b60006104107f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610485576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61048e8161061b565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610525573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261056b9190810190610b80565b905080516000036105d8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f7420726567697374657265640000000000000000000000000000006044820152606401610204565b6105f9816000815181106105ee576105ee610c26565b602002602001015190565b9150505b92915050565b60006105fd8242610624565b60006105fd824261076d565b61048e816108b2565b600080610651847f0f9dd24bbd2f19675b3fca355a567814eafa262312f033a2e289b40d70c055886104b5565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815261060d600482015273ffffffffffffffffffffffffffffffffffffffff9190911690630ff4c91690602401606060405180830381865afa1580156106bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e39190610c55565b8051909150831015610751576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f696e76616c696420617454696d650000000000000000000000000000000000006044820152606401610204565b80516000906107609085610cbd565b50600092506105fd915050565b60008061079a847f0f9dd24bbd2f19675b3fca355a567814eafa262312f033a2e289b40d70c055886104b5565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815261060d600482015273ffffffffffffffffffffffffffffffffffffffff9190911690630ff4c91690602401606060405180830381865afa158015610808573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082c9190610c55565b805190915083101561089a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f696e76616c696420626c6f636b2074696d6500000000000000000000000000006044820152606401610204565b80516000906108a99085610cbd565b95945050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156109d4576109d461095e565b604052919050565b600060208083850312156109ef57600080fd5b823567ffffffffffffffff80821115610a0757600080fd5b818501915085601f830112610a1b57600080fd5b813581811115610a2d57610a2d61095e565b610a5d847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160161098d565b91508082528684828501011115610a7357600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015610abc57858101830151858201604001528201610aa0565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b600060208284031215610b0d57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610b3157600080fd5b9392505050565b600060208284031215610b4a57600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60006020808385031215610b9357600080fd5b825167ffffffffffffffff80821115610bab57600080fd5b818501915085601f830112610bbf57600080fd5b815181811115610bd157610bd161095e565b8060051b9150610be284830161098d565b8181529183018401918481019088841115610bfc57600080fd5b938501935b83851015610c1a57845182529385019390850190610c01565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060608284031215610c6757600080fd5b6040516060810181811067ffffffffffffffff82111715610c8a57610c8a61095e565b80604052508251815260208301516020820152604083015160ff81168114610cb157600080fd5b60408201529392505050565b818103818111156105fd577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220c690547a0d5afd715905a419eeceba13eb7a434275f46d3f3adf81b2bfcfa6c064736f6c63430008110033";

type MoveSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MoveSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MoveSystem__factory extends ContractFactory {
  constructor(...args: MoveSystemConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MoveSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<MoveSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): MoveSystem {
    return super.attach(address) as MoveSystem;
  }
  override connect(signer: Signer): MoveSystem__factory {
    return super.connect(signer) as MoveSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MoveSystemInterface {
    return new utils.Interface(_abi) as MoveSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MoveSystem {
    return new Contract(address, _abi, signerOrProvider) as MoveSystem;
  }
}
