// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Validar contra credenciales guardadas si existen
    const adminEmail = localStorage.getItem("wf-admin-email");
    const adminPass = localStorage.getItem("wf-admin-pass");
    if (adminEmail && adminPass) {
      if (email === adminEmail && password === adminPass) {
        localStorage.setItem("wf-admin-auth", "ok");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 300);
      } else {
        setError("Email o contraseña incorrectos");
        setLoading(false);
      }
    } else {
      // Si no hay credenciales guardadas, permitir cualquier acceso
      localStorage.setItem("wf-admin-auth", "ok");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 300);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fbf5f8]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-extrabold text-center text-[#8e1dd1]">
          Acceso Administrador
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8e1dd1]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8e1dd1]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8e1dd1] hover:bg-[#6c14a0] text-white font-bold py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
