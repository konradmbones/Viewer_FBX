// animation-normalizer.js - Skrypt do normalizacji animacji FBX z dużym offsetem klatek
console.log('Animation Normalizer loaded');

/**
 * Normalizuje animację FBX, przesuwając wszystkie klatki kluczowe tak, aby zaczynały się od 0
 * @param {THREE.AnimationClip} animation - Animacja do znormalizowania
 * @returns {THREE.AnimationClip} Znormalizowana animacja
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
    
    // Stwórz nową animację zamiast klonować, aby uniknąć problemów z referencjami
    const tracks = [];
    
    // Przesuń wszystkie czasy klatek kluczowych
    animation.tracks.forEach(track => {
        // Stwórz nową tablicę czasów
        const times = new Float32Array(track.times.length);
        for (let i = 0; i < track.times.length; i++) {
            times[i] = track.times[i] - minTime;
        }
        
        // Stwórz nową ścieżkę z przesuniętymi czasami
        const newTrack = new THREE.KeyframeTrack(
            track.name,
            times,
            track.values.slice(),
            track.getInterpolation()
        );
        
        tracks.push(newTrack);
    });
    
    // Stwórz nową animację z przesuniętymi ścieżkami
    const normalizedAnimation = new THREE.AnimationClip(
        animation.name,
        maxTime - minTime, // Nowy czas trwania
        tracks
    );
    
    console.log('Animacja znormalizowana. Nowy czas trwania:', normalizedAnimation.duration, 'sekund');
    return normalizedAnimation;
}

/**
 * Ustawia określony offset klatek dla animacji FBX
 * @param {THREE.AnimationClip} animation - Animacja do modyfikacji
 * @param {number} frameOffset - Offset klatek do odjęcia
 * @param {number} fps - Liczba klatek na sekundę
 * @returns {THREE.AnimationClip} Zmodyfikowana animacja
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
