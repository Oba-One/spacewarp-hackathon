/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface LibQueryInterface extends utils.Interface {
  functions: {
    "arrayToList(uint256[])": FunctionFragment;
    "listToArray(bytes32,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "arrayToList" | "listToArray"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "arrayToList",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "listToArray",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "arrayToList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listToArray",
    data: BytesLike
  ): Result;

  events: {};
}

export interface LibQuery extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LibQueryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    arrayToList(
      array: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[string] & { list: string }>;

    listToArray(
      list: PromiseOrValue<BytesLike>,
      length: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { array: BigNumber[] }>;
  };

  arrayToList(
    array: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<string>;

  listToArray(
    list: PromiseOrValue<BytesLike>,
    length: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  callStatic: {
    arrayToList(
      array: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<string>;

    listToArray(
      list: PromiseOrValue<BytesLike>,
      length: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;
  };

  filters: {};

  estimateGas: {
    arrayToList(
      array: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listToArray(
      list: PromiseOrValue<BytesLike>,
      length: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    arrayToList(
      array: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listToArray(
      list: PromiseOrValue<BytesLike>,
      length: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
