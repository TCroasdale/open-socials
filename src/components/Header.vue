<template>
  <div class="w-screen">
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 w-full text-white h-auto clear-both">
      <TabGroup class="ml-0 w-3/4 inline-block">
        <TabList>
          <router-link to="/">
            <Tab class="tab">
              <RSSIcon class="h-5 w-5 mr-1 inline"/> Feed
            </Tab>
          </router-link>
          <router-link to="/schedule">
            <Tab class="tab">
              <ClockIcon class="h-5 w-5 mr-1 inline"/> Scedule
            </Tab>
          </router-link>
          <router-link to="/settings">
            <Tab class="tab"><CogIcon class="h-5 w-5 mr-1 inline"/> Options</Tab>
          </router-link>
        </TabList>
      </TabGroup>

      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Options
            <ChevronDownIcon
              class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  v-if="!twitterAuthed"
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                  ]"
                  @click="authTwitter()"
                >
                  <WifiIcon
                    :active="active"
                    class="w-5 h-5 mr-2 text-violet-400"
                    aria-hidden="true"
                  />
                  Log in to twitter
                </button>
                <div v-else class="text-gray-900 group flex items-center w-full px-2 py-2 text-sm" >
                  <img class="w-5 5-5 mr-2 rounded-full" :src="twitterUser.img">
                  {{ twitterUser.name }}
                </div>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script>
import { TabGroup, TabList, Tab, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { RSSIcon, ClockIcon, CogIcon, WifiIcon, ChevronDownIcon } from '@heroicons/vue/solid'
import { mapGetters } from 'vuex'

import * as Twitter from '../plugins/twitter-request'

export default {
  name: 'Header',
  components: {
    TabGroup,
    TabList,
    Tab,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    RSSIcon,
    ClockIcon,
    CogIcon,
    WifiIcon,
    ChevronDownIcon
  },
  mounted () {
    console.log(this.$store.state)
  },
  computed: {
  ...mapGetters(['twitterAuthed', 'twitterUser'])
  },
  methods: {
    authTwitter: function () {
      Twitter.StartVerification()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  @apply mx-3 w-auto h-full inline-block p-6 rounded-lg;
}
</style>
