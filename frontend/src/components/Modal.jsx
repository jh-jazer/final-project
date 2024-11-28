// src/components/Modal.js
const Modal = ({ student, onClose }) => {
    if (!student) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <p><strong>Year & Section:</strong> {student.year} - {student.section}</p>
          <p><strong>Status:</strong> {student.status}</p>
  
          {/* Display grades */}
          <h3 className="mt-4 text-lg font-medium">Semester Grades</h3>
          <ul>
            {Object.entries(student.grades).map(([semester, grade]) => (
              <li key={semester}>
                <strong>{semester}:</strong> {grade}
              </li>
            ))}
          </ul>
  
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  