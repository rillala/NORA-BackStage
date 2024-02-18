<script>
// import axios from 'axios';
import apiInstance from "@/plugins/auth";

export default {
  data() {
    return {
      search: "",
      newsFilter: "",
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
      newsList: [],
      modal2: false, //新增的燈箱預設關閉
      statusMap: {
        0: "草稿",
        1: "上架中",
        2: "已下架",
      },
      nameValue: "", //文章標題
      contentValue: "", //文章內文
      imgName: "", //文章圖片
      selectedStatus: "draft", // 預設是草稿狀態
    }
  },
  // created() {
  //   axios.get(`${import.meta.env.VITE_NORA_URL}/phps/getNews.php`)
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
        .get("./getNews.php")
        .then((response) => {
          this.newsList = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    uploadSuccess(response) {
      this.imgName = response.data.filename; //假設回傳的數據包含圖片檔名
      console.log("上傳成功", response);
    },
    selectStatus(status) { //文章狀態選擇
      this.selectedStatus = status;
    },
    cancelAdd(){
      this.modal2 = "false";
    },
    saveArticle(){
      
    }
  },
};
</script>

<template>
  <main>
    <h2 class="news-title dark">最新消息管理</h2>

    <div class="news-search">
      <h4>最新消息清單</h4>
      <Input search enter-button placeholder="請輸入文章編號或文章標題進行搜尋" class="news-id-search" v-model="newsFilter" />
    </div>

    <Space wrap>
      <!-- 新增文章燈箱 -->
      <Button @click="modal2 = true">新增</Button>

      <Modal title="新增文章" v-model="modal2" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消" align="center">

      <List item-layout="vertical">
        <Form>
          <ListItem>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" class=" row-title">
              <span>消息標題</span>
              </Col>
              <Col span="19">
              <Input v-model="nameValue" placeholder="請輸入標題" />
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息內容</span>
              </Col>
              <Col span="19">
                <textarea rows="15" cols="49" v-model="contentValue" placeholder="請輸入內文"></textarea>
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息圖片</span>
              </Col>
              <Col span="19">
                <Upload multiple :limit="3" action="" @success="uploadSuccess">
                  <Button icon="md-add">上傳圖片</Button>
                </Upload>
                <div v-if="imgName">{{ imgName }}</div>
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息狀態</span>
              </Col>

              <Col span="19">
                <button class="statusBtn" :class="{ 'selected': selectedStatus === 'draft' }" @click="selectStatus('draft')">草稿</button>

                <button class="statusBtn" :class="{ 'selected': selectedStatus === 'publish' }" @click="selectStatus('publish')">立即上架</button>

                <button class="statusBtn" :class="{ 'selected': selectedStatus === 'schedule' }" @click="selectStatus('schedule')">排程上架</button>
              </Col>
          </Row>

          </ListItem>
        </Form>
      </List>

      <template #footer>
        <Button type="dashed" @click="cancelAdd">取消</Button>
        <Button type="primary" @click="saveArticle">儲存</Button>
      </template>
      </Modal>
    </Space>

  <!-- <Button class="news-add" @click="addNew = true">新增</Button>
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
  </Modal> -->

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

.title-add,
.content-add,
.upload-img {
  display: flex;
}

.status {
  display: flex;
  gap: 5px;
}

.draft,
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

.form-row {
  margin: 5px 40px;
}

.statusBtn {
  border: 1px solid black ;
  padding: 4px 8px;
  margin-right: 10px;
}

.selected {
  background-color: #D5FAFF; //被選到後的背景顏色
}

</style>
