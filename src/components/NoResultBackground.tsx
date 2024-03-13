import Image from 'next/image';
import { STATIC_URLS } from '../utils/constants';

interface INoResultBackground {
  show: boolean,
}

export const NoResultBackgound = (props: INoResultBackground) => {
  const { show } = props;

  return show
    ? <div className='flex justify-center'>
      <Image
        src={STATIC_URLS.NO_RESULT}
        alt={'noresult'}
        height={300}
        width={300}
      />
    </div>
    : <></>;
};