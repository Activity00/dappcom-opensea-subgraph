import {
  OrdersMatched,
  AtomicMatch_Call,
} from "../generated/WyvernExchange/WyvernExchange"
import { AtomicMatch } from "../generated/schema"

export function handleOrdersMatched(event: OrdersMatched): void {
  let entity = new AtomicMatch(event.transaction.hash.toHexString())
  entity.block = event.block.number.toI32()
  entity.timestamp = event.block.timestamp.toI32()
  entity.user = event.transaction.from
  entity.value = event.params.price
  entity.save()
}

export function handleAtomicMatch(call: AtomicMatch_Call): void {
  let entity = AtomicMatch.load(call.transaction.hash.toHexString())
  if (entity == null) {
    return
  }
  call.inputs
  entity.token = call.inputs.addrs[7].toHexString()
  entity.save()
}
