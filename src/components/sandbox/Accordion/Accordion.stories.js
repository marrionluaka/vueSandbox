import Accordion from './Accordion.vue'
import AccordionTitle from './AccordionTitle.vue'
import AccordionPanel from './AccordionPanel.vue'

export default {
  title: 'Example/Accordion',
  component: Accordion
}

const Template = args => ({
  components: { Accordion, AccordionTitle, AccordionPanel },

  setup() {
    return { args }
  },

  template: `
    <div>
      <Accordion v-bind="args">
        <template #title>
          <AccordionTitle>
            Title One
          </AccordionTitle>
        </template>

        <template #default="{ isOpen }">
          <AccordionPanel :isOpen="isOpen">
            Hey!
          </AccordionPanel>
        </template>
      </Accordion>

      <Accordion v-bind="args">
        <template #title>
          <AccordionTitle>
            Title Two
          </AccordionTitle>
        </template>

        <template #default="{ isOpen }">
          <AccordionPanel :isOpen="isOpen">
            Ho!
          </AccordionPanel>
        </template>
      </Accordion>

      <Accordion v-bind="args">
        <template #title>
          <AccordionTitle>
            Title Three
          </AccordionTitle>
        </template>

        <template #default="{ isOpen }">
          <AccordionPanel :isOpen="isOpen">
            Let's Go!
          </AccordionPanel>
        </template>
      </Accordion>
    </div>
  `
})

export const Primary = Template.bind({})
Primary.args = {
  isOpen: true
}
