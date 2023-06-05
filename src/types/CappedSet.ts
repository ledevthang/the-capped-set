/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface CappedSetInterface extends utils.Interface {
  contractName: "CappedSet";
  functions: {
    "getValue(address)": FunctionFragment;
    "insert(address,uint256)": FunctionFragment;
    "numElements()": FunctionFragment;
    "remove(address)": FunctionFragment;
    "removeAddr(address)": FunctionFragment;
    "update(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "getValue", values: [string]): string;
  encodeFunctionData(
    functionFragment: "insert",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "numElements",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "remove", values: [string]): string;
  encodeFunctionData(functionFragment: "removeAddr", values: [string]): string;
  encodeFunctionData(
    functionFragment: "update",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "getValue", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "insert", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numElements",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "remove", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeAddr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "update", data: BytesLike): Result;

  events: {
    "AddressInserted(address,uint256,address,uint256)": EventFragment;
    "AddressRemoved(address,address,uint256)": EventFragment;
    "AddressUpdated(address,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddressInserted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AddressRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AddressUpdated"): EventFragment;
}

export type AddressInsertedEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  {
    addr: string;
    value: BigNumber;
    newLowestAddress: string;
    newLowestValue: BigNumber;
  }
>;

export type AddressInsertedEventFilter = TypedEventFilter<AddressInsertedEvent>;

export type AddressRemovedEvent = TypedEvent<
  [string, string, BigNumber],
  { addr: string; newLowestAddress: string; newLowestValue: BigNumber }
>;

export type AddressRemovedEventFilter = TypedEventFilter<AddressRemovedEvent>;

export type AddressUpdatedEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  {
    addr: string;
    newValue: BigNumber;
    newLowestAddress: string;
    newLowestValue: BigNumber;
  }
>;

export type AddressUpdatedEventFilter = TypedEventFilter<AddressUpdatedEvent>;

export interface CappedSet extends BaseContract {
  contractName: "CappedSet";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CappedSetInterface;

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
    getValue(addr: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    insert(
      addr: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    numElements(overrides?: CallOverrides): Promise<[BigNumber]>;

    remove(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeAddr(
      _addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    update(
      addr: string,
      newVal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getValue(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

  insert(
    addr: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  numElements(overrides?: CallOverrides): Promise<BigNumber>;

  remove(
    addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeAddr(
    _addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  update(
    addr: string,
    newVal: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getValue(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    insert(
      addr: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;

    numElements(overrides?: CallOverrides): Promise<BigNumber>;

    remove(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;

    removeAddr(_addr: string, overrides?: CallOverrides): Promise<void>;

    update(
      addr: string,
      newVal: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;
  };

  filters: {
    "AddressInserted(address,uint256,address,uint256)"(
      addr?: string | null,
      value?: null,
      newLowestAddress?: string | null,
      newLowestValue?: null
    ): AddressInsertedEventFilter;
    AddressInserted(
      addr?: string | null,
      value?: null,
      newLowestAddress?: string | null,
      newLowestValue?: null
    ): AddressInsertedEventFilter;

    "AddressRemoved(address,address,uint256)"(
      addr?: string | null,
      newLowestAddress?: string | null,
      newLowestValue?: null
    ): AddressRemovedEventFilter;
    AddressRemoved(
      addr?: string | null,
      newLowestAddress?: string | null,
      newLowestValue?: null
    ): AddressRemovedEventFilter;

    "AddressUpdated(address,uint256,address,uint256)"(
      addr?: string | null,
      newValue?: null,
      newLowestAddress?: string | null,
      newLowestValue?: null
    ): AddressUpdatedEventFilter;
    AddressUpdated(
      addr?: string | null,
      newValue?: null,
      newLowestAddress?: string | null,
      newLowestValue?: null
    ): AddressUpdatedEventFilter;
  };

  estimateGas: {
    getValue(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    insert(
      addr: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    numElements(overrides?: CallOverrides): Promise<BigNumber>;

    remove(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeAddr(
      _addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    update(
      addr: string,
      newVal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getValue(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    insert(
      addr: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    numElements(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    remove(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeAddr(
      _addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    update(
      addr: string,
      newVal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}