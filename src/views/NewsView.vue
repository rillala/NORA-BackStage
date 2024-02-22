<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  data() {
    return {
      search: "", //搜尋
      newsFilter: "", //篩選

      //表格內容
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
          render: (h, params) => {
            const status = this.statusMap[params.row.status];
            return h('span', status);
          },
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
      newImages: [], //文章圖片
      imagePreviews: [], //預覽圖片

      //文章狀態 
      statusMap: {
        0: "草稿",
        1: "上架中",
        2: "已下架",
      },

      addBox: false, //新增燈箱預設關閉
      addData: { //新增文章
        title: "",
        content: "",
        img1: "",
        img2: "",
        img3: "",
        status: "draft",
        create_date: new Date().toLocaleString()
      },

      editModal: false, //編輯燈箱
      editArticle: { //編輯文章內容
        title: "",
        content: "",
        img1: "",
        img2: "",
        img3: "",
        status: "publish"
      },
    }
  },

  computed: {
    filteredNewsList() {
      //接收newsFilter屬性的值作為參數，把它轉換成小寫 去除空白字符，再用filter方法過濾newsList
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

    //抓資料庫的資料
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

    //圖片路徑
    getImageUrl(paths) {
      return getImageUrl(paths);
    },

    //新增文章到資料庫
    addNewsToDb() {
      if (this.checkInput()) {
        this.addData.create_date = new Date().toLocaleString(); // 更新為當前時間
        this.changeImages();

        // 根據選定的文章狀態決定發送到數據庫的狀態值
        const statusToSend = this.addData.status === 'draft' ? 0 : 1;
        this.addData.status = statusToSend;

        apiInstance
          .post("addNews.php", this.addData)
          .then((response) => {
            if (!response.data.error) {
              alert(response.data.msg);
              this.cancelAdd();
              this.getPHP();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },

    //確認欄位填寫
    checkInput() {
      if (!this.addData.title) {
        alert("請輸入消息標題");
      } else if (!this.addData.content) {
        alert("請輸入消息內容");
      } else {
        return true;
      }
    },

    //取消新增文章
    cancelAdd() {
      this.addBox = false;
      this.addData = {
        title: "",
        content: "",
        img1: "",
        img2: "",
        img3: "",
        status: "draft"
      };
      this.imagePreviews = []; //清空預覽的圖片
      this.newImages = []; //清空要上傳的圖片
    },

    // 更新圖片或增加新圖片
    handleBeforeUpload(file) {
      if (this.newImages.length >= 3) { // 判斷是否超出圖片數量限制
        alert("最多只能上傳三張圖片");
        return false; // 阻止上傳
      }
      this.newImages.push(file); // 將文件加到 newImages 陣列中

      // 顯示圖片預覽
      const reader = new FileReader();
      reader.onload = (e) => {
        //imagePreviews來儲存圖片預覽
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);

      return false; // 阻止默認上傳行為
    },

    //更改圖片
    changeImages() {
      if (this.newImages.length > 0) {
        // 創建 FormData 物件
        const formData = new FormData();

        // 將 newImages 中的圖片依次分配到 img1、img2、img3 欄位中
        for (let i = 0; i < this.newImages.length; i++) {
          formData.append(`img${i + 1}`, this.newImages[i]);
        }
        apiInstance
          .post("addNewsImages.php", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // 處理上傳成功的情況
            console.log("Upload successful", response);
            // 清空 newImages 和預覽圖片
            this.newImages = [];
            this.imagePreviews = [];
          })
          .catch((error) => {
            // 處理上傳失敗的情況
            console.error("Upload error", error);
          });
      }
    },

    changeStatus(status) { //文章狀態選擇
      this.addData.status = status;
    },

    showEditModal(article) {
      // 把傳入的文章賦值給編輯文章對象並打開彈窗
      this.editArticle = {
        title: article.title,
        content: article.content,
        img1: article.img1,
        img2: article.img2,
        img3: article.img3,
        status: article.status,
      };
      this.editModal = true;
      console.log(this.editArticle);
    },

    //保存編輯完的文章
    saveEdit() {
      apiInstance
        .post("editNews.php", this.editArticle)
        //editNews.php 是更新文章的後端 API
        .then((response) => {
          // 處理請求成功的情況
          console.log("Article updated successfully", response);
          // 關閉編輯文章燈箱
          this.editModal = false;
          // 刷新文章列表等操作
          this.getPHP(); // 重新獲取文章列表數據
        })
        .catch((error) => {
          // 處理請求失敗的情況
          console.error("Error updating article", error);
        });
    },
    cancelEdit() {
      // 取消編輯 關閉彈窗
      this.editModal = false;
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

      <template #create_date="{ row }">
        <strong>{{ row.create_date }}</strong>
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
    <Modal title="新增文章" v-model="addBox" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消"
      align="center">

      <List item-layout="vertical">
        <Form>
          <ListItem>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" class=" row-title">
              <span>消息標題</span>
              </Col>
              <Col span="19">
              <Input v-model="addData.title" placeholder="請輸入標題" />
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息內容</span>
              </Col>
              <Col span="19">
              <textarea rows="15" cols="49" v-model="addData.content" placeholder="請輸入內文"></textarea>
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息圖片</span>
              </Col>
              <Col span="19">
              <Upload multiple :limit="3" action="" :before-upload="handleBeforeUpload">
                <Button icon="md-add">上傳圖片</Button>
              </Upload>
              <div v-if="imagePreviews.length > 0">
                <img v-for="(preview, index) in imagePreviews" :src="preview" :key="index" alt="圖片預覽" width="100px"
                  height="100px">
                <Button @click="changeImage(index)">更改圖片</Button>
              </div>
              <div v-if="addData.img1">{{ addData.img1 }}</div>
              <div v-if="addData.img2">{{ addData.img2 }}</div>
              <div v-if="addData.img3">{{ addData.img3 }}</div>
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息狀態</span>
              </Col>

              <Col span="19">
              <span class="statusBtn" :class="{ 'selected': addData.status === 'draft' }"
                @click="changeStatus('draft')">草稿</span>

              <span class="statusBtn" :class="{ 'selected': addData.status === 'publish' }"
                @click="changeStatus('publish')">立即上架</span>
              </Col>
            </Row>
          </ListItem>
        </Form>
      </List>
      <template #footer>
        <Button type="dashed" @click="cancelAdd">取消</Button>
        <Button type="primary" @click="addNewsToDb">儲存</Button>
      </template>
    </Modal>

    <!-- 編輯文章燈箱 -->
    <Modal title="編輯文章" v-model="editModal" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消"
      align="center">
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
              <Upload multiple action="">
                <Button icon="md-add">上傳圖片</Button>
              </Upload>
              <div v-if="editArticle.img1">{{ editArticle.img1 }}</div>
              <div v-if="editArticle.img2">{{ editArticle.img2 }}</div>
              <div v-if="editArticle.img3">{{ editArticle.img3 }}</div>
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息狀態</span>
              </Col>

              <Col span="19">
              <span class="statusBtn" :class="{ 'selected': editArticle.status === 'draft' }"
                @click="changeStatus('draft')">草稿</span>
              <span class="statusBtn" :class="{ 'selected': editArticle.status === 'publish' }"
                @click="changeStatus('publish')">立即上架</span>
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