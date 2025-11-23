#!/bin/bash

# Script pentru pornirea site-ului de nuntă local

echo "🎊 Pornire site nuntă Larisa & Răzvan..."
echo ""

# Verifică dacă Python 3 e instalat
if command -v python3 &> /dev/null; then
    echo "✅ Python3 găsit!"
    echo "📍 Deschide browser-ul la: http://localhost:8000"
    echo "⏹️  Apasă Ctrl+C pentru a opri serverul"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python găsit!"
    echo "📍 Deschide browser-ul la: http://localhost:8000"
    echo "⏹️  Apasă Ctrl+C pentru a opri serverul"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python nu este instalat!"
    echo "Instalează Python sau folosește Firebase Hosting"
    echo ""
    echo "Alternativ, deschide direct index.html în browser:"
    echo "👉 Double-click pe index.html"
fi

