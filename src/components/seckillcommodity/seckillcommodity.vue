<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="24">
      <div>
        <el-card>
          <el-table :data="list" border style="width: 100%">
            <el-table-column prop="goods.id" label="商品ID" align="center" width="50px" />
            <el-table-column prop="goods.goodsName" label="商品名" align="center" width="150px" />
            <el-table-column prop="goods.goodsTitle" label="标题" />
            <el-table-column align="goods.center" label="图片" width="60px">
              <template scope="scope">
                <el-image :src="scope.row.goods.goodsImg" style="width: 50px; height: 50px" />
              </template>
            </el-table-column>
            <el-table-column prop="goods.goodsPrice" label="商品原价" align="center" width="80px" />
            <el-table-column prop="goods.seckillPrice" label="秒杀价" align="center" width="80px" />
            <el-table-column prop="goods.stockCount" label="秒杀库存" align="center" width="80px" />
            <el-table-column label="开始时间" align="center" width="180px">
              <template slot-scope="scope">
                <span>{{ new Date(scope.row.goods.startDate).toLocaleString() }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" align="center" width="180px">
              <template slot-scope="scope">
                <span>{{ new Date(scope.row.goods.endDate).toLocaleString() }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="220px">
              <template slot-scope="scope">
                <span v-if="scope.row.secKillStatus==1">{{ seckilling() }}</span>
                <span v-else-if="scope.row.secKillStatus==2">{{ endseckill() }}</span>
                <span v-else>
                  倒计时：{{ days }}天{{ hours }}时{{ mins }}分{{ seconds }}秒
                </span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="primary" :disabled="flin" @click="toseckill(scope.row.goods.id)">立即秒杀</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { doseckill, getPath } from '@/api/article'

export default {
  name: 'Seckillcommodity',
  data() {
    return {
      list: [],
      date: new Date(),
      time: 0,
      endDate: '',

      days: '0',
      hours: '00',
      mins: '00',
      seconds: '00',

      timer: null,
      curTime: 0,
      refreshCounter: 0,
      end: 0,
      isMiniSecond: false,
      flin: true
    }
  },
  computed: {
    duration() {
      if (this.end) {
        let end = String(this.end).length >= 13 ? +this.end : +this.end * 1000
        end -= Date.now()
        return end
      }
      // +统一转换为number类型
      return this.isMiniSecond ? Math.round(+this.time / 1000) : Math.round(+this.time)
    }
  },
  watch: {
    duration() {
      this.countDown()
    },
    refreshCounter() {
      this.countDown()
    },
    seconds() {
      if (this.days < 1 && this.hours < 1 && this.mins < 1 && this.seconds < 1) {
        this.getdata(this.$route.params.id)
      }
    },
    date() {
      if (this.date.getTime() > new Date(this.endDate).getTime()) {
        this.getdata(this.$route.params.id)
      }
    }
  },
  created() {
    this.getdata(this.$route.params.id)
  },
  mounted() {
    this.getdata(this.$route.params.id)
    this.countDown()
  },
  methods: {
    getdata(id) {
      this.$store.dispatch('goods/getSeckillInfo', id).then(res => {
        this.list = res
        this.list.forEach(res => {
          this.time = res.remainSeconds
          this.endDate = res.goods.endDate
        })
      })
    },
    // 转换时间格式
    durationFormatter(time) {
      if (!time) return { ss: 0 }
      let t = time
      const ss = t % 60
      t = (t - ss) / 60
      if (t < 1) return { ss }
      const mm = t % 60
      t = (t - mm) / 60
      if (t < 1) return { mm, ss }
      const hh = t % 24
      t = (t - hh) / 24
      if (t < 1) return { hh, mm, ss }
      const dd = t
      return { dd, hh, mm, ss }
    },
    countDown() {
      this.curTime = Date.now()
      this.getTime(this.duration)
      this.getDate()
    },
    getTime(time) {
      this.timer && clearTimeout(this.timer)
      if (time < 0) {
        return
      }
      const { dd, hh, mm, ss } = this.durationFormatter(time)
      this.days = dd || 0
      this.hours = hh || 0
      this.mins = mm || 0
      this.seconds = ss || 0
      this.timer = setTimeout(() => {
        const now = Date.now()
        const diffTime = Math.floor((now - this.curTime) / 1000)
        const step = diffTime > 1 ? diffTime : 1 // 页面退到后台的时候不会计时，对比时间差，大于1s的重置倒计时
        this.curTime = now
        this.getTime(time - step)
      }, 1000)
    },
    getDate() {
      if (this.date.getTime() < new Date(this.endDate).getTime()) {
        setTimeout(() => {
          this.date = new Date()
          this.getDate()
        }, 1000)
      }
    },
    seckilling() {
      this.flin = false
      return '秒杀中'
    },
    endseckill() {
      this.flin = true
      return '秒杀已结束，下次早点来'
    },
    toseckill(id) {
      getPath(id).then(res => {
        const data = res.data
        doseckill(data, id).then(res => {
          console.log(res)
        })
      })
    }
  }
}

</script>

<style scoped>

</style>
