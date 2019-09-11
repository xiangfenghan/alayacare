<template>
  <div class="form__item">
    <label :for="labelFor" v-if="label" :class="{'label-required': isRequired}">{{label}}</label>
    <slot></slot>
    <div v-if="isShowMes" class="form__message">{{message}}</div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator';
import Emitter from '@/mixins/emitter.js';
export default {
  name: 'iFormItem',
  mixins: [ Emitter ],
  inject: [ 'form' ],
  props: {
    label: { type: String, default: '' },
    prop: { type: String }
  },
  data() {
    return {
      isRequired: false, isShowMes: false, message: '', labelFor: 'input' + new Date().valueOf()
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('iForm', 'form-add', this);
      // initial value
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  // before destorying component, remove from from cache
  beforeDestroy () {
    this.dispatch('iForm', 'form-remove', this);
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop]
    }
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.forEach(rule => {
          if (rule.required !== undefined) this.isRequired = rule.required
        });
      }
      this.$on('form-blur', this.onFieldBlur);
      this.$on('form-change', this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return formRules;
    },
    // filter needed rules
    getFilteredRule (trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    /**
     * Validate form data
     * @param trigger
     * @param callback
     */
    validate(trigger, cb) {
      let rules = this.getFilteredRule(trigger);
      if(!rules || rules.length === 0) return true;
      // Using async-validator
      const validator = new AsyncValidator({ [this.prop]: rules });
      let model = {[this.prop]: this.fieldValue}; 
      validator.validate(model, { firstFields: true }, errors => {
        this.isShowMes = errors ? true : false;
        this.message = errors ? errors[0].message : '';
        if (cb) cb(this.message);
      })
    },
    resetField () {
      this.message = '';
      this.form.model[this.prop] = this.initialValue;
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      this.validate('change');
    }
  }
}
</script>
<style>
  .form__item {
    width: 100%;
    align-self: flex-end;
  }

  label {
    display: block;
    width: 100%;
    color: #F16D6B;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
  }

  .label-required:before {
    content: '*';
    color: #F16D6B;
  }

  .form__message {
    width: 100%;
    text-align: left;
    font-size: 12px;
    color: #F16D6B;
  }
</style>