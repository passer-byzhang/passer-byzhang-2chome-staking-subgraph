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
  Withdraw as WithdrawEvent,
  NicStakingV2
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
  Withdraw,
  EntitiesCount,
  EventCount,
  StakeAmount
} from "../generated/schema"
import {Bytes,BigInt, ethereum} from '@graphprotocol/graph-ts'
import {EPOCHTIME} from "./config"

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
  let contract = NicStakingV2.bind(event.address)
  entity.stage = event.params.stage
  const startTime = contract.stages(event.params.stage).value0
  if(startTime==BigInt.fromI32(0)||event.block.timestamp<startTime){
    entity.epoch = BigInt.fromI32(0)
  }else{
    entity.epoch = event.block.timestamp.minus(startTime).div(EPOCHTIME).plus(BigInt.fromI32(1))
  }
  //call the contract's method stages

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  const stakeCount = updateEntitiesCount("staked")
  const unstakedCount = getEntitiesCount("unstaked")
  updateEventCount(event,event.block.timestamp,stakeCount,unstakedCount)
  updateStakeAmount(event,event.params.staker,event.params.token,event.params.amount,true)

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

  entity.startEpoch =  BigInt.fromI32(1)
  entity.endEpoch = event.params.endTime.minus(event.params.startTime).div(EPOCHTIME).plus(BigInt.fromI32(1))

  entity.save()
}

export function handleUnstaked(event: UnstakedEvent): void {
  let entity = new Unstaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.staker = event.params.staker
  entity.token = event.params.token
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  const unstakedCount = updateEntitiesCount("unstaked")
  const stakedCount = getEntitiesCount("staked")
  updateEventCount(event,event.block.timestamp,stakedCount,unstakedCount)
  updateStakeAmount(event,event.params.staker,event.params.token,event.params.amount,false)

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

function updateEntitiesCount(name: string): BigInt {
  let id = Bytes.fromUTF8(name)
  let entity = EntitiesCount.load(id)

  if (entity == null) {
    entity = new EntitiesCount(id)
    entity.name = name
    entity.amount = BigInt.fromI32(1)
  }else{
    entity.amount = entity.amount.plus(BigInt.fromI32(1))
  }
  entity.save()
  return entity.amount
}

function getEntitiesCount(name: string): BigInt {
  let id = Bytes.fromUTF8(name)
  let entity = EntitiesCount.load(id)
  if (entity == null) {
    return BigInt.fromI32(0)
  } else {
    return entity.amount
  }
}




// Function to update the EventCount entity
function updateEventCount(event:ethereum.Event,timestamp: BigInt, stakedCount:BigInt,unstakeCount:BigInt): void {
  let eventCount = new EventCount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  eventCount.stakeCount= stakedCount
  eventCount.unstakeCount = unstakeCount
  eventCount.timestamp = timestamp
  eventCount.save()
}

function updateStakeAmount(event:ethereum.Event,staker:Bytes,token:Bytes,amount:BigInt,isStake:bool):void{
  let id = Bytes.fromHexString(staker.toHexString().concat(token.toHexString()))
  let entity = StakeAmount.load(id)
  if(entity == null){
    entity = new StakeAmount(id)
    entity.staker = staker
    entity.token = token
    entity.amount = BigInt.fromI32(0)

    entity.transactionHash = event.transaction.hash
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
  }
  else{
    if(isStake){
      entity.amount = entity.amount.plus(amount)
    }else{
      entity.amount = entity.amount.minus(amount)
    }
  }
  entity.save()
}
