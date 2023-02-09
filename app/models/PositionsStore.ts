import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { api, PositionParams } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Positions, PositionsModel } from "./Positions"

/**
 * Model description here for TypeScript hints.
 */
export const PositionsStoreModel = types
  .model("PositionsStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getPositions: async (params?: PositionParams): Promise<Positions[]> => {
      const result = await api.getPositions(params)
      if (result.kind === "ok") {
        return result.data
      }
      return []
    },
    getPositionsDetail: async (id: string): Promise<Positions> => {
      const result = await api.getPositionsDetail(id)
      if (result.kind === "ok") {
        return result.data
      }
      return null
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PositionsStore extends Instance<typeof PositionsStoreModel> {}
export interface PositionsStoreSnapshotOut extends SnapshotOut<typeof PositionsStoreModel> {}
export interface PositionsStoreSnapshotIn extends SnapshotIn<typeof PositionsStoreModel> {}
export const createPositionsStoreDefaultModel = () => types.optional(PositionsStoreModel, {})
