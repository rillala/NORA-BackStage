<script>
import { ListItem, ListItemMeta } from 'view-ui-plus';


export default {
  data() {
    return {
      modal2: false,
    };
  },
  components: { ListItemMeta, ListItem }
}
</script>

<template>
  <Space wrap>
    <Button @click="modal2 = true">燈箱測試</Button>
    <Modal title="預約訂單明細" v-model="modal2" class-name="vertical-center-modal" width="600">
      <List item-layout="vertical" class="listA">
        <ListItem>
          <p>測試：123</p>
          <p>123</p>
        </ListItem>
      </List>
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

.listA {
  font-size: 30px;
}
</style>
