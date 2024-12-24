import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CreateNToken } from "../generated/schema"
import { CreateNToken as CreateNTokenEvent } from "../generated/NicStakingV2/NicStakingV2"
import { handleCreateNToken } from "../src/nic-staking-v-2"
import { createCreateNTokenEvent } from "./nic-staking-v-2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let underlyingToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let nToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCreateNTokenEvent = createCreateNTokenEvent(underlyingToken, nToken)
    handleCreateNToken(newCreateNTokenEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CreateNToken created and stored", () => {
    assert.entityCount("CreateNToken", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CreateNToken",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "underlyingToken",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CreateNToken",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nToken",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
