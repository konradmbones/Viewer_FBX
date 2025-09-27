// animation-normalizer.js - Skrypt do normalizacji animacji FBX z dużym offsetem klatek
console.log('Animation Normalizer loaded');

/**
 * Normalizuje animację FBX, przesuwając wszystkie klatki kluczowe tak, aby zaczynały się od 0
 * @param {Object} animation - Animacja do znormalizowania
 * @returns {Object} Znormalizowana animacja
 */
function normalizeAnimation(animation) {
    if (!animation || !animation.tracks || animation.tracks.length === 0) {
        console.error('Nieprawidłowa animacja do normalizacji');
        return animation;
    }
    
    console.log('Normalizacja animacji:', animation.name);
    console.log('Oryginalny czas trwania:', animation.duration, 'sekund');
    
    // Znajdź minimalny i maksymalny czas we wszystkich ścieżkach
    let minTime = Infinity;
    let maxTime = -Infinity;
    
    animation.tracks.forEach(track => {
        if (track.times.length > 0) {
            minTime = Math.min(minTime, track.times[0]);
            maxTime = Math.max(maxTime, track.times[track.times.length - 1]);
        }
    });
    
    console.log('Wykryty zakres czasu:', minTime, 'do', maxTime, 'sekund');
    console.log('Wykryty offset czasowy:', minTime, 'sekund');
    console.log('Rzeczywisty czas trwania:', maxTime - minTime, 'sekund');
    
    if (minTime === Infinity || minTime === 0) {
        console.log('Brak offsetu do normalizacji');
        return animation;
    }
    
    // Klonuj animację
    const normalizedAnimation = animation.clone();
    
    // Przesuń wszystkie czasy klatek kluczowych
    normalizedAnimation.tracks.forEach(track => {
        for (let i = 0; i < track.times.length; i++) {
            track.times[i] -= minTime;
        }
    });
    
    // Zaktualizuj czas trwania animacji
    normalizedAnimation.duration = maxTime - minTime;
    
    console.log('Animacja znormalizowana. Nowy czas trwania:', normalizedAnimation.duration, 'sekund');
    return normalizedAnimation;
}

/**
 * Ustawia określony offset klatek dla animacji FBX
 * @param {Object} animation - Animacja do modyfikacji
 * @param {number} frameOffset - Offset klatek do odjęcia
 * @param {number} fps - Liczba klatek na sekundę
 * @returns {Object} Zmodyfikowana animacja
 */
function applyFrameOffset(animation, frameOffset, fps) {
    if (!animation || !animation.tracks || animation.tracks.length === 0) {
        console.error('Nieprawidłowa animacja do modyfikacji offsetu');
        return animation;
    }
    
    console.log(`Stosowanie offsetu klatek: ${frameOffset} przy ${fps} FPS`);
    
    // Oblicz offset czasowy na podstawie offsetu klatek
    const timeOffset = frameOffset / fps;
    console.log('Offset czasowy:', timeOffset, 'sekund');
    
    // Stwórz kopię animacji
    const modifiedAnimation = animation.clone();
    
    // Przesuń wszystkie czasy klatek kluczowych
    modifiedAnimation.tracks.forEach(track => {
        for (let i = 0; i < track.times.length; i++) {
            track.times[i] -= timeOffset;
        }
    });
    
    // Zaktualizuj czas trwania animacji
    const originalDuration = modifiedAnimation.duration;
    modifiedAnimation.duration = Math.max(0, originalDuration - timeOffset);
    
    console.log('Animacja zmodyfikowana:');
    console.log('- Oryginalny czas trwania:', originalDuration, 'sekund');
    console.log('- Nowy czas trwania:', modifiedAnimation.duration, 'sekund');
    
    return modifiedAnimation;
}

// Eksportuj funkcje do globalnego zakresu
window.normalizeAnimation = normalizeAnimation;
window.applyFrameOffset = applyFrameOffset;
