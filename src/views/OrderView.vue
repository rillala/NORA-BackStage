<script>
import apiInstance from "@/plugins/auth";
import { Button, Table, Input } from "view-ui-plus";

export default {
  components: { Button, Table, Input },
  data() {
    return {
      orders: [],
      search: '',
      orderBox: false,
      currentOrderDetails: [],
      orderDetailData: [],
      filteredOrders: [],
      // 編輯用
      editIndex: -1,
      editStatue: '',

      columns: [
        {
          title: '訂單編號',
          key: 'order_id',
          sortable: true,
        },
        {
          title: '訂購人',
          key: 'name',
        },
        {
          title: '訂購時間',
          key: 'order_date',
          sortable: true,
        },
        {
          title: '訂單金額',
          key: 'total_amount',
          sortable: true
        },
        {
          title: '運送方式',
          key: 'delivery_method',
          filters: [
            { label: '超商取貨', value: '超商取貨' },
            { label: '宅配', value: '宅配' },
            { label: '自行取貨', value: '自行取貨' },
          ],
          filterMethod(value, row) {
            return row.delivery_method === value;
          }
        },
        {
          title: '付款方式',
          key: 'payment',
          filters: [
            { label: '信用卡付款', value: '信用卡付款' },
            // 可以根据需要添加更多付款方式
          ],
          filterMethod(value, row) {
            return row.payment === value;
          }
        },
        {
          title: '訂單狀態',
          key: 'order_status',
          filters: [
            { label: '待出貨', value: '待出貨' },
            { label: '運送中', value: '運送中' },
            { label: '已送達', value: '已送達' },
            { label: '已完成', value: '已完成' },
            { label: '訂單取消', value: '訂單取消' },
          ],
          filterMethod(value, row) {
            return row.order_status === value;
          }
        },
        {
          title: '查看',
          key: 'action',
          slot: 'action',
        },
      ],
      orderDetailColumn: [
        {
          title: '商品編號',
          key: 'product_id',
          slot: 'product_id',
        },
        {
          title: '商品名稱',
          key: 'title',
          slot: 'title',
        },
        {
          title: '顏色',
          key: 'color',
          slot: 'color',
        },
        {
          title: '尺寸',
          key: 'size',
          slot: 'size',
        },
        {
          title: '數量',
          key: 'quantity',
          slot: 'quantity',
        },
        {
          title: '小計',
          key: 'subtotal',
          slot: 'subtotal',
        },
      ]
    }
  },
  methods: {
    getOrders() {
      apiInstance.get("/getOrders.php")
        .then(response => {
          this.orders = response.data;
          this.filterOrders();
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    filterOrders() {
      if (!this.search) {
        this.filteredOrders = this.orders;
      } else {
        this.filteredOrders = this.orders.filter(order => {
          return order.name.includes(this.search) || order.order_id.toString().includes(this.search);

        });
      }
    },
    refreshPage() {
      this.getOrders();
    },
    //查看訂單明細
    viewOrderDetails(row) {
      apiInstance.get(`/getOrderDetails.php?order_id=${row.order_id}`)
        .then(response => {
          // 假設返回的資料結構直接對應於Modal中需要顯示的數據
          this.currentOrderDetails = response.data[0]; // 假設返回的是一個陣列，取第一項作為當前訂單詳細資訊
          this.orderDetailData = response.data; // 保存所有訂單明細項目
          this.editStatue = this.currentOrderDetails.order_status; // 初始化下拉选单的预设值
          this.orderBox = true; // 打開Modal
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    saveOrderStatus() {
      const payload = {
        order_id: this.currentOrderDetails.order_id,
        order_status: this.editStatue, // 新的订单状态
      };

      apiInstance.post('/updateOrderStatus.php', payload)
        .then(response => {
          if (response.data.success) {
            this.orderBox = false;
            this.getOrders();
            alert('訂單狀態已更新')
          } else {
            // 处理错误情况
            console.error("更新失败", response.data.message);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  },
  watch: {
    search(newVal) {
      this.filterOrders();
    }
  },
  created() {
    this.getOrders();
  },
  openBox(index) {
    this.orderBox = !this.orderBox;
  }
}
</script>

<template>
  <main>
    <h2 class="product-title dark">商品訂單管理</h2>
    <div class="product-search">
      <h4>商品訂單清單</h4>
      <Input class="search" search enter-button placeholder="請輸入訂單編號或訂購人名稱進行搜尋" v-model="search" />
    </div>
    <Table class="product-table" height="500" :columns="columns" :data="filteredOrders">
      <template #action="{ row }">
        <Button @click="viewOrderDetails(row)">查看</Button>
      </template>
    </Table>
  </main>

  <Modal title="商品訂單明細" v-model="orderBox" class="vertical-center-modal" width="600">
    <List item-layout="vertical">
      <ListItem>
        <p align="center" class="list-title">訂單明細</p>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>訂購編號:</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.order_id }}</span>
          </Col>
        </Row>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>購買人姓名：</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.name }}</span>
          </Col>
        </Row>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>購買人電話：</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.phone }}</span>
          </Col>
        </Row>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>購買人地址：</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.address }}</span>
          </Col>
        </Row>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>訂單狀態：</span>
          </Col>
          <Col span="19">
          <Form class="reserve-Status">
            <FormItem class="Status-col">
              <Select v-model="editStatue">
                <Option value="待出貨">待出貨</Option>
                <Option value="運送中">運送中</Option>
                <Option value="已送達">已送達</Option>
                <Option value="已完成">已完成</Option>
                <Option value="取消">取消</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="saveOrderStatus">儲存</Button>
            </FormItem>
          </Form>
          </Col>
        </Row>
      </ListItem>

      <ListItem>
        <p align="center" class="list-title">訂單資訊</p>
        <Table border class="table" :columns="orderDetailColumn" :data="orderDetailData">
          <template #product_id="{ row }">
            {{ row.product_id }}
          </template>
          <template #title="{ row }">
            {{ row.title }}
          </template>
          <template #color="{ row }">
            {{ row.color }}
          </template>
          <template #size="{ row }">
            {{ row.size }}
          </template>
          <template #quantity="{ row }">
            {{ row.quantity }}
          </template>
          <template #subtotal="{ row }">
            {{ row.subtotal }}
          </template>
        </Table>
      </ListItem>

      <ListItem>
        <p align="center" class="list-title">付款及運送資訊</p>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>訂單合計：</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.subtotal }}</span>
          </Col>
        </Row>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>付款方式:</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.payment }}</span>
          </Col>
        </Row>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>運送方式：</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.delivery_method }}</span>
          </Col>
        </Row>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>運費：</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.delivery_fee }}</span>
          </Col>
        </Row>
        <Row class="row" justify="center" align="middle">
          <Col span="5" align="center" class="row-title">
          <span>總金額：</span>
          </Col>
          <Col span="19" class="row-content">
          <span>{{ this.currentOrderDetails.total_amount }}</span>
          </Col>
        </Row>
      </ListItem>
    </List>
    <template #footer>
      <Button @click="orderBox = false">關閉</Button>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 20px;
}

h4 {
  font-weight: 700;
  margin-bottom: 5px;
}

.search {
  width: 400px;

  .ivu-input-search {
    background: $blue-3;
  }
}

.product-table {
  margin-top: 20px;
}

.btn {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.zoneType {
  display: flex;
  justify-content: end;
  gap: 20px;
}

.table {
  width: 100%;
}

//預約訂單明細
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-center-modal .ivu-modal {
  top: 0;
}

.row {
  padding: 5px 40px;
}

.list-title {
  padding-bottom: 10px;
}

.row-content {
  border: 1px solid #dcdee2;
  border-radius: 3px;
  height: 30px;
  display: flex;
  align-items: center;
  cursor: not-allowed;

  span {
    padding-left: 8px;
  }
}

.table {
  margin: 20px 0;
}

.reserve-Status {
  display: flex;

  .Status-col {
    flex-grow: 1;
    margin-right: 10px;
  }
}
</style>