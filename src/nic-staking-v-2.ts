import {
  CreateNToken as CreateNTokenEvent,
  Initialized as InitializedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  SetStakableToken as SetStakableTokenEvent,
  SetUnStakable as SetUnStakableEvent,
  Staked as StakedEvent,
  StartStage as StartStageEvent,
  Unstaked as UnstakedEvent,
  Upgraded as UpgradedEvent,
  Withdraw as WithdrawEvent
} from "../generated/NicStakingV2/NicStakingV2"
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
} from "../generated/schema"

export function handleCreateNToken(event: CreateNTokenEvent): void {
  let entity = new CreateNToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.underlyingToken = event.params.underlyingToken
  entity.nToken = event.params.nToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetStakableToken(event: SetStakableTokenEvent): void {
  let entity = new SetStakableToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.isStakable = event.params.isStakable

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetUnStakable(event: SetUnStakableEvent): void {
  let entity = new SetUnStakable(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.isUnStakable = event.params.isUnStakable

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStaked(event: StakedEvent): void {
  let entity = new Staked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.staker = event.params.staker
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.epoch = event.params.epoch

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStartStage(event: StartStageEvent): void {
  let entity = new StartStage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.stageIndex = event.params.stageIndex
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnstaked(event: UnstakedEvent): void {
  let entity = new Unstaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.staker = event.params.staker
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.epoch = event.params.epoch

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.receiver = event.params.receiver
  entity.operator = event.params.operator
  entity.epoch = event.params.epoch

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
