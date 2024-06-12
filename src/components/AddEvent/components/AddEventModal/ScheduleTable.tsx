import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import Datepicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import EventClock from "@/components/AppIcons/EventClock";
import EventCalendar from "@/components/AppIcons/EventCalendar";

interface TableData {
  id: number;
  facilityName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const TBODY_CELL_STYLE = "whitespace-nowrap p-2";

const ScheduleTable: React.FC = () => {
  const [tableData, setTableData] = useState<TableData[]>([
    {
      id: 1,
      facilityName: "Facility 1",
      startDate: "2022-06-01",
      endDate: "2022-06-01",
      startTime: "2024-06-10T20:30:00.391Z",
      endTime: "2024-06-12T17:30:00.391Z",
    },
    {
      id: 2,
      facilityName: "Facility 2",
      startDate: "2022-07-10",
      endDate: "2022-07-12",
      startTime: "2024-07-10T22:30:00.391Z",
      endTime: "2024-07-12T20:30:00.391Z",
    },
    {
      id: 3,
      facilityName: "Facility 3",
      startDate: "2022-08-03",
      endDate: "2022-08-08",
      startTime: "2024-08-10T23:30:00.391Z",
      endTime: "2024-08-08T20:30:00.391Z",
    },
  ]);

  const handleInputChange = (
    value: Date | string,
    id: number,
    field: keyof TableData,
  ) => {
    const newData = tableData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setTableData(newData);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 lg:w-[552px]">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Facility Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Start Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            End Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Start Time
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            End Time
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {tableData.map((row) => (
          <tr key={row.id}>
            <td className={TBODY_CELL_STYLE}>
              <input
                type="text"
                className="input p-4"
                value={row.facilityName}
                aria-label="Facility name"
                onChange={(e) =>
                  handleInputChange(e.target.value, row.id, "facilityName")
                }
              />
            </td>
            <td className={TBODY_CELL_STYLE}>
              <Datepicker
                name="startDate"
                icon={<Icon src={<EventCalendar />} size={38} />}
                dateValue={new Date(row.startDate)}
                // hasError={!!errors.startDate?.message}
                dateOnChange={(date) => {
                  date && handleInputChange(date, row.id, "startDate");
                }}
              />
            </td>
            <td className={TBODY_CELL_STYLE}>
              <Datepicker
                name="endDate"
                icon={<Icon src={<EventCalendar />} size={38} />}
                dateValue={new Date(row.endDate)}
                dateOnChange={(date) => {
                  date && handleInputChange(date, row.id, "startDate");
                }}
              />
            </td>
            <td className={TBODY_CELL_STYLE}>
              <TimePicker
                icon={<Icon src={<EventClock />} size={28} />}
                name="startTime"
                dateValue={new Date(row.startTime)}
                dateOnChange={(startTime) => {
                  startTime &&
                    handleInputChange(startTime, row.id, "startTime");
                }}
              />
            </td>
            <td className={TBODY_CELL_STYLE}>
              <TimePicker
                icon={<Icon src={<EventClock />} size={28} />}
                name="endTime"
                dateValue={new Date(row.endTime)}
                dateOnChange={(endTime) => {
                  endTime && handleInputChange(endTime, row.id, "endTime");
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
