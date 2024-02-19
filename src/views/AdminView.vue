<script>
import apiInstance from "@/plugins/auth";
import { Button, Space } from "view-ui-plus";

export default {
  components: { Button, Space },
  data() {
    return {
      search: "",
      selectedList: [],
      editIndex: -1,
      editInfo: "",
      columns: [
        {
          title: '管理員編號',
          key: 'adminid',
          align: 'center',
          ellipsis: 'true',
          width: '106'
        },
        {
          title: '管理員名稱',
          key: 'name',
          align: 'center',
          ellipsis: 'true',
          width: '110'
        },
        {
          title: '管理員帳號',
          key: 'acc',
          align: 'center',
          width: '150'
        },
        {
          title: '管理員密碼',
          key: 'psw',
          align: 'center',
          width: '150'
        },
        {
          title: '帳號狀態',
          key: 'status',
          width: '100',
          align: "center",
          slot: 'status',
        },
        {
          title: '編輯',
          align: 'center',
          width: '100',
          slot: 'edit'
        }
      ],

      adminList: [],
      modalAdd: false,
      pswfirst: "",
      addAdminData: {
        name: '',
        acc: '',
        psw: '',
        status: 1,
      }
    };
  },
  mounted() {
    this.getAdminPHP();
  },
  methods: {
    handleEdit(row, index) {
      this.editName = row.name;
      this.editIndex = index;
    },
    handleSave(index) {
      this.data[index].name = this.editName;
      this.editIndex = -1;
    },
    statusChange(index) {
      this.selectedList[index].adminstatus =
        !this.selectedList[index].adminstatus;
    },

    //讀取
    getAdminPHP() {
      apiInstance
        .get("./getAdmin.php")
        .then((response) => {
          // console.log(response.data);
          this.adminList = response.data;
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
            console.log(response.data);
            //重新讀取資料庫
            this.getAdminPHP();
            //輸入清空
            this.clearForm();
            //關閉燈箱
            this.modalAdd = false;
          }
        }).catch((error) => {
          console.error("Error", error);
        });
    },

    //狀態修改


  },
}
</script>

<template>
  <!-- 新增燈箱(暫) -->
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

    <br />

    <Table class="admin-table" :columns="columns" :data="adminList">

      <template #info="{ row, index }">
        <Input type="text" v-model="editInfo" v-if="editIndex === index" />
        <span v-else>{{ row.info }}</span>
      </template>

      <!--狀態切換-->
      <template #status="{ row, index }">
        <Switch true-color="#13ce66" false-color="#ff4949" v-model="row.status" @on-change="statusChange(index)" />
      </template>

      <!-- 編輯 -->
      <template #edit="{ row, index }">
        <div v-if="editIndex === index">
          <Button @click="handleSave(index)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              fill="currentColor" class="bi bi-floppy2-fill" viewBox="0 0 16 16">
              <path d="M12 2h-2v3h2z" />
              <path
                d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
            </svg></Button>
          <Button @click="editIndex = -1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill"
              viewBox="0 0 16 16">
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
            </svg></Button>
        </div>
        <div v-else>
          <Button size="small" type="text" @click="handleEdit(row, index)"><svg xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
          </Button>
        </div>
      </template>

    </Table>

    <Space type="flex" style="justify-content: end; padding: 10px;">
      <Button type="primary" @click="modalAdd = true">新增管理員</Button>
    </Space>

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
</style>