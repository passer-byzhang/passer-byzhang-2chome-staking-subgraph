import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  CreateNToken,
  Initialized,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SetStakableToken,
  SetUnStakable,
  Staked,
  StartStage,
  Unstaked,
  Upgraded,
  Withdraw
} from "../generated/NicStakingV2/NicStakingV2"

export function createCreateNTokenEvent(
  underlyingToken: Address,
  nToken: Address
): CreateNToken {
  let createNTokenEvent = changetype<CreateNToken>(newMockEvent())

  createNTokenEvent.parameters = new Array()

  createNTokenEvent.parameters.push(
    new ethereum.EventParam(
      "underlyingToken",
      ethereum.Value.fromAddress(underlyingToken)
    )
  )
  createNTokenEvent.parameters.push(
    new ethereum.EventParam("nToken", ethereum.Value.fromAddress(nToken))
  )

  return createNTokenEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createSetStakableTokenEvent(
  token: Address,
  isStakable: boolean
): SetStakableToken {
  let setStakableTokenEvent = changetype<SetStakableToken>(newMockEvent())

  setStakableTokenEvent.parameters = new Array()

  setStakableTokenEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  setStakableTokenEvent.parameters.push(
    new ethereum.EventParam(
      "isStakable",
      ethereum.Value.fromBoolean(isStakable)
    )
  )

  return setStakableTokenEvent
}

export function createSetUnStakableEvent(
  token: Address,
  isUnStakable: boolean
): SetUnStakable {
  let setUnStakableEvent = changetype<SetUnStakable>(newMockEvent())

  setUnStakableEvent.parameters = new Array()

  setUnStakableEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  setUnStakableEvent.parameters.push(
    new ethereum.EventParam(
      "isUnStakable",
      ethereum.Value.fromBoolean(isUnStakable)
    )
  )

  return setUnStakableEvent
}

export function createStakedEvent(
  staker: Address,
  token: Address,
  amount: BigInt,
  epoch: BigInt
): Staked {
  let stakedEvent = changetype<Staked>(newMockEvent())

  stakedEvent.parameters = new Array()

  stakedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("epoch", ethereum.Value.fromUnsignedBigInt(epoch))
  )

  return stakedEvent
}

export function createStartStageEvent(
  stageIndex: BigInt,
  startTime: BigInt,
  endTime: BigInt
): StartStage {
  let startStageEvent = changetype<StartStage>(newMockEvent())

  startStageEvent.parameters = new Array()

  startStageEvent.parameters.push(
    new ethereum.EventParam(
      "stageIndex",
      ethereum.Value.fromUnsignedBigInt(stageIndex)
    )
  )
  startStageEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  startStageEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return startStageEvent
}

export function createUnstakedEvent(
  staker: Address,
  token: Address,
  amount: BigInt,
  epoch: BigInt
): Unstaked {
  let unstakedEvent = changetype<Unstaked>(newMockEvent())

  unstakedEvent.parameters = new Array()

  unstakedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam("epoch", ethereum.Value.fromUnsignedBigInt(epoch))
  )

  return unstakedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createWithdrawEvent(
  token: Address,
  amount: BigInt,
  receiver: Address,
  operator: Address,
  epoch: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("epoch", ethereum.Value.fromUnsignedBigInt(epoch))
  )

  return withdrawEvent
}
