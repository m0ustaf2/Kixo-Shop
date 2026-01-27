export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-600 to-orange-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        {/* Animated Cart Icon with Spinning Ring */}
        <div className="relative mb-8">
          <div className="text-8xl animate-bounce">🛒</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-white/30 dark:border-blue-500/30 border-t-white dark:border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Kixo Shop Text with Wave Animation */}
        <div className="text-5xl font-bold text-white dark:text-gray-100 tracking-wider mb-4">
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: "0s" }}
          >
            K
          </span>
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: "0.1s" }}
          >
            i
          </span>
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: "0.2s" }}
          >
            x
          </span>
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: "0.3s" }}
          >
            o
          </span>
          <span className="inline-block mx-2"></span>
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: "0.5s" }}
          >
            S
          </span>
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: "0.6s" }}
          >
            h
          </span>
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: "0.7s" }}
          >
            o
          </span>
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: "0.8s" }}
          >
            p
          </span>
        </div>

        {/* Loading Dots */}
        <div className="text-white dark:text-gray-300 text-2xl mt-4">
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            .
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/30 dark:bg-gray-700 rounded-full overflow-hidden mx-auto mt-6">
          <div className="h-full bg-white dark:bg-blue-400 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
