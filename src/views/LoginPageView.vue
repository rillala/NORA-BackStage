<script>
import axios from 'axios';
import apiInstance from "@/plugins/auth";
import { useRouter } from 'vue-router';
import { mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
  data() {
    return {
      adminEnter: {
        acc: "admin02",
        psw: "NORA123"
      },
      // adminName: 'mor_2314',
      // adminPwwd: '83r5^_',
      //fakestoreapi登入
      userstatus: {},
    };
  },
  methods: {
    ...mapActions(userStore, ['updateToken', 'checkLogin', 'updateAdminId', 'updateAdminName']),

    login() {
      const bodyFormData = new FormData();
      bodyFormData.append('acc', this.adminEnter.acc);
      bodyFormData.append('psw', this.adminEnter.psw);

      apiInstance({
        method: 'post',
        url: '/adminLogin.php',
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData
      }).then(res => {
        console.log(res);
        if (res && res.data && res.data.success === true) {
          // 如果後端success為true，則處理登入成功的情況
          this.userstatus = res.data.status;
          //取得帳號資料辨識status
          if (this.userstatus === 1) {
            this.updateToken(res.data.token);
            //取得token
            this.updateAdminId(res.data.adminid);
            this.updateAdminName(res.data.name);
            //adminid和adnminName存入localstorage
          } else {
            alert('帳號已被停權');
          }
        } else if (res && res.data && res.data.success === false) {
          // 如果後端success為false，則處理登入失敗的情況
          alert(res.data.message);
        } else {
          //   如果後端返回的數據格式不符合預期，則提醒用戶或開發者檢查問題
          alert('登入失敗：伺服器回應錯誤');
        }
      }).catch(error => {
        console.log(error);
      })
    },

    //fakestoreapi登入
    // signin() {

    //   axios.post('https://fakestoreapi.com/auth/login', {
    //     username: this.adminName,
    //     password: this.adminPwwd,
    //     // }, {
    //     //   headers: {
    //     //     'Content-Type': 'application/json'
    //     //   }
    //     //   //fetch一定要加不然抓不到
    //   })
    //     .then(response => {
    //       if (response.data && response.data.token) {
    //         // localStorage.setItem('token', response.data.token)
    //         // this.updateToken('123')
    //         // console.log(login)
    //         this.updateToken(response.data.token);
    //         console.log('login success', response.data.token);
    //         window.location.reload();
    //         //在取得token後重整畫面(App.vue載入狀態為isLogin = true)
    //       }
    //     })
    //     .catch(error => {
    //       console.error(error)
    //       alert('登入失敗');
    //       // error時執行這邊
    //       // 登入失敗
    //       // 系統維護中
    //     });
    // }
  }
};
</script>

<template>
  <main>
    <div class="wrap">
      <div class="Login">
        <div class="Login-title">
          <div id="logo"></div>
          <h4>管理員登入</h4>
        </div>
        <!-- 登入表單 -->
        <label id="adminName">
          帳號：<input type="text" id="adminName" v-model="adminEnter.acc"><br />
        </label>
        <label id="adminPwwd">
          密碼：<input type="password" id="adminPwwd" v-model="adminEnter.psw"><br />
        </label>
        <button @click="login">登入</button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  background-color: $blue-2;
  display: flex;
  align-items: center;
}

.wrap {
  width: 100%;
}

.Login {
  width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $blue-3;
  border-radius: 30px;
  padding-bottom: 20px;
}

#logo {
  display: block;
  height: 150px;
  margin-top: 20px;
  text-decoration: none;
  background-image: url(@/assets/image/header/back-logo.png);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.Login-title {
  h4 {
    color: $white01;
    font-weight: bold;
    padding-top: 10px;
  }
}

#adminName {
  color: $white01;
  font-weight: bold;
  margin: 5px 0;

  input {
    color: #000;
    font-weight: normal;
    padding: 0 10px;
    border: none;
    border-radius: 3px;
  }
}

#adminPwwd {
  color: $white01;
  font-weight: bold;
  margin: 5px 0;

  input {
    color: #000;
    font-weight: normal;
    padding: 0 10px;
    border: none;
    border-radius: 3px;

  }
}

button {
  background: $blue-1;
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 10px;
  margin: 10px;
  transition: 200ms;
  font-weight: bold;
}

button:hover {
  color: $white01;
  background: $blue-4;
  transition: 200ms;
}
</style>
