"use client"
import { DatePicker, Dropdown, Button, Table, MenuProps, TableProps } from 'antd';
/////// ============ tempory data =============== //////////\

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Today
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          This week
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          This Month
        </a>
      ),
    },
  ];

/////// ============ tempory data =============== //////////

interface DataType {
    key: string;
    tx: string;
    amount: number;
    datetime: string;
  }
  
const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Transaction',
        dataIndex: 'tx',
        key: 'tx',
        width: '50%',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: '20%'    
    },
    {
        title: 'Date & Time',
        dataIndex: 'datetime',
        key: 'datetime',
        width: '30%'    
    },
];
  
const data: DataType[] = [
    {
        key: '1',
        tx: '4d53570684b8df .... eb2f14608349f',
        amount: 0.5,
        datetime: '06-14-2024',
    },
];
/////// ============ tempory data =============== //////////


export default function campaigns (){
    return(
        <>
            <div className="w-sm m-6 p-6 border flex flex-col bg-white rounded-lg">
                <div className="flex flex-row justify-between">
                    <p className="text-2xl font-semibold ml-4">Campaigns</p>
                    <div className="flex flex-row gap-x-4">
                        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                            <Button>Select Range</Button>
                        </Dropdown>
                        <DatePicker.RangePicker />
                    </div>
                </div>
                <div className="mt-4">
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </>
    )
}