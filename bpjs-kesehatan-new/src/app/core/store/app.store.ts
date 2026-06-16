import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ContentService } from '../services';

interface AppState {
  loading: boolean;
  searchQuery: string;
  selectedCategory: string | null;
}

const initialState: AppState = {
  loading: false,
  searchQuery: '',
  selectedCategory: null,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store, contentService = inject(ContentService)) => ({
    isSearching: computed(() => store.searchQuery().length > 0),
    filteredConditions: computed(() => {
      const query = store.searchQuery().toLowerCase();
      if (!query) return contentService.conditions();
      return contentService.conditions().filter(c =>
        c.title.toLowerCase().includes(query) ||
        (c.description?.toLowerCase().includes(query))
      );
    }),
    filteredArticles: computed(() => {
      const query = store.searchQuery().toLowerCase();
      if (!query) return contentService.articles();
      return contentService.articles().filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.summary.toLowerCase().includes(query)
      );
    }),
  })),
  withMethods(store => ({
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },
    setSearchQuery(query: string) {
      patchState(store, { searchQuery: query });
    },
    setCategory(category: string | null) {
      patchState(store, { selectedCategory: category });
    },
  }))
);
