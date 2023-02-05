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
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
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
  "0x60806040523480156200001157600080fd5b50604051620019d7380380620019d78339810160408190526200003491620001a8565b81816200004133620000f7565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd9190620001e7565b600080546001600160a01b039283166001600160a01b0319918216179091556001805494909216931692909217909155506200020e915050565b60006200010e6200016b60201b620002031760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b0381168114620001a557600080fd5b50565b60008060408385031215620001bc57600080fd5b8251620001c9816200018f565b6020840151909250620001dc816200018f565b809150509250929050565b600060208284031215620001fa57600080fd5b815162000207816200018f565b9392505050565b6117b9806200021e6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780633e991df31461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f36600461118c565b6100cf565b60405161007191906112a3565b60405180910390f35b6100646100883660046112bd565b610110565b610095610142565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c83660046112d6565b610187565b005b60606000828060200190518101906100e7919061130c565b90506100f281610227565b60006100fd82610327565b90506101098183610531565b5050919050565b606061013c8260405160200161012891815260200190565b6040516020818303038152906040526100cf565b92915050565b60006101827f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146101f7576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61020081610a8d565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6000805461026b9073ffffffffffffffffffffffffffffffffffffffff167f0f9dd24bbd2f19675b3fca355a567814eafa262312f033a2e289b40d70c05588610a96565b6040805160608101825260008152600160208201908152600582840190815292517f66c52bed0000000000000000000000000000000000000000000000000000000081526004810187905291516024830152516044820152905160ff16606482015290915073ffffffffffffffffffffffffffffffffffffffff8216906366c52bed90608401600060405180830381600087803b15801561030b57600080fd5b505af115801561031f573d6000803e3d6000fd5b505050505050565b60008061033333610be6565b6040805160808101825260088183019081527f506c617965722031000000000000000000000000000000000000000000000000606083015281528151808301909252601b82527f546865206f6e652077686f20637265617465207468652067616d650000000000602083810191909152810191909152600054919250906103f09073ffffffffffffffffffffffffffffffffffffffff167f13f32cb89a86a373dc637b3b3ac445f7b735a976d40d242d8fb95792881bcb23610a96565b73ffffffffffffffffffffffffffffffffffffffff1663a235404483836040518363ffffffff1660e01b815260040161042a929190611325565b600060405180830381600087803b15801561044457600080fd5b505af1158015610458573d6000803e3d6000fd5b50506000546104a0925073ffffffffffffffffffffffffffffffffffffffff1690507faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540610a96565b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018490526024810186905273ffffffffffffffffffffffffffffffffffffffff9190911690631ab06ee590604401600060405180830381600087803b15801561051157600080fd5b505af1158015610525573d6000803e3d6000fd5b50939695505050505050565b6105a3826040518060400160405280600c81526020017f74686520696e66696e6175740000000000000000000000000000000000000000815250604051806060016040528060358152602001611535603591396040518060600160405280602e81526020016115f4602e913985610c04565b610615826040518060400160405280600e81526020017f616d65726963612063686176657a0000000000000000000000000000000000008152506040518060800160405280604e8152602001611736604e91396040518060600160405280602e81526020016116ac602e913985610c04565b610687826040518060400160405280600581526020017f6e616d6f720000000000000000000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e81526020016116da602e913985610c04565b6106f9826040518060400160405280600781526020017f6379636c6f7073000000000000000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e815260200161156a602e913985610c04565b61076b826040518060400160405280600b81526020017f626c7565206d617276656c0000000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e81526020016115c6602e913985610c04565b6107dd826040518060400160405280600581526020017f62656173740000000000000000000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e8152602001611622602e913985610c04565b61084f826040518060400160405280601081526020017f6d69737465722066616e746173746963000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e815260200161167e602e913985610c04565b6108c1826040518060400160405280600581526020017f73687572690000000000000000000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e8152602001611708602e913985610c04565b610933826040518060400160405280600681526020017f6963656d616e00000000000000000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e81526020016114c5602e913985610c04565b6109a5826040518060400160405280600c81526020017f6e69676874637261776c657200000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e8152602001611598602e913985610c04565b610a17826040518060400160405280600581526020017f726f6775650000000000000000000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e8152602001611650602e913985610c04565b610a89826040518060400160405280600881526020017f6d797374697175650000000000000000000000000000000000000000000000008152506040518060800160405280604281526020016114f3604291396040518060600160405280602e81526020016116da602e913985610c04565b5050565b61020081611062565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610b06573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610b4c919081019061138b565b90508051600003610bbd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b610bde81600081518110610bd357610bd3611431565b602002602001015190565b949350505050565b600073ffffffffffffffffffffffffffffffffffffffff821661013c565b604080518082018252858152602080820186905260015483517f614bfa6e00000000000000000000000000000000000000000000000000000000815293519293600093849373ffffffffffffffffffffffffffffffffffffffff9093169263614bfa6e92600480820193918290030181865afa158015610c88573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cac919061130c565b600054909150610cf29073ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b1843106610a96565b73ffffffffffffffffffffffffffffffffffffffff1663f419df7282846040518363ffffffff1660e01b8152600401610d2c929190611460565b600060405180830381600087803b158015610d4657600080fd5b505af1158015610d5a573d6000803e3d6000fd5b5050600054610da2925073ffffffffffffffffffffffffffffffffffffffff1690507faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540610a96565b6040517f1ab06ee500000000000000000000000000000000000000000000000000000000815260048101839052602481018a905273ffffffffffffffffffffffffffffffffffffffff9190911690631ab06ee590604401600060405180830381600087803b158015610e1357600080fd5b505af1158015610e27573d6000803e3d6000fd5b5050600054610e6f925073ffffffffffffffffffffffffffffffffffffffff1690507f451428f4c68843403783cb59130cc0d615222b44098924139ac9012ac78cfbcd610a96565b73ffffffffffffffffffffffffffffffffffffffff16636437197782876040518363ffffffff1660e01b8152600401610ea99291906114ab565b600060405180830381600087803b158015610ec357600080fd5b505af1158015610ed7573d6000803e3d6000fd5b5050600054610f1f925073ffffffffffffffffffffffffffffffffffffffff1690507f13f32cb89a86a373dc637b3b3ac445f7b735a976d40d242d8fb95792881bcb23610a96565b73ffffffffffffffffffffffffffffffffffffffff1663a235404482856040518363ffffffff1660e01b8152600401610f59929190611325565b600060405180830381600087803b158015610f7357600080fd5b505af1158015610f87573d6000803e3d6000fd5b5050600054610fcf925073ffffffffffffffffffffffffffffffffffffffff1690507fe072768ea94af234cff732de41ecf093d211b11aaa861f67f6545a1a1a35a4ea610a96565b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018390526024810186905273ffffffffffffffffffffffffffffffffffffffff9190911690631ab06ee590604401600060405180830381600087803b15801561104057600080fd5b505af1158015611054573d6000803e3d6000fd5b505050505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156111845761118461110e565b604052919050565b6000602080838503121561119f57600080fd5b823567ffffffffffffffff808211156111b757600080fd5b818501915085601f8301126111cb57600080fd5b8135818111156111dd576111dd61110e565b61120d847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160161113d565b9150808252868482850101111561122357600080fd5b8084840185840137600090820190930192909252509392505050565b6000815180845260005b8181101561126557602081850181015186830182015201611249565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b6020815260006112b6602083018461123f565b9392505050565b6000602082840312156112cf57600080fd5b5035919050565b6000602082840312156112e857600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146112b657600080fd5b60006020828403121561131e57600080fd5b5051919050565b8281526040602082015260008251604080840152611346608084018261123f565b905060208401517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0848303016060850152611381828261123f565b9695505050505050565b6000602080838503121561139e57600080fd5b825167ffffffffffffffff808211156113b657600080fd5b818501915085601f8301126113ca57600080fd5b8151818111156113dc576113dc61110e565b8060051b91506113ed84830161113d565b818152918301840191848101908884111561140757600080fd5b938501935b838510156114255784518252938501939085019061140c565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b828152604081016005831061149e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8260208301529392505050565b828152604060208201526000610bde604083018461123f56fe516d5650316f7779323350774a36376d677668365579344a486e684252775945754338466a7555584a6e4c37646a4e616d6f722069732061204d617276656c20636861726163746572206d6f737420726563656e746c79207365656e20696e2057616b616e646120466f72657665722e54686520496e66696e6175742069732061204d617276656c20636861726163746572206e6f74206b6e6f776e206279206d616e792e516d564573556e77314b48744e6b3831794e366171574d5377746f747a3872535a72774175357a3536724764644b516d4e556763786a5677636d5643587a44333958754b6b386a3152644a7a65486735657a316a4c4e545237644679516d614453645154545177787a596b41547631697a68394645337632444568566d344d71764a4a4c4e4a42693775516d5635465a3635705371386633774c7556787936647959654a5852374c33484a78756a73563161643574755562516d6477555a53566d5278364b65456f536b54375253566b577466525a41656b48764e656142564a4a786b625739516d5037386469434431714c41654e65365753634d47664553557159514d446a4e32434747624435637372515047516d534b744b7051737371556a47385a644651355a6f796241467255696f6632626f74693671355844324d524631516d6458543751514272637674656562643777457a324639524a526251424536507a4244726b4e71346450664a43516d65344d374369576e3579627855787a765943413835317873684145347535727734506a37657473444266374a516d5939785562454474594c486358526a315551577731686653373562465a317164436e74596a43477869693367416d65726963612043686176657a2069732061204d617276656c20636861726163746572206d6f7374206b6e6f776e20666f72206865722074696d6520696e2074686520556c74696d617465732ea264697066735822122057577cba014f800ae63d89bdc41a74a6bc58af999862dbd8562cf0beffecb7d564736f6c63430008110033";

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
