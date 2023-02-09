import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const PositionsModel = types
  .model("Positions")
  .props({
    id: types.maybeNull(types.string),
    type: types.maybeNull(types.string),
    url: types.maybeNull(types.string),
    created_at: types.maybeNull(types.string),
    company: types.maybeNull(types.string),
    company_url: types.maybeNull(types.string),
    location: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    how_to_apply: types.maybeNull(types.string),
    company_logo: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Positions extends Instance<typeof PositionsModel> {}
export interface PositionsSnapshotOut extends SnapshotOut<typeof PositionsModel> {}
export interface PositionsSnapshotIn extends SnapshotIn<typeof PositionsModel> {}
export const createPositionsDefaultModel = () => types.optional(PositionsModel, {})
