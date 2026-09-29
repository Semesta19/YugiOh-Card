import { GeneratedCard } from '../types/pokemon';

const DB_NAME = 'PokeCardDB';
const DB_VERSION = 1;
const STORE_NAME = 'cards';
const LEGACY_STORAGE_KEY = 'pokecard_history_v1';
const MAX_HISTORY_ITEMS = 30;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };
  });
}

/**
 * Load card history from IndexedDB with migration from legacy localStorage
 */
export async function loadCardHistory(): Promise<GeneratedCard[]> {
  try {
    // 1. Try reading from IndexedDB
    const db = await openDB();
    const cards = await new Promise<GeneratedCard[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const result = (request.result as GeneratedCard[]) || [];
        // Sort descending by timestamp
        result.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        resolve(result);
      };

      request.onerror = () => reject(request.error);
    });

    if (cards.length > 0) {
      // Clean up legacy localStorage if it still exists to prevent storage quota issues
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch {
        // ignore
      }
      return cards;
    }

    // 2. If IndexedDB is empty, check legacy localStorage for existing user cards
    try {
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const legacyCards: GeneratedCard[] = JSON.parse(legacyRaw);
        if (Array.isArray(legacyCards) && legacyCards.length > 0) {
          // Migrate to IndexedDB
          for (const card of legacyCards) {
            await saveCardToIndexedDB(card);
          }
          // Remove from localStorage to release quota
          localStorage.removeItem(LEGACY_STORAGE_KEY);
          return legacyCards;
        }
      }
    } catch (e) {
      console.warn('Could not migrate legacy cards from localStorage:', e);
      // Clean up corrupted or bloated localStorage
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch {
        // ignore
      }
    }

    return [];
  } catch (err) {
    console.warn('IndexedDB unavailable, checking localStorage fallback:', err);
    try {
      const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  }
}

/**
 * Save single card to IndexedDB and prune to MAX_HISTORY_ITEMS
 */
async function saveCardToIndexedDB(card: GeneratedCard): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    store.put(card);

    transaction.oncomplete = async () => {
      // Prune old cards if exceeding limit
      try {
        await pruneOldCards(db);
      } catch {
        // non-fatal
      }
      resolve();
    };

    transaction.onerror = () => reject(transaction.error);
  });
}

/**
 * Prune old cards beyond MAX_HISTORY_ITEMS
 */
async function pruneOldCards(db: IDBDatabase): Promise<void> {
  return new Promise((resolve) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = (request.result as GeneratedCard[]) || [];
      if (items.length > MAX_HISTORY_ITEMS) {
        items.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        const toDelete = items.slice(MAX_HISTORY_ITEMS);
        for (const item of toDelete) {
          store.delete(item.id);
        }
      }
      resolve();
    };

    request.onerror = () => resolve();
  });
}

/**
 * Public save method
 */
export async function saveCardToStorage(card: GeneratedCard): Promise<void> {
  try {
    await saveCardToIndexedDB(card);
    // Ensure legacy key is removed so localStorage quota is never hit
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // ignore
    }
  } catch (err) {
    console.error('Failed to save card to IndexedDB:', err);
  }
}

/**
 * Clear all cards from storage
 */
export async function clearCardStorage(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to clear IndexedDB:', err);
  }

  // Also clean up any localStorage key
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // ignore
  }
}
