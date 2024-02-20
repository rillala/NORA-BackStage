// https://pinia.vuejs.org/core-concepts/state.html
// vuex

import { defineStore } from 'pinia';
export default defineStore('userStore', {
  // 對應 data
  //
  state: () => ({
    token: '',   // 後端僅返回token(通行證/令牌)
    userData: {}, // 可以在login API中返回user資訊
    isLogin: false,
    adminId: '',
    adminName: '',
  }),

  // 對應 computed (物件形式)
  getters: {
  },

  // 對應 methods (物件形式)
  actions: {
    updateToken(payload) {
      if (payload) {
        this.token = payload
        console.log(this.token)
        localStorage.setItem('userToken', payload)
      } else {
        this.token = ''
        localStorage.removeItem('userToken')
      }
    },
    // updateUserData(val) {
    //   console.log(val);
    //   // 不把全部資訊紀錄
    //   this.userData = {
    //     name: val.mem_name,
    //     // email驗證狀況1|0
    //     validation: val.mem_validation,
    //     // 封鎖狀況1|0
    //     state: val.mem_state,
    //     // 如果有權限可以把權限角色記載資料庫
    //     role: 'editor'
    //   }
    //   localStorage.setItem('userData', JSON.stringify(this.userData))

    // },
    checkLogin() {
      const storageToken = localStorage.getItem('userToken')
      if (this.token) {
        return this.token
      } else if (storageToken) {
        this.token = storageToken
        return storageToken
      } else {
        return ''
      }
    },
    checkUserData() {
      const storageUserData = localStorage.getItem('userData')
      console.log(Object.keys(this.userData).length);
      if (Object.keys(this.userData).length > 0) {
        return this.userData
      } else if (storageUserData) {
        this.userData = JSON.parse(storageUserData)
        return storageUserData
      } else {
        return ''
      }
    },
    updateAdminId(data) {
      if (data) {
        this.adminId = data
        console.log(this.adminId)
        localStorage.setItem('adminId', data)
      } else {
        this.adminId = ''
        localStorage.removeItem('adminId')
      }
    },
    updateAdminName(data) {
      if (data) {
        this.adminName = data
        localStorage.setItem('adminName', data)
      } else {
        this.adminName = ''
        localStorage.removeItem('adminName')
      }
    },
  }
})