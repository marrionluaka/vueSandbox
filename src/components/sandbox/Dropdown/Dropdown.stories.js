import Dropdown from './Dropdown.vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export default {
  title: 'Example/Dropdown',
  component: Dropdown
}

const options = [
  { value: 'Option 1', key: 1 },
  { value: 'Option 2', key: 2 },
  { value: 'Option 3', key: 3 }
]

const Template = args => ({
  template: `<Dropdown v-bind="args" />`,

  components: { Dropdown },

  setup() {
    return { args }
  }
})

export const Primary = Template.bind({})
Primary.args = {
  options
}

const TemplateScope = args => ({
  template: `
    <Dropdown v-bind="args" @on-selected="val => args.currentOption = val">
      <template #currentOption>
        <span class="block truncate">{{args.currentOption}}</span>
      </template>

      <template #default="{ option }">
        <div :class="[option.isActive ? 'text-white bg-indigo-600' : 'text-gray-900', 'select-none relative py-2 pl-3 pr-9']">
          <span :class="[option.isSelected ? 'font-semibold' : 'font-normal', 'block truncate']">
            {{ option.value }}
          </span>

          <span v-if="option.isSelected" :class="[option.isActive ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
            <CheckIcon class="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </template>
    </Dropdown>
  `,

  components: { Dropdown, CheckIcon },

  setup() {
    return { args }
  }
})

export const WithSlotScope = TemplateScope.bind({})
WithSlotScope.args = {
  currentOption: "Hello I'm an Option!",
  options: [...Array(15)].map((x, i) => ({ key: i, value: `Option ${i + 1}` }))
}
