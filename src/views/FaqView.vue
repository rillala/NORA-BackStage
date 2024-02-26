<script setup>
  import { ref, onMounted , computed } from 'vue';
  import apiInstance from "@/plugins/auth";
  import { Row } from 'view-ui-plus';

  const columns = ref([
    {
      type: 'selection', // 列的类型为选择框
      width: 60, // 列的宽度为 60
      align: 'center' // 文字居中显示
    },
    {
      width: 120,
      align: 'center',
      title: '問題編號', 
      key: 'faq_id', 
      sortable: true 
    },
    {
      width: 120,
      align: 'center',
      title: '顯示狀態', 
      key: 'faq_status', 
      sortable: true 
    },
    {
      width: 140,
      align: 'center',
      title: '問題類別', 
      key: 'faq_type', 
      sortable: true 
    },
    {
      title: '問題', 
      key: 'question' 
    },
    {
      title: '回答', 
      key: 'answer' 
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
  ]);
  const quesList = ref([]);
  const addBtn = ref(false);
  const editFlag = ref(false);
  const editFaq = ref({
    faq_id:-1,
    faq_type:'',
    question:'',
    answer:'',
    faq_status:'1',
  });
  const addFaq = ref({
    faq_type:'',
    question:'',
    answer:'',
    faq_status:null,
    date: new Date().toLocaleString(),
  })

  function getPHP(){
    apiInstance.get("./getFaq.php") // API請求獲取getFaq.php檔的數據
    .then((response) => {
      quesList.value = response.data; // 將獲取到的數據賦職
    })
    .catch((error) => {
      console.error("Error", error); // 輸出錯誤訊息給主控台
    });
  } 
  onMounted( () => {
    try {
      getPHP();
      
    } catch (error) {
      console.error('發生錯誤:', error);
    }
  });
  function addNew(){
    // 新增燈箱開關
    addBtn.value = !addBtn.value;
  }
  function storeToDB(){
    // 新增數據 然後post to PHP
    // 新增燈箱裡的儲存按鈕
    //先確認燈箱填寫狀態
    if(checkInput()){
      //T，post to PHP
      apiInstance
        .post("addFaq.php", addFaq.value)
        .then((response) => {
          if (!response.error) {
            alert(response.data.msg);
            getPHP();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          console.log("錯誤",addFaq.value);
        });
    }
  }
  function checkInput() {
    console.log(addFaq.value.faq_type)
    //檢查新增燈箱是否皆已填寫
    if(!addFaq.value.faq_type){
      alert("請選擇問題分類");
    }else if(!addFaq.value.question){
      alert("請填寫標題");
    }else if(!addFaq.value.answer){
      alert("請填寫回應");
    }else if(!addFaq.value.faq_status){
      alert("請選擇問題是否顯示");
    }else{
      return true;
    }
  }
  function editData(index){
    //編輯燈箱開關
    editFlag.value = !editFlag.value;
    //撈取數據
    // editFaq.value = {
    //   faq_type: index.faq_type,
    //   question: index.question,
    //   answer:index.answer,
    //   faq_status:index.faq_status,
    // };上下兩種寫法都OK
    editFaq.value.faq_id = index.faq_id;
    editFaq.value.faq_type = index.faq_type;
    editFaq.value.question = index.question;
    editFaq.value.answer = index.answer;
    editFaq.value.faq_status = String(index.faq_status);//SQL改字串儲存or轉型string
    
    console.log(index.faq_id);
    //用index.faq_id檢索SQL PK
  }
  function saveData(){
    //編輯燈箱裡的儲存按鈕
    if(editFaq.value.faq_status == '0'){
      editFaq.value.faq_status = 0;
    }else{
      editFaq.value.faq_status = 1;
    }

    apiInstance
    .post("editFaq.php", editFaq.value) //更新文章的後端API
    .then((response) => {
      // 處理請求成功的情況
      // if(!response.data){
        console.log("Updated successfully", response);
        editFlag.value = false;
        // 刷新文章列表等操作
        getPHP(); // 重新獲取文章列表數據
        console.log(response.data);
        alert(response.data.msg);
      // }
    })
    .catch((error) => {
      // 處理請求失敗的情況
      console.error("Error updating FAQ", error);
    });
  }
  function remove(index){
    if(confirm("是否確認刪除？")){ 
      //彈窗確認是否刪除(true/false)
      console.log(quesList.value[index]);
      let selectItem = quesList.value[index];
      let deleteItem = new FormData();
      deleteItem.append("tablename" , "faq_management");
      deleteItem.append("id" , selectItem.faq_id);

      apiInstance
      .post("deleteData.php", deleteItem)
      .then((response) => {
        if (!response.data.error) {
          alert(response.data.msg);
          getPHP();
      console.log(response.data);

        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  }
  const pageSize = ref(10);
  const nowPage = ref(1);
  const currentPageData = computed(() => {
    //根據目前頁碼和每頁顯示資料數計算目前頁面的資料數據
    const start = (nowPage.value - 1) * pageSize.value;
    const end = start + pageSize.value ;
    return quesList.value.slice(start, end);
  });

  const handlePageChange = (page) => {
    nowPage.value = page;
  };
</script>


<template>

  <main>
    <h2 class="dark">常見問題管理</h2>

    <div class="search">
      <h4>常見問題清單</h4>
      <Input 
        search 
        enter-button 
        class="searchInput"
      />
    </div>
    <!-- 新增按鈕 -->
    <div class="add-btn">
      <Button class="add" @click="addNew()">新增</Button>
    </div>
    <!-- 新增燈箱 -->
      <Modal title="新增常見問題" v-model="addBtn" class="vertical-center-modal" width="600">
      <List item-layout="vertical">
        <Form>
          <ListItem justify="center" align="middle">
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
                <span>問題類別：</span>
              </Col>
              <Col span="19">
                <FormItem>
                  <Select v-model="addFaq.faq_type">
                    <Option value="營地預約">營地預約</Option>
                    <Option value="中途之家">中途之家</Option>
                    <Option value="裝備租借">裝備租借</Option>
                    <Option value="商品購物">商品購物</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" >
                <span>問題：</span>
              </Col>
              <Col span="19" align="center">
                <Input placeholder="請輸入標題" v-model="addFaq.question"/>
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" >
                <span>回答：</span>
              </Col>
              <Col span="19" align="center">
                <Input type="textarea" :rows="4" placeholder="請輸入回覆" v-model="addFaq.answer"/> 
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
                <span>顯示狀態</span>
              </Col>
              <Col span="19" align="start">
                <RadioGroup  v-model="addFaq.faq_status">
                  <Radio label="1" class="radioStyle">顯示</Radio>
                  <Radio label="0" class="radioStyle">隱藏</Radio>
                </RadioGroup>
              </Col>
            </Row>
          </ListItem>
        </Form>
      </List>
      <template #footer>
        <Button type="dashed" @click="addNew()">取消</Button>
        <Button type="primary" @click="storeToDB()">儲存</Button>
      </template>
    </Modal>
    <!-- 編輯燈箱 -->
    <Modal title="修改常見問題" v-model="editFlag" class="vertical-center-modal" width="600">
      <List item-layout="vertical">
        <Form>
          <ListItem justify="center" align="middle">
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
                <span>問題類別：</span>
              </Col>
              <Col span="19">
                <FormItem>
                  <Select v-model="editFaq.faq_type">
                    <Option value="營地預約">營地預約</Option>
                    <Option value="中途之家">中途之家</Option>
                    <Option value="裝備租借">裝備租借</Option>
                    <Option value="商品購物">商品購物</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" >
                <span>問題：</span>
              </Col>
              <Col span="19" align="center">
                <Input placeholder="請輸入標題" v-model="editFaq.question" />
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" >
                <span>回答：</span>
              </Col>
              <Col span="19" align="center">
                <Input type="textarea" :rows="4" placeholder="請輸入回覆" v-model="editFaq.answer"/> 
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
                <span>顯示狀態</span>
              </Col>
              <Col span="19" align="start">
                <RadioGroup  v-model="editFaq.faq_status">
                  <Radio label="1" class="radioStyle">顯示</Radio>
                  <Radio label="0" class="radioStyle">隱藏</Radio>
                </RadioGroup>
              </Col>
            </Row>
          </ListItem>
        </Form>
      </List>
      <template #footer>
        <Button type="dashed" @click="editData()">取消</Button>
        <Button type="primary" @click="saveData()">儲存</Button>
      </template>
    </Modal>
    <!-- 數據列表 -->
    <Table class="table" :columns="columns" :data="currentPageData">
      <template #title="{ row }">
        <strong>{{ row.title }}</strong>
      </template>

      <template #edit="{ row, index }">
          <Button size="small" @click="editData(row)">
            <img src="@/assets/image/icon/edit.svg" alt="編輯按鈕" />
          </Button>
      </template>

      <template #delete="{ row, index }">
          <Button size="small" @click="remove(index)">
            <img src="@/assets/image/icon/delete.svg" alt="刪除按鈕" />
          </Button>
      </template>
    </Table>
    <Page :total="quesList.length" show-total  :page-size="pageSize" @on-change="handlePageChange"/>
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

.searchInput {
  width: 400px;
}

.search {
  margin-bottom: 60px;
}

.add-btn {
  display: flex;
  
}
.form-row {
  margin: 5px 40px;
}
.radioStyle{
  margin: 20px;
}
</style>

