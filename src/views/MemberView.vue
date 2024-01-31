<script>
export default {};
</script>

<template>
  <main>
    <h2 class="title dark">會員管理</h2>
    <div class="search">
      <h4 class="dark">會員清單</h4>
      <Space direction="vertical" size="large" type="flex">
        <Input
          class="search-input"
          search
          enter-button
          placeholder="請輸入會員編號進行搜尋"
          v-model="search"
        />
      </Space>
    </div>
  </main>
  <div class="admin">
    <Row justify="center" class="code-row-bg custom-row-bg ">
      <Col span="4">管理員編號</Col>
      <Col span="4">管理員名稱</Col>
      <Col span="4">管理員帳號</Col>
      <Col span="4">管理員密碼</Col>
      <Col span="4">帳號狀態</Col>
      <Col span="4">編輯</Col>
    </Row>
    <Row justify="center" class="code-row-bg">
      <Col span="4">1</Col>
      <Col span="4">測試用</Col>
      <Col span="4">nora0101</Col>
      <Col span="4">123nora321</Col>
      <Col span="4"><Switch  true-color="#B6FF7D" false-color="#FF8686" class="btn"/></Col>
      <Col span="4"></Col>
    </Row> 
    <Row justify="center" class="code-row-bg">
      <Col span="4">1</Col>
      <Col span="4">測試用</Col>
      <Col span="4">nora0101</Col>
      <Col span="4">123nora321</Col>
      <Col span="4"><Switch  true-color="#B6FF7D" false-color="#FF8686" class="btn"/></Col>
      <Col span="4"></Col>
    </Row> 
  
    </div>
</template>

<style lang="scss" scoped>
.search {
  width: 300px;
}

.admin{
  width:800px;
}
.custom-row-bg {
  background-color: $blue-3; 
  color: $white01;
  @include font-style(16px, 400, 1%, 160%)
}
.btn{
  margin-top:2px;
  margin-left:10px;
  
}

</style>
