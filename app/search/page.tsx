import Breadscrum from '@/src/components/Breadscrum';
import FilterBar from '@/src/components/FilterBar';
import Image from 'next/image';
import { IFilter, IItem } from '@/src/interfaces/filter';

const filterContent: IFilter[] = [
  {
    id: 5,
    title: 'Loài',
    items: [
      {
        id: 1,
        title: 'Chó',
      },
      {
        id: 2,
        title: 'Mèo',
      },
      {
        id: 3,
        title: 'Khác',
      },
    ],
  },
  {
    id: 7,
    title: 'Giống',
    items: [],
  },
  {
    id: 1,
    title: 'Giới tính',
    items: [
      {
        id: 1,
        title: 'Đực',
      },
      {
        id: 2,
        title: 'Cái',
      },
    ],
  },
  {
    id: 2,
    title: 'Màu lông',
    items: [
      {
        id: 1,
        title: 'Đen',
      },
      {
        id: 2,
        title: 'Trắng',
      },
      {
        id: 3,
        title: 'Vàng',
      },
      {
        id: 4,
        title: 'Nâu',
      },
      {
        id: 5,
        title: 'Xám',
      },
    ],
  },
  {
    id: 3,
    title: 'Kích thước',
    items: [
      {
        id: 1,
        title: 'Nhỏ',
      },
      {
        id: 2,
        title: 'Trung bình',
      },
      {
        id: 3,
        title: 'Lớn',
      },
    ],
  },
  {
    id: 4,
    title: 'Độ tuổi',
    items: [
      {
        id: 1,
        title: 'Nhỏ',
      },
      {
        id: 2,
        title: 'Trung bình',
      },
      {
        id: 3,
        title: 'Lớn',
      },
    ],
  },
  {
    id: 6,
    title: 'Tiêm chủng',
    items: [
      {
        id: 1,
        title: 'Đã tiêm',
      },
      {
        id: 2,
        title: 'Chưa tiêm',
      },
      {
        id: 3,
        title: 'Chưa rõ',
      },
    ],
  },
];

const sortCriteria: IItem[] = [
  {
    id: 1,
    title: 'Phổ biến',
  },
  {
    id: 2,
    title: 'Đánh giá',
  },
  {
    id: 3,
    title: 'Mới nhất',
  },
];

export default function page() {
  return (
    <div className="container mx-auto my-10">
      <Breadscrum />
      <div className="flex items-center justify-center mt-5">
        <Image
          alt="banner search"
          src={'/img/Banner.png'}
          width={1180}
          height={378}
        ></Image>
      </div>
      <div>
        <FilterBar filterContent={filterContent} sortCriteria={sortCriteria} />
      </div>
    </div>
  );
}
