import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';

function getLikedIds(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.likes);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveLikedIds(ids: Set<number>) {
  localStorage.setItem(STORAGE_KEYS.likes, JSON.stringify([...ids]));
}

export function useLikes() {
  const [likedIds, setLikedIds] = useState<Set<number>>(getLikedIds);

  const toggleLike = useCallback((postId: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      saveLikedIds(next);
      return next;
    });
  }, []);

  const isLiked = useCallback((postId: number) => likedIds.has(postId), [likedIds]);

  return { isLiked, toggleLike };
}
