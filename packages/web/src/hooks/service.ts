import { useRequest as useRequestService, usePagination as usePaginationService } from 'vue-request'
import type { ServiceArg, ServiceKeys } from '@/services'
import { services } from '@/services'
/**
 * useRequest
 * key[string]: server name
 * args[object]: request params
 * options[object]: useRequest/vue-request options
 * */
export function useRequest<T extends ServiceKeys>(
  key: T,
  args?: ServiceArg<T>,
  options?: object
): ReturnType<typeof useRequestService> {
  return useRequestService<any, ServiceArg<T>>(() => services[key](args), {
    debounceInterval: 300,
    loadingDelay: 400,
    loadingKeep: 1000,
    ...options
  })
}
/**
 * usePagination
 * key[string]: server name
 * args[object]: request params
 * options[object]: usePagination/vue-request options
 * */
export function usePagination<T extends ServiceKeys>(
  key: T,
  args?: ServiceArg<T>,
  options?: object
): ReturnType<typeof usePaginationService> {
  return usePaginationService<any, any>(() => services[key](args), {
    debounceInterval: 300,
    loadingDelay: 400,
    loadingKeep: 1000,
    defaultParams: [
      {
        limit: 10
      }
    ],
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'size',
      totalKey: 'data.total'
    },
    ...options
  })
}
