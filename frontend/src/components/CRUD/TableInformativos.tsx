import React from "react";
import { Search, Plus, Download, Upload, Pencil, Trash2 } from "lucide-react";

const rows = [
  {
    createdAt: "14.01.2024",
    updatedAt: "14.01.2024",
    scheme: "Аннуитетная",
    commission: "2.5%",
  },
  {
    createdAt: "19.01.2024",
    updatedAt: "31.01.2024",
    scheme: "Дифференцированная",
    commission: "3%",
  },
  {
    createdAt: "04.02.2024",
    updatedAt: "04.02.2024",
    scheme: "Классическая",
    commission: "2%",
  },
];

export const TableInformativos = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="mb-5 text-[18px] font-medium text-zinc-800">
          Registro de Informativos
        </h2>

        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[510px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Ingresar búsqueda..."
              className="h-12 w-full rounded-xl border border-transparent bg-zinc-100 pl-11 pr-4 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-zinc-300 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#050522] px-5 text-sm font-medium text-white transition hover:opacity-95">
              <Upload className="h-4 w-4" />
              Agregar Informativo
            </button>

            <button className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50">
              <Download className="h-4 w-4" />
              Descargar Informativo
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-white text-left text-zinc-900">
                  <th className="border-b border-zinc-200 px-5 py-4 font-semibold">
                    Дата создания
                  </th>
                  <th className="border-b border-zinc-200 px-5 py-4 font-semibold">
                    Дата редактирования
                  </th>
                  <th className="border-b border-zinc-200 px-5 py-4 font-semibold">
                    Схема кредитования
                  </th>
                  <th className="border-b border-zinc-200 px-5 py-4 font-semibold">
                    Комиссия платформы
                  </th>
                  <th className="border-b border-zinc-200 px-5 py-4 font-semibold text-center">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border-b border-zinc-200 px-5 py-4 text-zinc-700">
                      {row.createdAt}
                    </td>
                    <td className="border-b border-zinc-200 px-5 py-4 text-zinc-700">
                      {row.updatedAt}
                    </td>
                    <td className="border-b border-zinc-200 px-5 py-4">
                      <span className="inline-flex rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800">
                        {row.scheme}
                      </span>
                    </td>
                    <td className="border-b border-zinc-200 px-5 py-4 text-zinc-700">
                      {row.commission}
                    </td>
                    <td className="border-b border-zinc-200 px-5 py-4">
                      <div className="flex items-center justify-center gap-4 text-zinc-700">
                        <button className="transition hover:text-zinc-950" aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="transition hover:text-red-600" aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
