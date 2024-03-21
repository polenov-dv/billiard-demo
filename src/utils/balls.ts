export interface Ball {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  canPush: boolean;
}

export const StartBalls: Ball[] = [
  {
    x: 200,
    y: 250,
    radius: 20,
    vx: 0,
    vy: 0,
    color: 'white',
    canPush: true,
  },
  {
    x: 400,
    y: 250,
    radius: 25,
    vx: 0,
    vy: 0,
    color: '#ff5511',
    canPush: true,
  },
  {
    x: 450,
    y: 250,
    radius: 16,
    vx: 0,
    vy: 0,
    color: '#eeee00',
    canPush: true,
  },
  {
    x: 450,
    y: 200,
    radius: 18,
    vx: 0,
    vy: 0,
    color: '#ff7744',
    canPush: true,
  },
  {
    x: 450,
    y: 300,
    radius: 20,
    vx: 0,
    vy: 0,
    color: '#0066ff',
    canPush: true,
  },
  {
    x: 520,
    y: 320,
    radius: 28,
    vx: 0,
    vy: 0,
    color: '#77feee',
    canPush: true,
  },
  {
    x: 520,
    y: 250,
    radius: 35,
    vx: 0,
    vy: 0,
    color: '#ff77ff',
    canPush: true,
  },
  {
    x: 520,
    y: 175,
    radius: 32,
    vx: 0,
    vy: 0,
    color: '#cc00cc',
    canPush: true,
  },
];
