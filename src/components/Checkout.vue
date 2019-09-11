<template>
  <div class="checkout__checkout">
    <div class="checkout__order">
        <div class="checkout__order_image">
            <img src="../assets/bag.png">
        </div>
        <p class="checkout__order_price">
            $1499
        </p>
        <p class="checkout__order_name">
            Duffle Boston Bag
        </p>
    </div>
    <div class="checkout__form">
        <p class="checkout__form_title">Payment Detail</p>
        <iForm ref="form" :model="formData" :rules="rules">
            <div class="checkout__form_field">
                <div class="checkout__form_field_left">
                    <iFormItem label="Card Number" prop="card">
                        <iInput v-model="formData.card"></iInput>
                    </iFormItem>
                </div>
                <div class="checkout__form_field_right">
                    <div class="checkout__form_card_logo">
                        <img src="../assets/visa.png">
                    </div>
                </div>
            </div>
            <div class="checkout__form_field">
                <div class="checkout__form_field_left">
                    <iFormItem label="Cardholder Name" prop="name">
                        <iInput v-model="formData.name"></iInput>
                    </iFormItem>
                </div>
                <div class="checkout__form_field_right"></div>
            </div>
            <div class="checkout__form_field">
                <div class="checkout__form_field_left">
                    <iFormItem label="Good thru (MM/YY)" prop="expiration">
                        <iInput v-model="formData.expiration"></iInput>
                    </iFormItem>
                    <iFormItem label="CVV" prop="cvv">
                        <iInput v-model="formData.cvv"></iInput>
                    </iFormItem>
                </div>
                <div class="checkout__form_field_right">
                    <button @click="handleSubmit">></button>
                </div>
            </div>
        </iForm>
    </div>
  </div>
</template>

<script>
import iForm from '@/components/form/Form.vue'
import iFormItem from '@/components/form/FormItem.vue'
import iInput from '@/components/Input.vue'

export default {
  name: 'Checkout',
  components: { iForm, iFormItem, iInput },
  data () {
    return {
        formData: { card: '', name: '', expiration: '', cvv: '' },
        rules: {
            card: [
                {required: true, message: 'Card number is required', trigger: 'blur'},
                {pattern: /^[1-9]+$/, message: 'Card number should be only digits', trigger: 'blur'},
                {min: 11, max: 12, message: 'Card number is 11 or 12 numbers'}
            ],
            name: [
                {required: true, message: 'This field is required', trigger: 'blur'},
                {min: 2, message: 'Name is too short'}
            ],
            expiration: [
                {required: true, message: 'This field is required', trigger: 'blur'},
                {pattern: /[01]\d\/\d{2}/, message: 'Expiration should match MM/YY', trigger: 'blur'},
            ],
            cvv: [
                {required: true, message: 'This field is required', trigger: 'blur'},
                {pattern: /^[1-9]+$/, message: 'CVV should be only digits', trigger: 'blur'},
                {min: 3, max: 4, message: 'CVV is 3 or 4 numbers'}
            ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid)  console.log('submit successfully');
        else console.log('validate failed');
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.checkout__checkout {
    display: block;
    min-height: 40vh;
    max-width: 100vw;
}

.checkout__order {
    padding: 10px;
    background: linear-gradient(to right, #8cc5ba 0%, #6baba0 100%);
    border-radius: 0;
}

.checkout__order_image {
    display: block;
    width: 80%;
    margin: 0 auto;
}

.checkout__order_image img {
    display: inline-block;
    width: 100%;
}

.checkout__order_price {
    width: 100%;
    padding: 0 0 0 20px;
    color: #FFF;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
}

.checkout__order_name {
    width: 100%;
    padding: 0 0 0 20px;
    color: #FFF;
    font-size: 16px;
    text-align: center;
}

.checkout__form {
    position: relative;
    width: 100%;
    padding: calc(20px + 1vw);
    background-color: #FFF;
    box-shadow: 10px 10px 10px 5px rgba(65,107,98,0.15);
    border-radius: 0;
}

.checkout__form_title {
    margin: 0 0 10px 0;
    color: #666666;
    font-weight: bold;
    text-align: left;
    text-transform: uppercase;
}

.checkout__form_field {
    display: flex;
    margin: 10px 0;
}

.checkout__form_field_left {
    display: flex;
    flex: 0 0 80%;
}

.checkout__form_field_right {
    flex: 0 0 20%;
    align-self: flex-end;
}

.checkout__form_card_logo img {
    display: inline-block;
    width: 100%;
    height: auto;
    vertical-align: bottom;
}

.checkout__form_field_right button {
    display: block;
    margin: 0 auto;
    padding: 10px 15px;;
    color: #FFF;
    background: linear-gradient(to right, #F68B89 0%, #F16D6B 100%);
    border: none;
    border-radius: 5px;
}

.checkout__form_field_right button::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #FFF;
    border-radius: 5px;
}

@media screen and (min-width: 768px) {
    .checkout__checkout {
        display: flex;
        flex-wrap: nowrap;
        position: absolute;
        top: 50%;
        left: 45%;
        transform: translate(-50%, -50%);
        min-height: 50vh;
        min-width: 60vw;
        max-width: 80vw;
    }

    .checkout__order {
        flex: 0 0 100%;
        padding: 10px calc(50px + 1vw) 100px;
        background: linear-gradient(to right, #8cc5ba 0%, #6baba0 100%);
        border-radius: 15px;
    }

    .checkout__order_image {
        display: block;
        width: 50%;
        margin: 0;
    }

    .checkout__order_price {
        width: 50%;
        padding: 0 0 0 20px;
        color: #FFF;
        font-size: 24px;
        font-weight: bold;
        text-align: left;
    }

    .checkout__order_name {
        width: 50%;
        padding: 0 0 0 20px;
        color: #FFF;
        font-size: 16px;
        text-align: left;
    }

    .checkout__form {
        position: absolute;
        right: -15%;
        top: 50%;
        transform: translate(0, -50%);
        width: 50%;
        padding: calc(20px + 1vw);
        background-color: #FFF;
        box-shadow: 10px 10px 10px 5px rgba(65,107,98,0.15);
        border-radius: 15px;
    }
}
</style>
