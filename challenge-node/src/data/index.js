import path from "path";
import xlsx from "xlsx";

export const patientTable = async () => {
  try {
    const filePath = path.resolve(__dirname, "Medical Data.xlsx");
    const sheet = xlsx.readFile(filePath);
    const worksheets = sheet.SheetNames;

    const data = xlsx.utils.sheet_to_json(sheet.Sheets[worksheets[0]]);
    let map = new Map();

    data.forEach((r) => {
      for (let property in r) {
        if (map[property]) {
          map[property].push(r[property]);
        } else {
          map[property] = [r[property]];
        }
      }
    });

    let datas = [];
    for (let prop in map) {
      datas.push({ key: prop, val: map[prop] });
    }

    return datas;
  } catch (error) {
    console.log(error);
  }
};

export const phyisicianTable = async () => {
  try {
    const filePath = path.resolve(__dirname, "Medical Data.xlsx");
    const sheet = xlsx.readFile(filePath);
    const worksheets = sheet.SheetNames;

    const data = xlsx.utils.sheet_to_json(sheet.Sheets[worksheets[1]]);
    let map = new Map();

    data.forEach((r) => {
      for (let property in r) {
        if (map[property]) {
          map[property].push(r[property]);
        } else {
          map[property] = [r[property]];
        }
      }
    });

    let datas = [];
    for (let prop in map) {
      datas.push({ key: prop, val: map[prop] });
    }

    return datas;
  } catch (error) {
    console.log(error);
  }
};

export const pharmacistsTable = async () => {
  try {
    const filePath = path.resolve(__dirname, "Medical Data.xlsx");
    const sheet = xlsx.readFile(filePath);
    const worksheets = sheet.SheetNames;

    const data = xlsx.utils.sheet_to_json(sheet.Sheets[worksheets[2]]);
    let map = new Map();

    data.forEach((r) => {
      for (let property in r) {
        if (map[property]) {
          map[property].push(r[property]);
        } else {
          map[property] = [r[property]];
        }
      }
    });

    let datas = [];
    for (let prop in map) {
      datas.push({ key: prop, val: map[prop] });
    }

    return datas;
  } catch (error) {
    console.log(error);
  }
};

export const adminTable = async () => {
  try {
    const patientData = await patientTable();
    const pharmacistsData = await pharmacistsTable();
    const physicianData = await phyisicianTable();

    return [patientData, physicianData, pharmacistsData];
  } catch (error) {
    console.log(error);
  }
};
