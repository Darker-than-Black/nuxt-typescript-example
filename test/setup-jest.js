import { config, RouterLinkStub } from '@vue/test-utils'

// Mock Nuxt client-side component
const ClientOnly = { template: '<div><slot /></div>' }
config.stubs['client-only'] = ClientOnly
config.stubs['nuxt-link'] = RouterLinkStub
