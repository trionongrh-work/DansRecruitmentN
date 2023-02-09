import { LoginFormModel } from "./LoginForm"

test("can be created", () => {
  const instance = LoginFormModel.create({})

  expect(instance).toBeTruthy()
})
