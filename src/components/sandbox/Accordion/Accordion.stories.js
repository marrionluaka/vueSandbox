import Accordion from './Accordion.vue'
import ChevronIcon from './ChevronIcon.vue'
import AccordionTitle from './AccordionTitle.vue'
import AccordionPanel from './AccordionPanel.vue'

export default {
  title: 'Example/Accordion',
  component: Accordion
}

const Template = args => ({
  template: `
    <div>
      <Accordion v-bind="args">
        <template #title="{ isOpen }">
          <AccordionTitle>
            <div class="flex justify-between py-2">
              <p>Title One</p>
              <ChevronIcon class="transition-transform ease-in-out transform scale-75" :class="[isOpen ? 'rotate-0' : 'rotate-90']"/>
            </div>
          </AccordionTitle>
        </template>

        <template #default="{ isOpen }">
          <AccordionPanel :isOpen="isOpen">
            Hey!
          </AccordionPanel>
        </template>
      </Accordion>

      <Accordion v-bind="args">
        <template #title="{ isOpen }">
          <AccordionTitle>
            <div class="flex justify-between py-2">
              <p>Title Two</p>
              <ChevronIcon class="transition-transform ease-in-out transform scale-75" :class="[isOpen ? 'rotate-0' : 'rotate-90']"/>
            </div>
          </AccordionTitle>
        </template>

        <template #default="{ isOpen }">
          <AccordionPanel :isOpen="isOpen">
            Ho!
          </AccordionPanel>
        </template>
      </Accordion>

      <Accordion v-bind="args">
        <template #title="{ isOpen }">
          <AccordionTitle>
            <div class="flex justify-between py-2">
              <p>Title Three</p>
              <ChevronIcon class="transition-transform ease-in-out transform scale-75" :class="[isOpen ? 'rotate-0' : 'rotate-90']"/>
            </div>
          </AccordionTitle>
        </template>

        <template #default="{ isOpen }">
          <AccordionPanel :isOpen="isOpen">
            Let's Go!
          </AccordionPanel>
        </template>
      </Accordion>
    </div>
  `,

  components: { Accordion, ChevronIcon, AccordionTitle, AccordionPanel },

  setup() {
    return { args }
  }
})

export const Primary = Template.bind({})
Primary.args = {
  isOpen: false
}
