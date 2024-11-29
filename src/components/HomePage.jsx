import OptionCard from './OptionCard';

const HomePage = () => {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-12">
        Welcome to CPU Scheduler Project
      </h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Shortest Job First
          </h2>
          <p className="text-gray-700 mb-4">
            Learn more about the Shortest Job First (SJF) scheduling algorithm.
          </p>
          <div className="flex justify-between items-center">
            <a
              href="https://www.geeksforgeeks.org/program-for-shortest-job-first-or-sjf-cpu-scheduling-set-1-non-preemptive/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-gray-100 border rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            >
              Learn More
            </a>
            <a
              href="/sjf"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go to SJF
            </a>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            First Come First Serve
          </h2>
          <p className="text-gray-700 mb-4">
            Learn more about the First Come First Serve (FCFS) scheduling
            algorithm.
          </p>
          <div className="flex justify-between items-center">
            <a
              href="https://www.geeksforgeeks.org/program-for-fcfs-cpu-scheduling-set-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-gray-100 border rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            >
              Learn More
            </a>
            <a
              href="/fcfs"
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Go to FCFS
            </a>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Shortest Remaining Time First
          </h2>
          <p className="text-gray-700 mb-4">
            Learn more about the Shortest Remaining Time First (SRTF) scheduling
            algorithm.
          </p>
          <div className="flex justify-between items-center">
            <a
              href="https://www.geeksforgeeks.org/shortest-remaining-time-first-preemptive-sjf-scheduling-algorithm/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-gray-100 border rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            >
              Learn More
            </a>
            <a
              href="/srtf"
              className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Go to SRTF
            </a>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Priority Scheduling
          </h2>
          <p className="text-gray-700 mb-4">
            Learn more about the Priority Scheduling algorithm.
          </p>
          <div className="flex justify-between items-center">
            <a
              href="https://www.geeksforgeeks.org/program-for-priority-cpu-scheduling-set-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-gray-100 border rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            >
              Learn More
            </a>
            <a
              href="/priority"
              className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Go to Priority
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
