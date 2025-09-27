// fix-meshes-error.js - Skrypt do naprawy błędów związanych z meshami w three.js
console.log('Fix Meshes Error module loaded');

/**
 * Funkcja do naprawy potencjalnych błędów w meshach
 * @param {THREE.Object3D} object - Obiekt 3D do naprawy
 */
function fixMeshesErrors(object) {
    if (!object) return;
    
    console.log('Sprawdzanie i naprawianie błędów w meshach...');
    
    object.traverse(function(child) {
        if (child.isMesh) {
            // Napraw potencjalne problemy z geometrią
            if (child.geometry) {
                if (!child.geometry.attributes.normal) {
                    console.log(`Mesh ${child.name} nie ma normalnych, generowanie...`);
                    child.geometry.computeVertexNormals();
                }
                
                // Sprawdź, czy geometria ma indeksy
                if (!child.geometry.index) {
                    console.log(`Mesh ${child.name} nie ma indeksów, może to powodować problemy z cieniami.`);
                }
            }
            
            // Napraw potencjalne problemy z materiałami
            if (child.material) {
                // Upewnij się, że materiał ma poprawne ustawienia
                if (child.material.transparent && child.material.opacity === 1) {
                    console.log(`Mesh ${child.name} ma włączoną przezroczystość, ale opacity=1, naprawianie...`);
                    child.material.transparent = false;
                }
            }
        }
    });
    
    console.log('Zakończono sprawdzanie i naprawianie błędów w meshach');
}

// Eksportuj funkcję do globalnego zakresu
window.fixMeshesErrors = fixMeshesErrors;
