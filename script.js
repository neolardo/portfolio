document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('content');
    loadPortfolio();

    function loadPortfolio() {
        content.innerHTML = `
            <div class="portfolio-container">
               <button class="button" style="background-color: #75B9BE"></button>
                <button class="button" style="background-color: #F29559"></button>
                <button class="button" style="background-color: #B0C6A5"></button>
                <button class="button" style="background-color: #CAAB83"></button>
                <button class="button" style="background-color: #3C5468"></button>
                <button class="button" style="background-color: #D25559"></button>
                <div class="horizontal-slider slider">
                    <div class="slider-knob knob-horizontal"></div>
                </div>
                <div class="vertical-slider slider">
                    <div class="slider-knob knob-vertical"></div>
                </div>
                <div class="display-text">click to listen</div>
            </div>
            <div class="circle-container"></div>
        `;

        const buttons = document.querySelectorAll('.button');
        const textDisplay = document.querySelector('.display-text');
        const horizontalKnob = document.querySelector('.knob-horizontal');
        const verticalKnob = document.querySelector('.knob-vertical');
        const horizontalSlider = document.querySelector('.horizontal-slider');
        const verticalSlider = document.querySelector('.vertical-slider');
        const circleContainer = document.querySelector('.circle-container');
        let audio = null;
        let selectedButton = null;
        let isDraggingHorizontal = false;
        let isDraggingVertical = false;
        let currentVolume = 1; // Default volume to maximum (1.0)

        // Define audio data for each button
        const audioData = [
			{ text: "Anna", url: "D:\Creations\\Audio\\Portfolio\\Anna 2024.mp3" },
            { text: "Pensiveness", url: "D:\Creations\\Audio\\Portfolio\\Pensiveness Remastered 2024.mp3" },
            { text: "Conjecture", url: "D:\Creations\\Audio\\Portfolio\\Conjecture Remastered 2024.mp3" },
            { text: "Stadium Ludus - Main Theme", url: "D:\Creations\\Audio\\Portfolio\\Stadium Ludus - Main Theme Remastered 2024.mp3" },
            { text: "Even if its meaningless", url: "D:\Creations\\Audio\\Portfolio\\Even if its meaningless.mp3" },
            { text: "Track 6", url: "https://path-to-your-audio-file6.mp3" }
        ];

        buttons.forEach((button, index) => {
            button.addEventListener('click', function () {
                if (selectedButton === this) {
                    // Deselect the button
                    stopAudio();
                    resetUI();
                } else {
                    // Select the button
                    selectButton(this, audioData[index]);
                    playAudio(audioData[index].url);
                }
            });
        });

        // Dragging functionality for sliders
        horizontalKnob.addEventListener('mousedown', () => isDraggingHorizontal = true);
        verticalKnob.addEventListener('mousedown', () => isDraggingVertical = true);

        document.addEventListener('mouseup', () => {
            if (isDraggingHorizontal && audio) {
                const rect = horizontalSlider.getBoundingClientRect();
                let x = parseFloat(horizontalKnob.style.left) || 0;
                const newTime = (x / (rect.width - horizontalKnob.offsetWidth)) * audio.duration;
                audio.currentTime = newTime;
            }
            isDraggingHorizontal = false;
            isDraggingVertical = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDraggingHorizontal) {
                const rect = horizontalSlider.getBoundingClientRect();
                let x = e.clientX - rect.left;
                x = Math.max(0, Math.min(x, rect.width - horizontalKnob.offsetWidth));
                horizontalKnob.style.left = `${x}px`;
            }

            if (isDraggingVertical && audio) {
                const rect = verticalSlider.getBoundingClientRect();
                let y = e.clientY - rect.top;
                y = Math.max(0, Math.min(y, rect.height - verticalKnob.offsetHeight));
                verticalKnob.style.top = `${y}px`;
                currentVolume = 1 - (y / (rect.height - verticalKnob.offsetHeight));
                audio.volume = currentVolume;
            }
        });

        function selectButton(button, data) {
            // Reset previous selection
            if (selectedButton) {
                selectedButton.classList.remove('selected');
            }
            selectedButton = button;
            selectedButton.classList.add('selected');

            // Update UI with the button's color and text
            const color = getComputedStyle(button).backgroundColor;
            textDisplay.textContent = data.text;
            textDisplay.style.color = color;
            horizontalKnob.style.backgroundColor = color;
            verticalKnob.style.backgroundColor = color;

            // Start background animation
            startBackgroundAnimation(color);
        }

        function resetUI() {
            if (selectedButton) {
                selectedButton.classList.remove('selected');
            }
            selectedButton = null;
            textDisplay.textContent = 'click to listen';
            textDisplay.style.color = '#AAA';
            horizontalKnob.style.backgroundColor = '#AAA';
            verticalKnob.style.backgroundColor = '#AAA';

            // Stop background animation
            stopBackgroundAnimation();
        }

        function playAudio(url) {
            stopAudio();
            audio = new Audio(url);
            audio.volume = currentVolume; // Set the audio volume to the current level
            audio.play();

            // Auto-deselect the button when track ends
            audio.addEventListener('ended', () => {
                stopAudio();
                resetUI();
            });

            // Update slider positions
            updateHorizontalSlider();
        }

        function stopAudio() {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                audio = null;
            }
        }

        function updateHorizontalSlider() {
            if (!audio) return;
            audio.addEventListener('timeupdate', () => {
                if (!isDraggingHorizontal) {
                    const progress = (audio.currentTime / audio.duration) * (horizontalSlider.offsetWidth - horizontalKnob.offsetWidth);
                    horizontalKnob.style.left = `${progress}px`;
                }
            });
        }

        function startBackgroundAnimation(color) {
            // Set up the background animation with concentric circles
            circleContainer.innerHTML = '';
            circleContainer.style.animation = 'none'; // Reset animation
            circleContainer.offsetHeight; // Trigger reflow
            circleContainer.style.animation = 'concentricAnimation 4s infinite';

            // Create a circle element
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.style.backgroundColor = color;
            circleContainer.appendChild(circle);
        }

        function stopBackgroundAnimation() {
            // Stop the concentric circle animation
            circleContainer.innerHTML = '';
            circleContainer.style.animation = 'none';
        }
    }
});
