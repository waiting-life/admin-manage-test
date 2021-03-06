<template>
  <div class="user-info">
    <div class="user-avatar">
      <img src="~assets/image/lgAvatar.jpg" alt="">
    </div>
    <div class="user-nickname">
      {{ userInfo.nickname }}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
export default {
    data () {
      return {}
    },
    computed: {
      ...mapState([ 'userInfo' ])
    },
    created () {
      this.getUser()
    },
    methods: {
      async getUser() {
      // 获取cookie值，cookie一般为id
      // cookie是根据根据user_id设的，所以可以根据cookie拿到登录用户信息
      let user_id
      document.cookie.split(';').forEach(item => {
        const i = item.trim()
        const [key, value] = i.split('=')
        if (key === 'user_id') {
          user_id = value
        }
      })
      const res = await fetch('/getUserById', {
        method: 'POST',
        body: JSON.stringify({
          user_id: user_id
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      const { data } = await res.json()
      const nickname = data.nickname
      const user = {
        nickname,
        user_id
      }
      this.$store.commit('getUserInfo', user)
    },
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 10px;
  cursor: pointer;
}
.user-avatar img {
  width: 40px;
  height: 40px;
}
.user-nickname {
  cursor: pointer;
}
</style>
