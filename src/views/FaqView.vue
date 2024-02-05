<script setup>

</script>

<template>
  <main>
    <h2 class="news-title dark">常見問題管理</h2>

    <div class="news-search">
      <h4>常見問題清單</h4>
      <Input 
        search 
        enter-button 
        placeholder="請輸入關鍵字進行搜尋" class="news-id-search"
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

