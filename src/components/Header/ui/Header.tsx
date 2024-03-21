import cls from './Header.module.scss';

export const Header = () => (
  <header className={`${cls.header} container`}>
    <h1 className={cls.title}>Тестовое задание «Биллиард»</h1>
  </header>
);
