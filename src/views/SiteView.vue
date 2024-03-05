<script>
import apiInstance from "@/plugins/auth";

export default {
  data() {
    return {
      // 搜尋用
      search: "",
      displayList: [],

      // 編輯用
      editIndex: -1,
      // 用於儲存修改或新增的資料
      EditData: {
        id: -1,
        type_id: -1,
        info: "",
        price: 0,
      },

      // 表格設定 iView 相關
      columns: [
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
          slot: "type_id",
          sortable: true,
        },
        {
          title: "營位價格",
          key: "price",
          width: "120",
          align: "center",
          sortable: true,
          slot: "price",
        },
        {
          title: "備註",
          key: "info",
          // width: "200",
          align: "center",
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

      // 初始讀取值
      siteList: [],
      choseZone: "",
      typeList: [],

      // 新增裝備
      addBox: false,
      addData: {
        type_id: "",
        info: "",
        price: 0,
      },
    };
  },
  watch: {
    search(newVal) {
      let searchList = this.siteList.filter(
        (item) => item.campsite_id == newVal
      );
      this.displayList = searchList;
    },
  },
  created() {
    this.getPHP();
    this.getTypePHP();
  },
  mounted() {},
  methods: {
    showCatZone() {
      this.choseZone = "cat";
      let filterList = this.siteList.filter(
        (site) => parseInt(site.type_id) < 4
      );
      this.displayList = filterList;
    },
    showDogZone() {
      this.choseZone = "dog";
      let filterList = this.siteList.filter(
        (site) => parseInt(site.type_id) > 3
      );
      this.displayList = filterList;
    },
    changetypeStr(type) {
      let typeStr = "";
      switch (parseInt(type)) {
        case 1:
          typeStr = "貓區 草地區";
          break;
        case 2:
          typeStr = "貓區 棧板區";
          break;
        case 3:
          typeStr = "貓區 雨棚區";
          break;
        case 4:
          typeStr = "狗區 草地區";
          break;
        case 5:
          typeStr = "狗區 棧板區";
          break;
        case 6:
          typeStr = "狗區 雨棚區";
          break;
        default:
          typeStr = "錯誤，無分區編號";
      }
      return typeStr;
    },
    formatPrice(price) {
      return "$" + price.toLocaleString("en-US");
    },

    // View UI 連動函數
    openEdit(row, index) {
      // 打開編輯器
      this.editIndex = index;

      // 給予原始的值
      this.EditData.campsite_id = this.displayList[index].campsite_id;
      this.EditData.type_id = this.displayList[index].type_id;
      this.EditData.info = this.displayList[index].info;
      this.EditData.price = this.displayList[index].price;
    },
    editSave(index) {
      // 判斷資料是否有差異
      this.editSitesToDb();
      this.editIndex = -1;
    },
    statusChange(index) {
      this.displayList[index].status = !this.displayList[index].status;
      let newStatus = this.displayList[index].status == true ? 1 : 0;
      let currentId = this.displayList[index].campsite_id;
      console.log(newStatus);
      console.log(currentId);

      let editItem = new FormData();
      editItem.append("tablename", "campsites");
      editItem.append("status", newStatus);
      editItem.append("id", currentId);
      console.log(editItem);

      apiInstance
        .post("editStatus.php", editItem)
        .then((response) => {
          if (!response.data.error) {
            // alert(response.data.msg);
            this.getPHP();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    // PHP 相關 func
    getPHP() {
      apiInstance
        .get("getSite.php")
        .then((response) => {
          console.log(response.data);
          let dataList = response.data.all;
          this.siteList = dataList.map((item) => ({
            ...item,
            status: item.status == 1,
          }));

          if (!this.choseZone) {
            this.showCatZone();
          } else {
            this.choseZone == "cat" ? this.showCatZone() : this.showDogZone();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getTypePHP() {
      apiInstance
        .get("getSiteType.php")
        .then((response) => {
          console.log(response.data);
          this.typeList = response.data.all;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    // 以下新增用, 還沒串
    addEquipToDb() {
      if (this.checkInput()) {
        apiInstance
          .post("addSites.php", this.addData)
          .then((response) => {
            if (!response.data.error) {
              this.clearAddData();
              this.getPHP();
              alert(response.data.msg);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    checkInput() {
      if (!this.addData.type_id) {
        alert("請選擇營位種類");
      } else {
        return true;
      }
    },
    asignPrice() {
      this.siteList.forEach((item) => {
        // 檢查type_id和campsite_id是否相同
        if (this.addData.type_id === item.type_id) {
          // 如果相同，更新price變量
          this.addData.price = item.price;
        }
      });
    },

    clearAddData() {
      this.addBox = false;
      this.addData = {
        type_id: "",
        info: "",
        price: 0,
      };
    },

    // 刪除用
    deleteEquipDb(index) {
      if (confirm("是否確認刪除？")) {
        let selectItem = this.displayList[index];

        let deleteItem = new FormData();
        deleteItem.append("tablename", "campsites");
        deleteItem.append("id", selectItem.campsite_id);

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
      }
    },

    // 編輯用
    editSitesToDb() {
      apiInstance
        .post("editSites.php", this.EditData)
        .then((response) => {
          if (!response.data.error) {
            alert(response.data.msg);
            this.getPHP();
            this.getTypePHP();
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
    <div class="btn">
      <Button class="addBtn" @click="addBox = true">新增營位</Button>
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
    </div>

    <Table class="table" height="500" :columns="columns" :data="displayList">
      <template #type_id="{ row, index }">
        <span>{{ changetypeStr(row.type_id) }}</span>
      </template>
      <template #price="{ row, index }">
        <Input
          type="number"
          v-model="EditData.price"
          v-if="editIndex == index"
        />
        <span v-else>{{ row.price }}</span>
      </template>

      <template #info="{ row, index }">
        <Input type="text" v-model="EditData.info" v-if="editIndex === index" />
        <span v-else>{{ row.info }}</span>
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
      title="新增營位"
      v-model="addBox"
      class="vertical-center-modal"
      width="600"
      ok-text="確定"
      cancel-text="取消"
    >
      <List item-layout="vertical">
        <Form>
          <ListItem>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" class="row-title">
                <span>營位種類：</span>
              </Col>
              <Col span="19">
                <select
                  v-model="addData.type_id"
                  class="form-select"
                  @change="asignPrice"
                >
                  <option disabled value="">請選擇種類</option>
                  <option v-for="type in typeList" :value="type.type_id">
                    {{ type.site_type }}
                  </option>
                </select>
              </Col>
            </Row>
          </ListItem>

          <ListItem justify="center" align="middle">
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" class="row-title">
                <span>營位備註：</span>
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
                <span>營位價格：</span>
              </Col>
              <Col span="17">
                <Input v-model="addData.price" readonly />
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

.btn {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.zoneType {
  display: flex;
  justify-content: end;
  gap: 20px;
}

.table {
  width: 100%;
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
