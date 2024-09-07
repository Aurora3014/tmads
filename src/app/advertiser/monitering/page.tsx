"use client"
import { DatePicker, Dropdown, Button, Table } from 'antd';
import { Line } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Cookies from 'js-cookie'
import { fromNano } from '@ton/core';
import dayjs, { Dayjs } from 'dayjs';
/////// ============ tempory data =============== //////////\

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
          "Today"
      ),
    },
    {
      key: '2',
      label: (
         "This week"
      ),
    },
    {
      key: '3',
      label: (
          "This Month"
      ),
    },
  ];

/////// ============ tempory data =============== //////////

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DataType {
    symbol: string
    date: string,
    click: number
  }
  
/////// ============ tempory data =============== //////////


export default function Monitering (){
    const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });

    const [querySnapshot, setQuerySnapshot] = useState<DataType[] | undefined>([]);
    
    const handleDateRangeChange = (dates: any) => {
      if (dates) {
        const [startMoment, endMoment] = dates;
        const startDate = startMoment ? startMoment.toDate() : null;
        const endDate = endMoment ? endMoment.toDate() : null;
        setDateRange({ startDate, endDate });
        console.log('Date range set:', { startDate, endDate });
        processDatas(dateRange)

      } else {
        setDateRange({ startDate: null, endDate: null });
        console.log('Date range cleared');
      }
    };

    const processDatas = async (dateRange: DateRange) => {
      const datas : DataType[] = [];
      const campaigns = await getDocs(collection(db, `Campaign`));
      for ( const campaign of campaigns.docs) {
        const advertisers = await getDocs(collection(db, `Campaign/${campaign.id}/Advertiser`))
        for ( const advertiser of advertisers.docs ) {
          const clicks = await getDocs(collection(db, `Campaign/${campaign.id}/Advertiser/${advertiser.id}/Click`))
          for ( const click of clicks.docs ) {
            const date = new Date(click.get('date'));
            console.log(dateRange.startDate, dateRange.endDate)
            let condition = !dateRange.startDate || !dateRange.endDate
            if(!condition){
              condition = date.getTime() >= dateRange.startDate!.getTime() && date.getTime() <= dateRange.endDate!.getTime();
              console.log(date, dateRange.startDate, dateRange.endDate)
            }
              if(condition){
                const dateString = date.toDateString();
                let flag = false;
                for ( const data of datas ){
                  if(data.date == dateString){
                    flag = true;
                    data.click = data.click + 1;
                  }
                }
                if(!flag)
                  datas.push({
                    symbol: 'Click',
                    date: dateString,
                    click: 1
                  })
              }
          }
        }
      }
      datas.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getTime() - dateB.getTime();
      })
      setQuerySnapshot(datas);
    }

    useEffect( () => {
      processDatas(dateRange)
    },[useState])
    return(
        <>
            <div className="w-sm m-6 p-6 border flex flex-col bg-white rounded-lg">
                <div className="flex flex-row justify-between">
                    <p className="text-2xl font-semibold ml-4">Campaigns</p>
                    <div className="flex flex-row gap-x-4">
                        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                            <Button>Select Range</Button>
                        </Dropdown>
                        <DatePicker.RangePicker onChange={handleDateRangeChange}/>
                    </div>
                </div>
                <div className="mt-4">
                    {/* <Table columns={columns} dataSource={data} /> */}
                    <Line 
                      xField={(d:any) => new Date(d.date)} 
                      yField={'click'} 
                      data={querySnapshot}
                      colorField = {'symbol'}
                      label = {{
                        text: 'Symbol',
                        selector: 'last',
                        style: {
                          fontSize: 10,
                        },
                      }}
                      />
                </div>
            </div>
        </>
    )
}