<script>
import apiInstance from "@/plugins/auth";

export default {
  data() {
    return {
      search:'',

      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品編號',
          key: 'id',
          sortable: true
        },
        {
          title: '商品名稱',
          key: 'name'
        },
        {
          title: '顏色',
          key: 'color'
        },
        {
          title: '尺寸',
          key:'size',
        },
        {
          title: '商品價格',
          key: 'price',
          sortable: true
        },
        {
          title: '商品類別',
          key: 'category',
          filters: [
            {
              label: '文青生活',
              value: '文青生活'
            },
            {
              label: '服飾',
              value: '服飾'
            },
            {
              label: '營地用品',
              value: '營地用品'
            }
          ],
          filterMethod(value, row) {
            return row.category.indexOf(value) > -1;
          }
        },
        {
          title: '商品狀態',
          key: 'status',
        },
        {
          title: '編輯',
          key: 'price'
        },
      ],
      data: [
        {
          id: '11111',
          name:'New York No. 1 Lake Park',
          price:  18,
          category: '文青生活',
          color: '黑',
          size: 'XL',
          status: 'true'
        },
        {
          id: '22222',
          name: 'London No. 1 Lake Park',
          price: 24,
          category: '服飾',
          color: '黑',
          size: 'XL'
        },
        {
          id: '33333',
          name: 'Sydney No. 1 Lake Park',
          price: 30,
          category: '服飾',
          color: '黑',
          size: 'XL'
        },
        {
          id: '44444',
          name: 'Ottawa No. 2 Lake Park',
          price: 26,
          category: '營地用品',
          color: '黑',
          size: 'XL'
        }
      ]
    }
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    handleFilter(){
      console.log(this.search.id)
    },
    getPHP() {
      apiInstance
        .get("./getadmin.php")
        .then((response) => {
          this.adminList = response.data;
        }
        ).catch((error) => {
          console.error("Error", error);
        });
    }
  },
  mounted() {
    
  },
}
</script>

<template>
  <main>
    <h2 class="product-title dark">商品列表管理</h2>

    <div class="product-search">
      <h4>商品列表清單</h4>
      <Input search enter-button placeholder="請輸入商品名稱或商品Id進行搜尋" class="product-id-search" v-model="this.search" @onchange="handleFilter" />
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