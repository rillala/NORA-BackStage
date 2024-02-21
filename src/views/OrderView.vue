<script>
import apiInstance from "@/plugins/auth";
import { getImageUrl } from "@/assets/js/common";
import AddProduct from "@/components/addProduct.vue";
import EditProduct from "@/components/editProduct.vue";

export default {
  components: { AddProduct, EditProduct},
  data() {
    return {
      isEditDialogVisible: false,
      currentProductData: {},
      search: '',
      products: [],
      columns: [

        {
          title: '商品編號',
          key: 'product_id',
          sortable: true,
          width: 100
        },
        {
          title: '商品圖片',
          slot: 'images',
          width: 120
        },
        {
          title: '商品名稱',
          key: 'title'
        },
        {
          title: '顏色',
          key: 'colors',
        },
        {
          title: '尺寸',
          key: 'sizes',
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
          key: 'state'
        },
        {
          title: '上架日期',
          key: 'createdate',
          sortable: true,
        },
        {
          title: '編輯',
          slot: 'action',
        },
      ],
    }
  },
  methods: {
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
    refreshPage() {
      window.location.reload();
    },
    showEditDialog(product) {
      this.currentProductData = product;
      this.isEditDialogVisible = true;
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
    <Table class="product-table" height="500" ref="selection" :columns="columns" :data="products">
      <template #images="{ row }">
        <Carousel loop style="width: 100px; height: auto;">
          <CarouselItem v-for="(image, index) in row.images" :key="index">
            <Image :src="getImageUrl(image)" alt="商品圖片" fit="cover" width="100%" height="100%" />
          </CarouselItem>
        </Carousel>
      </template>
      <template #action="{ row }">
        <Button @click="showEditDialog(row)">編輯</Button>
      </template>
      <EditProduct v-if="isEditDialogVisible" :productData="currentProductData" @close="isEditDialogVisible = false"></EditProduct>
    </Table>
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