<script>
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

<template>
  <main>
    <h2 class="title dark">營地管理</h2>
    <div class="search">
      <h4 class="dark">營地清單</h4>
      <Space direction="vertical" size="large" type="flex">
        <Input
          class="search-input"
          search
          enter-button
          placeholder="請輸入營位編號進行搜尋"
          v-model="search"
        />
      </Space>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.search {
  width: 300px;
}
</style>
