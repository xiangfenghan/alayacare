<template>
  <div class="form__input">
    <input ref="input" :type="type" :value="currentValue" @input="handleInput" @blur="handleBlur" />
  </div>
</template>
<script>
import Emitter from '@/mixins/emitter.js';
export default {
  name: 'iInput',
  mixins: [ Emitter ],
  props: {
    type: { type: String, default: 'text'},
    value: { type: String, default: ''}
  },
  watch: {
    value(value) {
      this.currentValue = value
    }
  },
  data() {
    return { currentValue: this.value, id: this.label }
  },
  mounted () {
    if (this.$parent.labelFor) this.$refs.input.id = this.$parent.labelFor;
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('iFormItem', 'form-change', value);
    },
    handleBlur() {
      this.dispatch('iFormItem', 'form-blur', this.currentValue);
    }
  }
}
</script>
<style scoped>
  .form__input {
    margin: 0 5px 0 0;
  }

  input {
    width: 100%;
    padding: 0 5px;
    min-height: 24px;
    border: 1px solid #eeeeee;
  }

  input:focus {
    border: 1px solid #F68B89;
    outline: none;
  }
</style>