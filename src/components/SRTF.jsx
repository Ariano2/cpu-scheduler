import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SRTFScheduling = () => {
  const [addProc, setAddProc] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [procData, setProcData] = useState([]);
  const [results, setResults] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!editMode) {
      // Add new process
      setProcData([
        ...procData,
        { processName: `P${procData.length + 1}`, ...data },
      ]);
    } else {
      // Edit existing process
      const updatedProcess = {
        ...procData[editIndex],
        ...data,
      };
      const updatedProcData = [...procData];
      updatedProcData[editIndex] = updatedProcess;
      setProcData(updatedProcData);
      setEditMode(false);
      setEditIndex(null);
      setAddProc(false);
    }
  };

  const deleteProcess = () => {
    if (procData.length > 0) {
      setProcData(procData.slice(0, -1));
    }
  };

  const calculateSRTF = () => {
    if (procData.length === 0) {
      alert('No processes to calculate!');
      return;
    }

    // Parse the input data
    const processes = procData.map((process) => ({
      processName: process.processName,
      arrivalTime: parseInt(process.arrivalTime || 0),
      burstTime: parseInt(process.cpu),
      remainingTime: parseInt(process.cpu), // For tracking remaining burst time
    }));

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completed = 0;
    const n = processes.length;
    const finalTable = [];
    let totalTimeTaken = 0;

    const responseTimes = Array(n).fill(-1); // Track response times

    while (completed < n) {
      // Find the process with the shortest remaining time that has arrived
      let idx = -1;
      let minRemainingTime = Infinity;

      for (let i = 0; i < n; i++) {
        if (
          processes[i].arrivalTime <= currentTime &&
          processes[i].remainingTime > 0 &&
          processes[i].remainingTime < minRemainingTime
        ) {
          minRemainingTime = processes[i].remainingTime;
          idx = i;
        }
      }

      if (idx === -1) {
        currentTime++;
        continue;
      }

      // Update response time only when a process is first picked
      if (responseTimes[idx] === -1) {
        responseTimes[idx] = currentTime - processes[idx].arrivalTime;
      }

      // Update remaining time and current time
      processes[idx].remainingTime--;
      currentTime++;

      // If the process is completed
      if (processes[idx].remainingTime === 0) {
        completed++;
        const completionTime = currentTime;
        const turnAroundTime = completionTime - processes[idx].arrivalTime;
        const waitingTime = turnAroundTime - processes[idx].burstTime;

        finalTable.push({
          process: processes[idx].processName,
          arrivalTime: processes[idx].arrivalTime,
          burstTime: processes[idx].burstTime,
          completionTime,
          turnAroundTime,
          waitingTime,
          responseTime: responseTimes[idx],
        });

        totalTimeTaken = Math.max(totalTimeTaken, completionTime);
      }
    }

    const throughput = (finalTable.length / totalTimeTaken).toFixed(2);

    setResults({ finalTable, throughput });
  };

  useEffect(() => {
    setAddProc(false);
    setEditMode(false);
  }, [procData]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
        Shortest Remaining Time First (SRTF)
      </h1>

      <div className="flex gap-4 justify-center mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setAddProc(true)}
        >
          {editMode ? 'Edit Process' : 'Add Process'}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={deleteProcess}
        >
          Delete Process
        </button>
      </div>

      {addProc && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md p-4 rounded-md max-w-md mx-auto mb-6"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Arrival Time</label>
            <input
              type="number"
              {...register('arrivalTime', {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: 'Arrival time cannot be negative',
                },
                required: 'Arrival time is required',
              })}
              className="w-full p-2 border rounded"
            />
            {errors.arrivalTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.arrivalTime.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">CPU (Burst Time)</label>
            <input
              type="number"
              {...register('cpu', {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: 'Burst time cannot be negative',
                },
                required: 'Burst time is required',
              })}
              className="w-full p-2 border rounded"
            />
            {errors.cpu && (
              <p className="text-red-500 text-sm mt-1">{errors.cpu.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {editMode ? 'Save Changes' : 'Add Process'}
          </button>
        </form>
      )}

      <div className="bg-white shadow-md p-4 rounded-md max-w-md mx-auto mb-6">
        <h2 className="text-lg font-bold mb-4">Process List</h2>
        {procData.length > 0 ? (
          procData.map((process, index) => (
            <div
              key={index}
              className="border-b last:border-b-0 py-2 flex justify-between"
            >
              <div>
                <p>
                  <span className="font-medium">Process:</span>{' '}
                  {process.processName}
                </p>
                <p>
                  <span className="font-medium">Arrival Time:</span>{' '}
                  {process.arrivalTime || 0}
                </p>
                <p>
                  <span className="font-medium">CPU (Burst Time):</span>{' '}
                  {process.cpu}
                </p>
              </div>
              <div>
                <button
                  data-index={index}
                  onClick={() => {
                    setEditIndex(index);
                    setAddProc(true);
                    setEditMode(true);
                  }}
                >
                  ✏️
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No processes added yet.</p>
        )}
      </div>

      <button
        onClick={calculateSRTF}
        className="w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-6 bg-white shadow-md p-4 rounded-md max-w-3xl mx-auto">
          <h2 className="text-lg font-bold mb-4">Final Results</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Process</th>
                <th className="border px-2 py-1">Arrival Time</th>
                <th className="border px-2 py-1">Burst Time</th>
                <th className="border px-2 py-1">Completion Time</th>
                <th className="border px-2 py-1">Turn Around Time</th>
                <th className="border px-2 py-1">Waiting Time</th>
                <th className="border px-2 py-1">Response Time</th>
              </tr>
            </thead>
            <tbody>
              {results.finalTable.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-2 py-1">{row.process}</td>
                  <td className="border px-2 py-1">{row.arrivalTime}</td>
                  <td className="border px-2 py-1">{row.burstTime}</td>
                  <td className="border px-2 py-1">{row.completionTime}</td>
                  <td className="border px-2 py-1">{row.turnAroundTime}</td>
                  <td className="border px-2 py-1">{row.waitingTime}</td>
                  <td className="border px-2 py-1">{row.responseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4">
            <p className="font-bold text-indigo-600">
              Throughput: {results.throughput} processes/unit time
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SRTFScheduling;
