import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, AppDispatch } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useModalClose = (handler: () => void) => {
  useEffect(() => {
    const bodyElement = document.body;

    const keyDownHandler = (evt: KeyboardEventInit & Event) => {
      if (evt.code === 'Escape') {
        evt.preventDefault();
        handler();
      }
    };

    const documentClickHandler = (evt: Event) => {
      const modal = document.querySelector('.modal__content');

      if (modal) {
        const withinBoundaries = evt.composedPath().includes(modal);
        if (!withinBoundaries) {
          handler();
        }
      }
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('click', documentClickHandler)
    bodyElement.style.overflow = 'hidden';

  return () => {
    if (bodyElement) {
      bodyElement.style.overflow = 'scroll';
    }
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('click', documentClickHandler);
  }
});
}
