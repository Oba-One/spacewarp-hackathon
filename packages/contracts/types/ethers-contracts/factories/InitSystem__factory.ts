/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { InitSystem, InitSystemInterface } from "../InitSystem";

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
        name: "",
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
  "0x60806040523480156200001157600080fd5b5060405162000e7a38038062000e7a8339810160408190526200003491620001a8565b81816200004133620000f7565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd9190620001e7565b600080546001600160a01b039283166001600160a01b0319918216179091556001805494909216931692909217909155506200020e915050565b60006200010e6200016b60201b620005c41760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b0381168114620001a557600080fd5b50565b60008060408385031215620001bc57600080fd5b8251620001c9816200018f565b6020840151909250620001dc816200018f565b809150509250929050565b600060208284031215620001fa57600080fd5b815162000207816200018f565b9392505050565b610c5c806200021e6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063e1df4ba6146100a7578063f2fde38b146100af575b600080fd5b61006461005f36600461086a565b6100c4565b6040516100719190610981565b60405180910390f35b6100826104e8565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b61006461052d565b6100c26100bd36600461099b565b610548565b005b60606000339050600060405180604001604052806040518060400160405280600a81526020017f5370696465724d616e310000000000000000000000000000000000000000000081525081526020016040518060400160405280600d81526020017f5370696465726d616e204f6e6500000000000000000000000000000000000000815250815250905060006040518060c00160405280609d8152602001610b8a609d91399050600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663614bfa6e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ff91906109d1565b6000549091506102459073ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b18431066105e8565b73ffffffffffffffffffffffffffffffffffffffff1663f419df7282846040518363ffffffff1660e01b815260040161027f9291906109ea565b600060405180830381600087803b15801561029957600080fd5b505af11580156102ad573d6000803e3d6000fd5b50506000546102f5925073ffffffffffffffffffffffffffffffffffffffff1690507faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c75406105e8565b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018390526024810187905273ffffffffffffffffffffffffffffffffffffffff9190911690631ab06ee590604401600060405180830381600087803b15801561036657600080fd5b505af115801561037a573d6000803e3d6000fd5b50506000546103c2925073ffffffffffffffffffffffffffffffffffffffff1690507f451428f4c68843403783cb59130cc0d615222b44098924139ac9012ac78cfbcd6105e8565b73ffffffffffffffffffffffffffffffffffffffff16636437197782856040518363ffffffff1660e01b81526004016103fc929190610a35565b600060405180830381600087803b15801561041657600080fd5b505af115801561042a573d6000803e3d6000fd5b5050600054610472925073ffffffffffffffffffffffffffffffffffffffff1690507f13f32cb89a86a373dc637b3b3ac445f7b735a976d40d242d8fb95792881bcb236105e8565b73ffffffffffffffffffffffffffffffffffffffff1663a235404482866040518363ffffffff1660e01b81526004016104ac929190610a4e565b600060405180830381600087803b1580156104c657600080fd5b505af11580156104da573d6000803e3d6000fd5b505050505050505050919050565b60006105287f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b604080516000815260208101909152606090610528906100c4565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146105b8576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105c181610738565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610658573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261069e9190810190610ab4565b9050805160000361070f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6107308160008151811061072557610725610b5a565b602002602001015190565b949350505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516105c1928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610862576108626107ec565b604052919050565b6000602080838503121561087d57600080fd5b823567ffffffffffffffff8082111561089557600080fd5b818501915085601f8301126108a957600080fd5b8135818111156108bb576108bb6107ec565b6108eb847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160161081b565b9150808252868482850101111561090157600080fd5b8084840185840137600090820190930192909252509392505050565b6000815180845260005b8181101561094357602081850181015186830182015201610927565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b602081526000610994602083018461091d565b9392505050565b6000602082840312156109ad57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461099457600080fd5b6000602082840312156109e357600080fd5b5051919050565b8281526040810160058310610a28577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8260208301529392505050565b828152604060208201526000610730604083018461091d565b8281526040602082015260008251604080840152610a6f608084018261091d565b905060208401517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0848303016060850152610aaa828261091d565b9695505050505050565b60006020808385031215610ac757600080fd5b825167ffffffffffffffff80821115610adf57600080fd5b818501915085601f830112610af357600080fd5b815181811115610b0557610b056107ec565b8060051b9150610b1684830161081b565b8181529183018401918481019088841115610b3057600080fd5b938501935b83851015610b4e57845182529385019390850190610b35565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfe68747470733a2f2f696d616765732e756e73706c6173682e636f6d2f70686f746f2d313633353830353733373730372d3537353838356162303832303f69786c69623d72622d342e302e3326697869643d4d6e77784d6a4133664442384d48787761473930627931775957646c66487838664756756644423866487838266175746f3d666f726d6174266669743d63726f7026773d36383726713d3830a2646970667358221220158ec5ba5a18b829522536825404685505a95b32da822382ef15e5f3e4cf344e64736f6c63430008110033";

type InitSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InitSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class InitSystem__factory extends ContractFactory {
  constructor(...args: InitSystemConstructorParams) {
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
  ): Promise<InitSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<InitSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): InitSystem {
    return super.attach(address) as InitSystem;
  }
  override connect(signer: Signer): InitSystem__factory {
    return super.connect(signer) as InitSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InitSystemInterface {
    return new utils.Interface(_abi) as InitSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InitSystem {
    return new Contract(address, _abi, signerOrProvider) as InitSystem;
  }
}
