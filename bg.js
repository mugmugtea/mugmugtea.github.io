const container = document.getElementById('container');
const count = 50;

for (let i = 0; i < count; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'triangle-wrapper';
    
    const size = Math.random() * 20 + 10;
    const speed = Math.random() * 35 + 10 + 's';
    const rotSpeed = Math.random() * 10 + 5 + 's';

    wrapper.style.setProperty('--size', `${size}px`);
    wrapper.style.setProperty('--speed', speed);
    wrapper.style.setProperty('--rot-speed', rotSpeed);
    
    // --- 核心修改：聚集邏輯 ---
    
    // 使用 Math.random() 的二次方來讓數值偏向大值（底部）
    // formula: (random^2 * range) + offset
    function getWeightedY() {
        const r = Math.random();
        // 80% 的機率聚集在 50%~100% 區間
        // 20% 的機率允許飛到任何位置 (0vh - 100vh)
        if (r > 0.2) {
            // 底部區域 (50vh - 100vh)
            return 50 + (Math.random() * 50);
        } else {
            // 完整區域 (0vh - 100vh)
            return Math.random() * 100;
        }
    }

    const x1 = Math.random() * 80;
    const y1 = getWeightedY();
    const x2 = Math.random() * 80;
    const y2 = getWeightedY();

    wrapper.style.setProperty('--x1', `${x1}vw`);
    wrapper.style.setProperty('--y1', `${y1}vh`);
    wrapper.style.setProperty('--x2', `${x2}vw`);
    wrapper.style.setProperty('--y2', `${y2}vh`);

    wrapper.innerHTML = `<div class="triangle"></div>`;
    container.appendChild(wrapper);
}
