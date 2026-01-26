export default function FooterPage() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-gray-50  shadow-lg  text-xl text-gray-300  w-full">
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear}
              <span className="text-purple-400 font-semibold">
                KIXO - MUSTAFA ESMAIL
              </span>
              . All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">We Accept:</span>
              <div className="flex gap-2">
                {["VISA", "MC", "AMEX", "PP"].map((method) => (
                  <div
                    key={method}
                    className="w-12 h-8 bg-white/10 rounded border cursor-pointer border-gray-600 flex items-center justify-center text-xs font-semibold text-gray-400 hover:bg-white/20 transition-colors"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
