<script>
import apiInstance from "@/plugins/auth";
import { Button, Space } from "view-ui-plus";

export default {
  components: { Button, Space },
  data() {
    return {
      //資料庫回傳資料
      adminList: [],
      //編輯器輸入
      editIndex: -1,
      editAdmin: {

      },
      //表格欄位、屬性屬性值
      columns: [
        {
          title: '管理員編號',
          key: 'adminid',
          align: 'center',
          ellipsis: 'true',
          width: '150'
        },
        {
          title: '管理員名稱',
          key: 'name',
          align: 'center',
          ellipsis: 'true',
          width: '150'
        },
        {
          title: '管理員帳號',
          key: 'acc',
          align: 'center',
          width: '220'
        },
        {
          title: '管理員密碼',
          key: 'psw',
          align: 'center',
          width: '220'
        },
        {
          title: '帳號狀態',
          key: 'status',
          width: '100',
          align: 'center',
          slot: 'status',
        },
        {
          title: '編輯',
          align: 'center',
          width: '100',
          slot: 'edit'
        }
      ],
      //新增燈箱開啟關閉
      modalAdd: false,
      //新增管理員輸入
      addAdminData: {
        name: '',
        acc: '',
        psw: '',
        status: 1,
      },
      //新增管理員第一次密碼輸入
      pswfirst: "",
    };
  },
  mounted() {
    this.getAdminPHP();
  },
  methods: {
    //打開編輯器
    handleEdit(row, index) {
      this.editName = row.name;
      this.editIndex = index;
    },
    handleSave(index) {
      this.data[index].name = this.editName;
      this.editIndex = -1;
    },
    // statusChange(index) {
    //   this.selectedList[index].adminstatus =
    //     !this.selectedList[index].adminstatus;
    // },

    //讀取admin資料庫
    getAdminPHP() {
      apiInstance
        .get("./getAdmin.php")
        .then((response) => {
          //將回傳管理員狀態從1或0轉換成布林值
          const adminList = response.data.all.map((admin) => ({
            ...admin,
            status: admin.status === 1 ? true : false
          }));
          //讀取進data
          this.adminList = adminList;
          console.log(this.adminList);
        }).catch((error) => {
          console.error("Error", error);
        });
    },
    //新增管理員
    pswIdentify() {
      if (this.pswfirst === this.addAdminData.psw) {
        // 密碼一致，執行提交操作
        this.addAdmin();
      } else {
        // 密碼不一致，彈出提示
        alert('兩次輸入的密碼不一致');
      }
    },

    clearForm() {
      this.pswfirst = "",
        this.addAdminData = {
          name: '',
          acc: '',
          psw: '',
        };
    },

    addAdmin() {

      if (!(this.addAdminData.name && this.addAdminData.acc && this.addAdminData.psw)) {
        alert('請填寫所有輸入值');
        return;
      }

      apiInstance
        .post("addAdmin.php", this.addAdminData)
        .then((response) => {
          if (!response.data.error) {
            //重新讀取資料庫
            console.log(response.data);
            this.getAdminPHP();
            //輸入清空
            this.clearForm();
            //關閉燈箱
            this.modalAdd = false;
            // window.location.reload()
          } else {
            alert(response.data.msg);
          }
        }).catch((error) => {
          console.error("Error", error);
        });
    },

    //狀態切換
    //index改直接抓資料庫資料
    statusChange(index) {
      this.adminList[index].status = !this.adminList[index].status;
      let newStatus = this.adminList[index].status == true ? 1 : 0;
      let currentId = this.adminList[index].adminid;
      console.log(newStatus);
      console.log(currentId);

      let editItem = new FormData();
      editItem.append("tablename", "admin");
      editItem.append("status", newStatus);
      editItem.append("id", currentId);
      console.log(editItem);

      apiInstance
        .post("editStatus.php", editItem)
        .then((response) => {
          if (!response.data.error) {
            // console.log(response.data.msg);
            this.getAdminPHP();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    //編輯自身狀態判別
    identifySelf(index) {
      const loginId = Number(localStorage.getItem('adminId'));
      const result = this.adminList[index].adminid !== loginId;
      return result;
    }
  },
}
</script>

<template>
  <!-- 新增燈箱 -->
  <Modal title="新增管理員" v-model="modalAdd">
    <div style="display: flex; flex-direction:column ; align-items: center;">
      <Space class="addInput">新增名稱：<Input v-model="addAdminData.name" />
      </Space>
      <Space class="addInput">新增帳號：<Input v-model="addAdminData.acc" />
      </Space>
      <Space class="addInput">新增密碼：<Input type="password" v-model="pswfirst" />
      </Space>
      <Space style="position: relative; right: 14px;" class="addInput">再次輸入密碼：<Input type="password"
          v-model="addAdminData.psw" />
      </Space>
    </div>
    <template #footer>
      <Button @click="modalAdd = false">取消</Button>
      <Button type="primary" @click="pswIdentify"
        :disabled="!addAdminData.name || !addAdminData.acc || !addAdminData.psw">送出</Button>
    </template>
  </Modal>

  <main>
    <h2 class="title dark">管理員管理</h2>
    <div class="search">
      <h4 class="dark">管理員清單</h4>

      <!-- <Input class="search-input" search enter-button placeholder="請輸入管理員編號進行搜尋" v-model="search" /> -->
    </div>

    <Space type="flex" style="justify-content: start; padding: 10px;">
      <Button type="primary" @click="modalAdd = true">新增管理員</Button>
    </Space>

    <Table class="admin-table" :columns="columns" :data="adminList" height="500">

      <!-- <template #info="{ row, index }">
        <Input type="text" v-model="editInfo" v-if="editIndex === index" />
        <span v-else>{{ row.info }}</span>
      </template> -->

      <!--狀態切換開關-->
      <template #status="{ row, index }">
        <Switch v-if="identifySelf(index)" v-model="row.status" true-color="#13ce66" false-color="#ff4949"
          @on-change="statusChange(index)" />
      </template>

      <!-- 編輯(擱置) -->
      <template #edit="{ row, index }">
        <div v-if="editIndex === index">
          <Button @click="handleSave(index)"><img src="@/assets/image/icon/save.svg" alt="saveBtn" /></Button>
          <Button @click="editIndex = -1">
            <img src="@/assets/image/icon/close.svg" alt="closeBtn" /></Button>
        </div>
        <div v-else>
          <Button size="small" type="text" @click="handleEdit(row, index)"><img src="@/assets/image/icon/edit.svg"
              alt="editBtn" />
          </Button>
        </div>
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


.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-center-modal .ivu-modal {
  top: 0;
}

.addInput {
  padding-bottom: 3px;
}

.admin-table {
  width: 100%;
}
</style>