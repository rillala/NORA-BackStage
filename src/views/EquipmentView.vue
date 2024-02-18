<script>
import apiInstance from "@/plugins/auth";

export default {
  data() {
    return {
      // 搜尋用
      search: "",
      selectedList: [],

      // 編輯用
      editIndex: -1,
      editInfo: "",

      // 表格設定 iView 相關
      columns: [
        {
          type: "selection",
          width: "60",
          align: "center",
        },
        {
          title: "裝備編號",
          key: "id",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "裝備名稱",
          key: "title",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "租借價格",
          key: "price",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "裝備描述",
          key: "info",
          width: "200",
          slot: "info",
        },
        {
          title: "狀態",
          key: "status",
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

      equipList: [],

      // 用於儲存修改或新增的資料
      EquipData: {
        title: 0,
        info: "",
        image: "", // 圖片路徑和檔案名稱類型
        status: 1,
        price: 0,
      },
      // 用於存儲選擇的圖片檔案
      selectedFile: null,
    };
  },
  watch: {
    search(newVal) {
      let searchList = this.equipList.filter((item) =>
        item.title.toLowerCase().includes(newVal.toLowerCase())
      );
    },
  },
  created() {
    this.getPHP();
  },
  mounted() {},
  methods: {
    formatPrice(price) {
      return "$" + price.toLocaleString("en-US");
    },
    // View UI 連動函數
    remove(index) {
      this.selectedList.splice(index, 1);

      // this.deleteEquipDb();
      // this.getPHP();
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
    getPHP() {
      apiInstance
        .get("getEquipment.php")
        .then((response) => {
          console.log(response.data); // 这里应该能看到 { "number": 123 }
          this.equipList = response.data.all;
          this.selectedList = this.equipList;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    // 以下新增用, 還沒串
    addEquipToDb() {
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

    // 新增圖片
    handleFileSelection(event) {
      // 存儲選擇的文件
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        // 使用 apiInstance 進行文件上傳
        apiInstance
          .post("upload.php", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Upload successful:", response.data);
            // 處理上傳成功的響應
          })
          .catch((error) => {
            console.error("Upload error:", error);
            // 處理上傳失敗的情況
          });
      }
    },

    // 刪除用
    deleteEquipDb(id) {},

    // 編輯用
    editEquipDb(id) {},
  },
};
</script>

<template>
  <main>
    <h2 class="title dark">裝備管理</h2>
    <div class="search">
      <h4 class="dark">裝備清單</h4>

      <Input
        class="search-input"
        search
        enter-button
        placeholder="請輸入裝備名稱進行搜尋"
        v-model="search"
      />
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
