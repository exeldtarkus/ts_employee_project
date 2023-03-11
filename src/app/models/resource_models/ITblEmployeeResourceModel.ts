/* eslint-disable @typescript-eslint/no-explicit-any */
interface ITblEmployeeResourceModel {
  employeeId?: number;
  employeeName?: string;
  employeeManagerId?: number | null;
  pathLevel?: number;
  employeeFormat?: string;
  pathHierarchy?: string;
  pathHierarchyId?: Array<number>;
}

export {ITblEmployeeResourceModel};
