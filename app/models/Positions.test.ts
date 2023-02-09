import { PositionsModel } from "./Positions"

test("can be created", () => {
  const instance = PositionsModel.create({})

  expect(instance).toBeTruthy()
})
