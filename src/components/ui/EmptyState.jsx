const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h3 className="text-[32px] font-bold text-gray-700">
        No tasks yet
      </h3>
      <p className="text-md text-gray-500 mt-2">
        Add a task to get started 🚀
      </p>
    </div>
  );
};

export default EmptyState;
