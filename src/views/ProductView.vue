<script>
export default {
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品編號',
          key: 'name',
          sortable: true
        },
        {
          title: '商品名稱',
          key: 'age'
        },
        {
          title: '商品價格',
          key: 'address',
          sortable: true
        },
        {
          title: '商品類別',
          key: 'address',
          filters: [
            {
              label: 'New York',
              value: 'New York'
            },
            {
              label: 'London',
              value: 'London'
            },
            {
              label: 'Sydney',
              value: 'Sydney'
            }
          ],
          filterMethod(value, row) {
            return row.address.indexOf(value) > -1;
          }
        },
        {
          title: '商品狀態',
          key: 'address'
        },
        {
          title: '編輯',
          key: 'address'
        },
      ],
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    }
  }
}
</script>

<template>
  <main>
    <h2 class="product-title dark">商品列表管理</h2>

    <div class="product-search">
      <h4>商品列表清單</h4>
      <Input search enter-button placeholder="請輸入商品名稱或商品Id進行搜尋" class="product-id-search" v-model="newsFilter" />
    </div>
    <Table class="product-table" border ref="selection" :columns="columns" :data="data"></Table>
    <div style="margin-top: 16px">
      <Button @click="handleSelectAll(true)">Set all selected</Button>
      <Button @click="handleSelectAll(false)">Cancel all selected</Button>
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
.product-table{
  margin-top: 20px;
}

</style>
