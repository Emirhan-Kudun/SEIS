//
//  ContentView.swift
//  UndercoverMusic
//
//  Created by Emirhan on 17.01.2026.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
import React;, { useState } from "react";
import { Music, Users, TrendingUp, Heart, DollarSign, Radio, Mic2, Download, Crown, Sparkles, MessageCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const MusicPlatformPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "HarmonyHub",
      subtitle: "Hybrid Müzik Platformu",
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl">
              <Music className="w-20 h-20 text-white" />
              <p className="text-white mt-4 font-semibold">Mainstream</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-8 rounded-2xl">
              <Sparkles className="w-20 h-20 text-white" />
              <p className="text-white mt-4 font-semibold">Indie</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hem popüler sanatçılar hem de bağımsız yetenekler için tek platform
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-800 p-4 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Adil Gelir</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Topluluk</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl">
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Direkt Destek</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ana Sayfa Tasarımı",
      subtitle: "Homepage Layout",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                placeholder="🔍 Sanatçı, şarkı veya podcast ara..."
                className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full mr-4"
                readOnly
              />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Tümü</button>
                <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm">Mainstream</button>
                <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm">Indie</button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                🔥 Trending Now
              </h3>
              <button className="text-gray-400 text-sm">Tümünü Gör →</button>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 cursor-pointer transition">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-full aspect-square rounded-md mb-2"></div>
                  <p className="text-white text-sm font-medium truncate">Track {i}</p>
                 <p className="text-gray-400 text-xs truncate">{i % 2 === 0 ? "✓" : "💎"} Artist {i}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-white font-bold flex items-center gap-2 mb-4">
              💎 Indie Spotlight
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/50 rounded-lg p-4">
                <div className="bg-orange-500 w-full aspect-square rounded-md mb-3"></div>
                <p className="text-white font-medium">Crowdfunding</p>
                <p className="text-orange-300 text-sm">5 aktif kampanya</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-4">
                <div className="bg-blue-500 w-full aspect-square rounded-md mb-3"></div>
                <p className="text-white font-medium">Yeni Çıkanlar</p>
                <p className="text-blue-300 text-sm">Bu hafta 12 yeni</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-4">
                <div className="bg-green-500 w-full aspect-square rounded-md mb-3"></div>
                <p className="text-white font-medium">Yerel Sanatçılar</p>
                <p className="text-green-300 text-sm">İstanbul'dan 8</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Player Ekranı - Dual Mode",
      subtitle: "Mainstream vs Indie Player",
      content: (
        <div className="grid grid-cols-2 gap-6">
          {/* Mainstream Player */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-indigo-400 text-sm font-semibold mb-4 flex items-center gap-2">
              <Crown className="w-4 h-4" /> MAINSTREAM MODE
            </p>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-full aspect-square rounded-lg mb-4"></div>
            <h4 className="text-white font-bold text-lg">Blinding Lights</h4>
            <p className="text-gray-400 flex items-center gap-1">The Weeknd <span className="text-blue-400">✓</span></p>
            
            <div className="mt-6">
              <div className="bg-gray-800 h-1 rounded-full mb-2">
                <div className="bg-indigo-500 h-1 rounded-full w-1/3"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-6 mt-6">
              <button className="text-gray-400 hover:text-white">⏮</button>
              <button className="bg-indigo-600 text-white p-4 rounded-full hover:bg-indigo-700">▶️</button>
              <button className="text-gray-400 hover:text-white">⏭</button>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="text-gray-400 hover:text-white">🔀</button>
              <button className="text-gray-400 hover:text-red-400">❤️</button>
              <button className="text-gray-400 hover:text-white">📋</button>
            </div>
          </div>

          {/* Indie Player */}
          <div className="bg-gray-900 rounded-xl p-6 border border-orange-600/50">
            <p className="text-orange-400 text-sm font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> INDIE MODE
            </p>
            <div className="bg-gradient-to-br from-orange-600 to-pink-600 w-full aspect-square rounded-lg mb-4 relative">
              <button className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur">
                💰 Support
              </button>
            </div>
            <h4 className="text-white font-bold text-lg">Midnight Dreams</h4>
            <p className="text-gray-400 flex items-center gap-1">Local Hero <span className="text-orange-400">💎</span></p>
            <p className="text-gray-500 text-sm italic mt-1">"This song was written at 3am..."</p>
            
            <div className="mt-4">
              <div className="bg-gray-800 h-1 rounded-full mb-2 relative">
                <div className="bg-orange-500 h-1 rounded-full w-1/3"></div>
                <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
                  <div className="bg-orange-400 text-white text-xs px-2 py-1 rounded shadow-lg -mt-8">
                    💬 Amazing!
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-6 mt-4">
              <button className="text-gray-400 hover:text-white">⏮</button>
              <button className="bg-orange-600 text-white p-4 rounded-full hover:bg-orange-700">▶️</button>
              <button className="text-gray-400 hover:text-white">⏭</button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700">
                💝 Tip
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
                🎁 Merch
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
                💬 Mesaj
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Artist Profile - Tiered System",
      subtitle: "Mainstream vs Indie Profiles",
      content: (
        <div className="grid grid-cols-2 gap-6">
          {/* Mainstream Profile */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 h-32"></div>
            <div className="p-6">
              <div className="flex items-center gap-4 -mt-16 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-24 h-24 rounded-full border-4 border-gray-900"></div>
                <div className="mt-12">
                  <h3 className="text-white font-bold text-xl flex items-center gap-2">
                    Taylor Swift <span className="text-blue-400">✓</span>
                  </h3>
                  <p className="text-gray-400 text-sm">POP • 245 Million Monthly Listeners</p>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-full flex-1 hover:bg-indigo-700">
                  Follow
                </button>
                <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700">
                  Share
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">📊 Statistics</h4>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">Public stream counts</p>
                    <p className="text-gray-300 text-sm">Chart positions</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">🎵 Discography</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="bg-gray-800 aspect-square rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indie Profile */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-orange-600/50">
            <div className="bg-gradient-to-br from-orange-600 to-pink-600 h-32"></div>
            <div className="p-6">
              <div className="flex items-center gap-4 -mt-16 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-24 h-24 rounded-full border-4 border-gray-900"></div>
                <div className="mt-12">
                  <h3 className="text-white font-bold text-xl flex items-center gap-2">
                    Local Hero <span className="text-orange-400">💎</span>
                  </h3>
                  <p className="text-gray-400 text-sm">INDIE ROCK • 12000 Supporters</p>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <button className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700">
                  Follow
                </button>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700">
                  💝 Support
                </button>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">
                  💬 Message
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-900/30 border border-orange-600/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">💰 Support This Artist</h4>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button className="bg-gray-800 px-3 py-1 rounded text-sm text-white hover:bg-gray-700">$1</button>
                      <button className="bg-gray-800 px-3 py-1 rounded text-sm text-white hover:bg-gray-700">$5</button>
                      <button className="bg-gray-800 px-3 py-1 rounded text-sm text-white hover:bg-gray-700">$10</button>
                      <button className="bg-orange-600 px-3 py-1 rounded text-sm text-white hover:bg-orange-700">Custom</button>
                    </div>
                    <div className="bg-gray-800 rounded p-2">
                      <p className="text-sm text-gray-300">🎯 New Album: 65% funded</p>
                      <div className="bg-gray-700 h-2 rounded-full mt-1">
                        <div className="bg-orange-500 h-2 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">📖 Artist Story</h4>
                  <p className="text-gray-400 text-sm">Behind-the-scenes content and journey...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Dual Chart System",
      subtitle: "Mainstream & Indie Charts",
      content: (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-indigo-600/50">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-indigo-400" />
              Mainstream Charts
            </h3>
            <p className="text-gray-400 text-sm mb-4">Stream sayısı bazlı</p>
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center gap-4 mb-3 bg-gray-800 p-3 rounded-lg hover:bg-gray-750">
                <span className="text-indigo-400 font-bold w-6">{i}</span>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded"></div>
                <div className="flex-1">
                  <p className="text-white font-medium">Popular Song {i}</p>
                  <p className="text-gray-400 text-sm">Artist Name ✓</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{245 - i*20}M</p>
                  <p className="text-gray-500 text-xs">streams</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-orange-600/50">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-400" />
              Indie Charts
            </h3>
            <p className="text-gray-400 text-sm mb-4">Satış + engagement bazlı</p>
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center gap-4 mb-3 bg-gray-800 p-3 rounded-lg hover:bg-gray-750">
                <span className="text-orange-400 font-bold w-6">{i}</span>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded"></div>
                <div className="flex-1">
                  <p className="text-white font-medium">Indie Track {i}</p>
                  <p className="text-gray-400 text-sm">Artist Name 💎</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{15 - i}K</p>
                  <p className="text-gray-500 text-xs">supporters</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Monetization Model",
      subtitle: "Gelir Yapısı & Kullanıcı Tiers",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {/* Free */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h4 className="text-white font-bold mb-2">Free</h4>
              <p className="text-3xl font-bold text-gray-400 mb-4">$0</p>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">✓ Reklam destekli</li>
                <li className="text-gray-300">✓ Sınırlı skip</li>
                <li className="text-gray-300">✓ Indie satın alma</li>
                <li className="text-gray-500">✗ Offline dinleme</li>
              </ul>
            </div>

            {/* Premium */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border-2 border-indigo-600">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-bold">Premium</h4>
                <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">Popular</span>
              </div>
              <p className="text-3xl font-bold text-white mb-4">$9.99<span className="text-sm text-gray-400">/ay</span></p>
              <ul className="space-y-2 text-sm">
                <li className="text-white">✓ Sınırsız streaming</li>
                <li className="text-white">✓ Reklamsız</li>
                <li className="text-white">✓ Offline dinleme</li>
                <li className="text-white">✓ High quality (FLAC)</li>
              </ul>
            </div>

            {/* Supporter */}
            <div className="bg-gradient-to-br from-orange-900/50 to-pink-900/50 rounded-xl p-6 border-2 border-orange-600">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-bold">Supporter</h4>
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-4">$14.99<span className="text-sm text-gray-400">/ay</span></p>
              <ul className="space-y-2 text-sm">
                <li className="text-white">✓ Premium özellikleri</li>
                <li className="text-white">✓ $5 indie credit/ay</li>
                <li className="text-white">✓ Exclusive content</li>
                <li className="text-white">✓ Early access</li>
              </ul>
            </div>
          </div>

          {/* Revenue Split */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h4 className="text-white font-bold mb-4">Sanatçı Gelir Paylaşımı</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-indigo-400 font-semibold mb-3">Mainstream Artists</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Streaming royalties</span>
                    <span className="text-white font-semibold">$0.005-0.008/stream</span>
                  </div>
                  <div className="bg-gray-800 h-2 rounded-full">
                    <div className="bg-indigo-600 h-2 rounded-full w-1/2"></div>
                  </div>
                  <p className="text-gray-500 text-xs">Label/Artist split: Anlaşma bazlı</p>
                </div>
              </div>

              <div>
                <p className="text-orange-400 font-semibold mb-3">Indie Artists</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Direkt satış</span>
                    <span className="text-white font-semibold">80-85%</span>
                  </div>
                  <div className="bg-gray-800 h-2 rounded-full">
                    <div className="bg-orange-600 h-2 rounded-full w-5/6"></div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-300 text-sm">Streaming</span>
                    <span className="text-white font-semibold">70%</span>
                  </div>
                  <div className="bg-gray-800 h-2 rounded-full">
                    <div className="bg-orange-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Adobe XD Başlangıç Rehberi",
      subtitle: "Adım Adım Tasarım Süreci",
      content: (
        <div className="space-y-4 text-left">
          <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-600/50 rounded-xl p-6">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Download className="w-5 h-5" />
              1. Yeni Proje Oluşturma
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Adobe XD'yi açın → "Create New"</li>
              <li>• Artboard boyutu seçin: iPhone 14 Pro (393x852) mobil için</li>
              <li>• Web için: Custom 1440x1024</li>
              <li>• Artboard adlandırın: "01_Homepage", "02_Player", vb.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 border border-indigo-600/50 rounded-xl p-6">
            <h4 className="text-white font-bold mb-4">2. Design System Kurulumu</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-indigo-400 font-semibold mb-2">Renkler (Assets → Colors)</p>
                <div className="space-y-1 text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-900 rounded"></div>
                    <span>Background: #0A0A0A</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                    <span>Mainstream: #6366F1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-600 rounded"></div>
                    <span>Indie: #FF6B35</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-indigo-400 font-semibold mb-2">Typography</p>
                <div className="space-y-1 text-gray-300">
                  <p>• H1: Inter Bold 32px</p>
                  <p>• H2: Inter SemiBold 24px</p>
                  <p>• Body: Inter Regular 16px</p>
                  <p>• Caption: Inter Regular 14px</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-600/50 rounded-xl p-6">
         <h4 className="text-white font-bold mb-4">3.Components Oluşturma</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Seçim yapın → Sağ tık → "Make Component" (Cmd+K)</li>
              <li>• Component adlandırın: "Button/Primary", "Card/Album"</li>
              <li>• Assets panelinden tekrar kullanın</li>
              <li>• Variants oluşturun: Normal, Hover, Active states</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-emer
