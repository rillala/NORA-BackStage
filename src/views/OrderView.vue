<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";
import AddProduct from "@/components/addProduct.vue";

export default {
  components: { AddProduct },
  data() {
    return {
      search: '',
      products: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品圖片',
          key: 'images',
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
          key: 'size',
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
              label: 'NORA文青生活',
              value: 'NORA文青生活'
            },
            {
              label: 'NORA品牌服飾',
              value: 'NORA品牌服飾'
            },
            {
              label: 'NORA營地用品',
              value: 'NORA營地用品'
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
          title: '上架日期',
          key: 'createdDate',
          sortable: true,
        },
        {
          title: '編輯',
          key: 'price'
        },
      ],
      data: [
        {
          id: '11111',
          name: 'New York ',
          price: 18,
          category: '文青生活',
          color: '黑',
          size: 'XL',
          status: 'true'
        },
        {
          id: '22222',
          name: 'London',
          price: 24,
          category: '服飾',
          color: '黑',
          size: 'XL'
        },
        {
          id: '33333',
          name: 'Sydney',
          price: 30,
          category: '服飾',
          color: '黑',
          size: 'XL'
        },
        {
          id: '44444',
          name: 'Ottawa',
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
    handleFilter() {
      console.log(this.search.id)
    },
    getProducts() {
      apiInstance
        .get("./getProduct.php")
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    getImageUrl(image) {
      // 如果您的圖片路徑是相對於後端服務器的，這裡可能需要添加基礎URL
      return getImageUrl(image);
    },
    refreshPage(){
      window.location.reload();
    }
  },
  created() {
    this.getProducts();
  },
}
</script>

<template>
  <main>
    <h2 class="product-title dark">商品列表管理</h2>

    <div class="product-search">
      <h4>商品列表清單</h4>
      <Input search enter-button placeholder="請輸入商品名稱或商品Id進行搜尋" class="product-id-search" v-model="this.search"
      @onchange="handleFilter" />
    </div>
    <AddProduct @product-changed="refreshPage"></AddProduct>
    <Table class="product-table" border ref="selection" :columns="columns" :data="data">
    
    </Table>
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

.product-table {
  margin-top: 20px;
}
</style>