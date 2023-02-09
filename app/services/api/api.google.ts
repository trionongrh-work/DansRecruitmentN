/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { getRootStore, useInitialRootStore, useStores } from "../../models"
import type { ApiConfig, ApiConfigGoogle } from "./api.types"
import { getGeneralApiProblem } from "./apiProblem"

export interface PositionParams {
  description?: string | undefined
  location?: string | undefined
  full_time?: boolean | undefined
  page?: number | undefined
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class ApiGoogle {
  apisauce: ApisauceInstance

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config?: ApiConfigGoogle) {
    this.apisauce = create({
      baseURL: "https://www.googleapis.com",
      timeout: 10000,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${config.accessToken}`,
      },
    })
  }

  async getInfo(): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/userinfo/v2/me`)

    console.log(response)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data

      return { kind: "ok", data: rawData }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data", error: response.data.error }
    }
  }
}
