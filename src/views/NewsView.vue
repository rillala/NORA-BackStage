<script>
// import axios from 'axios';
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  data() {
    return {
      search: "", //搜尋
      newsFilter: "", //篩選

      columns: [ //表格內容
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

      newsList: [], //文章列表
      statusMap: { //文章狀態
        0: "草稿",
        1: "上架中",
        2: "已下架",
      },
      selectedStatus: "draft", // 文章狀態預設是草稿
      nameValue: "", //文章標題
      contentValue: "", //文章內文
      imgNames: [], //文章圖片
      
      addBox: false, //新增燈箱預設關閉
      addData: {
        title: "",
        content: "",
        imgNames: [], 
        status: "draft"
      },

      editModal: false, //編輯燈箱
      editArticle: { //編輯文章內容
        title: "",
        content: "",
        imgNames: [], 
        status: "publish"
      },
    }
  },
  computed: {
    filteredNewsList() { //接收 newsFilter 屬性的值作為參數，把它轉換成小寫且去除空白字符，然後用 filter 方法過濾 newsList。
      const filterText = this.newsFilter.toLowerCase().trim();
      return this.newsList.filter(news => {
        return news.article_id.toString().includes(filterText) || news.title.toLowerCase().includes(filterText);
      }); 
    }
  },
  mounted() {
    this.getPHP(); //抓到資料庫的資料
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

    uploadSuccess(response) { //上傳圖片是否成功
      this.imgNames.push(response.data.filename); //將上傳成功的圖片檔名放到陣列中
      console.log("上傳成功", response);
    },

    changeStatus(status) { //文章狀態選擇
      this.selectedStatus = status;
    },

    saveArticle() { //儲存文章
      this.selectedStatus = this.tempStatus;
    },

    cancelAdd() { //取消文章
      this.addBox = false;
    },

    showEditModal(article){
      // 把傳入的文章賦值給編輯文章對象並打開彈窗
      this.editArticle = {
        title: article.title,
        content: article.content,
        imgNames: article.imgNames,
        status: article.status
      };
      this.editModal = true;
    },

    saveEdit() { //保存編輯完的文章
      // 把編輯後的文章發到後端保存 關閉彈窗
      this.editModal = false;
    },

    cancelEdit() {
      // 取消編輯 關閉彈窗
      this.editModal = false;
    },

    getImageUrl(paths) {
      return getImageUrl(paths);
    },
  },
};
</script>

<template>
  <main>
    <h2 class="news-title dark">最新消息管理</h2>

    <!-- 搜尋 -->
    <div class="news-search">
      <h4>最新消息清單</h4>
      <Input search enter-button placeholder="請輸入文章編號或文章標題進行搜尋" class="news-id-search" v-model="newsFilter" />
    </div>

    <!-- 文章列表 -->
      <Table class="news-table" :columns="columns" :data="filteredNewsList">
      <template #title="{ row }">
        <strong>{{ row.title }}</strong>
      </template>

      <template #status="{ row }">
        {{ statusMap[row.status] }}
      </template>

      <template #edit="{ row, index }">
        <Button size="small" @click="showEditModal(row)">
          <img src="@/assets/image/icon/edit.svg" alt="編輯按鈕" />
        </Button>
      </template>

      <template #delete="{ row, index }">
        <Button size="small" @click="remove(index)">
          <img src="@/assets/image/icon/delete.svg" alt="刪除按鈕" />
        </Button>
      </template>
    </Table>

    <!-- 新增文章按鈕 -->
    <Button @click="addBox = true">新增文章</Button>

    <!-- 新增文章燈箱 -->
    <Space wrap>
      <Modal title="新增文章" v-model="addBox" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消" align="center">
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
                <Upload multiple :limit="3 - imgNames.length" action="" @success="uploadSuccess">
                  <Button icon="md-add">上傳圖片</Button>
                </Upload>
                <div v-for="imgName in imgNames" :key="imgName">{{ imgName }}</div>
                </Col>
              </Row>

              <Row class="form-row" justify="center" align="middle">
                <Col span="5" align="center">
                <span>消息狀態</span>
                </Col>

                <Col span="19">
                <span class="statusBtn" :class="{ 'selected': selectedStatus === 'draft' }"
                  @click="changeStatus('draft')">草稿</span>

                <span class="statusBtn" :class="{ 'selected': selectedStatus === 'publish' }"
                  @click="changeStatus('publish')">立即上架</span>

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

  <!-- 編輯文章燈箱 -->
      <Modal title="編輯文章" v-model="editModal" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消" align="center">
    <List item-layout="vertical">
      <Form>
        <ListItem>
          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
              <span>消息標題</span>
            </Col>
            <Col span="19">
              <Input v-model="editArticle.title" placeholder="請輸入標題" />
            </Col>
          </Row>

          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center">
              <span>消息內容</span>
            </Col>
            <Col span="19">
              <textarea rows="15" cols="49" v-model="editArticle.content" placeholder="請輸入內文"></textarea>
            </Col>
          </Row>

          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center">
              <span>消息圖片</span>
            </Col>
            <Col span="19">
              <Upload multiple action="" @success="uploadSuccess">
                <Button icon="md-add">上傳圖片</Button>
              </Upload>
              <div v-for="imgName in editArticle.imgNames" :key="imgName">{{ imgName }}</div>
            </Col>
          </Row>

          <Row class="form-row" justify="center" align="middle">
            <Col span="5" align="center">
              <span>消息狀態</span>
            </Col>

            <Col span="19">
              <span class="statusBtn" :class="{ 'selected': editArticle.status === 'draft' }" @click="changeStatus('draft')">草稿</span>
              <span class="statusBtn" :class="{ 'selected': editArticle.status === 'publish' }" @click="changeStatus('publish')">立即上架</span>
            </Col>
          </Row>
        </ListItem>
      </Form>
    </List>

    <template #footer>
      <Button type="dashed" @click="cancelEdit">取消</Button>
      <Button type="primary" @click="saveEdit">保存</Button>
    </template>
  </Modal>

    </Space>

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
  border: 1px solid black;
  padding: 4px 8px;
  margin-right: 10px;
  cursor: pointer;
}

.selected {
  background-color: #D5FAFF; //被選到後的背景顏色
}

::placeholder {
  color: #cbcbcb;
}
</style>
