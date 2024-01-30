<script>
export default {};
</script>

<template>
  <main></main>
</template>

<style lang="scss" scoped></style>
<template>
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
      <Col span="4"><font-awesome-icon :icon="['fas', 'file-pen']" /></Col>
    </Row> 
    <font-awesome-icon :icon="['fas', 'file-pen']" />
    <i class="fa-solid fa-file-pen"></i>
    </div>
</template>

<style lang="scss" scoped>

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
