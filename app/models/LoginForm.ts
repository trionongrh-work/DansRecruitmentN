import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const LoginFormModel = types
  .model("LoginForm")
  .props({
    email: types.maybeNull(types.string),
    password: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get datas() {
      return {
        email: self.email,
        password: self.password,
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setEmail: (email: string) => {
      self.email = email
    },
    setPassword: (password: string) => {
      self.password = password
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface LoginForm extends Instance<typeof LoginFormModel> {}
export interface LoginFormSnapshotOut extends SnapshotOut<typeof LoginFormModel> {}
export interface LoginFormSnapshotIn extends SnapshotIn<typeof LoginFormModel> {}
export const createLoginFormDefaultModel = () => types.optional(LoginFormModel, {})
