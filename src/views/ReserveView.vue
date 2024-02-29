<script>
import apiInstance from "@/plugins/auth";

export default {
  data() {
    return {
      // 搜尋用
      search: "",
      displayList: [],

      // 編輯用
      editIndex: -1,
      editStatue: -1,

      // 表格設定 iView 相關
      columns: [
        {
          title: "訂單編號",
          key: "reservation_id",
          width: "150",
          align: "center",
          sortable: true,
        },
        {
          title: "會員編號",
          key: "member_id",
          width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "入營日期",
          key: "checkin_date",
          // width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "拔營日期",
          key: "checkout_date",
          // width: "120",
          align: "center",
          sortable: true,
        },
        {
          title: "訂單金額",
          key: "total_price",
          width: "120",
          align: "center",
          slot: "price",
          sortable: true,
        },

        {
          title: "訂單狀態",
          key: "reserve_status",
          width: "120",
          align: "center",
          sortable: true,
          slot: "status",
        },
        {
          title: "查看",
          width: "100",
          align: "center",
          slot: "action",
        },
      ],

      // 初始讀取值
      reserveList: [],

      // 燈箱
      reserveBox: false,
      reserveData: {},

      reserveCloumn: [
        {
          title: "營區",
          key: "type_id",
          align: "center",
          width: "100",
          slot: "zone",
        },
        {
          title: "營位種類",
          key: "type_id",
          align: "center",
          slot: "type",
        },
        {
          title: "數量",
          key: "reserve_count",
          align: "center",
          width: "100",
        },
        {
          title: "晚數",
          key: "nights",
          align: "center",
          width: "100",
          slot: "nights",
        },
      ],
      equipmentCloumn: [
        {
          title: "品項編號",
          key: "equipment_id",
          align: "center",
          width: "100",
        },
        {
          title: "品項名稱",
          key: "title",
          align: "center",
        },
        {
          title: "數量",
          key: "quantity",
          align: "center",
          width: "100",
        },
      ],
    };
  },
  mounted() {
    this.getPHP();
  },
  watch: {
    search(newVal) {
      let searchList = this.reserveList.filter((item) => {
        return (
          item.reservation_id.toString().includes(newVal) ||
          item.member_id.toString().includes(newVal)
        );
      });
      this.displayList = searchList;
    },
  },
  computed: {
    nights() {
      const checkin = new Date(this.reserveData.checkin_date);
      const checkout = new Date(this.reserveData.checkout_date);

      const difference = checkout.getTime() - checkin.getTime();

      return difference / (1000 * 3600 * 24);
    },
  },
  methods: {
    formatPrice(price) {
      return "$" + price.toLocaleString("en-US");
    },
    formatStatus(status) {
      switch (parseInt(status)) {
        case 0:
          return "已取消";
          break;
        case 1:
          return "尚未入住";
          break;
        case 2:
          return "已完成";
          break;
      }
    },
    changeZoneStr(type) {
      let zoneStr = "";
      parseInt(type) < 4 ? (zoneStr = "貓區") : (zoneStr = "狗區");
      return zoneStr;
    },
    changetypeStr(type) {
      let typeStr = "";
      switch (parseInt(type)) {
        case 1:
        case 4:
          typeStr = "草地區";
          break;
        case 2:
        case 5:
          typeStr = "棧板區";
          break;
        case 3:
        case 6:
          typeStr = "雨棚區";
          break;
        default:
          typeStr = "錯誤，無分區編號";
      }
      return typeStr;
    },

    // 查看預約訂單
    openBox(index) {
      this.reserveBox = !this.reserveBox;

      this.reserveData = this.displayList[index];
      this.editStatue = this.reserveData.reserve_status.toString();
    },

    // 更改訂單狀態
    changeStatue(index) {
      let currentId = this.reserveData.reservation_id;

      let editItem = new FormData();
      editItem.append("tablename", "campsite_reservations");
      editItem.append("status", this.editStatue);
      editItem.append("id", currentId);

      apiInstance
        .post("editStatus.php", editItem)
        .then((response) => {
          if (!response.data.error) {
            alert(response.data.msg);
            this.reserveBox = false;
            this.getPHP();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    // PHP 相關 func
    getPHP() {
      apiInstance
        .get("getReserve.php")
        .then((response) => {
          this.reserveList = response.data.all.map((item) => {
            return {
              ...item.orderInfo,
              rentList: item.rentInfo,
              siteList: item.siteInfo,
            };
          });
          this.displayList = this.reserveList;
          console.log(this.reserveList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<template>
  <main>
    <h2 class="title dark">營位預約訂單管理</h2>
    <div class="search">
      <h4 class="dark">預約清單</h4>

      <Input
        class="search-input"
        search
        enter-button
        placeholder="請輸入 訂單編號 或 會員編號 進行搜尋"
        v-model="search"
      />
    </div>

    <Table class="table" height="500" :columns="columns" :data="displayList">
      <template #price="{ row, index }">
        <span>{{ formatPrice(row.total_price) }}</span>
      </template>

      <template #status="{ row, index }">
        <span>{{ formatStatus(row.reserve_status) }}</span>
      </template>
      <template #action="{ row, index }">
        <Button size="small" type="text" @click="openBox(index)"
          ><img src="@/assets/image/icon/check.svg" alt="check" />
        </Button>
      </template>
    </Table>

    <Modal
      title="預約訂單明細"
      v-model="reserveBox"
      class="vertical-center-modal"
      width="600"
      v-if="reserveBox"
    >
      <List item-layout="vertical">
        <ListItem>
          <p align="center" class="list-title">訂單資訊</p>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>入營日期：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ reserveData.checkin_date }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>拔營日期：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ reserveData.checkout_date }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>是否夜衝：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ reserveData.has_discount == 1 ? "是" : "否" }}</span>
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
                    <Option value="1">尚未入住</Option>
                    <Option value="2">訂單完成(已入住)</Option>
                    <Option value="0">訂單已取消</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="changeStatue">儲存</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </ListItem>

        <ListItem>
          <p align="center" class="list-title">營位預定明細</p>
          <Table
            border
            class="table"
            :columns="reserveCloumn"
            :data="reserveData.siteList"
          >
            <template #zone="{ row, index }">
              <span>{{ changeZoneStr(row.type_id) }}</span>
            </template>
            <template #type="{ row, index }">
              <span>{{ changetypeStr(row.type_id) }}</span>
            </template>
            <template #nights="{ row, index }">
              <span>{{ nights }}</span>
            </template>
          </Table>
        </ListItem>

        <ListItem>
          <p align="center" class="list-title">裝備租借明細</p>
          <Table
            border
            class="table"
            :columns="equipmentCloumn"
            :data="reserveData.rentList"
          >
          </Table>
        </ListItem>

        <ListItem>
          <p align="center" class="list-title">訂購人資訊</p>
          <Row class="row" justify="center" align="middle">
            <!-- Col span為欄位比例，總和是=24 -->
            <Col span="5" align="center" class="row-title">
              <span>會員編號：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ reserveData.member_id }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>姓名：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ reserveData.name }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>email：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ reserveData.email }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>電話：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ reserveData.phone }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>地址：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ reserveData.address }}</span>
            </Col>
          </Row>
        </ListItem>

        <ListItem>
          <p align="center" class="list-title">付款資訊</p>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>營位金額小計：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ formatPrice(reserveData.camp_price) }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>裝備金額小計：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ formatPrice(reserveData.equipment_price) }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class="row-title">
              <span>總金額：</span>
            </Col>
            <Col span="19" class="row-content">
              <span>{{ formatPrice(reserveData.total_price) }}</span>
            </Col>
          </Row>
        </ListItem>
      </List>
      <template #footer>
        <Button @click="reserveBox = false">關閉</Button>
      </template>
    </Modal>
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
