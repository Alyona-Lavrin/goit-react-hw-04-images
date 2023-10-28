import { useEffect, useCallback } from 'react';
import s from './Modal.module.css';

export const Modal = ({url, onClose}) => {
    const clickEsc = useCallback(event => {
        if (event.code === 'Escape') {
            onClose();
        }
    }, [onClose])

    useEffect(() => {
        window.addEventListener('keydown', clickEsc);

        return () => {
            window.addEventListener('keydown', clickEsc);
        };
    }, [clickEsc]);

    const clickBackdrop = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={s.overlay} onClick={clickBackdrop}>
            <div className={s.modal}>
                <img src={url} alt="" />
            </div>
        </div>
    )
}