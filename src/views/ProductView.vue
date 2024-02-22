<template>
  <AddProduct @product-changed="refreshPage"></AddProduct>
  <div>
    <h2>商品列表</h2>
    <div>

    </div>
    <div v-if="products.length === 0">尚無商品</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>商品圖片</th>
            <th>商品標題</th>
            <th>商品類別</th>
            <th>商品描述</th>
            <th>商品價格</th>
            <th>商品狀態</th>
            <th>建立日期</th>
            <th>商品顏色</th>
            <th>商品尺寸</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.product_id">
            <td>
              <!-- 顯示多張圖片 -->
              <Carousel loop style="width: 100px;">
                <CarouselItem v-for="(image, index) in product.images" :key="index" style="width: 100px;">
                  <img :src="getImageUrl(image)" alt="商品圖片" style="width: 100px; height: auto; object-fit: contain;">
                </CarouselItem>
              </Carousel>
            </td>
            <td>{{ product.title }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.state }}</td>
            <td>{{ product.createdate }}</td>
            <td>{{ product.color }}</td>
            <td>{{ product.size }}</td>
            <td><Button type="primary">編輯</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiInstance from "@/plugins/auth";
import AddProduct from "@/components/addProduct.vue";
import { getImageUrl } from "@/assets/js/common";


export default {
  components: { AddProduct },
  data() {
    return {
      products: []
    };
  },
  created() {
    this.getProducts();
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
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  width: 100px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>


