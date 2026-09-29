"use client";

import { CategoryCard } from "./CategoryCard";
import type { Category } from "@/types";

interface CategoryGroupProps {
  title: string;
  emptyText: string;
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryGroup({
  title,
  emptyText,
  categories,
  onEdit,
  onDelete,
}: CategoryGroupProps) {
  return (
    <section className="mt-6 rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{categories.length} kategori</p>

      <div className="mt-5 space-y-3">
        {categories.length === 0 ? (
          <div className="rounded-xl bg-yellow-50/60 p-6 text-center text-sm text-gray-500">
            {emptyText}
          </div>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
