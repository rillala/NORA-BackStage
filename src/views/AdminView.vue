<script>
export default {};
</script>

<template>
  <main>
    <h2 class="title dark">管理員管理</h2>
    <div class="search">
      <h4 class="dark">管理員清單</h4>

      <Input class="search-input" search enter-button placeholder="請輸入管理員編號進行搜尋" v-model="search" />
    </div>

    <div class="zoneType">
      <!-- <Button id="catZoneBtn" size="large" :type="choseZone === 'cat' ? 'primary' : 'default'"
        @click="showCatZone">貓區</Button>
      <Button id="dogZoneBtn" size="large" :type="choseZone === 'dog' ? 'primary' : 'default'"
        @click="showDogZone">狗區</Button> -->
    </div>

    <br />

    <Table class="table" height="500" :columns="columns" :data="selectedList">
      <template #info="{ row, index }">
        <Input type="text" v-model="editInfo" v-if="editIndex === index" />
        <span v-else>{{ row.info }}</span>
      </template>
      <template #status="{ row, index }">
        <!--switch btn-->
        <Switch true-color="#13ce66" false-color="#ff4949" v-model="row.openStatus" @on-change="statusChange(index)" />
      </template>
      <template #action="{ row, index }">
        <div v-if="editIndex === index">
          <Button type="text" @click="handleSave(index)"><img src="@/assets/image/icon/save.svg" alt="saveBtn" />
          </Button>
          <Button type="text" @click="editIndex = -1"><img src="@/assets/image/icon/close.svg" alt="closeBtn">
          </Button>
        </div>
        <div v-else>
          <Button size="small" type="text" @click="handleEdit(row, index)"><img src="@/assets/image/icon/edit.svg"
              alt="editBtn" />
          </Button>
        </div>
      </template>
      <template #delete="{ row, index }">
        <Button class="btn" type="text" size="small" @click="remove(index)"><img src="@/assets/image/icon/delete.svg"
            alt="deleteBtn" />
        </Button>
      </template>
    </Table>
  </main>
</template>

<style lang="scss" scoped>
.test {
  width: 100px;
  height: 100px;
}

.search {
  width: 400px;

  .ivu-input-search {
    background: $blue-3;
  }
}

h2 {
  margin-bottom: 20px;
}

h4 {
  font-weight: 700;
  margin-bottom: 5px;
}

.zoneType {
  display: flex;
  justify-content: end;
  gap: 20px;
}

.table {
  width: 100%;
}
</style>

<style lang="scss" scoped></style>
