<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
  data() {
    return {
      adminName: 'mor_2314',
      adminPwwd: '83r5^_',
    };
  },
  methods: {

    ...mapActions(userStore, ['updateToken']),
    signin() {

      axios.post('https://fakestoreapi.com/auth/login', {
        username: this.adminName,
        password: this.adminPwwd,
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        //   //fetch一定要加不然抓不到
      })
        .then(response => {
          if (response.data && response.data.token) {
            // localStorage.setItem('token', response.data.token)
            // this.updateToken('123')
            // console.log(login)
            this.updateToken(response.data.token);
            console.log('login success', response.data.token);
          }
        })
        .catch(error => {
          console.error(error)
          alert('登入失敗');
          // error時執行這邊
          // 登入失敗
          // 系統維護中
        });
    }
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
          帳號：<input type="text" id="adminName" v-model="adminName"><br />
        </label>
        <label id="adminPwwd">
          密碼：<input type="password" id="adminPwwd" v-model="adminPwwd"><br />
        </label>
        <button @click="signin">登入</button>
        <!-- 登入失敗提示 -->
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  background-color: $blue-3;
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
  }
}

button {
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 10px;
  margin: 10px;
}
</style>
