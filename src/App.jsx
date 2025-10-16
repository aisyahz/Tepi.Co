import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const MENU = [
    {
      id: "pasta",
      name: "Aglio Olio + Chicken Mushroom",
      price: 15,
      emoji: "🍝",
      desc: "Garlic, olive oil, chicken, mushroom",
      img: "/assets/pasta.png",
    },
    {
      id: "matcha",
      name: "Ice Matcha Latte",
      price: 7,
      emoji: "🍵",
      desc: "Matcha + fresh milk",
      img: "/assets/matcha.png",
    },
    {
      id: "matcha-straw",
      name: "Ice Matcha Strawberry",
      price: 7,
      emoji: "🍓",
      desc: "Matcha + strawberry milk",
      img: "/assets/matcha-straw.png",
    },
    {
      id: "latte",
      name: "Ice Latte",
      price: 7,
      emoji: "🧊☕",
      desc: "Espresso + milk",
      img: "/assets/latte.png",
    },
    {
      id: "americano",
      name: "Americano",
      price: 6,
      emoji: "☕",
      desc: "Espresso + water",
      img: "/assets/americano.png",
    },
    {
      id: "croissant",
      name: "French Butter Croissant (1 pcs)",
      price: 3,
      emoji: "🥐",
      desc: "Choose your topping: chocolate, strawberry or plain",
      img: "/assets/croissant.png",
    },
  ];

  const [cart, setCart] = useState(Object.fromEntries(MENU.map((m) => [m.id, 0])));
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [slot, setSlot] = useState("10:00 PM");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [popupImg, setPopupImg] = useState(null);

  // Allow closing popup with ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setPopupImg(null);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const fmt = (n) => (Number(n) || 0).toFixed(2);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalAmount = MENU.reduce((sum, m) => sum + cart[m.id] * m.price, 0);

  const updateQty = (id, delta) => {
    setCart((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));
  };
const handleWhatsAppOrder = () => {
  if (totalItems < 3) {
    alert("⚠️ Minimum 3 items required to order!");
    return;
  }

  const number = "60136648159"; 

  const orderItems = MENU.filter((m) => cart[m.id] > 0)
    .map((m) => `• ${m.name} x${cart[m.id]} — RM${fmt(m.price * cart[m.id])}`)
    .join("%0A");

  const message = `
🍝 *Midnight Pasta UM — Tepi.Co 💛*
=====================
👤 Name: ${name || "-"}
🏫 College: ${college || "-"}
🕙 Delivery Slot: ${slot}
📅 Date: ${date}
---------------------
${orderItems || "No items selected"}
---------------------
💰 Total: RM${fmt(totalAmount)}
=====================
`;

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b1020] to-[#0b0f1a] text-[#f5f7fb] font-[Inter] flex justify-center items-start relative">
      <div className="w-full max-w-7xl px-6 py-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/tepico-logo.png"
            alt="tepi.co logo"
            className="h-16 object-contain"
          />
        </div>

        {/* Header */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <span className="bg-[#1a223f] border border-[#263365] text-[#a8b4d6] rounded-full px-3 py-1 text-xs">
            UM • Late Night 10pm–12am
          </span>
          <span className="bg-[#1a223f] border border-[#263365] text-[#a8b4d6] rounded-full px-3 py-1 text-xs">
            Pre-order by 9pm (day before)
          </span>
          <span className="bg-[#1a223f] border border-[#263365] text-[#a8b4d6] rounded-full px-3 py-1 text-xs">
            Min 3 items per batch
          </span>
        </div>

        <h1 className="text-3xl font-bold text-center mb-1">Midnight Pasta UM 🍝🌙</h1>
        <p className="text-[#8ea3b5] text-sm mb-8 text-center">
          Pasta, croissants & drinks delivered lobby-to-lobby inside UM. Order now, cook tomorrow night.
        </p>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU.map((m) => (
            <div
              key={m.id}
              className="bg-[#111731] border border-[#1e2950] rounded-2xl p-5 shadow-md hover:shadow-xl hover:border-[#32407a] transition-all duration-300"
            >
              {/* Image clickable popup */}
              <div className="relative cursor-pointer" onClick={() => setPopupImg(m.img)}>
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-36 object-cover rounded-lg mb-3 hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-2 right-2 bg-black/60 text-xs px-2 py-1 rounded-md text-gray-300">
                  View
                </div>
              </div>

              <div className="text-sm text-[#8ea3b5] mb-1">{m.emoji}</div>
              <h3 className="font-semibold text-lg">{m.name}</h3>
              <p className="text-xs text-[#8ea3b5] mb-2">{m.desc}</p>
              <div className="text-[#d6e3ff] font-semibold">RM {fmt(m.price)}</div>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => updateQty(m.id, -1)}
                  className="bg-[#1a2449] border border-[#33406b] px-3 py-1 rounded-md"
                >
                  –
                </button>
                <span className="w-10 text-center">{cart[m.id]}</span>
                <button
                  onClick={() => updateQty(m.id, +1)}
                  className="bg-[#1a2449] border border-[#33406b] px-3 py-1 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-[#0d1533] border border-[#1f2c59] rounded-2xl p-6 mt-10 space-y-4 shadow-lg">
          <div>
            <label className="block text-sm text-[#8ea3b5] mb-1">👤 Your Name</label>
            <input
              className="w-full bg-[#0b122b] border border-[#33406b] rounded-lg p-3 text-white placeholder-[#55608a]"
              placeholder="e.g. Aisyah"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-[#8ea3b5] mb-1">🏫 College</label>
            <input
              className="w-full bg-[#0b122b] border border-[#33406b] rounded-lg p-3 text-white placeholder-[#55608a]"
              placeholder="e.g. Kolej Kediaman 10"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-[#8ea3b5] mb-1">🕙 Delivery Slot</label>
            <select
              className="w-full bg-[#0b122b] border border-[#33406b] rounded-lg p-3 text-white"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
            >
              <option>10:00 PM</option>
              <option>11:00 PM</option>
              <option>12:00 AM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#8ea3b5] mb-1">📅 For Date</label>
            <input
              type="date"
              className="w-full bg-[#0b122b] border border-[#33406b] rounded-lg p-3 text-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-dashed border-[#2b3866] pt-4">
            <div className="text-sm">
              <div><strong>Total Items:</strong> {totalItems}</div>
              <div><strong>Total Amount:</strong> RM {fmt(totalAmount)}</div>
              {totalItems < 3 && (
                <div className="text-[#ffd185] text-xs mt-1">
                  ⚠️ Minimum 3 items to order.
                </div>
              )}
            </div>
            <button
  onClick={handleWhatsAppOrder}
  className="bg-gradient-to-r from-[#25d366] to-[#2cd778] text-[#00190a] px-5 py-3 rounded-lg font-semibold mt-4 sm:mt-0 hover:opacity-90 transition-all"
>
  Confirm on WhatsApp
</button>

          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[#8ea3b5] text-xs mt-6">
          <p>Payment: bank transfer / QR will be sent via WhatsApp after you confirm.</p>
          <p>Follow us on <span className="text-[#9ec5ff]">@tepi.co</span> — TikTok & Instagram 💛</p>
        </div>
      </div>

      {/* Image Popup */}
      {popupImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPopupImg(null)}
        >
          <img
            src={popupImg}
            alt="preview"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking image
          />
        </div>
      )}
    </div>
  );
}
