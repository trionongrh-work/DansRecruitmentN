import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { createLoginFormDefaultModel } from "./LoginForm"
import { isEmail } from "validator"
import { Toast } from "native-base"
import { Keyboard } from "react-native"
import { navigate } from "../navigators"
import * as Google from "expo-auth-session/providers/google"
import { AuthSessionResult } from "expo-auth-session"
import { ApiGoogle } from "../services/api/api.google"
import { l } from "i18n-js"

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    loginForm: createLoginFormDefaultModel(),
    isAuthenticated: types.optional(types.boolean, false),
    accessToken: types.maybeNull(types.string),
    userInfo: types.frozen<any>(),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * State onLoginSuccess
     */
    onLoginSuccess: (userInfo?) => {
      // set isAuthenticated to true for auth session
      if (userInfo) self.setProp("userInfo", userInfo)
      self.isAuthenticated = true
      Toast.show({
        title: "Login success !",
      })
      // navigate()
    },
    /**
     * State onLoginFailed
     */
    onLoginFailed: (reason: string) => {
      self.isAuthenticated = false
      Toast.show({
        title: reason,
      })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * Validate loginForm on onLogin actions
     * @returns true | false
     */
    validateLogin: () => {
      const { email, password } = self.loginForm.datas
      /**
       * Validate [loginForm.email]
       */
      if (!isEmail(email)) {
        Toast.show({
          title: "Invalid email address !",
        })
        return false
      }
      return true
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * onLogin actions
     */
    onLogin: () => {
      // hide keyboard
      Keyboard.dismiss()
      const datas = self.loginForm.datas
      const { email, password } = datas
      // console.log("ND_AuthStore.loginForm", datas)
      if (self.validateLogin()) {
        // validate loginForm data is valid then execute state
        if (email === "test@mail.com" && password === "P@$$w0rd") self.onLoginSuccess()
        else self.onLoginFailed("Invalid login !")
      }
    },

    onLoginGoogle: async (authResult) => {
      self.setProp("accessToken", authResult.authentication.accessToken)
      const api = new ApiGoogle({ accessToken: self.accessToken })

      const result = await api.getInfo()
      if (result.kind === "ok") {
        console.log(result.data)
        self.onLoginSuccess(result.data)
      }
    },

    onLogout: () => {
      // clear auth
      // Advancement you can remove token in here
      self.isAuthenticated = false
      self.setProp("userInfo", null)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
