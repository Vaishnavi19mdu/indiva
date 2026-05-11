export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14 16C14 16 12 20 12 24C12 28 14 32 18 34C18.5 34.3 19 34.3 19.5 34"
        stroke="#71648C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M34 16C34 16 36 20 36 24C36 28 34 32 30 34C29.5 34.3 29 34.3 28.5 34"
        stroke="#71648C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M20 18C20 18 22 14 24 14C26 14 28 18 28 18"
        stroke="#71648C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M21 26C21 26 22 28 24 28C26 28 27 26 27 26"
        stroke="#71648C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
