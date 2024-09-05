/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import './css/page.css'

interface ProjectCardProps {
    id: string;
    bannerName: string;
    logoName: string;
    name: string;
    description: string;
    amount: number;
}

export const CampaignCard: React.FC<ProjectCardProps> = ({
    id,
    bannerName,
    logoName,
    name,
    description,
    amount,
  }) => {
    return (
      <Link href={`campaigns/${id}`} className="">
        <div className="max-w-xl w-full h-[300px] bg-white rounded-lg shadow-md overflow-visible transition duration-300 ease-in-out transform hover:scale-105">
          <div className="w-full h-16 bg-gray-200 mb-10 relative">
            <img
                alt={`${name} cover`}
                src={`/uploads/${bannerName}`}
                className="w-full h-full rounded-t-lg object-cover"
            />
            <div className="absolute top-8 px-10 w-full flex flex-row items-center justify-between">
              <div className="shadow-md flex justify-center items-center rounded-full">
                <Image
                  alt={`${name} logo`}
                  src={`/uploads/${logoName}`}
                  width={50}
                  height={50}
                  className="bg-white rounded-full h-16 w-16 object-fill"
                />
              </div>
              <div className="flex flex-row items-center bg-green-200 px-2 py-1 rounded-md border border-white">
                <span className="font-semibold">{amount} TON</span>
                <Image
                    alt="Polygon Mainnet"
                    src='/images/ton.svg'
                    width={18}
                    height={18}
                    className="m-1"
                />
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-5">
            <h3 className="text-lg leading-6 font-medium text-[#121212] truncate">{name}</h3>
            <p
              className="text-gray-700 text-base overflow-hidden text-ellipsis"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 5,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </Link>
    );
  };