import { useState, useRef, useEffect } from 'react';
import cls from './BilliardBoard.module.scss';
import { ColorMenu } from 'components/ColorMenu';
import { StartBalls } from 'utils/balls';
import { Ball } from 'utils/balls';

const BALL_SPEED = 18;

export const BilliardBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>(StartBalls);
  const [selectedBall, setSelectedBall] = useState<Ball | null>(null);

  //Изменение цвета шара
  const setColor = (color: string) => {
    if (selectedBall) {
      const updatedBalls = balls.map((ball) => {
        if (ball === selectedBall) {
          ball.color = color;
          return ball;
        }
        return ball;
      });
      setBalls(updatedBalls);
    }
    setSelectedBall(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    //Обработка события наведения курсора мыши на шар (толкание шара)
    const handleMouseMove = (e: MouseEvent) => {
      if (!ctx || !canvas) return;
      canvas.style.cursor = 'default';

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      balls.forEach((ball) => {
        if (!ball.canPush) return;

        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.radius + 20) {
          canvas.style.cursor = 'pointer';
        }

        if (distance < ball.radius) {
          const angle = Math.atan2(dy, dx) + Math.PI;
          ball.vx = BALL_SPEED * Math.cos(angle);
          ball.vy = BALL_SPEED * Math.sin(angle);
          ball.canPush = false;
          setTimeout(() => (ball.canPush = true), 500);
        }
      });
    };

    //Обработка события нажатия на шар
    const handleMouseClick = (e: MouseEvent) => {
      if (!ctx || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      balls.forEach((ball) => {
        if (!ball.canPush) return;

        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Определение выбранного шара + увеличение радиуса для упрощения нажатия на шар
        if (distance < ball.radius + 20) {
          setSelectedBall(ball);
        }
      });
    };

    //Отображение
    const drawTable = () => {
      if (!ctx || !canvas) return;

      // Отрисовка стола
      ctx.fillStyle = '#0a5c24';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#613c17';
      ctx.lineWidth = 5;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Отрисовка шаров
      balls.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
      });
    };

    //Обработка столкновений
    const detectCollisions = () => {
      const minDistance = 1;

      balls.forEach((ball, i) => {
        // Столкновения со стенами
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas!.width) {
          ball.vx *= -1;
          ball.x =
            ball.x < ball.radius ? ball.radius : canvas!.width - ball.radius;
        }

        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas!.height) {
          ball.vy *= -1;
          ball.y =
            ball.y < ball.radius ? ball.radius : canvas!.height - ball.radius;
        }

        // Столкновения между шарами
        for (let j = i + 1; j < balls.length; j++) {
          const ball2 = balls[j];
          const dx = ball2.x - ball.x;
          const dy = ball2.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Проверяем, находятся ли шары слишком близко друг к другу
          if (distance < ball.radius + ball2.radius + minDistance) {
            // Расстояние, на которое нужно отодвинуть шары друг от друга
            const pushDistance =
              ball.radius + ball2.radius + minDistance - distance;

            // Единичный вектор направления между шарами
            const directionX = dx / distance;
            const directionY = dy / distance;

            // Перемещаем шары, чтобы они не пересекались
            ball.x -= (pushDistance * directionX) / 2;
            ball.y -= (pushDistance * directionY) / 2;
            ball2.x += (pushDistance * directionX) / 2;
            ball2.y += (pushDistance * directionY) / 2;

            // Расчет новых скоростей после столкновения
            const dotProduct1 = ball.vx * directionX + ball.vy * directionY;
            const dotProduct2 = ball2.vx * directionX + ball2.vy * directionY;

            const velocityX1 = dotProduct1 * directionX;
            const velocityY1 = dotProduct1 * directionY;
            const velocityX2 = dotProduct2 * directionX;
            const velocityY2 = dotProduct2 * directionY;

            ball.vx -= velocityX1;
            ball.vy -= velocityY1;
            ball2.vx -= velocityX2;
            ball2.vy -= velocityY2;

            ball.vx += velocityX2;
            ball.vy += velocityY2;
            ball2.vx += velocityX1;
            ball2.vy += velocityY1;
          }
        }
      });
    };

    const update = () => {
      if (!ctx || !canvas) return;

      // Перерисовка доски
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTable();

      balls.forEach((ball) => {
        // Применение трения
        ball.vx *= 0.98;
        ball.vy *= 0.98;

        // Обновление позиции шара
        ball.x += ball.vx;
        ball.y += ball.vy;
      });

      // Проверка столкновений после каждого шага перемещения шара
      detectCollisions();

      requestAnimationFrame(update);
    };

    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('click', handleMouseClick);
      update();
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleMouseClick);
      }
    };
  }, []);

  return (
    <div className={cls.wrapper}>
      {selectedBall && (
        <ColorMenu
          x={selectedBall.x}
          y={selectedBall.y}
          color={selectedBall.color}
          setColor={setColor}
        />
      )}
      <canvas ref={canvasRef} width={800} height={500} />
    </div>
  );
};
