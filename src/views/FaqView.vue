<script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  const columns = ref([
    {
      type: 'selection', // 列的类型为选择框
      width: 60, // 列的宽度为 60
      align: 'center' // 文字居中显示
    },
    {
      title: '問題編號', 
      key: 'id', 
      sortable: true 
    },
    {
      title: '顯示狀態', 
      key: 'status', 
      sortable: true 
    },
    {
      title: '建立日期',
      key: 'date', 
      sortable: true 
    },
    {
      title: '問題類別', 
      key: 'type', 
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

