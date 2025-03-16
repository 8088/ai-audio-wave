// 简化后的音频波形组件
class AudioWave extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isAnimating = false;  // 添加动画状态标记
        this.color = '#74b9ff'; // 默认颜色
    }

    // 添加颜色设置方法
    setColor(color) {
        this.color = color;
        this.updateColor();
    }

    // 更新颜色的方法
    updateColor() {
        const elements = this.shadowRoot.querySelectorAll('.bar, .dot');
        elements.forEach(element => {
            element.style.backgroundColor = this.color;
        });
    }

    connectedCallback() {
        this.render();
        // 设置初始颜色
        this.updateColor();
    }

    // 支持通过属性设置颜色
    static get observedAttributes() {
        return ['color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color' && oldValue !== newValue) {
            this.setColor(newValue);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .audio-wave {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    height: 60px;
                    padding: 20px;
                }

                .bar, .dot {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    transition: background-color 0.3s;
                }

                @keyframes wave {
                    0%, 100% { 
                        height: 3px; 
                        border-radius: 50%;
                        opacity: 0.5;
                    }
                    15% { 
                        height: var(--max-height); 
                        border-radius: 3px;
                        opacity: 1;
                    }
                    30% { 
                        height: 3px; 
                        border-radius: 50%;
                        opacity: 0.5;
                    }
                }

                @keyframes dotWave {
                    0%, 100% { 
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    15% { 
                        transform: scale(1.5);
                        opacity: 1;
                    }
                    30% { 
                        transform: scale(1);
                        opacity: 0.5;
                    }
                }

                .element.playing {
                    animation: var(--animation-type) 1.5s linear;
                    animation-delay: calc(var(--index) * 0.03s);
                }

                .h1.playing { --max-height: 8px; --animation-type: wave; }
                .h2.playing { --max-height: 15px; --animation-type: wave; }
                .h3.playing { --max-height: 22px; --animation-type: wave; }
                .h4.playing { --max-height: 28px; --animation-type: wave; }
                .h5.playing { --max-height: 35px; --animation-type: wave; }
                .dot.playing { --animation-type: dotWave; }
            </style>
            <div class="audio-wave">
                <div class="dot element" style="--index: 0"></div>
                <div class="dot element" style="--index: 1"></div>
                
                <div class="bar h2 element" style="--index: 2"></div>
                <div class="bar h1 element" style="--index: 3"></div>
                <div class="bar h4 element" style="--index: 4"></div>
                <div class="bar h2 element" style="--index: 5"></div>
                <div class="bar h5 element" style="--index: 6"></div>
                <div class="bar h3 element" style="--index: 7"></div>
                <div class="bar h3 element" style="--index: 8"></div>
                
                <div class="dot element" style="--index: 9"></div>
                
                <div class="bar h3 element" style="--index: 10"></div>
                <div class="bar h1 element" style="--index: 11"></div>
                <div class="bar h4 element" style="--index: 12"></div>
                <div class="bar h2 element" style="--index: 13"></div>
                <div class="bar h5 element" style="--index: 14"></div>
                <div class="bar h3 element" style="--index: 15"></div>
                <div class="bar h2 element" style="--index: 16"></div>

                <div class="dot element" style="--index: 17"></div>

                <div class="bar h3 element" style="--index: 18"></div>
                <div class="bar h1 element" style="--index: 19"></div>
                <div class="bar h4 element" style="--index: 20"></div>
                <div class="bar h2 element" style="--index: 21"></div>
                <div class="bar h5 element" style="--index: 22"></div>
                <div class="bar h3 element" style="--index: 23"></div>

                <div class="dot element" style="--index: 24"></div>
                <div class="dot element" style="--index: 25"></div>
            </div>
        `;
    }

    play() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            const elements = this.shadowRoot.querySelectorAll('.element');
            elements.forEach(element => {
                if (!element.classList.contains('playing')) {
                    element.classList.add('playing');
                }
            });
        }
    }

    stop() {
        if (this.isAnimating) {
            this.isAnimating = false;
            const elements = this.shadowRoot.querySelectorAll('.element');
            elements.forEach(element => {
                element.classList.remove('playing');
            });
        }
    }
}

// 注册组件
customElements.define('audio-wave', AudioWave); 