<script>
import { List, ListItem, ListItemMeta, Input } from 'view-ui-plus';


export default {
  components: { ListItemMeta, ListItem, List, Input },
  data() {
    return {
      modal1: false,
      //^^^預約訂單明細燈箱^^^
      modal2: false,
      //^^^新增商品燈箱^^^
      reserveData: [
        {
          reserveId: 10001,
          clientName: "Peter",
          clientPhone: "0912345678",
          checkinDate: "2024-02-08",
          checkoutDate: "2024-02-10",
          hasDiscount: "是",
          reserveDetail: [
            {
              zoneType: "貓區",
              siteType: "雨棚區",
              count: "1",
              nights: "2",
            }
          ],
          equipmentDetail: [
            {
              equipmentId: 1001,
              equipmentName: "兩人帳篷",
              equipmentCount: 1,
            }
          ],
          price: "3000",
          paymentMethod: "信用卡",
        }
      ],
      reserveStatus: "未入住",
      reserveCloumn: [
        {
          title: "營區",
          key: "zoneType",
          align: 'center'
        },
        {
          title: "營位種類",
          key: "siteType",
          align: 'center'
        },
        {
          title: "數量",
          key: "count",
          align: 'center',
          width: "80",
        },
        {
          title: "晚數",
          key: "nights",
          align: 'center',
          width: "80",
        },
      ],
      equipmentCloumn: [
        {
          title: "品項編號",
          key: "equipmentId",
          align: 'center',
          width: "100"
        },
        {
          title: "品項名稱",
          key: "equipmentName",
          align: 'center',
        },
        {
          title: "數量",
          key: "equipmentCount",
          align: 'center',
          width: "80",
        }
      ],
      //^^^^^預約訂單明細^^^^^
      nameValue: "",
      priceValue: "",
      descriptionValue: "",
      categoryValue: "服飾",
      index: 1,
      formDynamic: {
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    }
  }
}
</script>

<template>
  <Space wrap>

    <Button @click="modal1 = true">查看預約訂單明細</Button>

    <Modal title="預約訂單明細" v-model="modal1" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消">
      <List item-layout="vertical">
        <ListItem v-for="reserveOrd in reserveData" :key="clientId">
          <p align="center" class="list-title">預約人資訊</p>
          <Row class="row" justify="center" align="middle">
            <!-- Col span為欄位比例，總和是=24 -->
            <Col span="5" align="center" class=" row-title">
            <span>預約編號：</span>
            </Col>
            <Col span="19" class="row-content">
            <span>{{ reserveOrd.reserveId }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
            <span>預約人姓名：</span>
            </Col>
            <Col span="19" class="row-content">
            <span>{{ reserveOrd.clientName }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
            <span>預約人電話：</span>
            </Col>
            <Col span="19" class="row-content">
            <span>{{ reserveOrd.clientPhone }}</span>
            </Col>
          </Row>
        </ListItem>
        <ListItem v-for="reserveOrd in reserveData" :key="clientId">
          <p align="center" class="list-title">訂單資訊</p>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
            <span>入營日期：</span>
            </Col>
            <Col span="19" class="row-content">
            <span>{{ reserveOrd.checkinDate }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
            <span>拔營日期：</span>
            </Col>
            <Col span="19" class="row-content">
            <span>{{ reserveOrd.checkoutDate }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
            <span>是否夜衝：</span>
            </Col>
            <Col span="19" class="row-content">
            <span>{{ reserveOrd.hasDiscount }}</span>
            </Col>
          </Row>
        </ListItem>
        <ListItem>
          <p align="center" class="list-title">預定營位</p>
          <Table border class="table" v-for="reserveOrd in reserveData" :columns="reserveCloumn"
            :data="reserveOrd.reserveDetail">
          </Table>
        </ListItem>
        <ListItem>
          <p align="center" class="list-title">租借裝備</p>
          <Table border class="table" v-for="reserveOrd in reserveData" :columns="equipmentCloumn"
            :data="reserveOrd.equipmentDetail">
          </Table>
        </ListItem>
        <ListItem v-for="reserveOrd in reserveData" :key="clientId">
          <p align="center" class="list-title">付款資訊</p>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
            <span>訂單金額：</span>
            </Col>
            <Col span="19" class="row-content">
            <span>{{ reserveOrd.price }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
            <span>付款方式：</span>
            </Col>
            <Col span="19" class="row-content">
            <span>{{ reserveOrd.paymentMethod }}</span>
            </Col>
          </Row>
          <Row class="row" justify="center" align="middle">
            <Col span="5" align="center" class=" row-title">
            <span>付款狀態：</span>
            </Col>
            <Col span="19">
            <From class="reserve-Status">
              <FromItem class="Status-col">
                <Select v-model="reserveStatus">
                  <Option value="未入住">未入住</Option>
                  <Option value="已入住">已入住</Option>
                  <Option value="已取消">已取消</Option>
                </Select>
              </FromItem>
              <FromItem>
                <Button type="primary">儲存</Button>
              </FromItem>
            </From>
            </Col>
          </Row>
        </ListItem>
      </List>
      <template #footer>
        <Button @click="modal1 = false">關閉</Button>
      </template>
    </Modal>


    <Button @click="modal2 = true">新增商品</Button>

    <Modal title="新增商品" v-model="modal2" class="vertical-center-modal" width="600" ok-text="確定" cancel-text="取消">
      <Form ref="formDynamic" :model="formDynamic">
        <List item-layout="vertical">
          <ListItem>
            <Row class="row" justify="center" align="middle">
              <Col span="5" align="center" class=" row-title">
              <span>商品名稱：</span>
              </Col>
              <Col span="19">
              <Input v-model="nameValue" />
              </Col>
            </Row>
            <Row class="row" justify="center" align="middle">
              <Col span="5" align="center">
              <span>商品價格：</span>
              </Col>
              <Col span="7">
              <FromeItem>
                <Input v-model="priceValue" />
              </FromeItem>
              </Col>
              <Col span="5" align="center">
              <span>商品類別：</span>
              </Col>
              <Col span="7">
              <FromeItem>
                <Select v-model="categoryValue">
                  <Option value="服飾">服飾</Option>
                  <Option value="文青生活">文青生活</Option>
                  <Option value="露營用品">露營用品</Option>
                </Select>
              </FromeItem>
              </Col>
            </Row>
            <Row class="row">
              <template v-for="(item, index) in formDynamic.items">
                <Col span="24">
                <FormItem v-if="item.status" :key="index" :label="'商品顏色： '" :prop="'items.' + index + '.value'"
                  :rules="{ required: true, message: 'Item ' + item.index + ' can not be empty', trigger: 'blur' }">
                  <Row>
                    <Col span="10">
                    <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
                    </Col>
                    <Col span="4" offset="1">
                    <Button @click="handleRemove(index)">Delete</Button>
                    </Col>
                  </Row>
                </FormItem>
                </Col>
              </template>
            </Row>
            <FormItem>
              <Row>
                <Col span="12">
                <Button type="dashed" long @click="handleAdd" icon="md-add"></Button>
                </Col>
              </Row>
            </FormItem>
            <!-- <FormItem>
              <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
              <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
            </FormItem> -->
            <Row class="row" justify="center" align="middle">
              <Col span="5" align="center" class=" row-title">
              <span>商品說明：</span>
              </Col>
              <Col span="19">
              <Input type="textarea" :rows="5" v-model="descriptionValue" maxlength="200" show-word-limit />
              </Col>
            </Row>
          </ListItem>
        </List>
      </Form>
    </Modal>
  </Space>
</template>

<style lang="less" scoped>
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
  margin: 0 40px;
}

.reserve-Status {
  display: flex;

  .Status-col {
    flex-grow: 1;
    margin-right: 10px;
  }
}
</style>
