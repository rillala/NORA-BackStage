<script>
// import axios from 'axios';
import apiInstance from "@/plugins/auth";

export default {
  data(){
    return {
      search: "",
      newsFilter:"",
      columns: [
        {
          type: "selection",
          width: "60",
          align: "center",
        },
        {
          title: "文章編號",
          key: "article_id",
          width: "120",
          align: "center",
          sortable: "true",
        },
        {
          title: "文章標題",
          key: "title",
          width: "250",
          align: "center",
          sortable: "true",
          ellipsis: "true",
        },
        {
          title: "建立時間",
          key: "create_date",
          width: "120",
          align: "center",
          sortable: "true",
        },
        {
          title: "文章狀態",
          key: "status",
          width: "120",
          align: "center",
          sortable: "true",
        },
        {
          title: "編輯",
          width: "80",
          align: "center",
          slot: "edit",
        },
        {
          title: "刪除",
          width: "80",
          align: "center",
          slot: "delete",
        },
      ],
      newsList: [
        // {
        //   articleId: 1,
        //   title: "野良祝大家2024新年快樂！",
        //   createDate: new Date().toISOString().split('T')[0],
        //   status: "上架中",
        // },
      ],
      addNew: false,
      statusMap: { 
        0 : "草稿",
        1 : "上架中",
        2 : "已下架",
      },
    }
  },
  computed: {
  },
  // created() {
  //   axios.get(`${import.meta.env.VITE_NORA_URL}/phps/news.php`)
  //     .then((response) => {
  //       this.newsList = response.data;
  //     }
  //     ).catch((error) => {
  //       console.error("Error", error);
  //     }
  //     );
  // },
  mounted() {
    this.getPHP();
  },
  methods: {
    getPHP() {
      apiInstance
        .get("./news.php")
        .then((response) => {
          console.log(response.data);
          this.newsList = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  watch: {
  },
};
</script>

<template>
  <main>
    <h2 class="news-title dark">最新消息管理</h2>

    <div class="news-search">
      <h4>最新消息清單</h4>
      <Input 
        search 
        enter-button 
        placeholder="請輸入文章編號或文章標題進行搜尋" class="news-id-search"
        v-model="newsFilter"
      />
    </div>

    <Space wrap>
      <Button class="news-add" @click="addNew = true">新增</Button>
      <Modal draggable default scrollable ok-text="送出"
        class="add-window"
        title="新增文章"
        v-model="addNew"
        :closable="false">
        <div class="title-add">
          <p>標題</p>
          <input type="text" name="add-title" id="add-title">
        </div>
        <div class="content-add">
          <p>內容</p>
          <textarea name="add-content" id="add-content" cols="50" rows="15"></textarea>
        </div>
        <div class="upload-img">
          <p>圖片</p>
          <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">上傳檔案</Button>
          </Upload>
        </div>
        <div class="status">
          <input class="draft" type="button" name="draft" id="draft" value="草稿">
          <input class="now" type="button" name="now" id="now" value="立即上架">
        </div>
      </Modal>
    </Space>

    <Table class="news-table" :columns="columns" :data="newsList">
        <template #title="{ row }">
          <strong>{{ row.title }}</strong>
        </template>

        <template #edit="{ row, index }">
            <Button size="small" @click="showDetail(index)">
              <img src="@/assets/image/icon/edit.svg" alt="編輯按鈕" />
            </Button>
        </template>

        <template #delete="{ row, index }">
            <Button size="small" @click="remove(index)">
              <img src="@/assets/image/icon/delete.svg" alt="刪除按鈕" />
            </Button>
        </template>
    </Table>

  </main>
</template>

<style lang="scss" scoped>

h2 {
  margin-bottom: 20px;
}

h4 {
  font-weight: 700;
  margin-bottom: 5px;
}

.table {
  width: 100%;
}

.news-id-search {
  width: 400px;
}

.news-search {
  margin-bottom: 60px;
}

button {
  border: none;
}
.news-add {
  width: 80px;
  height: 40px;
  color: $white01;
  background: $blue-3;
  margin-bottom: 10px;
}

.title-add ,
.content-add ,
.upload-img {
  display: flex;
}

.status {
  display: flex;
  gap: 5px;
}

.draft , 
.now {
  border: 1px black solid;
  width: 80px;
  height: 30px;
  background-color: $white01;
  color: $dark;
}

.add-window {
  p {
    font-size: 16px;
  }
}

</style>
