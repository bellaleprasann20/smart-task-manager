import { STATUS_OPTIONS } from "../../utils/constants.js";

const TaskFilter = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} className="border rounded px-3 py-2">
    <option value="">All Status</option>
    {STATUS_OPTIONS.map((s) => (
      <option key={s} value={s}>{s}</option>
    ))}
  </select>
);

export default TaskFilter;