<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  data() {
    return {
      search: "",
      selectedList: [],
      editIndex: -1,
      editInfo: "",
      columns: [
        {
          title: "會員編號",
          key: "member_id",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "第三方登入",
          key: "user_id",
          width: "120",
          align: "center",
          sortable: true,
        },
        // {
        //   title: "令牌",
        //   key: "token",
        //   width: "100",
        //   align: "center",
        //   sortable: true,
        // },
        {
          title: "會員名字",
          key: "name",
          width: "100",
          align: "center",
        },
        {
          title: "日期",
          key: "date",
          width: "120",
          align: "center",
        },
        {
          title: "會員信箱",
          key: "email",
          // width: "200",
          align: "center",
        },
        // {
        //   title: "會員密碼",
        //   key: "psw",
        //   width: "160",
        //   align: "center",
        // },
        {
          title: "照片",
          key: "photo",
          width: "180",
          align: "center",
          slot: "image",
        },
        {
          title: "會員手機",
          key: "phone",
          width: "150",
        },
        {
          title: "會員地址",
          key: "address",
          // width: "220",
          align: "center",
        },
        // {
        //   title: "狀態",
        //   key: "openStatus",
        //   width: "100",
        //   align: "center",
        //   sortable: true,
        // },
        // {
        //   title: "查看",
        //   width: "100",
        //   align: "center",
        // },
      ],
      memberList: [],
    };
  },
  mounted() {
    this.getPHP();
  },

  watch: {
    search(newVal) {
      let searchList = this.memberList.filter(
        (site) => site.campsiteId == parseInt(newVal)
      );
      this.selectedList = this.changeListString(searchList);
      this.choseZone = "";
    },
  },
  methods: {
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
    getPHP() {
      apiInstance
        .get("./members.php")
        .then((response) => {
          console.log(response.data); // 這裡應該能看到 { "number": 123 }
          this.memberList = response.data.members;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getImageUrl(paths) {
      return getImageUrl(paths);
    },
    deleteDBToken() {
      apiInstance
        .get("./deleteDBToken.php")
        .then((response) => {
          alert(response.data.msg); // 這裡應該能看到 { "number": 123 }
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
    <h2 class="title dark">會員管理</h2>
    <div class="search">
      <h4 class="dark">會員清單</h4>

      <Input
        class="search-input"
        search
        enter-button
        placeholder="請輸入會員編號進行搜尋"
        v-model="search"
      />
    </div>

    <br />

    <Table class="table" height="500" :columns="columns" :data="memberList">
      <template #info="{ row, index }">
        <Input type="text" v-model="editInfo" v-if="editIndex === index" />
        <span v-else>{{ row.info }}</span>
      </template>
      <template #image="{ row, index }">
        <img :src="getImageUrl(row.photo)" :alt="row.name" class="photo" />
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
      <template>
        <!-- <template #delete="{ row, index }"> -->
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
    <Button @click="deleteDBToken">測試模式用:刪除所有會員token</Button>
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

.photo {
  object-fit: contain;
  width: 50px;
  height: 50px;
}
</style>
