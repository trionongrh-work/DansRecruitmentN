import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { createAuthStoreDefaultModel } from "./AuthStore"
import { createPositionsStoreDefaultModel } from "./PositionsStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authStore: createAuthStoreDefaultModel(),
  positionStore: createPositionsStoreDefaultModel(),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
