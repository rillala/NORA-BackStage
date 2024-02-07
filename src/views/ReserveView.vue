<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  data() {
    return {
      sites: [],
      siteData: {
        type_id: 0,
        open_status: 1,
        info: "",
      },
    };
  },
  mounted() {
    this.getPHP();
  },
  methods: {
    getPHP() {
      apiInstance
        .get("./campSite.php")
        .then((response) => {
          console.log(response.data); // 这里应该能看到 { "number": 123 }
          this.sites = response.data.sites;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getImageUrl(paths) {
      return getImageUrl(paths);
    },
    clearForm() {
      this.siteData = {
        type_id: "",
        open_status: "",
        info: "0",
      };
    },
    addSiteToDb() {
      if (this.siteData.type_id === "0") {
        alert("營位種類必選喔!!!");
        return;
      }

      apiInstance
        .post("campSiteAdd.php", this.siteData)
        .then((response) => {
          if (!response.data.error) {
            alert(response.data.msg);
            this.getPHP();
            this.clearForm(); // 假設您有一個 clearForm 方法來清空表單
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<template>
  <main>
    <table align="center" cellspacing="0">
      <caption>
        創建新營位資料
      </caption>
      <tr>
        <th>營位備註</th>
        <td><input type="text" v-model="siteData.info" /></td>
      </tr>
      <tr>
        <th>是否上架(0:下架/1:上架)</th>
        <td>
          <select v-model="siteData.open_status">
            <option value="0">下架</option>
            <option value="1">上架</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>營位種類</th>
        <td>
          <select v-model="siteData.type_id">
            <option value="0">請選擇</option>
            <option value="1">貓區 草地區</option>
            <option value="2">貓區 棧板區</option>
            <option value="3">貓區 雨棚區</option>
            <option value="4">狗區 草地區</option>
            <option value="5">狗區 棧板區</option>
            <option value="6">狗區 雨棚區</option>
          </select>
        </td>
      </tr>

      <tr>
        <td colspan="2" align="center">
          <button type="button" @click="addSiteToDb">確定加入</button>
          <button type="reset" @click="clearForm">重設</button>
        </td>
      </tr>
    </table>

    <img :src="getImageUrl('test.png')" alt="test" />
    <img :src="getImageUrl('/sub/cat.png')" alt="test" />
    <div>{{ sites }}</div>
  </main>
</template>

<style lang="scss" scoped></style>
