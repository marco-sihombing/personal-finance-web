"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "./AccountsSection";

export function ManageSection() {
  const router = useRouter();

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ManageCard
        title="Categories"
        description="Manage categories for your income and expenses."
        buttonText="Manage Categories"
        onClick={() => router.push("/categories")}
      />
    </div>
  );
}

function ManageCard({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <section className="rounded-2xl border border-yellow-200/60 bg-white/90 p-5 shadow-lg shadow-yellow-100/50 backdrop-blur-sm sm:p-6">
      <div>
        <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <PrimaryButton onClick={onClick} className="mt-4 w-full sm:w-auto">
        {buttonText}
      </PrimaryButton>
    </section>
  );
}
