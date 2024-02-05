<script>
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
          key: "articleId",
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
          key: "createDate",
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
        {
          articleId: 1,
          title: "野良祝大家2024新年快樂！",
          createDate: new Date().toISOString().split('T')[0],
          status: "上架中",
        },
        {
          articleId: 2,
          title: "野良露營年末大特賣！走過路過不要錯過！",
          createDate: new Date().toISOString().split('T')[0],
          status: "上架中",
        },
        {
          articleId: 3,
          title: "來野良走春玩耍吧！春節搶先預約最棒的營地！",
          createDate: new Date().toISOString().split('T')[0],
          status: "上架中",
        },
        {
          articleId: 4,
          title: "野良好！野良棒！野良呱呱叫！",
          createDate: "2024-02-01",
          status: "草稿",
        },
        {
          articleId: 5,
          title: "野良露營！專題滿分！贊不絕口！",
          createDate: "2024-01-31",
          status: "已下架",
        },
        {
          articleId: 6,
          title: "野良之家的孩子們～正在等待你的到來！",
          createDate: "2024-01-08",
          status: "上架中",
        },
      ],
      addNew: false
    }
  },
  computed: {
    filterNewsList() { //搜尋的篩選
      if (!this.newsFilter) { // 若newsFilter是空的就會是原本的newsList
        return this.newsList;
      }

      const filterText = this.newsFilter.toLowerCase(); //將搜尋的關鍵字轉換成小寫，進行大小寫不敏感的比較
      return this.newsList.filter((item) => //使用filter的方法 篩選符合搜尋條件的newsList項目
        item.articleId.toString().includes(filterText) ||
        item.title.toLowerCase().includes(filterText) //檢查文章編號跟文章標題是否符合關鍵字
      );
    },
  },
  methods: {
    showDetail(){

    }

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

    <Table class="news-table" :columns="columns" :data="filterNewsList">
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
