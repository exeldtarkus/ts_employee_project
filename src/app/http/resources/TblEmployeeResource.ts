/* eslint-disable @typescript-eslint/no-explicit-any */
import {ITblEmployeeRepositoryFindOutput} from '../../models/repository_models/ITblEmployeeRepositoryModel';
import {ITblEmployeeResourceModel} from '../../models/resource_models/ITblEmployeeResourceModel';
import {TblEmployeeRepository} from '../../repositories/EmployeeRepository';
import {BaseResource} from './BaseResource';

class TblEmployeeResource extends BaseResource {
  static async transformer(
    data: ITblEmployeeRepositoryFindOutput,
    showPathHierarchyId?: boolean
  ): Promise<ITblEmployeeResourceModel> {
    const check = {
      searchManager: true,
      haveManager: data.employee_manager_id,
      countHirarky: 0,
    };

    let pathHierarchy: Array<any> = [];
    let pathHierarchyId: Array<any> = [];

    pathHierarchy = [...pathHierarchy, data.employee_name];
    pathHierarchyId = [...pathHierarchyId, data.employee_id];

    while (check.searchManager) {
      if (check.haveManager) {
        const employeeFindOne = await TblEmployeeRepository.findOne({
          q: {
            employee_id: check.haveManager,
          },
        });
        check.countHirarky += 1;
        if (employeeFindOne?.employee_manager_id) {
          check.haveManager = employeeFindOne.employee_manager_id;
        } else {
          check.searchManager = false;
        }
        pathHierarchy.push(employeeFindOne?.employee_name);
        pathHierarchyId.push(employeeFindOne?.employee_id);
      } else {
        check.searchManager = false;
      }
    }
    pathHierarchy.reverse();

    const mapFormatHierarchy = [];

    for (let i = 0; i < pathHierarchy.length; i++) {
      const data = pathHierarchy[i];
      const length = pathHierarchy.length;
      if (length - 1 === i) {
        mapFormatHierarchy.push(data);
      } else if (length - 2 === i) {
        mapFormatHierarchy.push('|__ ');
      } else {
        mapFormatHierarchy.push('.');
      }
    }
    return {
      employeeId: data.employee_id,
      employeeName: data.employee_name,
      employeeManagerId: data.employee_manager_id,
      pathLevel: check.countHirarky,
      pathHierarchy: pathHierarchy.join(' -> '),
      pathHierarchyId: showPathHierarchyId ? pathHierarchyId : undefined,
      employeeFormat: mapFormatHierarchy.join(''),
    };
  }
}

export {TblEmployeeResource};
