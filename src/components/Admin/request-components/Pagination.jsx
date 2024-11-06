function Pagination({ currentPage, totalPages, handlePageChange }) {
    return (
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Prev
        </button>
  
        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} rounded-md mx-1`}
          >
            {pageNumber}
          </button>
        ))}
  
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
        >
          Next
        </button>
      </div>
    );
  }
  
  export default Pagination;
  