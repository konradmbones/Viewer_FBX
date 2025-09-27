# Viewer-FBX

Przeglądarka plików FBX oparta na Three.js

## Funkcje

- Wyświetlanie modeli 3D z plików FBX
- Odtwarzanie animacji z plików FBX
- Analiza struktury modelu i animacji
- Wyświetlanie kości i meshy
- Kontrola odtwarzania animacji (play/pause, timeline)
- Normalizacja animacji z dużym offsetem klatek

## Jak używać

### Uruchomienie serwera

Aby uruchomić aplikację lokalnie z wbudowanym serwerem HTTP:

```bash
python start_server.py
```

Serwer automatycznie otworzy przeglądarkę z adresem: `http://localhost:8000/index.html`

Można również uruchomić serwer ręcznie:

```bash
python -m http.server 8000
```

A następnie otworzyć przeglądarkę i przejść do adresu: `http://localhost:8000`

## Git LFS

Ten projekt używa Git LFS do przechowywania dużych plików binarnych (FBX). Aby sklonować repozytorium z plikami FBX:

1. Zainstaluj Git LFS: `git lfs install`
2. Sklonuj repozytorium: `git clone https://github.com/konradmbones/Viewer-FBX.git`
3. Pobierz pliki LFS: `git lfs pull`

## Struktura projektu

- `index.html` - główny plik HTML z kodem aplikacji
- `animation-normalizer.js` - skrypt do normalizacji animacji z dużym offsetem klatek
- `fix-meshes-error.js` - skrypt do naprawy potencjalnych błędów w meshach
- `desk_work_session_26_001.fbx` - przykładowy plik FBX do wyświetlania
- `start_server.py` - skrypt do uruchomienia lokalnego serwera HTTP

## Technologie

- Three.js - biblioteka do renderowania 3D w przeglądarce
- FBXLoader - loader plików FBX dla Three.js
- JavaScript ES6+ - nowoczesny JavaScript
- HTML5/CSS3 - struktura i stylizacja interfejsu
- Python - prosty serwer HTTP

## Funkcjonalność kodu

- Analiza czasu animacji z plików FBX
- Normalizacja animacji z dużym offsetem klatek
- Wyświetlanie struktury modelu (meshe, kości)
- Kontrola odtwarzania animacji (play/pause, timeline)
- Interaktywne przełączanie widoczności elementów modelu
