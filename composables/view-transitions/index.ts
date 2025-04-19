import type { RouteLocationNormalized } from 'vue-router'

import { useRouter } from '#app'

export function useCustomViewTransitions(): void {
  if (!import.meta.client) {
    return
  }

  const router = useRouter()

  function useCustomTransitions(route: RouteLocationNormalized): boolean {
    return route.fullPath.startsWith('/experiments/navigation/transitions')
  }

  router.afterEach((to, from) => {
    if (useCustomTransitions(to) && useCustomTransitions(from)) {
      document.documentElement.classList.add('end')
    }
    else {
      document.documentElement.classList.remove('end')
    }
  })
}
