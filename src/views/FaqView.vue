<script setup>
  import { ref, onMounted } from 'vue';
  import apiInstance from "@/plugins/auth";
import { Row } from 'view-ui-plus';

  const columns = ref([
    {
      type: 'selection', // 列的类型为选择框
      width: 60, // 列的宽度为 60
      align: 'center' // 文字居中显示
    },
    {
      title: '問題編號', 
      key: 'faq_id', 
      sortable: true 
    },
    {
      title: '顯示狀態', 
      key: 'faq_status', 
      sortable: true 
    },
    {
      title: '建立日期',
      key: 'date', 
      sortable: true 
    },
    {
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
  const selectDefault = ref('1');

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
    addBtn.value = !addBtn.value;
  }
  function store(){
    // 新增數據
  }

  function showDetail(){
  }

  function remove(index){}
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
    <!-- 燈箱 -->
      <Modal title="新增常見問題" v-model="addBtn" class="vertical-center-modal" width="600">
      <List item-layout="vertical">
        <Form>
          <ListItem justify="center" align="middle">
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
                <span>問題類別：</span>
              </Col>
              <Col span="19">
                <FromeItem>
                  <Select>
                    <Option value="營地預約">營地預約</Option>
                    <Option value="中途之家">中途之家</Option>
                    <Option value="裝備租借">裝備租借</Option>
                    <Option value="商品購物">商品購物</Option>
                  </Select>
                </FromeItem>
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" >
                <span>問題：</span>
              </Col>
              <Col span="19" align="center">
                <Input placeholder="請輸入標題" />
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center" >
                <span>回答：</span>
              </Col>
              <Col span="19" align="center">
                <Input type="textarea" :rows="4" placeholder="請輸入回覆" /> 
              </Col>
            </Row>
            <Row class="form-row" justify="center" align="middle">
              <Col span="5" align="center">
                <span>顯示狀態</span>
              </Col>
              <Col span="19" align="start">
                <RadioGroup  v-model="selectDefault">
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
        <Button type="primary" @click="store()">儲存</Button>
      </template>
    </Modal>

    <!-- 數據列表 -->
    <Table class="table" :columns="columns" :data="quesList">
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

