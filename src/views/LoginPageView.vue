<script>
export default {
  data() {
    return {
      adminName: '',
      adminPwwd: '',
    };
  },
  methods: {
    siginin() {
      console.log('login');
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
        <form action="">
          <label id="adminName">
            帳號：<input type="text" id="adminName" v-model="adminName"><br />
          </label>
          <label id="adminPwwd">
            密碼：<input type="text" id="adminPwwd" v-model="adminPwwd"><br />
          </label>
          <button>登入</button>
        </form>

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

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 10px;

  button {
    font-size: 16px;
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 10px;
    margin: 20px;
  }
}

#adminName {
  color: $white01;
  font-weight: bold;

  input {
    color: #000;
    padding: 0 10px;
  }
}

#adminPwwd {
  color: $white01;
  font-weight: bold;

  input {
    color: #000;
    padding: 0 10px;
  }
}
</style>
