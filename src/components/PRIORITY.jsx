import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const PRIORITY = () => {
  const [addProc, setAddProc] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [procData, setProcData] = useState([]);
  const [results, setResults] = useState(null);
  const { register, handleSubmit, reset } = useForm();

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

  const calculatePriorityScheduling = () => {
    if (procData.length === 0) {
      alert('No processes to calculate!');
      return;
    }

    const processes = procData.map((process) => ({
      processName: process.processName,
      arrivalTime: parseInt(process.arrivalTime || 0),
      burstTime: parseInt(process.cpu),
      priority: parseInt(process.priority || 0),
    }));

    processes.sort((a, b) =>
      a.arrivalTime === b.arrivalTime
        ? a.priority - b.priority
        : a.arrivalTime - b.arrivalTime
    );

    let currentTime = 0;
    const finalTable = [];

    while (processes.length > 0) {
      const availableProcesses = processes.filter(
        (process) => process.arrivalTime <= currentTime
      );

      if (availableProcesses.length > 0) {
        availableProcesses.sort((a, b) => a.priority - b.priority);
        const selectedProcess = availableProcesses[0];
        processes.splice(processes.indexOf(selectedProcess), 1);

        const startTime = currentTime;
        const completionTime = startTime + selectedProcess.burstTime;
        const turnAroundTime = completionTime - selectedProcess.arrivalTime;
        const waitingTime = turnAroundTime - selectedProcess.burstTime;
        const responseTime = startTime - selectedProcess.arrivalTime;

        currentTime = completionTime;

        finalTable.push({
          process: selectedProcess.processName,
          arrivalTime: selectedProcess.arrivalTime,
          burstTime: selectedProcess.burstTime,
          priority: selectedProcess.priority,
          completionTime,
          turnAroundTime,
          waitingTime,
          responseTime,
        });
      } else {
        currentTime++;
      }
    }

    const totalTimeTaken = finalTable.reduce(
      (maxTime, process) => Math.max(maxTime, process.completionTime),
      0
    );
    const throughput = (finalTable.length / totalTimeTaken).toFixed(2);

    setResults({ finalTable, throughput });
  };

  useEffect(() => {
    if (!editMode) {
      reset();
    }
  }, [editMode, reset]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        Priority Scheduling
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
              {...register('arrivalTime', { required: true, min: 0 })}
              className="w-full p-2 border rounded"
              required
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">CPU (Burst Time)</label>
            <input
              type="number"
              {...register('cpu', { required: true, min: 1 })}
              className="w-full p-2 border rounded"
              required
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Priority</label>
            <input
              type="number"
              {...register('priority', { required: true, min: 1 })}
              className="w-full p-2 border rounded"
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
                <p>
                  <span className="font-medium">Priority:</span>{' '}
                  {process.priority}
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setAddProc(true);
                    setEditMode(true);
                    reset({
                      arrivalTime: process.arrivalTime,
                      cpu: process.cpu,
                      priority: process.priority,
                    });
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
        onClick={calculatePriorityScheduling}
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
                <th className="border px-2 py-1">Priority</th>
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
                  <td className="border px-2 py-1">{row.priority}</td>
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

export default PRIORITY;
