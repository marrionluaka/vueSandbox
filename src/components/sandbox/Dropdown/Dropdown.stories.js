import Dropdown from './Dropdown.vue'

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
  currentOption: 'Option one',
  options
}

const TemplateScope = args => ({
  template: `
    <Dropdown v-bind="args" @on-selected="val => args.currentOption = val">
      <template #currentOption>
        <span class="block truncate">{{args.currentOption}}</span>
      </template>

      <template #default="{ option }">
        <div>{{ option.value }} - custom </div>
      </template>
    </Dropdown>
  `,

  components: { Dropdown },

  setup() {
    return { args }
  }
})

export const WithSlotScope = TemplateScope.bind({})
WithSlotScope.args = {
  currentOption: "Hello I'm an Option!",
  options: [...Array(15)].map((x, i) => ({ key: i, value: `Option ${i + 1}` }))
}
