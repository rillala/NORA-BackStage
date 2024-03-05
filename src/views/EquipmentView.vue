<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  data() {
    return {
      // 搜尋用
      search: "",
      displayList: [],

      // 編輯用
      editIndex: -1,
      // 用於儲存修改或新增的資料
      EquipData: {
        id: -1,
        title: "",
        info: "",
        image: "", // 圖片路徑和檔案名稱類型
        price: 0,
      },
      // 用於存儲選擇的圖片檔案
      newImage: null,

      // 表格設定 iView 相關
      columns: [
        {
          title: "編號",
          key: "id",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "名稱",
          key: "title",
          width: "120",
          align: "center",
          sortable: true,
          slot: "title",
        },
        {
          title: "租借價格",
          key: "price",
          width: "120",
          align: "center",
          sortable: true,
          slot: "price",
        },
        {
          title: "描述",
          key: "info",
          // width: "200",
          align: "center",
          slot: "info",
        },
        {
          title: "圖片",
          key: "image",
          width: "150",
          align: "center",
          slot: "image",
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

      // 初始讀取值
      equipList: [],

      // 新增裝備
      addBox: false,
      imagePreview: null,
      addData: {
        title: "",
        info: "",
        image: "",
        price: 0,
      },
    };
  },
  watch: {
    search(newVal) {
      let searchList = this.equipList.filter((item) =>
        item.title.toLowerCase().includes(newVal.toLowerCase())
      );
      this.displayList = searchList;
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

    getImageUrl(paths) {
      return getImageUrl(paths);
    },

    // View UI 連動函數
    openEdit(row, index) {
      // 打開編輯器
      this.editIndex = index;

      // 給予原始的值
      this.EquipData.id = this.displayList[index].id;
      this.EquipData.title = this.displayList[index].title;
      this.EquipData.info = this.displayList[index].info;
      this.EquipData.price = this.displayList[index].price;
    },
    editSave(index) {
      // 判斷資料是否有差異
      this.editEquipToDb();

      // 判斷圖片是否有新值
      this.changeImage();
      this.editIndex = -1;
    },
    statusChange(index) {
      this.displayList[index].status = !this.displayList[index].status;
      let newStatus = this.displayList[index].status == true ? 1 : 0;
      let currentId = this.displayList[index].id;
      console.log(newStatus);

      let editItem = new FormData();
      editItem.append("tablename", "equipment");
      editItem.append("status", newStatus);
      editItem.append("id", currentId);
      console.log(editItem);
      console.log(currentId);

      apiInstance
        .post("editStatus.php", editItem)
        .then((response) => {
          if (!response.data.error) {
            alert(response.data.msg);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    // PHP 相關 func
    getPHP() {
      apiInstance
        .get("getEquipment.php")
        .then((response) => {
          console.log(response.data);
          this.equipList = response.data.all;
          this.displayList = this.equipList.map((item) => ({
            ...item,
            status: item.status == 1,
          }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    // 以下新增用, 還沒串
    addEquipToDb() {
      if (this.checkInput()) {
        this.changeImage();

        apiInstance
          .post("addEquipment.php", this.addData)
          .then((response) => {
            if (!response.data.error) {
              alert(response.data.msg);
              this.clearAddData();
              this.getPHP();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    checkInput() {
      if (!this.addData.title) {
        alert("請輸入裝備名稱");
      } else if (!this.addData.info) {
        alert("請輸入裝備描述");
      } else if (!this.addData.price) {
        alert("請輸入裝備價錢");
      } else if (!this.addData.image) {
        alert("請上傳裝備照片");
      } else {
        return true;
      }
    },

    clearAddData() {
      this.addBox = false;
      this.addData = {
        title: "",
        info: "",
        image: "",
        price: 0,
      };
      this.imagePreview = null;
    },

    // 更新圖片或增加新圖片
    handleBeforeUpload(file) {
      this.newImage = new FormData();
      this.newImage.append("file", file);
      let filePath = "equipment/" + file.name;
      if (filePath.length >= 40) {
        alert("圖片檔名過長!請減少至40字元內");
        return;
      }

      if (this.editIndex >= 0) {
        const oldImgPath = "../image/" + this.displayList[this.editIndex].image;
        this.newImage.append("oldImgPath", oldImgPath);
        this.EquipData.image = filePath;
      } else {
        // 預覽圖片
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };

        reader.readAsDataURL(file);

        // 預設圖片路徑
        this.addData.image = filePath;
      }

      console.log(filePath);

      // 阻止默認的上傳行為
      return false;
    },
    changeImage() {
      if (this.newImage) {
        apiInstance
          .post("addEquipmentImage.php", this.newImage, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // 處理上傳成功的情況
            console.log("Upload successful", response);
          })
          .catch((error) => {
            // 處理上傳失敗的情況
            console.error("Upload error", error);
          });
      }
    },

    // 刪除用
    deleteEquipDb(index) {
      if (confirm("是否確認刪除？")) {
        let selectItem = this.displayList[index];

        let deleteItem = new FormData();
        deleteItem.append("tablename", "equipment");
        deleteItem.append("id", selectItem.id);

        apiInstance
          .post("deleteData.php", deleteItem)
          .then((response) => {
            if (!response.data.error) {
              alert(response.data.msg);
              this.getPHP();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // 刪除原本的圖片
        let originalImagePath = "../image/" + selectItem.image;
        let originalImage = new FormData();
        originalImage.append("oldImgPath", originalImagePath);

        apiInstance
          .post("addEquipmentImage.php", originalImage, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("已成功刪除原有圖片");
          })
          .catch((error) => {
            console.error("Upload error", error);
          });
      }
    },

    // 編輯用
    editEquipToDb() {
      apiInstance
        .post("editEquipment.php", this.EquipData)
        .then((response) => {
          if (!response.data.error) {
            alert(response.data.msg);
            this.getPHP();
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

    <Button class="addBtn" @click="addBox = true">新增裝備</Button>

    <Table class="table" height="500" :columns="columns" :data="displayList">
      <template #title="{ row, index }">
        <Input
          type="text"
          v-model="EquipData.title"
          v-if="editIndex == index"
        />
        <span v-else>{{ row.title }}</span>
      </template>
      <template #price="{ row, index }">
        <Input
          type="number"
          v-model="EquipData.price"
          v-if="editIndex == index"
        />
        <span v-else>{{ row.price }}</span>
      </template>

      <template #info="{ row, index }">
        <Input
          type="text"
          v-model="EquipData.info"
          v-if="editIndex === index"
        />
        <span v-else>{{ row.info }}</span>
      </template>

      <template #image="{ row, index }">
        <Upload
          :before-upload="handleBeforeUpload"
          v-if="editIndex === index"
          action="dummy"
        >
          <Button icon="md-add">更新圖片</Button>
        </Upload>
        <Image
          v-else
          :src="getImageUrl(row.image)"
          :alt="row.title"
          width="50px"
          height="50px"
        />
      </template>

      <template #status="{ row, index }">
        <!--switch btn-->
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          v-model="row.status"
          @on-change="statusChange(index)"
        />
      </template>

      <template #action="{ row, index }">
        <div v-if="editIndex === index">
          <Button type="text" @click="editSave(index)"
            ><img src="@/assets/image/icon/save.svg" alt="saveBtn" />
          </Button>
          <Button type="text" @click="editIndex = -1"
            ><img src="@/assets/image/icon/close.svg" alt="closeBtn" />
          </Button>
        </div>
        <div v-else>
          <Button size="small" type="text" @click="openEdit(row, index)"
            ><img src="@/assets/image/icon/edit.svg" alt="editBtn" />
          </Button>
        </div>
      </template>

      <template #delete="{ row, index }">
        <Button
          class="btn"
          type="text"
          size="small"
          @click="deleteEquipDb(index)"
          ><img src="@/assets/image/icon/delete.svg" alt="deleteBtn" />
        </Button>
      </template>
    </Table>

    <Modal
      title="新增裝備"
      v-model="addBox"
      class="vertical-center-modal"
      width="600"
      ok-text="確定"
      cancel-text="取消"
    >
      <List item-layout="vertical">
        <Form>
          <ListItem justify="center" align="middle">
            <Image
              v-if="imagePreview"
              :src="imagePreview"
              alt="Image preview"
              width="200px"
              height="200px"
            />
            <Upload action="dummy" :before-upload="handleBeforeUpload">
              <Button icon="md-add">上傳裝備照片</Button>
            </Upload>
          </ListItem>

          <ListItem>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" class="row-title">
                <span>裝備名稱：</span>
              </Col>
              <Col span="19">
                <Input v-model="addData.title" placeholder="請輸入名稱" />
              </Col>
            </Row>
          </ListItem>

          <ListItem justify="center" align="middle">
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" class="row-title">
                <span>裝備說明：</span>
              </Col>
              <Col span="19">
                <Input
                  type="textarea"
                  :rows="5"
                  v-model="addData.info"
                  maxlength="200"
                  show-word-limit
                  placeholder="請輸入說明"
                />
              </Col>
            </Row>
          </ListItem>

          <ListItem>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
                <span>裝備價格：</span>
              </Col>
              <Col span="17">
                <Input v-model="addData.price" placeholder="請輸入單價" />
              </Col>
              <Col span="2" align="center">
                <span>元</span>
              </Col>
            </Row>
          </ListItem>
        </Form>
      </List>
      <template #footer>
        <Button type="dashed" @click="clearAddData">取消</Button>
        <Button type="primary" @click="addEquipToDb">儲存</Button>
      </template>
    </Modal>
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

.addBtn {
  display: block;
  margin: 10px 0;
}

//新增商品
.ivu-row {
  display: flex;
  flex-flow: row nowrap;
}

.form-row {
  margin: 5px 40px;
}

.dynamic-row {
  width: 100%;
  padding: 5px 0px 5px 55px;
  margin-bottom: 0px;
}
</style>
