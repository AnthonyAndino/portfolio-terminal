'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { SPRITES, drawSprite, type Sprite } from './dino-sprites';

interface Props {
    onClose: () => void;
}

const CW = 640;
const CH = 180;
const GROUND_Y = 148;
const DINO_X = 40;
const SCALE = 2;

const BG = '#0d1117';
const FG = '#7ee787';
const OUTLINE = '#3d7a48';
const MUTED = '#30363d';
const MUTED_TEXT = '#6e7681';
const CLOUD_FILL = '#30363d';

interface Obstacle {
    x: number;
    type: 'small' | 'large' | 'bird';
    birdWing: boolean;
    w: number;
    h: number;
    birdY: number;
}

interface GameState {
    running: boolean;
    animId: number;
    frame: number;
    score: number;
    highScore: number;
    speed: number;
    dead: boolean;
    started: boolean;
    firstTime: boolean;
    dinoY: number;
    dinoVy: number;
    grounded: boolean;
    jumpHeld: boolean;
    ducking: boolean;
    leg: number;
    legTimer: number;
    obstacles: Obstacle[];
    cloudX: number[];
    groundX: number;
    gameOverAt: number;
    lastObs: number;
    birdFrame: number;
}

export default function DinoGame({ onClose }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const g = useRef<GameState>({
        running: false,
        animId: 0,
        frame: 0,
        score: 0,
        highScore: 0,
        speed: 7,
        dead: false,
        started: false,
        firstTime: true,
        dinoY: 0,
        dinoVy: 0,
        grounded: true,
        jumpHeld: false,
        ducking: false,
        leg: 0,
        legTimer: 0,
        obstacles: [],
        cloudX: [],
        groundX: 0,
        gameOverAt: 0,
        lastObs: 0,
        birdFrame: 0,
    });

    const restart = useCallback(() => {
        const s = g.current;
        s.dead = false;
        s.started = true;
        s.firstTime = false;
        s.score = 0;
        s.frame = 0;
        s.speed = 7;
        s.dinoY = 0;
        s.dinoVy = 0;
        s.grounded = true;
        s.ducking = false;
        s.jumpHeld = false;
        s.leg = 0;
        s.legTimer = 0;
        s.obstacles = [];
        s.groundX = 0;
        s.lastObs = 0;
        s.birdFrame = 0;
        setScore(0);
    }, []);

    const jump = useCallback(() => {
        const s = g.current;
        if (s.dead) {
            if (Date.now() - s.gameOverAt > 400) restart();
            return;
        }
        if (!s.started) { s.started = true; return; }
        if (s.grounded) {
            s.dinoVy = -10;
            s.grounded = false;
            s.jumpHeld = true;
        }
    }, [restart]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        const s = g.current;

        try {
            s.highScore = parseInt(localStorage.getItem('dino_hi') || '0', 10) || 0;
            setHighScore(s.highScore);
        } catch { s.highScore = 0; }

        s.firstTime = true;
        s.gameOverAt = 0;
        s.cloudX = [CW * 0.1, CW * 0.5, CW * 0.8];

        const keys: Record<string, boolean> = {};

        function loop() {
            if (!s.running || !canvas) return;

            ctx.fillStyle = BG;
            ctx.fillRect(0, 0, CW, CH);

            if (!s.dead && s.started) {
                s.frame++;

                if (s.frame % 6 === 0) {
                    s.score++;
                    setScore(s.score);
                }

                const speed = Math.min(13, 7 + Math.floor(s.score / 100) * 0.3);
                s.speed = speed;

                s.legTimer++;
                const legSpeed = Math.max(3, 8 - Math.floor(s.score / 200));
                if (s.legTimer > legSpeed) {
                    s.legTimer = 0;
                    s.leg = s.leg === 0 ? 1 : 0;
                }

                s.birdFrame++;

                if (!s.grounded) {
                    let gravity = 0.6;
                    if (keys['ArrowDown']) gravity = 2;
                    else if (!s.jumpHeld && s.dinoVy < -3) s.dinoVy = -3;
                    s.dinoVy += gravity;
                    s.dinoY += s.dinoVy;
                    if (s.dinoY >= 0) {
                        s.dinoY = 0;
                        s.dinoVy = 0;
                        s.grounded = true;
                    }
                }

                s.ducking = keys['ArrowDown'] && s.grounded;

                const minGap = Math.max(80, 130 - Math.floor(s.score / 100) * 4);
                if (s.frame - s.lastObs > minGap && Math.random() < 0.018) {
                    const r = Math.random();
                    const birdYValues = [GROUND_Y - 85, GROUND_Y - 60, GROUND_Y - 40];
                    if (s.score > 200 && r < 0.25) {
                        s.obstacles.push({
                            x: CW,
                            type: 'bird',
                            birdWing: true,
                            w: 36,
                            h: 32,
                            birdY: birdYValues[Math.floor(Math.random() * 3)],
                        });
                    } else if (r < 0.55) {
                        s.obstacles.push({ x: CW, type: 'small', birdWing: false, w: 24, h: 40, birdY: 0 });
                    } else {
                        s.obstacles.push({ x: CW, type: 'large', birdWing: false, w: 24, h: 48, birdY: 0 });
                    }
                    s.lastObs = s.frame;
                }

                for (const o of s.obstacles) o.x -= s.speed;
                if (s.obstacles.length > 0 && s.obstacles[0].x + s.obstacles[0].w < -20) {
                    s.obstacles.shift();
                }
            }

            // Clouds
            for (let i = 0; i < s.cloudX.length; i++) {
                if (!s.dead && s.started) {
                    s.cloudX[i] -= 0.3;
                    if (s.cloudX[i] < -40) {
                        s.cloudX[i] = CW + Math.random() * 60;
                    }
                }
                drawSprite(ctx, SPRITES.cloud, Math.floor(s.cloudX[i]), 8 + i * 14, 1, CLOUD_FILL, CLOUD_FILL);
            }

            // Ground
            ctx.fillStyle = FG;
            ctx.fillRect(0, GROUND_Y, CW, 1);
            if (!s.dead && s.started) s.groundX = (s.groundX + s.speed) % 100;
            ctx.fillStyle = MUTED;
            for (let i = 0; i < 10; i++) {
                const gx = (i * 80 - s.groundX + 80) % (CW + 80) - 60;
                ctx.fillRect(gx, GROUND_Y + 2, 12, 1);
                ctx.fillRect(gx + 25, GROUND_Y + 5, 6, 1);
                ctx.fillRect(gx + 50, GROUND_Y + 3, 8, 1);
                ctx.fillRect(gx + 72, GROUND_Y + 6, 5, 1);
            }

            // Obstacles
            for (const o of s.obstacles) {
                let sprite: Sprite;
                if (o.type === 'bird') {
                    sprite = s.birdFrame % 20 < 10 ? SPRITES.bird.wingUp : SPRITES.bird.wingDown;
                    drawSprite(ctx, sprite, o.x, o.birdY, SCALE, FG, OUTLINE);
                } else if (o.type === 'large') {
                    drawSprite(ctx, SPRITES.cactus.large, o.x, GROUND_Y - 48, SCALE, FG, OUTLINE);
                } else {
                    drawSprite(ctx, SPRITES.cactus.small, o.x, GROUND_Y - 40, SCALE, FG, OUTLINE);
                }

                if (!s.dead) {
                    const dinoSprite = getDinoSprite(s);
                    const dinoH = dinoSprite.length * SCALE;
                    const dinoW = dinoSprite[0].length * SCALE;
                    const dy = GROUND_Y - dinoH + s.dinoY;

                    const oH = o.type === 'bird' ? 30 : (o.type === 'large' ? 46 : 38);
                    const oW = o.type === 'bird' ? 34 : 22;
                    const oy = o.type === 'bird' ? o.birdY + 3 : GROUND_Y - oH - 1;

                    const dL = DINO_X + 6, dR = DINO_X + dinoW - 6;
                    const dT = dy + 4, dB = dy + dinoH - 4;
                    const oL = o.x + 1, oR = o.x + oW - 1;
                    const oT = oy + 1, oB = oy + oH - 1;

                    if (dL < oR && dR > oL && dT < oB && dB > oT) {
                        s.dead = true;
                        s.gameOverAt = Date.now();
                        if (s.score > s.highScore) {
                            s.highScore = s.score;
                            setHighScore(s.score);
                            try { localStorage.setItem('dino_hi', String(s.score)); } catch { }
                        }
                    }
                }
            }

            // Dino
            const dinoSprite = getDinoSprite(s);
            const dinoH = dinoSprite.length * SCALE;
            const dy = GROUND_Y - dinoH + s.dinoY;
            drawSprite(ctx, dinoSprite, DINO_X, dy, SCALE, FG, OUTLINE);

            // Score
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'right';
            const sc = String(s.score).padStart(5, '0');
            const hi = String(s.highScore).padStart(5, '0');
            if (s.highScore > 0) {
                ctx.fillStyle = MUTED_TEXT;
                ctx.fillText(`HI ${hi}`, CW - 15 - ctx.measureText(sc).width, 25);
            }
            ctx.fillStyle = s.score > 0 && s.score % 100 === 0 && Math.floor(s.frame / 5) % 2 === 0 ? BG : FG;
            ctx.fillText(sc, CW - 15, 25);

            // Game over
            if (s.dead) {
                ctx.fillStyle = 'rgba(13,17,23,0.6)';
                ctx.fillRect(0, 0, CW, CH);
                ctx.fillStyle = FG;
                ctx.font = 'bold 18px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('G A M E   O V E R', CW / 2, CH / 2 - 16);
                // retry icon
                const rx = CW / 2, ry = CH / 2 + 14;
                ctx.strokeStyle = FG; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(rx, ry, 12, 0.2 * Math.PI, 1.9 * Math.PI); ctx.stroke();
                ctx.fillStyle = FG;
                ctx.beginPath(); ctx.moveTo(rx + 8, ry - 14); ctx.lineTo(rx + 14, ry - 8); ctx.lineTo(rx + 6, ry - 7); ctx.fill();
                ctx.fillStyle = MUTED_TEXT; ctx.font = '10px monospace';
                ctx.fillText('SPACE to restart', CW / 2, ry + 32);
            }

            // First time
            if (!s.dead && !s.started && s.firstTime) {
                ctx.fillStyle = FG;
                ctx.font = 'bold 14px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('Press SPACE or tap to start', CW / 2, CH / 2 + 10);
            }

            s.animId = requestAnimationFrame(loop);
        }

        s.running = true;
        s.animId = requestAnimationFrame(loop);

        const onDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
            if (e.code === 'ArrowDown') { e.preventDefault(); keys['ArrowDown'] = true; }
            if (e.code === 'Escape') { e.preventDefault(); onClose(); }
        };
        const onUp = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') s.jumpHeld = false;
            if (e.code === 'ArrowDown') keys['ArrowDown'] = false;
        };
        const onClick = () => jump();
        window.addEventListener('keydown', onDown);
        window.addEventListener('keyup', onUp);
        canvas.addEventListener('mousedown', onClick);
        canvas.addEventListener('touchstart', e => { e.preventDefault(); onClick(); }, { passive: false });

        return () => {
            s.running = false;
            cancelAnimationFrame(s.animId);
            window.removeEventListener('keydown', onDown);
            window.removeEventListener('keyup', onUp);
            canvas.removeEventListener('mousedown', onClick);
        };
    }, [jump, restart, onClose]);

    return (
        <div className="flex flex-col h-full select-none">
            <div className="flex items-center justify-between mb-2 shrink-0">
                <span className="text-[#7ee787] font-mono text-xs font-bold glow-green">DINO RUNNER</span>
                <button onClick={onClose} className="text-[#6e7681] font-mono text-xs hover:text-[#7ee787] transition-colors">[ESC] back</button>
            </div>
            <div className="flex-1 min-h-0 flex items-center justify-center">
                <canvas ref={canvasRef} width={CW} height={CH}
                    className="w-full max-w-[640px] aspect-[64/18] rounded border border-[#7ee787]/15 cursor-pointer glow-border-green"
                    style={{ imageRendering: 'pixelated' }} />
            </div>
        </div>
    );
}

function getDinoSprite(s: GameState): Sprite {
    if (s.dead) return SPRITES.dino.dead;
    if (!s.grounded) return SPRITES.dino.stand;
    if (s.ducking) return SPRITES.dino.stand;
    return SPRITES.dino.run[s.leg];
}
