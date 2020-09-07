<template>
  <field-wrapper :label="label">
    <client-only>
      <date-picker
        :value="value"
        :range="true"
        value-type="DD.MM.YY"
        format="DD.MM.YY"
        input-class="input input__date"
        popup-class="datepicker__popup"
        range-separator=" — "
        class="datepicker"
        @input="input"
      >
        <template v-slot:icon-calendar>
          <img src="/icons/Calendar.svg" alt="Calendar" class="img">
        </template>
      </date-picker>
    </client-only>
  </field-wrapper>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import FieldWrapper from '~/components/form/field-wrapper.vue'
import 'vue2-datepicker/locale/uk'

@Component({
  components: { FieldWrapper }
})
export default class DatepickerRange extends Vue {
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: Array, default: [] }) readonly value!: string[]

  @Emit()
  public input (value: string[]): string[] {
    return value
  }
}
</script>

<style lang="scss">
  .datepicker {
    width: auto;

    &__popup {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);

      .mx {
        &-btn {
          font-family: e-Ukraine, sans-serif;
          font-size: var(--size-s);
          color: var(--black);
        }

        &-table {
          thead {
            background-color: var(--gray-500);
          }
        }

        &-date-row {
          .in-range {
            &:first-child {
              border-radius: 4px 0 0 4px;
            }

            &:last-child {
              border-radius: 0 4px 4px 0;
            }
          }
        }
      }

      .not-current-month {
        * {
          color: var(--gray-300);
        }
      }

      .cell {
        &:hover {
          background-color: var(--gray-500);
          color: var(--black);
          border-radius: 4px;
        }

        &.in-range {
          background-color: var(--blue-100);
        }

        &.active {
          background-color: var(--blue);
          border-radius: 4px;

          * {
            color: var(--white);
          }
        }
      }
    }
  }
</style>
