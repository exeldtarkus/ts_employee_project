/* eslint-disable @typescript-eslint/no-explicit-any */
interface IBitlyServiceParam {
  domain: string;
  long_url: string;
}

interface IBitlyServiceOutput {
  created_at: string;
  id: string;
  link: string;
  custom_bitlinks: Array<any>;
  long_url: string;
  archived: false;
  tags: Array<any>;
  deeplinks: Array<any>;
  references: {
    group: string;
  };
}

export {IBitlyServiceParam, IBitlyServiceOutput};
