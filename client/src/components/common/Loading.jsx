const Loading = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="spinner mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );
};

export default Loading;