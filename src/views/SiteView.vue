<script>
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
          key: "campsiteId",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "營位類型",
          key: "type",
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
          key: "openStatus",
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
      siteList: [
        {
          campsiteId: 1,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 2,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 3,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 4,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 5,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 6,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 7,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 8,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 9,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 10,
          typeId: 1,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 11,
          typeId: 2,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 12,
          typeId: 2,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 13,
          typeId: 2,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 14,
          typeId: 2,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 15,
          typeId: 2,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 16,
          typeId: 3,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 17,
          typeId: 3,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 18,
          typeId: 3,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 19,
          typeId: 3,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 20,
          typeId: 3,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 21,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 22,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 23,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 24,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 25,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 26,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 27,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 28,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 29,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 30,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 31,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 32,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 33,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 34,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 35,
          typeId: 4,
          openStatus: true,
          price: 1000,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 36,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 37,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 38,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 39,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 40,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 41,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 42,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 43,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 44,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 45,
          typeId: 5,
          openStatus: true,
          price: 1200,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 46,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 47,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 48,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 49,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 50,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 51,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 52,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 53,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 54,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
        {
          campsiteId: 55,
          typeId: 6,
          openStatus: true,
          price: 1500,
          info: "這個營位上次保養時間是2024年1月",
        },
      ],
    };
  },
  watch: {
    search(newVal) {
      let searchList = this.siteList.filter(
        (site) => site.campsiteId == parseInt(newVal)
      );
      this.selectedList = this.changeListString(searchList);
      this.choseZone = "";
    },
  },
  mounted() {
    this.showCatZone();
  },
  methods: {
    showCatZone() {
      this.choseZone = "cat";
      let filterList = this.siteList.filter((site) => site.typeId < 4);
      this.selectedList = this.changeListString(filterList);
    },
    showDogZone() {
      this.choseZone = "dog";
      let filterList = this.siteList.filter((site) => site.typeId > 3);
      this.selectedList = this.changeListString(filterList);
    },
    changeListString(campsites) {
      return campsites.map((site) => {
        let type;

        switch (site.typeId) {
          case 1:
            type = "貓區 草地區";
            break;
          case 2:
            type = "貓區 棧板區";
            break;
          case 3:
            type = "貓區 雨棚區";
            break;
          case 4:
            type = "狗區 草地區";
            break;
          case 5:
            type = "狗區 棧板區";
            break;
          case 6:
            type = "狗區 雨棚區";
            break;
          default:
            type = "錯誤，無分區編號";
        }

        return {
          ...site,
          type: type,
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
      this.selectedList[index].openStatus =
        !this.selectedList[index].openStatus;
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
          v-model="row.openStatus"
          @on-change="statusChange(index)"
        />
      </template>
      <template #action="{ row, index }">
        <div v-if="editIndex === index">
          <Button type="text" @click="handleSave(index)"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-floppy2-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12 2h-2v3h2z" />
              <path
                d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"
              />
            </svg>
          </Button>
          <Button type="text" @click="editIndex = -1"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-square-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"
              />
            </svg>
          </Button>
        </div>
        <div v-else>
          <Button size="small" type="text" @click="handleEdit(row, index)"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </Button>
        </div>
      </template>
      <template #delete="{ row, index }">
        <Button class="btn" type="text" size="small" @click="remove(index)"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
            />
          </svg>
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
