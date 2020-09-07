import VueRouter from 'vue-router'
import VueTestInstance from '~/test/factory/vue-instance'
import Breadcrumbs from '~/components/UI/breadcrumbs.vue'
import LINKS from '~/assets/js/glossary/links.json'

describe('breadcrumbs.vue', () => {
  let wrapper: any
  const router = new VueRouter()

  beforeEach(() => {
    const $route: any = { path: LINKS.index.path }

    wrapper = VueTestInstance(Breadcrumbs, {
      options: {
        router,
        mocks: { $route }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('test function: "updateRoute"', () => {
    const path: string = LINKS.journal.subLinks['create-ticket'].path
    wrapper.vm.updateRoute(path)
    expect(wrapper.vm.pathElements).toEqual(['journal', 'create-ticket'])
  })

  it('test function: "onRoute"', () => {
    const from: { path: string } = { path: LINKS.index.path }
    const to: { path: string } = { path: LINKS.journal.subLinks['create-ticket'].path }
    wrapper.vm.updateRoute = jest.fn()
    wrapper.vm.onRoute(to, from)
    expect(wrapper.vm.updateRoute).toHaveBeenCalledWith(to.path)
  })

  it('test function: "onRoute", when don\'t update router path', () => {
    const to: { path: string } = { path: LINKS.journal.subLinks['create-ticket'].path }
    const from: { path: string } = { path: LINKS.journal.subLinks['create-ticket'].path }
    wrapper.vm.updateRoute = jest.fn()
    wrapper.vm.onRoute(to, from)
    expect(wrapper.vm.updateRoute).not.toHaveBeenCalled()
  })

  describe('test getter: "pathToPage"', () => {
    it('simple path', () => {
      const path: string = LINKS.journal.subLinks['create-ticket'].path
      wrapper.vm.updateRoute(path)
      expect(wrapper.vm.pathToPage).toEqual([LINKS.journal, LINKS.journal.subLinks['create-ticket']])
    })

    it('dynamic path', () => {
      const path: string = LINKS.journal.path + '/12354'
      wrapper.vm.updateRoute(path)
      expect(wrapper.vm.pathToPage).toEqual([LINKS.journal, LINKS.journal.subLinks._id])
    })
  })
})
