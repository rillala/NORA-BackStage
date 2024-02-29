<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";

export default {
  data() {
    return {
      search: "", //搜尋
      displayList: [],

      //表格內容
      columns: [
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
          // width: "250",
          align: "center",
          sortable: "true",
          ellipsis: "true",
        },
        {
          title: "建立時間",
          key: "create_date",
          // width: "120",
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
      imagePreviews: [], //預覽要上傳的圖片

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
        create_date: ""
      },

      editModal: false, //編輯燈箱
      editData: { //編輯文章內容
        article_id: -1,
        title: "",
        content: "",
        img1: "",
        img2: "",
        img3: "",
        status: ""
      },
    }
  },

  watch: {
    search(filterText) {
      let searchList = this.newsList.filter((item) =>
        item.title.toLowerCase().includes(filterText.toLowerCase()) || item.article_id.toString().includes(filterText.toString())
      );
      this.displayList = searchList;
    },
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
          this.displayList = this.newsList.map((item) => ({
            ...item,
          }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    //圖片路徑
    getImageUrl(paths) {
      return getImageUrl(paths);
    },

    //新增文章：確認欄位填寫
    checkInput() {
      if (!this.addData.title) {
        alert("請輸入消息標題");
      } else if (!this.addData.content) {
        alert("請輸入消息內容");
      } else {
        return true;
      }
    },

    //新增文章燈箱
    showAddModal() {
      this.addBox = true;
      this.imagePreviews = []; //清空預覽的圖片
      this.newImages = []; //清空要上傳的圖片
    },

    // 新增文章：準備上傳前的新增圖片
    handleBeforeUpload(file) {
      if (this.newImages.length >= 3) {
        //newImages存放選好的file 判斷是否超出圖片數量限制
        alert("最多只能上傳三張圖片"); //超出後跳窗提醒
        return false; // 阻止上傳
      }
      this.newImages.push(file); // 若無超過三張就將file加到newImages陣列中

      // 顯示選定的圖片預覽
      const reader = new FileReader(); //當使用者選擇要上傳的圖片 程式會創建一個新的FileReader物件來讀取檔案內容
      reader.onload = (e) => { //等讀取完畢後觸發 再執行指定函數
        this.imagePreviews.push(e.target.result);
        //將讀到的內容以Data URL的形式加到imagePreviews來儲存圖片預覽
        //Data URL是一種用來表示檔案內容的URL格式

        // 檢查addData中的img1/img2/img3的屬性 並將圖片路徑存到addData中
        if (!this.addData.img1) {
          this.addData.img1 = "news/" + file.name;
        } else if (!this.addData.img2) {
          this.addData.img2 = "news/" + file.name;
        } else if (!this.addData.img3) {
          this.addData.img3 = "news/" + file.name;
        }
      };
      reader.readAsDataURL(file);

      return false; //阻止默認上傳行為(在上傳前先執行需要的驗證)
    },

    // 新增文章：確定儲存後上傳圖片到資料夾
    uploadImages() {
      if (this.newImages.length > 0) { //檢查是否有圖片要上傳
        const formData = new FormData(); // 若有就創建FormData物件 用於包裝要上傳的圖片

        // 將newImages中的圖片分配到img1、img2、img3欄位中(必須和資料庫欄位名稱匹配)
        for (let i = 0; i < this.newImages.length; i++) {
          // formData.append(`img${i + 1}`, this.newImages[i]);
          formData.append("file", this.newImages[i]);


          apiInstance
            .post("addNewsImage.php", formData, { //將FormData發送到後端的addNewsImage.php接口
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              // 處理上傳成功的情況
              console.log("Upload successful", response);
              // 清空newImages和預覽圖片
              this.newImages = [];
              this.imagePreviews = [];
            })
            .catch((error) => {
              // 處理上傳失敗的情況
              console.error("Upload error", error);
            });
        }
      }
    },

    //新增文章到資料庫
    addNewsToDb() {
      if (this.checkInput()) {
        this.uploadImages();

        // 根據選定的文章狀態決定發送到資料庫的狀態值
        const statusToSend = this.addData.status === 'draft' ? 0 : 1;
        this.addData.status = statusToSend;

        //若文章狀態為"上架"，publish_date欄位值設定為當前時間
        if (statusToSend === 1) {
          this.addData.publish_date = new Date();
        } else {
          this.addData.publish_date = "";
        }

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

    //文章狀態選擇
    changeStatus(status) {
      this.addData.status = status;
      this.editData.status = status;
    },

    //新增文章：取消新增
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

    //編輯文章燈箱
    showEditModal(article) {

      this.imagePreviews = []; //清空預覽的圖片
      this.newImages = []; //清空要上傳的圖片

      this.editData = {
        article_id: article.article_id,
        title: article.title,
        content: article.content,
        img1: article.img1,
        img2: article.img2,
        img3: article.img3,
        status: article.status,
      };

      this.editModal = true;
    },

    // 編輯文章：準備上傳前的新增圖片!!!!!!!!!!!!
    handleBeforeUploadForEdit(file) {
      const reader = new FileReader(); //當使用者選擇要上傳的圖片 程式會創建一個新的FileReader物件來讀取檔案內容
      reader.onload = (e) => { //等讀取完畢後觸發 再執行指定函數
        this.imagePreviews.push(e.target.result);

        console.log('imagePreviews.length = ' + file.name);

        this.newImages.push(file);
        // 若無超過三張就將file加到newImages陣列中
        // 將讀到的內容以Data URL的形式加到imagePreviews來儲存圖片預覽(Data URL是一種用來表示檔案內容的URL格式) 

        // 檢查editData的img1/img2/img3的屬性 並將圖片路徑存到editData中
        if (!this.editData.img1) {
          this.editData.img1 = "news/" + file.name;
        } else if (!this.editData.img2) {
          this.editData.img2 = "news/" + file.name;
        } else if (!this.editData.img3) {
          this.editData.img3 = "news/" + file.name;
        } else {
          alert("最多只能上傳三張圖片"); //超出後跳窗提醒
          return false; // 阻止上傳
        }

      };
      reader.readAsDataURL(file);
      return false; //阻止默認上傳行為(在上傳前先執行需要的驗證)
    },

    //移除原有的圖片-編輯
    removeImageForEdit(index) {
      this.newImages.splice(0, 1);
      this.imagePreviews.splice(index, 1);

      if (index === 0) {
        this.editData.img1 = null;
      } else if (index === 1) {
        this.editData.img2 = null;
      } else if (index === 2) {
        this.editData.img3 = null;
      }
    },

    //移除原有的圖片-新增
    removeImageForAdd(index) {
      this.newImages.splice(0, 1);
      this.imagePreviews.splice(index, 1);
      if (index == 0) {

        this.addData.img1 = this.addData.img2;
        this.addData.img2 = this.addData.img3;
        this.addData.img3 = '';

      } else if (index == 1) {

        this.addData.img2 = this.addData.img3;
        this.addData.img3 = '';

      } else if (index == 2) {
        this.addData.img3 = '';
      }
    },

    //編輯文章：保存編輯後的文章
    saveEditToDb() {
      //根據選定的文章狀態決定發送到資料庫的狀態值
      if (this.editData.status == 'draft') {
        this.editData.status = 0;
      } else if (this.editData.status == 'publish') {
        this.editData.status = 1;
      } else if (this.editData.status == 'remove') {
        this.editData.status = 2;
      }

      apiInstance
        .post("editNews.php", this.editData) //editNews.php 是更新文章的後端API
        .then((response) => {
          // 處理請求成功的情況
          console.log("Article updated successfully", response);
          this.editModal = false;
          // 刷新文章列表等操作
          this.getPHP(); // 重新獲取文章列表數據
          alert(response.data.msg);
        })
        .catch((error) => {
          // 處理請求失敗的情況
          console.error("Error updating article", error);
        });
    },

    //編輯文章：取消編輯
    cancelEdit() {
      this.editModal = false; //關閉彈窗
    },

    //刪除文章
    deleteNewsDb(index) {
      if (confirm("是否確認刪除？")) { //彈窗確認是否刪除(true/false)
        let selectItem = this.displayList[index];

        let deleteItem = new FormData();
        deleteItem.append("tablename", "news");
        deleteItem.append("id", selectItem.article_id);

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
    }
  },
};
</script>

<template>
  <main>
    <h2 class="news-title dark">最新消息管理</h2>
    <!-- 搜尋列 -->
    <div class="news-search">
      <h4>最新消息清單</h4>
      <Input search enter-button placeholder="請輸入文章編號或文章標題進行搜尋" class="news-id-search" v-model="search" />
    </div>

    <!-- 新增文章按鈕 -->
    <Space type="flex" style="justify-content: start; padding: 10px 0;">
      <Button @click="showAddModal()">新增文章</Button>
    </Space>

    <!-- 文章列表 -->
    <Table class="news-table" height="500" :columns="columns" :data="displayList">
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
        <Button size="small" @click="deleteNewsDb(index)">
          <img src="@/assets/image/icon/delete.svg" alt="刪除按鈕" />
        </Button>
      </template>
    </Table>

    <!-- 新增文章燈箱 -->
    <Modal title="新增文章" v-model="addBox" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消"
      align="center">

      <List item-layout="vertical">
        <Form>
          <ListItem>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" class="row-title">
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
              <textarea maxlength="200" rows="15" cols="49" v-model="addData.content" placeholder="請輸入內文"></textarea>
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息圖片</span>
              </Col>
              <Col span="19">
              <!-- 圖片預覽 -->
              <div class="img-previews" v-if="imagePreviews.length > 0">
                <!-- <div v-for="(preview, index) in imagePreviews" :key="index" >
                    <div class="news-img" v-if="index == 0 && imagePreviews[index] != '' ">
                        <img :src="preview" alt="圖片預覽" width="100px" height="100px" >
                        {{ addData.img1 }}
                        <Button class="remove-btn" @click="removeImageForAdd(index)">刪除圖片</Button>
                    </div>
                    <div class="news-img" v-if="index == 1 && imagePreviews[index] != '' ">
                      <img :src="preview" alt="圖片預覽" width="100px" height="100px" >
                      {{ addData.img2 }}
                      <Button class="remove-btn" @click="removeImageForAdd(index)">刪除圖片</Button>
                    </div>
                    <div class="news-img" v-if="index == 2 && imagePreviews[index] != ''">
                      <img :src="preview" alt="圖片預覽" width="100px" height="100px" >
                      {{ addData.img3 }}
                      <Button class="remove-btn" @click="removeImageForAdd(index)">刪除圖片</Button>
                    </div>
                  </div> -->
                <div v-for="(preview, index) in imagePreviews" :key="index">
                  <div class="news-img" v-if="preview !== ''">
                    <img :src="preview" alt="圖片預覽" width="100px" height="100px">
                    <span>{{ addData['img' + (index + 1)] }}</span>
                    <Button class="remove-btn" @click="removeImageForAdd(index)">刪除圖片</Button>
                  </div>
                </div>
              </div>
              <!-- 上傳圖片按鈕 -->
              <Upload single :limit="3" action="" :before-upload="handleBeforeUpload">
                <Button icon="md-add">上傳圖片</Button>
              </Upload>
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
              <Input v-model="editData.title" placeholder="請輸入標題" />
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息內容</span>
              </Col>
              <Col span="19">
              <textarea maxlength="200" rows="15" cols="49" v-model="editData.content" placeholder="請輸入內文"></textarea>
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息圖片</span>
              </Col>
              <Col span="19">
              <!-- 原有的圖片預覽 !!!!!!!!!!!!-->
              <div class="edit-imgs">
                <div class="edit-img" v-if="editData.img1">
                  <img :src="getImageUrl(editData.img1)" alt="圖片預覽" width="100px" height="100px">
                  <Button class="remove-btn" @click="removeImageForEdit(0)">刪除圖片</Button>
                </div>
                <div class="edit-img" v-if="editData.img2">
                  <img :src="getImageUrl(editData.img2)" alt="圖片預覽" width="100px" height="100px">
                  <Button class="remove-btn" @click="removeImageForEdit(1)">刪除圖片</Button>
                </div>
                <div class="edit-img" v-if="editData.img3">
                  <img :src="getImageUrl(editData.img3)" alt="圖片預覽" width="100px" height="100px">
                  <Button class="remove-btn" @click="removeImageForEdit(2)">刪除圖片</Button>
                </div>
                <!-- <div class="edit-img" v-for="imagePreview, index in imagePreviews" >
                    <img :src="imagePreview" alt="圖片預覽" width="100px" height="100px">
                    <Button class="remove-btn" @click="removeImageForEdit(index)">刪除圖片</Button>
                  </div> -->
              </div>

              <!--目前只有預覽在暫存區的圖片 ImagePreviews陣列, 要改成 "
                  1.打開燈箱的時候先預覽舊圖片(img:src讀取的方式要變更為getImageUrl(),才能吃資料庫裡的圖片)
                  2.if(舊圖片數量>=3)刪除舊圖片後可以上傳新圖片,新圖片預覽讀取方式改為吃imagePreview
                  3.else 直接上傳新圖片,新圖片預覽讀取方式改為吃imagePreview
                  
                  4.按下 確認更新 按鈕後
                  5.確認editData陣列是否正確更新,這個是要寫到資料庫表格的路徑部分
                  6.確認舊有圖片按下刪除之後是否從資料庫中刪除"-->

              <!-- <div class="file-previews">
                  <div v-if="editData.img1">{{ editData.img1 }}</div>
                  <div v-if="editData.img2">{{ editData.img2 }}</div>
                  <div v-if="editData.img3">{{ editData.img3 }}</div>
                </div> -->
              <Upload single :limit="3" action="" :before-upload="handleBeforeUploadForEdit">
                <Button icon="md-add">上傳圖片</Button>
              </Upload>
              </Col>
            </Row>

            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>消息狀態</span>
              </Col>
              <Col span="19">
              <span class="statusBtn" :class="{ 'selected': editData.status === 'draft' }"
                @click="changeStatus('draft')">草稿</span>
              <span class="statusBtn" :class="{ 'selected': editData.status === 'publish' }"
                @click="changeStatus('publish')">上架</span>
              <span class="statusBtn" :class="{ 'selected': editData.status === 'remove' }"
                @click="changeStatus('remove')">下架</span>
              </Col>
            </Row>
          </ListItem>
        </Form>
      </List>
      <template #footer>
        <Button type="dashed" @click="cancelEdit">取消</Button>
        <Button type="primary" @click="saveEditToDb">保存</Button>
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

.file-previews,
.img-previews {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.news-img {
  display: flex;
  flex-direction: column;
}

.edit-imgs {
  display: flex;
  gap: 10px;
}

.edit-img {
  display: flex;
  flex-direction: column;
  gap: 5px;
}



.remove-btn {
  width: 100px;
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