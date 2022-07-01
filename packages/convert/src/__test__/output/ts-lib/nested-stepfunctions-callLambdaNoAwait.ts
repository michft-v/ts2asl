import * as asl from "@ts2asl/asl-lib";

export const callStateMachineWithAwait = asl.deploy.asStateMachine(async () => {
  const name = await childStateMachine({firstName: "Santa", lastName: "Claus" });
  return name;
});

export const callStateMachineNoAwait = asl.deploy.asStateMachine(async () => {
  childStateMachine({firstName: "Santa", lastName: "Claus" });
});


export const callLambdaWithAwait = asl.deploy.asStateMachine(async () => {
  const name = await childLambda({firstName: "Santa", lastName: "Claus" });
  return name;
});

export const callLambdaNoAwait = asl.deploy.asStateMachine(async () =>{
    asl.typescriptInvoke({
        name: "childLambda({firstName: \" ...",
        resource: childLambda,
        parameters: () => ({ firstName: "Santa", lastName: "Claus" }),
        comment: "childLambda({firstName: \"Santa\", lastName: \"Claus\" })"
    });
});

export const notAwaitedVoidExpression = asl.deploy.asStateMachine(async () => {
  void childStateMachine({firstName: "Santa", lastName: "Claus" });
});


export const childStateMachine = asl.deploy.asStateMachine(async (input: Arguments) => {
  return `${input.firstName} ${input.lastName}`
});

export const childLambda = asl.deploy.asLambda(async (input: Arguments) => {
  return `${input.firstName} ${input.lastName}`
});

interface Arguments { 
  firstName: string; 
  lastName: string;
}