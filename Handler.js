// app/page.js
import FileUpload from './components/FileUpload'; // Importing FileUpload component

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Upload Excel and Display Data</h1>
      <FileUpload /> {/* Render FileUpload component */}
    </div>
  );
};

export default HomePage;
