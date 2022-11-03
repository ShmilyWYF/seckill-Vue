<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="24">
      <div>
        <el-card>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="商品ID" align="center" width="50" />
            <el-table-column prop="goodsName" label="商品名" align="center" width="150px" />
            <el-table-column prop="goodsTitle" label="标题" width="200px" />
            <el-table-column align="center" label="图片" width="200px">
              <template scope="scope">
                <el-image :src="scope.row.goodsImg" style="width: 50px; height: 50px" />
              </template>
            </el-table-column>
            <el-table-column prop="goodsDetail" label="商品详情" />
            <el-table-column prop="goodsPrice" label="商品价格" align="center" width="80px" />
            <el-table-column prop="goodsStock" label="商品库存" align="center" width="80px" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <!--                  <el-button type="primary" @click="topay(scope.row)">去购买</el-button>-->
                <el-button type="primary" @click="topay(scope.row.id)">去购买</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>

import { param } from '@/utils'

export default {
  name: 'Index',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('goods/getList').then(res => {
        this.tableData = res
      })
    },
    topay(id) {
      this.$router.push({ name: 'seckill', params: { id }})
    }
  }
}
</script>

<style scoped>

</style>
