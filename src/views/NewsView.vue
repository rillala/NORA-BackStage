<script>
export default {
  data(){
    return {
      search: "",
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
          width: "350",
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
          width: "150",
          align: "center",
          sortable: "true",
        },
        {
          title: "編輯",
          width: "100",
          align: "center",
          slot: "edit",
        },
        {
          title: "刪除",
          width: "100",
          align: "center",
          slot: "delete",
        },
      ],
      newsList: [
        {
          articleId: 1,
          title: "野良祝大家2024新年快樂！",
          createDate: new Date().toISOString().split('T')[0],
          status: 0,
        },
        {
          articleId: 2,
          title: "野良露營年末大特賣！走過路過不要錯過！",
          createDate: new Date().toISOString().split('T')[0],
          status: 0,
        },
        {
          articleId: 3,
          title: "來野良走春玩耍吧！春節搶先預約最棒的營地！",
          createDate: new Date().toISOString().split('T')[0],
          status: 0,
        },
        {
          articleId: 4,
          title: "野良好！野良棒！野良呱呱叫！",
          createDate: "2024-02-01",
          status: 0,
        },
        {
          articleId: 5,
          title: "野良露營！專題滿分！贊不絕口！",
          createDate: "2024-01-31",
          status: 0,
        },
        {
          articleId: 6,
          title: "野良之家的孩子們～正在等待你的到來！",
          createDate: "2024-01-08",
          status: 0,
        },
      ]
    }
  },
  methods: {
    
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
        placeholder="請輸入文章編號進行搜尋" class="news-id-search"
      />
    </div>

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

    <div class="add-btn">
      <Button class="news-add" @click="addNew()">新增</Button>
    </div>

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

.add-btn {
  display: flex;
  justify-content: flex-end;
}

</style>
