let money = 0;
let clickAmount = 1;
let clickKey = ' ';
let keyIsPressed = false;
let honeybunCount = 0;
let tonkaCount = 0;
let clickCount = 0;
let volume = 0.5; // Default volume
let turntBellBought = false; // Flag to track if turnt bell is bought
let lyfeStyleBought = false; // Flag to track if lyfe style is bought

// Get the audio elements
const clickSound = document.getElementById('clickSound');
const bellSound = document.getElementById('bellSound');
clickSound.volume = volume; // Set initial volume

document.getElementById('yeat').addEventListener('click', function() {
    incrementMoney();
    playClickSound();
    clickCount++;
    updateStats();
});

document.getElementById('keybind').addEventListener('keydown', function(event) {
    clickKey = event.key;
    document.getElementById('keybind').value = clickKey;
});

document.addEventListener('keydown', function(event) {
    if (event.key === clickKey && !keyIsPressed) {
        keyIsPressed = true;
        incrementMoney();
        playClickSound();
        clickCount++;
        updateStats();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === clickKey) {
        keyIsPressed = false;
    }
});

function incrementMoney() {
    money += clickAmount;
    document.getElementById('money').innerText = `Monëy: ${money}`;
    document.getElementById('clickAmount').innerText = `Click: +${clickAmount}`;
}

function playClickSound() {
    const selectedSound = document.getElementById('clickSoundSelect').value;
    if (selectedSound === 'bell' && turntBellBought) {
        bellSound.currentTime = 0;
        bellSound.play();
    } else {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

document.getElementById('menuButtonTopRight').addEventListener('click', function() {
    const overlay = document.getElementById('dropdownOverlay');
    overlay.classList.toggle('active'); // Toggle the 'active' class to show/hide overlay
});

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('dropdownOverlay').classList.remove('active'); // Remove 'active' class to hide overlay
});

function openTab(event, tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.className += ' active';
}

function buyUpgrade(upgrade) {
    if (upgrade === 'honeybun' && money >= 50) {
        money -= 50;
        clickAmount += 1;
        honeybunCount++;
        document.getElementById('money').innerText = `Monëy: ${money}`;
        document.getElementById('clickAmount').innerText = `Click: +${clickAmount}`;
        document.getElementById('honeybunCount').innerText = `Honeybuns Bought: ${honeybunCount}`;
    } else if (upgrade === 'tonka' && money >= 10000) {
        money -= 10000;
        clickAmount += 200;
        tonkaCount++;
        document.getElementById('money').innerText = `Monëy: ${money}`;
        document.getElementById('clickAmount').innerText = `Click: +${clickAmount}`;
        document.getElementById('tonkaCount').innerText = `Tonkas Bought: ${tonkaCount}`;
    } else if (upgrade === 'heavyweight' && money >= heavyweightCost && !heavyweightBought) {
        money -= heavyweightCost;
        heavyweightCount++;
        heavyweightBought = true; // Set heavyweight as bought
        document.getElementById('money').innerText = `Monëy: ${money}`;
        document.getElementById('heavyweight').style.display = 'none'; // Hide the heavyweight button
        document.getElementById('heavyweightStatus').innerText = `Hëavyweight Bought: Yes`; // Update stats
        startAutoClick();
    } else if (upgrade === 'turntBell' && money >= 10000 && !turntBellBought) {
        money -= 10000;
        turntBellBought = true;
        document.getElementById('money').innerText = `Monëy: ${money}`;
        document.getElementById('turntBell').style.display = 'none'; // Hide the turnt bell button
        document.getElementById('bellOption').style.display = 'block'; // Show the bell option in cosmetics
        updateStats(); // Update turnt bell bought status in UI
    } else if (upgrade === 'lyfeStyle' && money >= 100000 && !lyfeStyleBought) {
        money -= 100000;
        lyfeStyleBought = true;
        document.getElementById('money').innerText = `Monëy: ${money}`;
        document.getElementById('lyfeStyle').style.display = 'none'; // Hide the lyfe style button
        document.getElementById('lyfeOption').style.display = 'block'; // Show the lyfe style option in cosmetics
        updateStats(); // Update lyfe style bought status in UI
    }
}

function updateStats() {
    document.getElementById('clickCount').innerText = `Total Clicks: ${clickCount}`;
    document.getElementById('turntBellStatus').innerText = `Turnt Bell Bought: ${turntBellBought ? 'Yes' : 'No'}`;
    document.getElementById('lyfeStyleStatus').innerText = `Lyfe Style Bought: ${lyfeStyleBought ? 'Yes' : 'No'}`;
}

function resetKeybind() {
    clickKey = ' ';
    document.getElementById('keybind').value = clickKey;
}

function updateVolume() {
    volume = document.getElementById('volumeSlider').value;
    clickSound.volume = volume;
    bellSound.volume = volume;
}

function exportData() {
    const data = {
        money,
        clickAmount,
        honeybunCount,
        tonkaCount,
        clickCount,
        volume,
        turntBellBought,
        lyfeStyleBought
    };

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'player.twizzy';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.twizzy';
    input.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            const importedData = JSON.parse(reader.result);
            money = importedData.money;
            clickAmount = importedData.clickAmount;
            honeybunCount = importedData.honeybunCount;
            tonkaCount = importedData.tonkaCount;
            clickCount = importedData.clickCount;
            volume = importedData.volume;
            turntBellBought = importedData.turntBellBought;
            lyfeStyleBought = importedData.lyfeStyleBought;

            // Update UI elements accordingly
            document.getElementById('money').innerText = `Monëy: ${money}`;
            document.getElementById('clickAmount').innerText = `Click: +${clickAmount}`;
            document.getElementById('honeybunCount').innerText = `Honeybuns Bought: ${honeybunCount}`;
            document.getElementById('tonkaCount').innerText = `Tonkas Bought: ${tonkaCount}`;
            document.getElementById('clickCount').innerText = `Total Clicks: ${clickCount}`;
            document.getElementById('volumeSlider').value = volume;
            updateVolume(); // Update volume slider and audio volume

            if (turntBellBought) {
                document.getElementById('turntBell').style.display = 'none';
                document.getElementById('bellOption').style.display = 'block';
            }

            if (lyfeStyleBought) {
                document.getElementById('lyfeStyle').style.display = 'none';
                document.getElementById('lyfeOption').style.display = 'block';
            }

            alert('Data imported successfully!');
        };
        reader.readAsText(file);
    };
    input.click();
}

function setYeat(style) {
    const yeatImage = document.getElementById('yeat');
    if (style === 'lyfe' && lyfeStyleBought) {
        yeatImage.src = `Styles/lyfë.png`;
    } else {
        yeatImage.src = `Styles/yeat_style_${style}.png`;
    }
}

document.getElementById('yeatStyle').addEventListener('change', function() {
    setYeat(this.value);
});

// Initialize game
updateStats();
