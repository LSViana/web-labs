import { useRouter } from '#app'
import { RouteLocationNormalized } from 'vue-router'

export function useCustomViewTransitions (): void {
  if (!process.client) {
    return
  }

  const router = useRouter()

  function useCustomTransitions (route: RouteLocationNormalized): boolean {
    return route.fullPath.startsWith('/experiments/transitions')
  }

  router.afterEach((to, from) => {
    if (useCustomTransitions(to) && useCustomTransitions(from)) {
      document.documentElement.classList.add('end')
    } else {
      document.documentElement.classList.remove('end')
    }
  })
}
