<script>
import apiInstance from "@/plugins/auth";

export default {
  data() {
    return {
      search: "",
      selectedList: [],
      editIndex: -1,
      editInfo: "",
      columns: [
        {
          type: "selection",
          width: "60",
          align: "center",
        },
        {
          title: "營位編號",
          key: "campsite_id",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "營位類型",
          key: "type_id",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "營位價格",
          key: "price",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "備註",
          key: "info",
          slot: "info",
        },
        {
          title: "狀態",
          key: "open_status",
          width: "100",
          align: "center",
          sortable: true,
          slot: "status",
        },
        {
          title: "編輯",
          width: "100",
          align: "center",
          slot: "action",
        },
        {
          title: "刪除",
          width: "100",
          align: "center",
          slot: "delete",
        },
      ],
      choseZone: "",
      //   {
      //     campsiteId: 1,
      //     type_.type_id: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 2,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 3,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 4,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 5,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 6,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 7,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 8,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 9,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 10,
      //     typeId: 1,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 11,
      //     typeId: 2,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 12,
      //     typeId: 2,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 13,
      //     typeId: 2,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 14,
      //     typeId: 2,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 15,
      //     typeId: 2,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 16,
      //     typeId: 3,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 17,
      //     typeId: 3,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 18,
      //     typeId: 3,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 19,
      //     typeId: 3,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 20,
      //     typeId: 3,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 21,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 22,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 23,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 24,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 25,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 26,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 27,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 28,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 29,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 30,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 31,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 32,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 33,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 34,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 35,
      //     typeId: 4,
      //     openStatus: true,
      //     price: 1000,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 36,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 37,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 38,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 39,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 40,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 41,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 42,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 43,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 44,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 45,
      //     typeId: 5,
      //     openStatus: true,
      //     price: 1200,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 46,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 47,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 48,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 49,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 50,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 51,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 52,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 53,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 54,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      //   {
      //     campsiteId: 55,
      //     typeId: 6,
      //     openStatus: true,
      //     price: 1500,
      //     info: "這個營位上次保養時間是2024年1月",
      //   },
      // ],
      siteList: [],
      siteData: {
        type_id: 0,
        open_status: 1,
        info: "",
      },
    };
  },
  watch: {
    search(newVal) {
      let searchList = this.siteList.filter(
        (site) => site.campsite_id == parseInt(newVal)
      );
      this.selectedList = this.changeListString(searchList);
      this.choseZone = "";
    },
  },
  created() {
    this.getSitesPHP();
  },
  mounted() {},
  methods: {
    showCatZone() {
      this.choseZone = "cat";
      let filterList = this.siteList.filter(
        (site) => parseInt(site.type_id) < 4
      );
      this.selectedList = this.changeListString(filterList);
    },
    showDogZone() {
      this.choseZone = "dog";
      let filterList = this.siteList.filter(
        (site) => parseInt(site.type_id) > 3
      );
      this.selectedList = this.changeListString(filterList);
    },
    changeListString(campsites) {
      return campsites.map((site) => {
        let type;
        let price;

        switch (parseInt(site.type_id)) {
          case 1:
            type = "貓區 草地區";
            price = 1000;
            break;
          case 2:
            type = "貓區 棧板區";
            price = 1200;
            break;
          case 3:
            type = "貓區 雨棚區";
            price = 1500;
            break;
          case 4:
            type = "狗區 草地區";
            price = 1000;
            break;
          case 5:
            type = "狗區 棧板區";
            price = 1200;
            break;
          case 6:
            type = "狗區 雨棚區";
            price = 1500;
            break;
          default:
            type = "錯誤，無分區編號";
            price = "錯誤";
        }

        return {
          ...site,
          type_id: type,
          price: price,
        };
      });
    },
    formatPrice(price) {
      return "$" + price.toLocaleString("en-US");
    },
    // View UI 連動函數
    remove(index) {
      this.selectedList.splice(index, 1);
    },
    handleEdit(row, index) {
      this.editInfo = row.info;
      this.editIndex = index;
    },
    handleSave(index) {
      this.selectedList[index].info = this.editInfo;
      this.editIndex = -1;
    },
    statusChange(index) {
      this.selectedList[index].open_status =
        !this.selectedList[index].open_status;
    },

    // PHP 相關 func
    getSitesPHP() {
      apiInstance
        .get("campSite.php")
        .then((response) => {
          console.log(response.data); // 这里应该能看到 { "number": 123 }
          this.siteList = response.data.sites;
          this.showCatZone();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    
    // 以下新增用, 還沒串
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
            this.getSitesPHP();
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
    <h2 class="title dark">營地管理</h2>
    <div class="search">
      <h4 class="dark">營位清單</h4>

      <Input
        class="search-input"
        search
        enter-button
        placeholder="請輸入營位編號進行搜尋"
        v-model="search"
      />
    </div>

    <div class="zoneType">
      <Button
        id="catZoneBtn"
        size="large"
        :type="choseZone === 'cat' ? 'primary' : 'default'"
        @click="showCatZone"
        >貓區</Button
      >
      <Button
        id="dogZoneBtn"
        size="large"
        :type="choseZone === 'dog' ? 'primary' : 'default'"
        @click="showDogZone"
        >狗區</Button
      >
    </div>

    <br />

    <Table class="table" height="500" :columns="columns" :data="selectedList">
      <template #info="{ row, index }">
        <Input type="text" v-model="editInfo" v-if="editIndex === index" />
        <span v-else>{{ row.info }}</span>
      </template>
      <template #status="{ row, index }">
        <!--switch btn-->
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          v-model="row.open_status"
          @on-change="statusChange(index)"
        />
      </template>
      <template #action="{ row, index }">
        <div v-if="editIndex === index">
          <Button type="text" @click="handleSave(index)"
            ><img src="@/assets/image/icon/save.svg" alt="saveBtn" />
          </Button>
          <Button type="text" @click="editIndex = -1"
            ><img src="@/assets/image/icon/close.svg" alt="closeBtn" />
          </Button>
        </div>
        <div v-else>
          <Button size="small" type="text" @click="handleEdit(row, index)"
            ><img src="@/assets/image/icon/edit.svg" alt="editBtn" />
          </Button>
        </div>
      </template>
      <template #delete="{ row, index }">
        <Button class="btn" type="text" size="small" @click="remove(index)"
          ><img src="@/assets/image/icon/delete.svg" alt="deleteBtn" />
        </Button>
      </template>
    </Table>
  </main>
</template>

<style lang="scss" scoped>
.test {
  width: 100px;
  height: 100px;
}
.search {
  width: 400px;

  .ivu-input-search {
    background: $blue-3;
  }
}

h2 {
  margin-bottom: 20px;
}
h4 {
  font-weight: 700;
  margin-bottom: 5px;
}
.zoneType {
  display: flex;
  justify-content: end;
  gap: 20px;
}

.table {
  width: 100%;
}
</style>
