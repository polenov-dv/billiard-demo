import { useState, useRef, useEffect } from 'react';
import cls from './ColorMenu.module.scss';

interface ColorMenuProps {
  x: number;
  y: number;
  color: string;
  setColor: (color: string) => void;
}

export const ColorMenu = ({ x, y, color, setColor }: ColorMenuProps) => {
  const [red, setRed] = useState(155);
  const [green, setGreen] = useState(155);
  const [blue, setBlue] = useState(155);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleColorChange = () => {
    setColor(`rgb(${red}, ${green}, ${blue})`);
  };

  const handleColorOld = () => {
    setColor(color);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setColor(color);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cls.content}
      ref={modalRef}
      style={{ position: 'absolute', top: y, left: x + 50 }}
    >
      <p className={cls.title}>Изменить цвет</p>
      <div className={cls.color_menu}>
        <div className={cls.color_item}>
          <input
            className={`${cls.color_input} ${cls.input_red}`}
            type='range'
            min='0'
            max='255'
            value={red}
            onChange={(e) => setRed(parseInt(e.target.value))}
          />
          <span>{red}</span>
        </div>
        <div className={cls.color_item}>
          <input
            className={`${cls.color_input} ${cls.input_green}`}
            type='range'
            min='0'
            max='255'
            value={green}
            onChange={(e) => setGreen(parseInt(e.target.value))}
          />
          <span>{green}</span>
        </div>
        <div className={cls.color_item}>
          <input
            className={`${cls.color_input} ${cls.input_blue}`}
            type='range'
            min='0'
            max='255'
            value={blue}
            onChange={(e) => setBlue(parseInt(e.target.value))}
          />
          <span>{blue}</span>
        </div>
      </div>
      <div className={cls.color_example_wrapper}>
        <div
          className={cls.color_example}
          style={{
            backgroundColor: `rgb(${red}, ${green}, ${blue})`,
          }}
        ></div>
      </div>
      <div className={cls.button_wrapper}>
        <button className={cls.btn} onClick={handleColorChange}>
          да
        </button>
        <button className={cls.btn} onClick={handleColorOld}>
          нет
        </button>
      </div>
    </div>
  );
};
