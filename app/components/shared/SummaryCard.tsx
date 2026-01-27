import NavigationButton from "./ViewBtn";
interface SummaryCardProps {
  Header: string;
  counter: number;
}

export default function SummaryCard({ Header, counter }: SummaryCardProps) {
  return (
    <>
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-8 max-w-md mx-auto border-2 border-blue-100 dark:border-gray-700 my-5">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-red-500 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          {Header} Summary
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">
              Total {Header}
            </span>
            <span className="text-2xl font-bold text-red-500">{counter}</span>
          </div>
          <div className="flex justify-between items-center mb-5">
            <span className="text-gray-600 dark:text-gray-400">{Header}</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Electronics, Fashion & More
            </span>
          </div>
        </div>

        <NavigationButton
          href="/products"
          title="Explore All Products"
          showArrow={false}
        />
      </div>
    </>
  );
}
