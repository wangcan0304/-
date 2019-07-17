<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="手机号" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>


<script>
export default {
  data() {
    //确认密码
    // rule：当前的规则
    // value: 输入框的值
    // callback：回调函数，必须要调用的
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      //表单数据
      form: {
        username: "",
        captcha: "", // 验证码
        nickname: "",
        password: "",
        checkPassword: "" // 确认密码
      },
      //表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }], // 验证码
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [
          // validator: 自定义的验证函数
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //发送验证码
    handleSendCaptcha() {
      //判断是否有手机号码
      const phoneNumber =this.form.username;

  if(!phoneNumber.trim()){
                this.$message.warning("请输入用户名手机号码");
                return;
            }
//发送手机的验证码
      this.$axios({
        url: `captchas`,
        method: "POST",
        data: {
          tel: phoneNumber
        }
      }).then(res => {
        const { code } = res.data;
         this.$alert(`手机验证码是：${code}`, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
        });
      });
    },
    //注册
    handleRegSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 注册提交
          const { checkPassword, ...props } = this.regForm;
//注册接口
          this.$axios({
            url: `/accounts/register`,
            method: "POST",
            data: props
          }).then(res => {
             this.$store.commit("user/setUserInfo", res.data);

                        this.$router.back();
          });
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.form {
  padding: 25px;
}
.form-item {
  margin-bottom: 20px;
}
.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
