
import * as asl from "@cloudscript/asl-lib"
import { StateMachineContext } from "@cloudscript/asl-lib";

export const main = asl.deploy.asStateMachine(async (input: IInput, context: StateMachineContext<IInput>) => {
  if (typeof input.name !== "string") {
    input.name = "fred";
  }

  const x = {
    name: input.name,
    executionId: context.execution.id
  }

  const y = {
    x,
    somethingLiteral: ["one", 2, "three"],
    startTime: context.execution.startTime,
    func: asl.states.jsonToString(x),
    number: asl.states.stringToJson("123") as number,
    arr: asl.states.array(1, 2, 3, 4, 5, 6),
  }

  return y;
});


interface IInput {
  name: string;
  totalDue: number;
  orders: [{ orderId: string, date: Date }];
}
