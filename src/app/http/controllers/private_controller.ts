/* eslint-disable @typescript-eslint/no-explicit-any */
import {IMainRequest} from '../requests/main_request';
import {Response} from 'express';
import {TblEmployeeRepository} from '../../repositories/EmployeeRepository';
import {TblEmployeeResource} from '../resources/TblEmployeeResource';
import {extractCSV} from '../../utils/extract_csv';
import moment from 'moment';
import {TblTransactionRepository} from '../../repositories/TransactionRepository';
import {ITblTransaksiRepositoryFindOutput} from '../../models/repository_models/ITblTransactionRepositoryModel';
import {TblFeeRepository} from '../../repositories/FeeRepository';
import {TblLogRepository} from '../../repositories/TransactionLogRepository';
import {ITblLogRepositoryFindOutput} from '../../models/repository_models/ITblLogRepositoryModel';
import {sendLog} from '../../services/LogService';

const listEmployee = async (req: IMainRequest, res: Response) => {
  const dataEmployee = await Promise.all(
    (
      await TblEmployeeRepository.findAll()
    ).map(row => TblEmployeeResource.transformer(row))
  );

  res.json(TblEmployeeResource.success(res, {data: dataEmployee}));
};

const trxEmployee = async (req: IMainRequest, res: Response) => {
  const bodyFile = JSON.parse(JSON.stringify(req.files));
  const csvUpload = bodyFile.file[0].path;

  const getData = await extractCSV(csvUpload);
  const resultCsvData: Array<ITblTransaksiRepositoryFindOutput> = JSON.parse(
    JSON.stringify(getData)
  );

  const mapTransaction = [];

  for (const i in resultCsvData) {
    const csvData = resultCsvData[i];
    csvData.Tgl_transaksi = moment().format('YYYY-MM-DD');

    const logData: ITblLogRepositoryFindOutput = {
      csv_filename: bodyFile.file[0].originalname,
      Amount: Number(csvData.Amount),
      tgl_transaksi: csvData.Tgl_transaksi,
      Total_record_failed: 0,
      Total_record_succes: 0,
      Faild_id_notes: '',
      Upload_date: csvData.Tgl_transaksi,
    };

    await TblTransactionRepository.create(csvData);

    const findEmployee = await TblEmployeeRepository.findOne({
      q: {
        employee_id: csvData.Employee_id,
      },
    });

    if (!findEmployee) {
      logData.Total_record_failed! += 1;
      logData.Faild_id_notes = '15';
      await sendLog(logData);

      continue;
    }

    const empTransform = await TblEmployeeResource.transformer(
      findEmployee,
      true
    );
    const pathHierarchyId = empTransform.pathHierarchyId;

    for (const x in pathHierarchyId) {
      const dataPathHierarchyId = pathHierarchyId[Number(x)];
      if (dataPathHierarchyId !== empTransform.employeeId) {
        const amountFee = (Number(csvData.Amount) * 30) / 100;
        const foundIndex = mapTransaction.findIndex(
          x => x.employee_id === dataPathHierarchyId
        );
        if (foundIndex >= 0) {
          mapTransaction[foundIndex].amount_fee += amountFee;
        } else {
          mapTransaction.push({
            employee_id: dataPathHierarchyId,
            amount_fee: amountFee,
            tgl_trx: moment().format('YYYY-MM-DD'),
          });
        }
      }
    }

    logData.Total_record_succes! += 1;
    await sendLog(logData);
  }

  for (const i in mapTransaction) {
    const insertFee = mapTransaction[i];
    await TblFeeRepository.create({
      employee_id: insertFee.employee_id,
      amount_fee: insertFee.amount_fee,
      tgl_fee: insertFee.tgl_trx,
    });
  }

  res.json(TblEmployeeResource.success(res, {data: 'Data Insert !'}));
};

const saveLog = async (req: IMainRequest, res: Response) => {
  const body: ITblLogRepositoryFindOutput = req.body;

  console.log('body', body);

  await TblLogRepository.create(body);

  res.json(TblEmployeeResource.success(res, {data: 'log'}));
};

export {listEmployee, trxEmployee, saveLog};
