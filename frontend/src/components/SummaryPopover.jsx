const SummaryPopover = ({ value, loading, setPopover }) => (
  <div className="absolute top-20 right-12 w-[400px] bg-[#151922] text-gray-200 border border-[#2a3140] rounded-xl shadow-2xl z-50">
    <div className="flex justify-between items-center px-4 py-3 border-b border-[#2a3140] bg-[#1c2230] rounded-t-xl">
      <h3 className="text-sm font-semibold text-gray-300">Ticket Summary</h3>
      <button onClick={() => setPopover(false)} className="text-gray-400 hover:text-gray-200 transition text-lg font-bold">
        ✕
      </button>
    </div>

    <div className="p-4 max-h-[300px] overflow-y-auto text-sm leading-relaxed">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="animate-pulse text-gray-400">Generating summary...</span>
        </div>
      ) : (
        <p>{value || "No summary available."}</p>
      )}
    </div>
  </div>
);
export default SummaryPopover;