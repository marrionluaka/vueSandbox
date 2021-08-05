import Search from './Search.vue'

export default {
  title: 'Example/Search',
  component: Search,
  argTypes: {
    onSubmit: {}
  }
}

const Template = args => ({
  template: '<Search @on-search="args.onSubmit" />',

  components: { Search },

  setup() {
    return { args }
  }
})

export const Primary = Template.bind({})

const WithSuggestedResultsTemplate = args => ({
  template: `
    <Search v-bind="args" @on-search="args.onSubmit">
      <template #default="{ results }">
        <ul data-test="search-template">
          <li v-for="result in results" :key="result.id">
            {{ result.value }}
          </li>
        </ul>
      </template>
    </Search>
  `,

  components: { Search },

  setup() {
    return { args }
  }
})

export const WithSuggestedResults = WithSuggestedResultsTemplate.bind({})
WithSuggestedResults.args = {
  suggestedResults: [
    { id: 1, value: 'Result 1' },
    { id: 2, value: 'Result 2' },
    { id: 3, value: 'Result 3' }
  ]
}
