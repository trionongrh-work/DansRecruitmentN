import { PositionsStoreModel } from "./PositionsStore"

test("can be created", () => {
  const instance = PositionsStoreModel.create({})

  expect(instance).toBeTruthy()
})
