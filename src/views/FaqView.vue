<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

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
  ]);

  const loading = ref(true);
  const quesList = ref([]);

  onMounted(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_NORA_URL}/phps/getFaq.php`);
      quesList.value = response.data;
      loading.value = true;
    } catch (error) {
      console.error('發生錯誤:', error);
      loading.value = false;
    }
});
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

  <div class="add-btn">
    <Button class="add" @click="addNew()">新增</Button>
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

.searchInput {
  width: 400px;
}

.search {
  margin-bottom: 60px;
}

.add-btn {
  display: flex;
  justify-content: flex-end;
}

</style>

