"use client";

export default function DeleteButton({
  action,
  hidden,
  confirmMessage = "Are you sure? This can't be undone.",
  label = "Delete",
}: {
  action: (formData: FormData) => void | Promise<void>;
  hidden: Record<string, string>;
  confirmMessage?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <button
        type="submit"
        className="text-sm font-medium text-red-600 hover:text-red-800"
      >
        {label}
      </button>
    </form>
  );
}
