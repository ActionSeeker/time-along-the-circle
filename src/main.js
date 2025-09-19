import './style.css';
import { draw } from './draw';

draw();

document.getElementById('exportCanvas').addEventListener('click', () => {
  const canvas = document.getElementById('c'); // <canvas id="c">
  const a = document.createElement('a');
  a.download = 'diagram.png';
  a.href = canvas.toDataURL('image/png'); // PNG, transparent bg
  a.click();
});
